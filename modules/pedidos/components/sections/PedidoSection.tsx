"use client";

import { UseFormReturn } from "react-hook-form";

import { PedidoFormData } from "@/modules/pedidos/schemas/PedidoSchema";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import NumberStepper from "@/components/common/NumberStepper";
import ObraSocialSelect from "@/modules/obras-sociales/components/ObraSocialSelect";

interface Props {
  form: UseFormReturn<PedidoFormData>;
}

export default function PedidoSection({ form }: Props) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const obraSocial = watch("obra_social_id");
  const recetas = watch("cantidad_recetas");
  const productos = watch("cantidad_productos");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos del Pedido</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-6 md:grid-cols-3">
        {/* ================= OBRA SOCIAL ================= */}

        <div className="space-y-2">
          <Label>Obra Social</Label>

          <ObraSocialSelect
            value={obraSocial}
            onChange={(id) =>
              setValue("obra_social_id", id, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          />

          {errors.obra_social_id && (
            <p className="text-sm text-red-500">
              {errors.obra_social_id.message}
            </p>
          )}
        </div>

        {/* ================= RECETAS ================= */}

        <div className="space-y-2">
          <Label>Cantidad de recetas</Label>

          <NumberStepper
            value={recetas}
            onChange={(value) =>
              setValue("cantidad_recetas", value, {
                shouldDirty: true,
              })
            }
          />

          {errors.cantidad_recetas && (
            <p className="text-sm text-red-500">
              {errors.cantidad_recetas.message}
            </p>
          )}
        </div>

        {/* ================= PRODUCTOS ================= */}

        <div className="space-y-2">
          <Label>Cantidad de productos</Label>

          <NumberStepper
            value={productos}
            onChange={(value) =>
              setValue("cantidad_productos", value, {
                shouldDirty: true,
              })
            }
          />

          {errors.cantidad_productos && (
            <p className="text-sm text-red-500">
              {errors.cantidad_productos.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}