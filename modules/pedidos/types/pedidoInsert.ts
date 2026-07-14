export interface PedidoInsert {
  nombre: string;
  apellido: string;

  obra_social_id: number;

  cantidad_recetas: number;
  cantidad_productos: number;

  preparado_por: number;

  total: number;
  abonado: number;
  pendiente: number;

  estado: "PREPARADO" | "ENTREGADO";

  observaciones?: string | null;
}