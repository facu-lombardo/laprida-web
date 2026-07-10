export default function NuevoPedidoPage() {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Nuevo Pedido
        </h1>

        <p className="text-muted-foreground">
          Complete los datos del pedido.
        </p>

      </div>

      <PedidoForm />

    </div>
  );
}