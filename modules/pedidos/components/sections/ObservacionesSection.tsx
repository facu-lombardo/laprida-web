"use client";

import { UseFormReturn } from "react-hook-form";

import { PedidoFormData } from "@/modules/pedidos/schemas/PedidoSchema";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  form: UseFormReturn<PedidoFormData>;
}

export default function ObservacionesSection({ form }: Props) {

  const { register } = form;

  return (
    <Card>

      <CardHeader>

        <CardTitle>

          Observaciones

        </CardTitle>

      </CardHeader>

      <CardContent>

        <Textarea
          rows={5}
          {...register("observaciones")}
        />

      </CardContent>

    </Card>
  );
}