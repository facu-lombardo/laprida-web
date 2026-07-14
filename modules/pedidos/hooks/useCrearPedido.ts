"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { pedidoService } from "../services/pedidoService";
import { queryKeys } from "@/lib/react-query";

export function useCrearPedido() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pedidoService.crearPedido,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.pedidos,
      });
    },
  });
}