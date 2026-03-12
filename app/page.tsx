async function getCompras() {

  const res = await fetch("http://localhost:3000/api/compras", {
    cache: "no-store"
  });

  return res.json();
}

export default async function Page() {

  const compras = await getCompras();

  return (
    <div style={{ padding: 40 }}>

      <h1>Compras</h1>

      <table border={1} cellPadding={10}>

        <thead>
          <tr>
            <th>ID</th>
            <th>Proveedor</th>
            <th>Monto</th>
            <th>Fecha</th>
          </tr>
        </thead>

        
        <tbody>
          console.log(compras)
          {Array.isArray(compras) &&
            compras.map((c:any) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.proveedor}</td>
                <td>{c.monto}</td>
                <td>{c.fecha}</td>
              </tr>
            ))}
        </tbody>
        

      </table>

    </div>
  );
}