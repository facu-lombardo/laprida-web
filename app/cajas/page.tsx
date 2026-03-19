"use client";

import { useState } from "react";

export default function CrearCaja() {

  const [fecha, setFecha] = useState("");
  const [turno, setTurno] = useState("");
  const [inicio, setInicio] = useState("");
  const [obs, setObs] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/cajas", {
      method: "POST",
      body: JSON.stringify({
        fecha,
        turno,
        inicio_caja: Number(inicio),
        observaciones: obs,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMensaje("✅ Caja creada correctamente");
    } else {
      setMensaje("❌ Error al crear caja");
    }
  }

  return (
    <div className="container mt-5">

      <h1>Crear Caja</h1>

      <form onSubmit={handleSubmit} className="mt-4">

        <div className="mb-3">
          <label>Fecha</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Turno</label>
          <select
            className="form-control"
            value={turno}
            onChange={(e) => setTurno(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="mañana">Mañana</option>
            <option value="tarde">Tarde</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Inicio de caja</label>
          <input
            type="number"
            className="form-control"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Observaciones</label>
          <textarea
            className="form-control"
            value={obs}
            onChange={(e) => setObs(e.target.value)}
          />
        </div>

        <button className="btn btn-primary">
          Crear Caja
        </button>

      </form>

      {mensaje && (
        <div className="alert alert-info mt-3">
          {mensaje}
        </div>
      )}

    </div>
  );
}