"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useObrasSociales } from "@/modules/obras-sociales/hooks/useObrasSociales";

interface Props {
  value: number;
  onChange: (id: number) => void;
}

export default function ObraSocialSelect({
  value,
  onChange,
}: Props) {

  const {
    obrasSociales,
    loading,
  } = useObrasSociales();

  return (
    <Select
      value={value ? String(value) : ""}
      onValueChange={(v) => onChange(Number(v))}
    >
      <SelectTrigger>

        <SelectValue
          placeholder={
            loading
              ? "Cargando..."
              : "Seleccione una obra social"
          }
        />

      </SelectTrigger>

      <SelectContent>

        {obrasSociales.map((obra) => (

          <SelectItem
            key={obra.id}
            value={String(obra.id)}
          >
            {obra.nombre}
          </SelectItem>

        ))}

      </SelectContent>

    </Select>
  );
}