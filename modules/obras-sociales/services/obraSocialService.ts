import { supabase } from "@/lib/supabase";
import { ObraSocial } from "@/modules/obras-sociales/types/obraSocial";

class ObraSocialService {
  async obtenerObrasSociales(): Promise<ObraSocial[]> {
    const { data, error } = await supabase
      .from("obras_sociales")
      .select("*")
      .order("nombre");

    if (error) {
      throw error;
    }

    return data ?? [];
  }
}

export const obraSocialService = new ObraSocialService();