import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs";
import csv from "csv-parser";
import iconv from "iconv-lite";
import { Pool } from "pg";

const pool = new Pool({
 connectionString: process.env.DATABASE_URL
});

console.log(process.env.DATABASE_URL);

const archivo = "data/compras.csv";



async function importar() {

 const client = await pool.connect();

 try {

  console.log("Iniciando importación...");

  const registros:any[] = [];

  await new Promise((resolve) => {

   fs.createReadStream(archivo)
    .pipe(iconv.decodeStream("latin1"))
    .pipe(csv({ separator: "," }))
    .on("data", (row) => {
     console.log("Fila leída:", row);   

     try {

      registros.push([
       row.ID_COMPRA,
       row.COD_PROV,
       row.NOM_PROV,
       row.CUIT,
       row.NUMERO,
       row.TIPO,
       row.FECHA,
       row.COSTO || 0,
       row.PUBLICO || 0,
       row.UNI_FACT || 0,
       row.UNI_ING || 0,
       row.EXENTO || 0,
       row.GRAVADO || 0,
       row.IVA || 0,
       row.PER_IBR_VS || 0,
       row.PER_IVA || 0,
       row.PER_GAN || 0,
       row.FEC_MOV
      ]);

     } catch (e) {

      console.log("Fila ignorada");

     }

    })
    .on("end", resolve);

  });

  console.log("Filas leídas:", registros.length);

  await client.query("BEGIN");

  for (const r of registros) {

   await client.query(
    `INSERT INTO compras (
     id_compra,
     cod_prov,
     nom_prov,
     cuit,
     numero,
     tipo,
     fecha,
     costo,
     publico,
     uni_fact,
     uni_ing,
     exento,
     gravado,
     iva,
     per_ibr_vs,
     per_iva,
     per_gan,
     fec_mov
    )
    VALUES (
     $1,$2,$3,$4,$5,$6,$7,$8,$9,
     $10,$11,$12,$13,$14,$15,$16,$17,$18
    )`,
    r
   );

  }

  await client.query("COMMIT");

  console.log("Importación finalizada");

 } catch (e) {

  await client.query("ROLLBACK");
  console.error("Error:", e);

 } finally {

  client.release();
  process.exit();

 }

}

importar();