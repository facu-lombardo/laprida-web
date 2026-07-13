import { Pedido } from "@/modules/pedidos/types/pedido";
import EstadoBadge from "./EstadoBadge";

interface Props {
  pedido: Pedido;
}

export default function PedidoRow({ pedido }: Props) {
  return (
    <tr className="border-b hover:bg-muted/50">

      <td className="p-3">{pedido.numero_pedido}</td>

      <td>{pedido.nombre} {pedido.apellido}</td>

      <td>{pedido.obra_social}</td>

      <td>
        <EstadoBadge estado={pedido.estado} />
      </td>

      <td className="text-right">
        ${(pedido.total - pedido.abonado).toLocaleString()}
      </td>

    </tr>
  );
}