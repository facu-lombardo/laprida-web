"use client";

import { useState } from "react";

export default function NuevaCaja() {

  // ---------------- CAJA ----------------
  const [fecha, setFecha] = useState("");
  const [turno, setTurno] = useState("");
  const [inicioCaja, setInicioCaja] = useState("");

  // ---------------- TARJETAS ----------------
  const [tarjetas, setTarjetas] = useState<any[]>([]);
  const [posnet, setPosnet] = useState("");
  const [montoTarjeta, setMontoTarjeta] = useState("");

  // ---------------- TUBOS ----------------
  const [tubos, setTubos] = useState<any[]>([]);
  const [numero, setNumero] = useState("");
  const [color, setColor] = useState("");
  const [montoTubo, setMontoTubo] = useState("");

  // ---------------- EGRESOS ----------------
  const [egresos, setEgresos] = useState<any[]>([]);
  const [montoEgreso, setMontoEgreso] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // ---------------- MEDIOS DE PAGO ----------------
  const mediosPago = [
    "MA Farmacia Laprida",
    "Mercado Pago",
    "Farmacia Laprida",
    "Fiserv",
    "Cabal crédito",
    "Cabal débito",
    ];


// TOTAL TARJETAS
const totalTarjetas = tarjetas.reduce(
  (acc, t) => acc + t.monto,
  0
);

function formatearFecha(fecha: string) {
  if (!fecha) return "";
  const f = new Date(fecha);
  return f.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

  return (
    <div className="container mt-5">

      <h1>Nueva Caja</h1>

      {/* CAJA */}
      <div className="card p-3 mb-4">
        <h4>Datos de caja</h4>

        <input type="date" onChange={e => setFecha(e.target.value)} className="form-control mb-2" />

        <select onChange={e => setTurno(e.target.value)} className="form-control mb-2">
          <option value="">Turno</option>
          <option value="mañana">Mañana</option>
          <option value="tarde">Tarde</option>
        </select>

        <input
          type="number"
          placeholder="Inicio de caja"
          onChange={e => setInicioCaja(e.target.value)}
          className="form-control"
        />
      </div>
      {/* ================= TARJETAS ================= */}
<div className="card p-3 mb-4">
  <h4>Tarjetas</h4>

  {/* SELECT MEDIO */}
  <select
    value={posnet}
    onChange={(e) => setPosnet(e.target.value)}
    className="form-control mb-2"
  >
    <option value="">Seleccionar medio</option>
    {mediosPago.map((m, i) => (
      <option key={i} value={m}>
        {m}
      </option>
    ))}
  </select>

  {/* MONTO */}
  <input
    type="number"
    placeholder="Monto"
    value={montoTarjeta}
    onChange={(e) => setMontoTarjeta(e.target.value)}
    className="form-control mb-2"
  />

  {/* BOTÓN AGREGAR */}
  <button
    className="btn btn-primary mb-3"
    onClick={() => {

      if (!posnet || !montoTarjeta) return;

      const existe = tarjetas.find(t => t.medio === posnet);

      if (existe) {
        // SUMA si ya existe
        setTarjetas(
          tarjetas.map(t =>
            t.medio === posnet
              ? { ...t, monto: t.monto + Number(montoTarjeta) }
              : t
          )
        );
      } else {
        // CREA nuevo
        setTarjetas([
          ...tarjetas,
          { medio: posnet, monto: Number(montoTarjeta) }
        ]);
      }

      setPosnet("");
      setMontoTarjeta("");
    }}
  >
    Agregar tarjeta
  </button>

  {/* LISTADO */}
  <ul className="list-group">
    {tarjetas.map((t, i) => (
        <li
        key={i}
        className="list-group-item d-flex justify-content-between align-items-center"
        >
        <span>{t.medio}</span>

        <div style={{ minWidth: "150px", textAlign: "right" }}>
            <b>${t.monto.toLocaleString()}</b>
        </div>

        <button
            className="btn btn-sm btn-danger ms-3"
            onClick={() =>
            setTarjetas(tarjetas.filter((_, idx) => idx !== i))
            }
        >
            X
        </button>
        </li>
      
    ))}
  </ul>

  {/* TOTAL */}
  <div className="alert alert-success mt-3">
    Total tarjetas: <b>${totalTarjetas.toLocaleString()}</b>
  </div>
</div>
      

    </div>
  );
}