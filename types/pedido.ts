export type EstadoPedido =
  | "PENDIENTE"
  | "EN_PREPARACION"
  | "LISTO"
  | "ENTREGADO"
  | "CANCELADO";

export interface Pedido {
  id: string;
  numero_pedido: number;

  cliente: string;

  obra_social: string;

  cantidad_recetas: number;

  cantidad_productos: number;

  total: number;

  abonado: number;

  estado: EstadoPedido;

  fecha_creacion: string;
}