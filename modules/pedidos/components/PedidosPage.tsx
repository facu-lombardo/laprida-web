import PedidoToolbar from "./PedidoToolbar";
import PedidoTable from "./PedidoTable";

export default function PedidosPage() {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Pedidos
        </h1>

        <p className="text-muted-foreground">
          Gestión de pedidos de la farmacia.
        </p>

      </div>

      <PedidoToolbar />

      <PedidoTable />

    </div>
  );
}