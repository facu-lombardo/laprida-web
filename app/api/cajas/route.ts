import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fecha, turno, inicio_caja, observaciones } = body;

    const query = `
      INSERT INTO cajas (fecha, turno, inicio_caja, observaciones)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const result = await pool.query(query, [
      fecha,
      turno,
      inicio_caja,
      observaciones,
    ]);

    return NextResponse.json(result.rows[0]);

  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear caja" },
      { status: 500 }
    );
  }
}


export async function GET() {
  const result = await pool.query(`
    SELECT * FROM cajas
    ORDER BY created_at DESC
    LIMIT 1
  `);

  return Response.json(result.rows[0]);
}