import { supabase, TABLES } from "@/lib/supabase";
import { Pedido } from "../types/pedido";

class PedidoApi {
  async obtenerPedidos(): Promise<Pedido[]> {
    const { data, error } = await supabase
      .from(TABLES.PEDIDOS)
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    return data ?? [];
  }

  async crearPedido(
    pedido: Omit<Pedido, "id" | "created_at">
  ): Promise<Pedido> {
    const { data, error } = await supabase
      .from(TABLES.PEDIDOS)
      .insert(pedido)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async actualizarPedido(
    id: number,
    pedido: Partial<Pedido>
  ): Promise<Pedido> {
    const { data, error } = await supabase
      .from(TABLES.PEDIDOS)
      .update(pedido)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async eliminarPedido(id: number): Promise<void> {
    const { error } = await supabase
      .from(TABLES.PEDIDOS)
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}

export const pedidoApi = new PedidoApi();