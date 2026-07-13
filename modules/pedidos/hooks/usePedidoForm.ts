import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pedidoSchema } from "@/modules/pedidos/schemas/PedidoSchema";

import { NuevoPedido } from "@/modules/pedidos/types/pedido";
import { PEDIDO_DEFAULT_VALUES } from "@/modules/pedidos/constants/pedido";
import { pedidoService } from "@/modules/pedidos/services/pedidoService";

export function usePedidoForm() {
const form = useForm({
  resolver: zodResolver(pedidoSchema),
  defaultValues: PEDIDO_DEFAULT_VALUES,
  mode: "onChange",
});

  const total = Number(form.watch("total")) || 0;
  const abonado = Number(form.watch("abonado")) || 0;

  const pendiente = useMemo(() => {
    return Math.max(total - abonado, 0);
  }, [total, abonado]);

  async function guardarPedido(data: NuevoPedido) {
    await pedidoService.crearPedido(data);

    console.log("Pedido guardado correctamente");
  }

  return {
    form,
    pendiente,
    guardarPedido,
  };
}