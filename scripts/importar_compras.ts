import fs from "fs";
import csv from "csv-parser";
import iconv from "iconv-lite";

const archivo = "data/compras.csv";

// ✅ Tipamos la función
function parseFecha(fecha: string | null): string | null {
  if (!fecha) return null;

  const partes = fecha.split("/");
  if (partes.length !== 3) return fecha;

  const [d, m, y] = partes;
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

// ✅ Tipamos estructuras
type FilaProcesada = {
  ID_COMPRA: number | null;
  COD_PROV: string | null;
  NOM_PROV: string | null;
  CUIT: string | null;
  NUMERO: string | null;
  TIPO: string | null;
  FECHA: string | null;
  COSTO: number;
  PUBLICO: number;
  UNI_FACT: number;
  UNI_ING: number;
  EXENTO: number;
  GRAVADO: number;
  IVA: number;
  PER_IBR_VS: number;
  PER_IVA: number;
  PER_GAN: number;
  FEC_MOV: string | null;
};

// 👇 esto soluciona tu error TS7034
const primerasFilas: { original: any; procesado: FilaProcesada }[] = [];

let total = 0;

fs.createReadStream(archivo)
  .pipe(iconv.decodeStream("latin1"))
  .pipe(csv({ separator: "," })) // ⚠️ cambiar a ";" si hace falta

  .on("headers", (headers: string[]) => {
    console.log("\n🧾 Columnas detectadas:");
    console.log(headers);
  })

  .on("data", (row: any) => {
    total++;

    const filaProcesada: FilaProcesada = {
      ID_COMPRA: parseInt(row.ID_COMPRA) || null,
      COD_PROV: row.COD_PROV || null,
      NOM_PROV: row.NOM_PROV || null,
      CUIT: row.CUIT || null,
      NUMERO: row.NUMERO || null,
      TIPO: row.TIPO || null,
      FECHA: parseFecha(row.FECHA),
      COSTO: parseFloat(row.COSTO) || 0,
      PUBLICO: parseFloat(row.PUBLICO) || 0,
      UNI_FACT: parseInt(row.UNI_FACT) || 0,
      UNI_ING: parseInt(row.UNI_ING) || 0,
      EXENTO: parseFloat(row.EXENTO) || 0,
      GRAVADO: parseFloat(row.GRAVADO) || 0,
      IVA: parseFloat(row.IVA) || 0,
      PER_IBR_VS: parseFloat(row.PER_IBR_VS) || 0,
      PER_IVA: parseFloat(row.PER_IVA) || 0,
      PER_GAN: parseFloat(row.PER_GAN) || 0,
      FEC_MOV: parseFecha(row.FEC_MOV),
    };

    if (primerasFilas.length < 5) {
      primerasFilas.push({
        original: row,
        procesado: filaProcesada,
      });
    }

    if (!row.ID_COMPRA) {
      console.log("\n⚠️ Fila problemática:");
      console.log(row);
    }
  })

  .on("end", () => {
    console.log("\n📊 Total de filas:", total);

    console.log("\n🔎 Primeras filas:");
    console.dir(primerasFilas, { depth: null });

    if (primerasFilas.length > 0) {
      console.log("\n🧠 Tipos de datos:");
      for (const [key, value] of Object.entries(primerasFilas[0].procesado)) {
        console.log(`${key}:`, value, "→", typeof value);
      }
    }

    console.log("\n✅ Validación terminada");
  });