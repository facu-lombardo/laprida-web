import { pedidoApi } from "../api/pedidoApi";
import { Pedido } from "../types/pedido";

class PedidoService {
  async obtenerPedidos() {
    return pedidoApi.obtenerPedidos();
  }

  async crearPedido(
    pedido: Omit<Pedido, "id" | "created_at">
  ) {
    return pedidoApi.crearPedido(pedido);
  }

  async actualizarPedido(
    id: number,
    pedido: Partial<Pedido>
  ) {
    return pedidoApi.actualizarPedido(id, pedido);
  }

  async eliminarPedido(id: number) {
    return pedidoApi.eliminarPedido(id);
  }
}

export const pedidoService = new PedidoService();