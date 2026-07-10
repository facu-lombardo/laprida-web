"use client";

import { AppSidebar } from "./AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>

        <header className="flex h-16 items-center border-b px-6">

          <SidebarTrigger />

          <h1 className="ml-4 text-xl font-semibold">
            Farmacia Laprida
          </h1>

        </header>

        <main className="p-6">
          {children}
        </main>

      </SidebarInset>

    </SidebarProvider>
  );
}