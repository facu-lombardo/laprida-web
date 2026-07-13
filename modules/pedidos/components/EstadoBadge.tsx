import { Badge } from "@/components/ui/badge";
import { EstadoPedido } from "@/modules/pedidos/types/pedido";

interface Props {
  estado: EstadoPedido;
}

export default function EstadoBadge({ estado }: Props) {
  switch (estado) {
    case "PENDIENTE":
      return <Badge variant="secondary">Pendiente</Badge>;

    case "EN_PREPARACION":
      return <Badge>En preparación</Badge>;

    case "LISTO":
      return <Badge className="bg-green-600">Listo</Badge>;

    case "ENTREGADO":
      return <Badge variant="outline">Entregado</Badge>;

    case "CANCELADO":
      return <Badge variant="destructive">Cancelado</Badge>;

    default:
      return <Badge>{estado}</Badge>;
  }
}