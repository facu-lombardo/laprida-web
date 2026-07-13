"use client";

import { UseFormReturn } from "react-hook-form";

import { PedidoFormData } from "@/modules/pedidos/schemas/PedidoSchema";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  form: UseFormReturn<PedidoFormData>;
}

export default function ClienteSection({ form }: Props) {

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Datos del Cliente
        </CardTitle>

      </CardHeader>

      <CardContent className="grid md:grid-cols-2 gap-4">

        <div>

          <Label>Nombre</Label>

          <Input
            {...register("nombre")}
          />

          <p className="text-red-500 text-sm">
            {errors.nombre?.message}
          </p>

        </div>

        <div>

          <Label>Apellido</Label>

          <Input
            {...register("apellido")}
          />

          <p className="text-red-500 text-sm">
            {errors.apellido?.message}
          </p>

        </div>

        <div className="md:col-span-2">

          <Label>Teléfono</Label>

          <Input
            {...register("telefono")}
          />

        </div>

      </CardContent>

    </Card>
  );
}