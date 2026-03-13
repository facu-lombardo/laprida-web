"use client"

import { useEffect, useState } from "react"

export default function ComprasPage() {

 const [compras, setCompras] = useState([])

 useEffect(() => {

  fetch("/api/compras")
   .then(res => res.json())
   .then(data => setCompras(data))

 }, [])

 return (

  <div style={{padding:20}}>

   <h1>Compras</h1>

   <table border={1} cellPadding={5}>

    <thead>
     <tr>
      <th>ID</th>
      <th>Proveedor</th>
      <th>Numero</th>
      <th>Fecha</th>
      <th>Costo</th>
      <th>Publico</th>
     </tr>
    </thead>

    <tbody>

     {compras.map((c:any) => (

      <tr key={c.id_compra}>
       <td>{c.id_compra}</td>
       <td>{c.nom_prov}</td>
       <td>{c.numero}</td>
       <td>{c.fecha}</td>
       <td>{c.costo}</td>
       <td>{c.publico}</td>
      </tr>

     ))}

    </tbody>

   </table>

  </div>
 )
}