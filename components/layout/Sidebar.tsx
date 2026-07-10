import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-green-700 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        Farmacia Laprida
      </h1>

      <nav className="flex flex-col gap-3">

        <Link
          href="/"
          className="rounded-md px-4 py-2 hover:bg-green-600 transition"
        >
          Dashboard
        </Link>

        <Link
          href="/pedidos"
          className="rounded-md px-4 py-2 hover:bg-green-600 transition"
        >
          Pedidos
        </Link>

        <Link
          href="/clientes"
          className="rounded-md px-4 py-2 hover:bg-green-600 transition"
        >
          Clientes
        </Link>

        <Link
          href="/configuracion"
          className="rounded-md px-4 py-2 hover:bg-green-600 transition"
        >
          Configuración
        </Link>

      </nav>
    </aside>
  );
}