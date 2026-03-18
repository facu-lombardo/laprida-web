import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    proveedor?: string;
    fecha?: string;
    desde?: string;
    hasta?: string;
    semana?: string;
  }>;
}) {
  const params = await searchParams; // 👈 CLAVE

  const proveedor = params.proveedor || "";
  const fecha = params.fecha || "";
  const desde = params.desde || "";
  const hasta = params.hasta || "";
  const semana = params.semana || "";
  // -------------------------------
  // LISTADO NORMAL
  // -------------------------------
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

  const totalListado = compras.reduce(
    (acc: number, c: any) => acc + Number(c.costo),
    0
  );

  // -------------------------------
  // RESUMEN SEMANAL
  // -------------------------------
  let resumen = null;
  let proveedores: any[] = [];

  if (desde && hasta) {
    // Totales
    const totalQuery = `
      SELECT 
        SUM(costo) as total_costo,
        SUM(uni_fact) as total_unidades
      FROM compras
      WHERE fecha BETWEEN $1 AND $2
    `;

    const totalResult = await pool.query(totalQuery, [desde, hasta]);
    resumen = totalResult.rows[0];

    // Agrupado por proveedor
    const provQuery = `
      SELECT 
        nom_prov,
        SUM(costo) as total_costo,
        SUM(uni_fact) as total_unidades
      FROM compras
      WHERE fecha BETWEEN $1 AND $2
      GROUP BY nom_prov
      ORDER BY total_costo DESC
    `;

    const provResult = await pool.query(provQuery, [desde, hasta]);
    proveedores = provResult.rows;
  }

  return (
    <div className="container mt-5">

      <h1 className="mb-4">Compras</h1>

      {/* ---------------- FILTROS NORMALES ---------------- */}
      <form className="row g-3 mb-3">

        <div className="col-md-3">
          <input
            type="text"
            name="proveedor"
            defaultValue={proveedor}
            placeholder="Proveedor"
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <input
            type="date"
            name="fecha"
            defaultValue={fecha}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <button className="btn btn-primary w-100">
            Filtrar listado
          </button>
        </div>

      </form>

      {/* ---------------- FILTRO SEMANA ---------------- */}
      <form className="row g-3 mb-4">

        <div className="col-md-3">
          <input
            type="date"
            name="desde"
            defaultValue={desde}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <input
            type="date"
            name="hasta"
            defaultValue={hasta}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <button className="btn btn-success w-100">
            Ver resumen semanal
          </button>
        </div>

      </form>

      {/* ---------------- RESUMEN ---------------- */}
      {resumen && (
        <div className="alert alert-info">
          <b>Resumen de la semana</b><br />
          Total costo: ${Number(resumen.total_costo || 0).toLocaleString()} <br />
          Total unidades: {Number(resumen.total_unidades || 0).toLocaleString()}
        </div>
      )}

      {/* ---------------- PROVEEDORES ---------------- */}
      {proveedores.length > 0 && (
        <table className="table table-bordered mb-5">
          <thead className="table-dark">
            <tr>
              <th>Proveedor</th>
              <th>Total costo</th>
              <th>Unidades</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((p: any) => (
              <tr key={p.nom_prov}>
                <td>{p.nom_prov}</td>
                <td>${Number(p.total_costo).toLocaleString()}</td>
                <td>{Number(p.total_unidades)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------------- TOTAL LISTADO ---------------- */}
      <div className="alert alert-success">
        Total listado: <b>${totalListado.toLocaleString()}</b>
      </div>

      {/* ---------------- TABLA ORIGINAL ---------------- */}
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