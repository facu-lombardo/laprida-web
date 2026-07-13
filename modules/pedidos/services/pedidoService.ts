import { Pedido, NuevoPedido, EditarPedido } from "@/modules/pedidos/types/pedido";

/**
 * Servicio de Pedidos
 *
 * Por ahora devuelve datos de prueba.
 * Más adelante reemplazaremos la implementación
 * por consultas a Supabase sin modificar
 * ningún componente del frontend.
 */
class PedidoService {

  /**
   * Obtiene todos los pedidos
   */
  async obtenerPedidos(): Promise<Pedido[]> {
    return [
      {
        id: "1",
        numero_pedido: 1001,

        nombre: "Juan",
        apellido: "Pérez",
        telefono: "1122334455",

        obra_social_id: 1,
        obra_social: "PAMI",

        cantidad_recetas: 2,
        cantidad_productos: 4,

        total: 18000,
        abonado: 10000,

        observaciones: "Retira mañana",

        estado: "PENDIENTE",

        preparado_por: undefined,

        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "2",
        numero_pedido: 1002,

        nombre: "María",
        apellido: "Gómez",
        telefono: "1199988877",

        obra_social_id: 2,
        obra_social: "IOMA",

        cantidad_recetas: 1,
        cantidad_productos: 2,

        total: 9500,
        abonado: 9500,

        observaciones: "",

        estado: "LISTO",

        preparado_por: 1,

        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  }

  /**
   * Obtiene un pedido por ID
   */
  async obtenerPedidoPorId(id: string): Promise<Pedido | null> {
    const pedidos = await this.obtenerPedidos();

    return pedidos.find((p) => p.id === id) ?? null;
  }

  /**
   * Crear un pedido
   */
  async crearPedido(data: NuevoPedido): Promise<void> {
    console.log("Crear pedido:", data);

    // Próximamente:
    // await supabase.from("pedidos").insert(...)
  }

  /**
   * Editar un pedido
   */
  async editarPedido(
    id: string,
    data: EditarPedido
  ): Promise<void> {
    console.log("Editar pedido:", id, data);

    // Próximamente:
    // await supabase.from("pedidos").update(...)
  }

  /**
   * Eliminar un pedido
   */
  async eliminarPedido(id: string): Promise<void> {
    console.log("Eliminar pedido:", id);

    // Próximamente:
    // await supabase.from("pedidos").delete(...)
  }
}

export const pedidoService = new PedidoService();