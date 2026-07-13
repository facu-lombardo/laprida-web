import { EstadoPedido, NuevoPedido } from "@/modules/pedidos/types/pedido";

/**
 * Estados posibles de un pedido
 */
export const ESTADOS_PEDIDO: EstadoPedido[] = [
  "PENDIENTE",
  "EN_PREPARACION",
  "LISTO",
  "ENTREGADO",
  "CANCELADO",
];

/**
 * Texto amigable para mostrar en pantalla
 */
export const ESTADO_LABELS: Record<EstadoPedido, string> = {
  PENDIENTE: "Pendiente",
  EN_PREPARACION: "En preparación",
  LISTO: "Listo",
  ENTREGADO: "Entregado",
  CANCELADO: "Cancelado",
};

/**
 * Clases de Tailwind para los badges
 * (las usaremos más adelante en EstadoBadge)
 */
export const ESTADO_COLORS: Record<EstadoPedido, string> = {
  PENDIENTE: "bg-yellow-500",
  EN_PREPARACION: "bg-blue-500",
  LISTO: "bg-green-600",
  ENTREGADO: "bg-gray-500",
  CANCELADO: "bg-red-600",
};

/**
 * Valores iniciales del formulario
 */
export const PEDIDO_DEFAULT_VALUES: NuevoPedido = {
  nombre: "",
  apellido: "",
  telefono: "",

  obra_social_id: 0,

  cantidad_recetas: 0,
  cantidad_productos: 0,

  total: 0,
  abonado: 0,

  observaciones: "",
};

/**
 * Cantidades máximas permitidas
 */
export const PEDIDO_LIMITES = {
  MAX_RECETAS: 99,
  MAX_PRODUCTOS: 999,
  MAX_OBSERVACIONES: 500,
} as const;