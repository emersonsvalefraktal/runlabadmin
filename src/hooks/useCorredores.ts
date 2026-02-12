import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export type CorredorFilters = {
  search?: string;
  /** "Corredor" | "Parceiro" - empty = ambos */
  tipoUser?: "Corredor" | "Parceiro";
  /** Parceiro: só quem é parceiro; Corredor: só quem não é; undefined = ambos */
  eParceiro?: boolean;
  naoEParceiro?: boolean;
  /** preferred_distance no perfil */
  preferredDistance?: string;
  /** Mínimo de inscrições em competições (ex: "10+" -> 10) */
  participacaoMin?: number;
};

export type CorredorRow = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  preferencia: string;
  vinculo: string;
  ultimoAcesso: string;
  plano: string;
};

const PAGE_SIZE_DEFAULT = 10;

function formatLastAccess(updatedAt: string | null): string {
  if (!updatedAt) return "—";
  const d = new Date(updatedAt);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }) + " • " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function preferredDistanceToLabel(preferred: string | null): string {
  if (!preferred) return "—";
  if (preferred === "indoor") return "Corrida indoor";
  if (preferred === "outdoor") return "Corrida outdoor";
  return preferred;
}

/** Busca corredores (view v_corredores_admin) com filtros e paginação */
async function fetchCorredores(
  filters: CorredorFilters,
  page: number,
  pageSize: number
): Promise<{ data: CorredorRow[]; total: number }> {
  // Se filtro de participação, primeiro obter user_ids que atendem
  let userIdsParticipacao: string[] | null = null;
  if (filters.participacaoMin != null && filters.participacaoMin > 0) {
    const { data: regs } = await supabase
      .from("competition_registrations")
      .select("user_id")
      .neq("status", "cancelled");
    const countByUser: Record<string, number> = {};
    (regs ?? []).forEach((r) => {
      countByUser[r.user_id] = (countByUser[r.user_id] ?? 0) + 1;
    });
    userIdsParticipacao = Object.entries(countByUser)
      .filter(([, c]) => c >= filters.participacaoMin!)
      .map(([id]) => id);
    if (userIdsParticipacao.length === 0) {
      return { data: [], total: 0 };
    }
  }

  let query = supabase
    .from("v_corredores_admin")
    .select("id, full_name, email, preferred_distance, tipo_user, updated_at", { count: "exact" })
    .order("full_name", { ascending: true });

  const search = filters.search?.trim();
  if (search) {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
  }
  if (filters.tipoUser) {
    query = query.eq("tipo_user", filters.tipoUser);
  }
  if (filters.eParceiro === true && filters.naoEParceiro !== true) {
    query = query.eq("tipo_user", "Parceiro");
  }
  if (filters.naoEParceiro === true && filters.eParceiro !== true) {
    query = query.eq("tipo_user", "Corredor");
  }
  if (filters.preferredDistance) {
    // DB has values like "Até 5 km", "De 6 km a 20 km" etc.
    query = query.ilike("preferred_distance", `%${filters.preferredDistance}%`);
  }
  if (userIdsParticipacao) {
    query = query.in("id", userIdsParticipacao);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data: rows, error, count } = await query.range(from, to);

  if (error) throw error;

  const total = count ?? 0;
  const data: CorredorRow[] = (rows ?? []).map((r: {
    id: string;
    full_name: string | null;
    email: string | null;
    preferred_distance: string | null;
    tipo_user: string | null;
    updated_at: string | null;
  }) => ({
    id: r.id,
    nome: r.full_name ?? "—",
    email: r.email ?? "—",
    telefone: "—",
    preferencia: preferredDistanceToLabel(r.preferred_distance),
    vinculo: r.tipo_user === "Parceiro" ? "Corredor/parceiro" : "Corredor",
    ultimoAcesso: formatLastAccess(r.updated_at),
    plano: "Gratuito",
  }));

  return { data, total };
}

export function useCorredores(
  filters: CorredorFilters,
  page: number,
  pageSize: number = PAGE_SIZE_DEFAULT
) {
  const [data, setData] = useState<CorredorRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchCorredores(filters, page, pageSize);
      setData(result.data);
      setTotal(result.total);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Erro ao carregar corredores"));
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [
    filters.search,
    filters.tipoUser,
    filters.eParceiro,
    filters.naoEParceiro,
    filters.preferredDistance,
    filters.participacaoMin,
    page,
    pageSize,
  ]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, total, loading, error, refetch: fetch };
}

/** Busca todos os corredores com filtros (para exportação CSV) */
export async function fetchCorredoresForExport(filters: CorredorFilters): Promise<CorredorRow[]> {
  const result = await fetchCorredores(filters, 1, 10000);
  return result.data;
}
