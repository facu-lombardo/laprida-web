"use client";

import { useQuery } from "@tanstack/react-query";

import { obraSocialService } from "@/modules/obras-sociales/services/obraSocialService";

import { queryKeys } from "@/lib/react-query";

export function useObrasSociales() {
  const query = useQuery({
    queryKey: queryKeys.obrasSociales,

    queryFn: () =>
      obraSocialService.obtenerObrasSociales(),
  });

  return {
    obrasSociales: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
  };
}