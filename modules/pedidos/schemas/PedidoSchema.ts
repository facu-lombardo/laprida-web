import { z } from "zod";

export const pedidoSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Ingrese el nombre."),

  apellido: z
    .string()
    .trim()
    .min(2, "Ingrese el apellido."),

  telefono: z.string().optional(),

  obra_social_id: z
    .number({
      error: "Seleccione una obra social.",
    })
    .min(1, "Seleccione una obra social."),

  cantidad_recetas: z
    .number({
      error: "Ingrese la cantidad de recetas.",
    })
    .min(0),

  cantidad_productos: z
    .number({
      error: "Ingrese la cantidad de productos.",
    })
    .min(1),

  total: z
    .number({
      error: "Ingrese el total.",
    })
    .min(0),

  abonado: z
    .number({
      error: "Ingrese el monto abonado.",
    })
    .min(0),

  observaciones: z
    .string()
    .max(500)
    .optional(),
});

export type PedidoFormData = z.infer<typeof pedidoSchema>;