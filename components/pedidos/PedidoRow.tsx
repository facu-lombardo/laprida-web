import { Pedido } from "@/types/pedido";
import EstadoBadge from "./EstadoBadge";

interface Props {
  pedido: Pedido;
}

export default function PedidoRow({ pedido }: Props) {
  return (
    <tr className="border-b hover:bg-muted/50">

      <td className="p-3">{pedido.numero_pedido}</td>

      <td>{pedido.cliente}</td>

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