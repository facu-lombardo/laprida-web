// Estado posible de un pedido
export type EstadoPedido =
  | "PENDIENTE"
  | "EN_PREPARACION"
  | "LISTO"
  | "ENTREGADO"
  | "CANCELADO";

// Pedido tal como viene de la base de datos
export interface Pedido {
  id: string;
  numero_pedido: number;

  nombre: string;
  apellido: string;
  telefono?: string;

  obra_social_id: number;
  obra_social: string;

  cantidad_recetas: number;
  cantidad_productos: number;

  total: number;
  abonado: number;

  observaciones?: string;

  estado: EstadoPedido;

  preparado_por?: number;

  created_at: string;
  updated_at: string;
}

// Datos necesarios para crear un pedido nuevo
export interface NuevoPedido {
  nombre: string;
  apellido: string;
  telefono?: string;

  obra_social_id: number;

  cantidad_recetas: number;
  cantidad_productos: number;

  total: number;
  abonado: number;

  observaciones?: string;
}

// Datos permitidos para editar un pedido
export interface EditarPedido {
  obra_social_id?: number;

  cantidad_recetas?: number;
  cantidad_productos?: number;

  total?: number;
  abonado?: number;

  observaciones?: string;

  estado?: EstadoPedido;

  preparado_por?: number;
}