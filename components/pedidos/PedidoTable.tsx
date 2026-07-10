import { Pedido } from "@/types/pedido";
import PedidoRow from "./PedidoRow";

const pedidos: Pedido[] = [
  {
    id: "1",
    numero_pedido: 1052,
    cliente: "Juan Pérez",
    obra_social: "PAMI",
    cantidad_recetas: 2,
    cantidad_productos: 4,
    total: 15000,
    abonado: 15000,
    estado: "LISTO",
    fecha_creacion: "",
  },
  {
    id: "2",
    numero_pedido: 1053,
    cliente: "Ana Gómez",
    obra_social: "IOMA",
    cantidad_recetas: 1,
    cantidad_productos: 3,
    total: 18000,
    abonado: 10000,
    estado: "PENDIENTE",
    fecha_creacion: "",
  },
];

export default function PedidoTable() {
  return (
    <table className="w-full">

      <thead>

        <tr className="border-b">

          <th className="text-left p-3">N°</th>

          <th className="text-left">Cliente</th>

          <th className="text-left">Obra Social</th>

          <th className="text-left">Estado</th>

          <th className="text-right">Saldo</th>

        </tr>

      </thead>

      <tbody>

        {pedidos.map((pedido) => (
          <PedidoRow
            key={pedido.id}
            pedido={pedido}
          />
        ))}

      </tbody>

    </table>
  );
}