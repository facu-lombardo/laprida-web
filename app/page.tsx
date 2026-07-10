import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Bienvenido al sistema de pedidos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <Card>
          <CardHeader>
            <CardTitle>Pedidos Pendientes</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos Listos</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entregados Hoy</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">18</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total del Día</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold">$325.000</p>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}