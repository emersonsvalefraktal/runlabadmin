import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export type CorredorDetails = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  city: string;
  state: string;
  gender: string;
  modality: string;
  lastAccess: string;
  level: number;
  plan: string;
  avatar: string | null;
  stats: {
    provasConcluidas: number;
    assinaturas: number;
    distancia: string;
  };
};

function formatDate(d: string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("pt-BR");
}

function formatLastAccess(updatedAt: string | null): string {
  if (!updatedAt) return "—";
  const d = new Date(updatedAt);
  return (
    d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) +
    " • " +
    d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  );
}

function preferredToModality(preferred: string | null): string {
  if (!preferred) return "—";
  if (preferred === "indoor") return "Corrida indoor";
  if (preferred === "outdoor") return "Corrida outdoor";
  return preferred;
}

export function useCorredorDetails(id: string | undefined) {
  const [data, setData] = useState<CorredorDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDetails = useCallback(async () => {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data: row, error: viewError } = await supabase
        .from("v_corredores_admin")
        .select("id, full_name, email, birth_date, gender, preferred_distance, avatar_url, tipo_user, updated_at")
        .eq("id", id)
        .single();

      if (viewError) throw viewError;
      if (!row) {
        setData(null);
        setLoading(false);
        return;
      }

      const userId = row.id as string;

      const [regsResult, runsResult] = await Promise.all([
        supabase
          .from("competition_registrations")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)
          .neq("status", "cancelled"),
        supabase
          .from("user_runs")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)
          .eq("state", "finished"),
      ]);

      const assinaturas = regsResult.count ?? 0;
      const provasConcluidas = runsResult.count ?? 0;

      setData({
        id: row.id,
        name: (row.full_name as string) ?? "—",
        email: (row.email as string) ?? "—",
        phone: "—",
        birthDate: formatDate(row.birth_date as string | null),
        city: "—",
        state: "—",
        gender: (row.gender as string) ?? "—",
        modality: preferredToModality(row.preferred_distance as string | null),
        lastAccess: formatLastAccess(row.updated_at as string | null),
        level: 1,
        plan: "Gratuito",
        avatar: (row.avatar_url as string | null) ?? null,
        stats: {
          provasConcluidas,
          assinaturas,
          distancia: "—",
        },
      });
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Erro ao carregar corredor"));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return { data, loading, error, refetch: fetchDetails };
}
