"use client";
import { useEffect, useState } from "react";

export default function Compras() {

  const [datos,setDatos] = useState([]);

  useEffect(()=>{

    fetch("/api/compras")
    .then(res => res.json())
    .then(data => setDatos(data));

  },[]);

  return (

    <div>

      <h1>Compras</h1>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Proveedor</th>
            <th>Fecha</th>
            <th>Costo</th>
          </tr>
        </thead>

        <tbody>
          {datos.map((c:any)=>(
            <tr key={c.id_compra}>
              <td>{c.id_compra}</td>
              <td>{c.nom_prov}</td>
              <td>{c.fecha}</td>
              <td>{c.costo}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>

  );
}