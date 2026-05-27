import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { DBFFile } from "dbffile";
import { Pool } from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env.local")
});

// =====================================
// SUPABASE / POSTGRES
// =====================================

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// =====================================
// ARCHIVO DBF
// =====================================

const archivo = "P:/sfc/PROVEMOV.DBF";

// =====================================
// HELPERS
// =====================================

async function obtenerUltimoId(client) {

  const result = await client.query(`
    SELECT COALESCE(MAX(id_compra), 0) AS ultimo
    FROM provemov
  `);

  return result.rows[0].ultimo;
}

function parseNumero(valor) {

  if (valor === null || valor === undefined || valor === "") {
    return 0;
  }

  return Number(valor) || 0;
}
function parseFecha(valor) {

  if (!valor) {
    return null;
  }

  const fecha = new Date(valor);

  // fecha inválida
  if (isNaN(fecha.getTime())) {
    return null;
  }

  return fecha.toISOString().split("T")[0];
}

function limpiarTexto(valor) {

  if (valor === null || valor === undefined) {
    return null;
  }

  return String(valor)
    .replace(/\u0000/g, "") // elimina bytes nulos
    .trim();
}

// =====================================
// IMPORTACION
// =====================================

async function importar() {

  const client = await pool.connect();

  try {

    console.log("🚀 Iniciando importación...");

    // abrir DBF
    const dbf = await DBFFile.open(archivo, {
      encoding: "latin1"
    });

    console.log(`📦 Registros encontrados: ${dbf.recordCount}`);

    const registros = await dbf.readRecords();

    const batch = [];
    const batchSize = 500;

    let insertados = 0;
    let ignorados = 0;

    await client.query("BEGIN");
    
    const ultimoId = await obtenerUltimoId(client);

    console.log(`📌 Último ID importado: ${ultimoId}`);

    for (const row of registros) {

      // =====================================
      // FILTRO SOLO LOS QUE ESTAN LUEGO DEL ULTMO ID IMPORTADO
      // =====================================

    if (!row.ID_COMPRA) {
      ignorados++;
      continue;
    }

    if (row.ID_COMPRA <= ultimoId) {
      ignorados++;
      continue;
    }

      // =====================================
      // ARMAR REGISTRO
      // =====================================

    const registro = [

      row.ID_COMPRA || null,

      limpiarTexto(row.CODIGO),

      parseFecha(row.FECHA),

      limpiarTexto(row.TIPO),

      limpiarTexto(row.NUMERO),

      parseNumero(row.UNIDADES),
      parseNumero(row.IMPORTE),

      parseNumero(row.UNID_ING),
      parseNumero(row.IMP_ING_PP),

      parseFecha(row.FEC_REAL),

      parseNumero(row.EXENTO),
      parseNumero(row.GRAVADO),

      parseNumero(row.IVA),
      parseNumero(row.IVA2),

      parseNumero(row.IB),
      parseNumero(row.IBP),

      parseNumero(row.IB1),
      parseNumero(row.IB2),

    false
    ];
      batch.push(registro);

      // =====================================
      // INSERT MASIVO
      // =====================================

      if (batch.length >= batchSize) {

        const cantidad = await insertarBatch(client, batch);

        insertados += cantidad;

        console.log(`✔ Insertadas ${cantidad}`);

        batch.length = 0;
      }
    }

    // =====================================
    // ULTIMO BATCH
    // =====================================

    if (batch.length > 0) {

      const cantidad = await insertarBatch(client, batch);

      insertados += cantidad;

      console.log(`✔ Últimas ${cantidad}`);
    }

    await client.query("COMMIT");

    console.log("=================================");
    console.log("✅ IMPORTACION FINALIZADA");
    console.log(`📥 Insertados: ${insertados}`);
    console.log(`⏭ Ignorados: ${ignorados}`);
    console.log("=================================");

  } catch (error) {

    await client.query("ROLLBACK");

    console.error("❌ Error en importación:");
    console.error(error);

  } finally {

    client.release();
    process.exit();
  }
}

// =====================================
// INSERT BATCH
// =====================================

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
    INSERT INTO provemov (

      id_compra,
      codigo,

      fecha,
      tipo,
      numero,

      unidades,
      importe,

      unid_ing,
      imp_ing_pp,

      fec_real,

      exento,
      gravado,

      iva,
      iva2,

      ib,
      ibp,
      ib1,
      ib2,

      cancelada

    )
    VALUES ${placeholders}

    ON CONFLICT (id_compra)
    DO NOTHING
  `;

  const result = await client.query(query, valores);

  return result.rowCount || 0;
}

// =====================================
// EJECUTAR
// =====================================

importar();