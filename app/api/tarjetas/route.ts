import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  const { caja_id, posnet, monto } = await req.json();

  await pool.query(
    "INSERT INTO tarjetas (caja_id, posnet, monto) VALUES ($1,$2,$3)",
    [caja_id, posnet, monto]
  );

  return NextResponse.json({ ok: true });
}