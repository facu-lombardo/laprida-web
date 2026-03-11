"use client";

import { useEffect, useState } from "react";

export default function ComprasDashboard() {

  const [data,setData] = useState<any[]>([])
  const [busqueda,setBusqueda] = useState("")
  const [desde,setDesde] = useState("")
  const [hasta,setHasta] = useState("")

  useEffect(()=>{

    fetch("/api/compras")
    .then(res=>res.json())
    .then(data=>setData(data))

  },[])

  const datosFiltrados = data.filter((item:any)=>{

    const coincideProveedor =
      item.nom_prov?.toLowerCase().includes(busqueda.toLowerCase())

    const partes = item.fecha.split("/")
    const fecha = new Date(partes[2], partes[1]-1, partes[0])

    const coincideFecha =
      (!desde || fecha >= new Date(desde)) &&
      (!hasta || fecha <= new Date(hasta))

    return coincideProveedor && coincideFecha
  })

  return (

    <div style={{padding:"30px", fontFamily:"Arial"}}>

      <h1>Dashboard de Compras</h1>

      <div style={{marginBottom:"20px"}}>

        <input
          placeholder="Buscar proveedor..."
          value={busqueda}
          onChange={(e)=>setBusqueda(e.target.value)}
          style={{marginRight:"10px"}}
        />

        <label>Desde:</label>
        <input
          type="date"
          onChange={(e)=>setDesde(e.target.value)}
          style={{marginRight:"10px"}}
        />

        <label>Hasta:</label>
        <input
          type="date"
          onChange={(e)=>setHasta(e.target.value)}
        />

      </div>

      <table border={1} cellPadding={8} style={{borderCollapse:"collapse"}}>

        <thead style={{background:"#eee"}}>

          <tr>
            <th>ID</th>
            <th>Proveedor</th>
            <th>Fecha</th>
            <th>Costo</th>
          </tr>

        </thead>

        <tbody>

          {datosFiltrados.map((c:any)=>(
            <tr key={c.id_compra}>
              <td>{c.id_compra}</td>
              <td>{c.nom_prov}</td>
              <td>{c.fecha}</td>
              <td>${Number(c.costo).toLocaleString()}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}