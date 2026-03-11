import pool from "@/lib/db";

export async function GET() {
  try {

    const result = await pool.query(`
      SELECT id_compra, nom_prov, fecha, costo
      FROM compras_raw
      ORDER BY fecha DESC
      LIMIT 100
    `);

    return Response.json(result.rows);

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Error consultando base de datos" },
      { status: 500 }
    );

  }
}