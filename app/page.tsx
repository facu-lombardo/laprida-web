import pool from "@/lib/db";

export default async function Page() {

  const result = await pool.query(
    "SELECT * FROM compras ORDER BY id"
  );

  const compras = result.rows;

  return (
    <div style={{ padding: 40 }}>

      <h1>Compras</h1>

      <table border={1} cellPadding={10} style={{ borderCollapse: "collapse" }}>
        
        <thead>
          <tr>
            <th>Proveedor</th>
            <th>Costo</th>
            <th>Fecha</th>
          </tr>
        </thead>

        <tbody>
          {compras.map((c: any) => (
            <tr key={c.id}>
              <td>{c.nom_prov}</td>
              <td>{c.costo}</td>
              <td>{new Date(c.fecha).toISOString().slice(0,10)}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}