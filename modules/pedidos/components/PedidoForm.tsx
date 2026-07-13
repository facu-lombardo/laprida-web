"use client";

import { usePedidoForm } from "@/modules/pedidos/hooks/usePedidoForm";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function PedidoForm() {
  const { form, pendiente, guardarPedido } = usePedidoForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(guardarPedido)}
      className="space-y-6"
    >
      {/* ====================== CLIENTE ====================== */}

      <Card>
        <CardHeader>
          <CardTitle>Datos del Cliente</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Nombre *</Label>

            <Input
              {...register("nombre")}
              placeholder="Juan"
            />

            {errors.nombre && (
              <p className="text-sm text-red-500 mt-1">
                {errors.nombre.message}
              </p>
            )}
          </div>

          <div>
            <Label>Apellido *</Label>

            <Input
              {...register("apellido")}
              placeholder="Pérez"
            />

            {errors.apellido && (
              <p className="text-sm text-red-500 mt-1">
                {errors.apellido.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label>Teléfono</Label>

            <Input
              {...register("telefono")}
              placeholder="11 1234-5678"
            />
          </div>
        </CardContent>
      </Card>

      {/* ====================== PEDIDO ====================== */}

      <Card>
        <CardHeader>
          <CardTitle>Datos del Pedido</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-3">
          <div>
            <Label>Obra Social</Label>

            <Input
              type="number"
              {...register("obra_social_id", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div>
            <Label>Cantidad de recetas</Label>

            <Input
              type="number"
              {...register("cantidad_recetas", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div>
            <Label>Cantidad de productos</Label>

            <Input
              type="number"
              {...register("cantidad_productos", {
                valueAsNumber: true,
              })}
            />
          </div>
        </CardContent>
      </Card>

      {/* ====================== PAGO ====================== */}

      <Card>
        <CardHeader>
          <CardTitle>Pago</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Total</Label>

            <Input
              type="number"
              step="0.01"
              {...register("total", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div>
            <Label>Abonado</Label>

            <Input
              type="number"
              step="0.01"
              {...register("abonado", {
                valueAsNumber: true,
              })}
            />
          </div>

          <Separator className="md:col-span-2" />

          <div className="md:col-span-2">
            <p className="text-lg font-semibold">
              Pendiente: ${pendiente.toLocaleString("es-AR")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ====================== OBSERVACIONES ====================== */}

      <Card>
        <CardHeader>
          <CardTitle>Observaciones</CardTitle>
        </CardHeader>

        <CardContent>
          <Textarea
            rows={5}
            {...register("observaciones")}
            placeholder="Ejemplo: conservar en heladera..."
          />
        </CardContent>
      </Card>

      {/* ====================== BOTONES ====================== */}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
        >
          Cancelar
        </Button>

        <Button type="submit">
          Guardar Pedido
        </Button>
      </div>
    </form>
  );
}