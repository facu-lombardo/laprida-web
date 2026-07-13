"use client";

import PedidoForm from "./PedidoForm";

export default function NuevoPedidoPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Nuevo Pedido
        </h1>

        <p className="text-muted-foreground">
          Complete los datos para registrar un nuevo pedido.
        </p>
      </div>

      <PedidoForm />

    </div>
  );
}