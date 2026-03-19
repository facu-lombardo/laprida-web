"use client";

import { useEffect, useState } from "react";

export default function CajaActual() {

  const [caja, setCaja] = useState<any>(null);

  // TARJETAS
  const [posnet, setPosnet] = useState("");
  const [montoTarjeta, setMontoTarjeta] = useState("");

  // TUBOS
  const [numero, setNumero] = useState("");
  const [color, setColor] = useState("");
  const [montoTubo, setMontoTubo] = useState("");

  // EGRESOS
  const [montoEgreso, setMontoEgreso] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // CARGAR CAJA
  useEffect(() => {
    fetch("/api/cajas")
      .then(res => res.json())
      .then(data => setCaja(data));
  }, []);

  if (!caja) return <p className="container mt-5">Cargando...</p>;

  return (
    <div className="container mt-5">

      <h1>Caja actual</h1>

      {/* INFO CAJA */}
      <div className="alert alert-info">
        <b>Fecha:</b> {caja.fecha} <br />
        <b>Turno:</b> {caja.turno} <br />
        <b>Inicio:</b> ${Number(caja.inicio_caja).toLocaleString()}
      </div>

      {/* ================= TARJETAS ================= */}
      <h3>Tarjetas</h3>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          await fetch("/api/tarjetas", {
            method: "POST",
            body: JSON.stringify({
              caja_id: caja.id,
              posnet,
              monto: Number(montoTarjeta),
            }),
          });

          location.reload();
        }}
      >
        <input
          placeholder="POSNET"
          value={posnet}
          onChange={(e) => setPosnet(e.target.value)}
          className="form-control mb-2"
          required
        />

        <input
          type="number"
          placeholder="Monto"
          value={montoTarjeta}
          onChange={(e) => setMontoTarjeta(e.target.value)}
          className="form-control mb-2"
          required
        />

        <button className="btn btn-primary">Agregar tarjeta</button>
      </form>

      {/* ================= TUBOS ================= */}
      <h3 className="mt-5">Tubos (Efectivo)</h3>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          await fetch("/api/tubos", {
            method: "POST",
            body: JSON.stringify({
              caja_id: caja.id,
              numero: Number(numero),
              color,
              monto: Number(montoTubo),
            }),
          });

          location.reload();
        }}
      >
        <input
          type="number"
          placeholder="Número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className="form-control mb-2"
          required
        />

        <input
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="form-control mb-2"
          required
        />

        <input
          type="number"
          placeholder="Monto"
          value={montoTubo}
          onChange={(e) => setMontoTubo(e.target.value)}
          className="form-control mb-2"
          required
        />

        <button className="btn btn-success">Agregar tubo</button>
      </form>

      {/* ================= EGRESOS ================= */}
      <h3 className="mt-5">Egresos</h3>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          await fetch("/api/egresos", {
            method: "POST",
            body: JSON.stringify({
              caja_id: caja.id,
              monto: Number(montoEgreso),
              descripcion,
            }),
          });

          location.reload();
        }}
      >
        <input
          type="number"
          placeholder="Monto"
          value={montoEgreso}
          onChange={(e) => setMontoEgreso(e.target.value)}
          className="form-control mb-2"
          required
        />

        <input
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="form-control mb-2"
          required
        />

        <button className="btn btn-danger">Agregar egreso</button>
      </form>

    </div>
  );
}