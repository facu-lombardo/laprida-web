import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PedidoToolbar() {
  return (
    <div className="flex justify-between items-center mb-6 gap-4">

      <Input
        placeholder="Buscar por número o apellido..."
        className="max-w-sm"
      />

      < Link href="/pedidos/nuevo">
        <Button>
          Nuevo Pedido
        </Button>
      </Link>
    </div>
  );
}