import pool from "@/lib/db";

export async function GET() {

  try {

    const result = await pool.query(
      "SELECT * FROM compras ORDER BY id"
    );

    return Response.json(result.rows);

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Error DB" },
      { status: 500 }
    );

  }

}