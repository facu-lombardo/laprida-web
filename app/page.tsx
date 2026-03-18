import pool from "@/lib/db";


export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: { proveedor?: string; fecha?: string };
}) {


  const proveedor = searchParams.proveedor || "";
  const fecha = searchParams.fecha || "";

  let query = "SELECT * FROM compras WHERE 1=1";
  const values: any[] = [];

  if (proveedor) {
    values.push(`%${proveedor}%`);
    query += ` AND nom_prov ILIKE $${values.length}`;
  }

  if (fecha) {
    values.push(fecha);
    query += ` AND fecha = $${values.length}`;
  }

  query += " ORDER BY fecha DESC";

  const result = await pool.query(query, values);
  const compras = result.rows;

  const total = compras.reduce((acc: number, c: any) => acc + Number(c.costo), 0);

  return (
    <div className="container mt-5">

      <h1 className="mb-4">Compras</h1>

      {/* FILTROS */}
      <form className="row g-3 mb-4">

        <div className="col-md-4">
          <input
            type="text"
            name="proveedor"
            defaultValue={proveedor}
            placeholder="Proveedor"
            className="form-control"
          />
        </div>

        <div className="col-md-4">
          <input
            type="date"
            name="fecha"
            defaultValue={fecha}
            className="form-control"
          />
        </div>

        <div className="col-md-4">
          <button className="btn btn-primary">Filtrar</button>
        </div>

      </form>

      {/* TOTAL */}
      <div className="alert alert-success">
        Total compras mostradas: <b>${total.toLocaleString()}</b>
      </div>

      {/* TABLA */}
      <table className="table table-striped table-hover">

        <thead className="table-dark">
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
              <td>${Number(c.costo).toLocaleString()}</td>
              <td>{new Date(c.fecha).toLocaleDateString("es-AR")}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}