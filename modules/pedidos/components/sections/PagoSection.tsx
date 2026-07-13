"use client";

import { UseFormReturn } from "react-hook-form";

import { PedidoFormData } from "@/modules/pedidos/schemas/PedidoSchema";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface Props {
  form: UseFormReturn<PedidoFormData>;
  pendiente: number;
}

export default function PagoSection({ form, pendiente }: Props) {

  const { register } = form;

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Pago
        </CardTitle>

      </CardHeader>

      <CardContent className="grid md:grid-cols-2 gap-4">

        <div>

          <Label>Total</Label>

          <Input
            type="number"
            step="0.01"
            {...register("total", { valueAsNumber: true })}
          />

        </div>

        <div>

          <Label>Abonado</Label>

          <Input
            type="number"
            step="0.01"
            {...register("abonado", { valueAsNumber: true })}
          />

        </div>

        <Separator className="md:col-span-2"/>

        <div className="md:col-span-2">

          <h3 className="text-lg font-bold">

            Pendiente: ${pendiente.toLocaleString("es-AR")}

          </h3>

        </div>

      </CardContent>

    </Card>
  );
}