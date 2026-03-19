"use client";

import { useEffect, useState } from "react";

export default function CajaActual() {

  const [caja, setCaja] = useState<any>(null);

  useEffect(() => {
    fetch("/api/cajas")
      .then(res => res.json())
      .then(data => setCaja(data));
  }, []);

  if (!caja) return <p>Cargando...</p>;

  return (
    <div className="container mt-5">

      <h1>Caja actual</h1>

      <div className="alert alert-info">
        Fecha: {caja.fecha} <br />
        Turno: {caja.turno} <br />
        Inicio: ${caja.inicio_caja}
      </div>

    </div>
  );
}