import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Page() {

  const result = await pool.query(
    "SELECT * FROM compras ORDER BY id"
  );

  const compras = result.rows;

  return (
    <div style={{ padding: 40 }}>

      <h1>Compras</h1>

      <table border={1} cellPadding={10}>
        <tbody>
          {compras.map((c:any) => (
            <tr key={c.id}>
              <td>{c.proveedor}</td>
              <td>{c.monto}</td>
              <td>{c.fecha.toISOString().slice(0,10)}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}