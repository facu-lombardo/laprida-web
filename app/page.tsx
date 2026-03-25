import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    semana?: string;
  }>;
}) {
  const params = await searchParams;
  const semana = params.semana || "";

  let proveedores: any[] = [];
  let resumen: any = null;
  let semanas: any[] = [];

  // -------------------------------
  // TRAER SEMANAS DISPONIBLES (PRO)
  // -------------------------------
  const semanasResult = await pool.query(`
    SELECT DISTINCT semana 
    FROM vista_con_semana
    WHERE semana IS NOT NULL
    ORDER BY semana
  `);

  semanas = semanasResult.rows;

  // -------------------------------
  // SI HAY SEMANA → TRAER DATOS
  // -------------------------------
  if (semana) {

    // 🔹 RESUMEN GENERAL
    const resumenQuery = `
      SELECT 
        SUM(costo) as total_costo,
        SUM(publico) as total_publico,
        SUM(uni_fact) as total_unidades
      FROM vista_con_semana
      WHERE semana = $1
    `;

    const resumenResult = await pool.query(resumenQuery, [semana]);
    resumen = resumenResult.rows[0];

    // 🔹 AGRUPADO POR PROVEEDOR
    const provQuery = `
      SELECT 
        nom_prov,
        SUM(costo) as total_costo,
        SUM(publico) as total_publico,
        SUM(uni_fact) as total_unidades
      FROM vista_con_semana
      WHERE semana = $1
      GROUP BY nom_prov
      ORDER BY total_costo DESC
    `;

    const result = await pool.query(provQuery, [semana]);
    proveedores = result.rows;
  }

  const ratio = resumen?.total_publico
    ? resumen.total_costo / resumen.total_publico
    : 0;

  return (
    <div className="container mt-5">

      <h1 className="mb-4">Compras por Semana</h1>

      {/* ---------------- FILTRO SEMANA PRO ---------------- */}
      <form className="row g-3 mb-4">

        <div className="col-md-4">
          <select
            name="semana"
            defaultValue={semana}
            className="form-control"
          >
            <option value="">Seleccionar semana</option>
            {semanas.map((s: any) => (
              <option key={s.semana} value={s.semana}>
                Semana {s.semana}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <button className="btn btn-primary w-100">
            Filtrar
          </button>
        </div>

      </form>

      {/* ---------------- RESUMEN ---------------- */}
      {resumen && (
        <div className="row mb-4">

          <div className="col-md-3">
            <div className="alert alert-primary">
              <b>Total costo</b><br />
              ${Number(resumen.total_costo || 0).toLocaleString()}
            </div>
          </div>

          <div className="col-md-3">
            <div className="alert alert-success">
              <b>Total público</b><br />
              ${Number(resumen.total_publico || 0).toLocaleString()}
            </div>
          </div>

          <div className="col-md-3">
            <div className="alert alert-warning">
              <b>Costo / Público</b><br />
              {(ratio * 100).toFixed(2)}%
            </div>
          </div>

          <div className="col-md-3">
            <div className="alert alert-info">
              <b>Unidades</b><br />
              {Number(resumen.total_unidades || 0).toLocaleString()}
            </div>
          </div>

        </div>
      )}

      {/* ---------------- TABLA PROVEEDORES ---------------- */}
      {proveedores.length > 0 && (
        <table className="table table-bordered">

          <thead className="table-dark">
            <tr>
              <th>Proveedor</th>
              <th>Total costo</th>
              <th>Total público</th>
              <th>Unidades</th>
            </tr>
          </thead>

          <tbody>
            {proveedores.map((p: any) => (
              <tr key={p.nom_prov}>
                <td>{p.nom_prov}</td>
                <td>${Number(p.total_costo).toLocaleString()}</td>
                <td>${Number(p.total_publico).toLocaleString()}</td>
                <td>{Number(p.total_unidades)}</td>
              </tr>
            ))}
          </tbody>

        </table>
      )}

    </div>
  );
}