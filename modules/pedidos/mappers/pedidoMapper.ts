import { ESTADOS_PEDIDO } from "../constants/pedido";
import { PedidoFormData } from "../types/pedidoFormData";
import { PedidoInsert } from "../types/pedidoInsert";

export class PedidoMapper {
  /**
   * Convierte los datos del formulario
   * al formato que necesita la base de datos.
   */
  static toInsert(data: PedidoFormData): PedidoInsert {
    const pendiente = Math.max(0, data.total - data.abonado);

    return {
      nombre: data.nombre.trim(),

      apellido: data.apellido.trim(),

      obra_social_id: data.obra_social_id,

      cantidad_recetas: data.cantidad_recetas,

      cantidad_productos: data.cantidad_productos,

      preparado_por: data.preparado_por,

      total: data.total,

      abonado: data.abonado,

      pendiente,

      estado: "PREPARADO",

      observaciones: data.observaciones?.trim() || null,
    };
  }
}