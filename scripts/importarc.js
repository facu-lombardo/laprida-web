import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env.local")
});


import fs from "fs";
import csv from "csv-parser";
import iconv from "iconv-lite";
import { Pool } from "pg";

console.log("ENV PATH:", process.cwd());
console.log("DATABASE_URL:", process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  
});

const archivo = "../data/compras.csv";

// 📅 convierte 2/1/2026 → 2026-01-02
function parseFecha(fecha) {
  if (!fecha) return null;

  const partes = fecha.split("/");
  if (partes.length !== 3) return null;

  const [d, m, y] = partes;
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

// 🔢 convierte "12345,67" → 12345.67
function parseNumero(valor) {
  if (!valor) return 0;
  return parseFloat(valor.replace(",", ".")) || 0;
}

async function importar() {
  const client = await pool.connect();

  try {
    
    console.log("🚀 Iniciando importación...");

    const batch = [];
    const batchSize = 500;

    await client.query("BEGIN");

    await new Promise((resolve, reject) => {
      fs.createReadStream(archivo)
        .pipe(iconv.decodeStream("latin1"))
        .pipe(csv({
          separator: ";",
          mapHeaders: ({ header }) =>
            header
              .replace(/^\uFEFF/, "") // BOM real
              .replace(/^ï»¿/, "")   // BOM roto
              .trim()
        }))
        .on("data", async (row) => {

          const registro = [
            parseInt(row.ID_COMPRA) || null,
            parseInt(row.COD_PROV) || null,
            row.NOM_PROV || null,
            row.CUIT || null,
            row.NUMERO || null,
            row.TIPO || null,
            parseFecha(row.FECHA),
            parseFecha(row.FEC_MOV),
            parseNumero(row.COSTO),
            parseNumero(row.PUBLICO),
            parseInt(row.UNI_FACT) || 0,
            parseInt(row.UNI_ING) || 0,
            parseNumero(row.EXENTO),
            parseNumero(row.GRAVADO),
            parseNumero(row.IVA),
            parseNumero(row.PER_IBR_VS),
            parseNumero(row.PER_IVA),
            parseNumero(row.PER_GAN)
          ];

          batch.push(registro);

          // 🚀 insertar por bloques
          if (batch.length === batchSize) {
            await insertarBatch(client, batch);
            console.log(`✔ Insertadas ${batch.length} filas`);
            batch.length = 0;
          }
        })
        .on("end", async () => {
          if (batch.length > 0) {
            await insertarBatch(client, batch);
            console.log(`✔ Insertadas últimas ${batch.length}`);
          }
          resolve();
        })
        .on("error", reject);
    });

    await client.query("COMMIT");

    console.log("✅ Importación completa");

  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Error:", error);
  } finally {
    client.release();
    process.exit();
  }
}

// 🔥 INSERT MASIVO
async function insertarBatch(client, batch) {
  const valores = [];

  const placeholders = batch
    .map((fila, i) => {
      const base = i * fila.length;
      const params = fila.map((_, j) => `$${base + j + 1}`);
      valores.push(...fila);
      return `(${params.join(",")})`;
    })
    .join(",");

  const query = `
    INSERT INTO compras (
      id_compra, cod_prov, nom_prov, cuit, numero, tipo,
      fecha, fec_mov, costo, publico,
      uni_fact, uni_ing,
      exento, gravado, iva,
      per_ibr_vs, per_iva, per_gan
    )
    VALUES ${placeholders}
  `;

  await client.query(query, valores);
}

importar();