"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Pedidos",
    href: "/pedidos",
    icon: Package,
  },
  {
    title: "Clientes",
    href: "/clientes",
    icon: Users,
  },
  {
    title: "Configuración",
    href: "/configuracion",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="p-2">
          <h2 className="text-lg font-bold">
            Farmacia Laprida
          </h2>

          <p className="text-sm text-muted-foreground">
            Sistema de Pedidos
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                render={<Link href={item.href} />}
                >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>

            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}