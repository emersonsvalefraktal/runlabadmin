import type { CompetitionRow } from "@/hooks/useCompetitions";
import type { CompetitionFilters } from "@/contexts/CompeticoesFilterContext";
import { fetchCompetitionsForExport } from "@/hooks/useCompetitions";

const CSV_HEADERS = [
  "Nome",
  "Modalidade",
  "Prazo Inscrições",
  "Prazo Prova",
  "Inscritos",
  "Tipo",
  "Formato",
  "Campeonato",
  "Status",
];

function escapeCsvCell(value: string): string {
  const s = String(value ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function rowToCsvLine(row: CompetitionRow): string {
  return [
    escapeCsvCell(row.nome),
    escapeCsvCell(row.modalidade),
    escapeCsvCell(row.prazoInscricoes),
    escapeCsvCell(row.prazoProva),
    escapeCsvCell(String(row.inscritos)),
    escapeCsvCell(row.tipo),
    escapeCsvCell(row.formato),
    escapeCsvCell(row.campeonato),
    escapeCsvCell(row.status),
  ].join(",");
}

export async function downloadCompetitionsCsv(filters: CompetitionFilters = {}): Promise<void> {
  const rows = await fetchCompetitionsForExport(filters);
  const BOM = "\uFEFF";
  const headerLine = CSV_HEADERS.join(",");
  const bodyLines = rows.map(rowToCsvLine);
  const csv = BOM + headerLine + "\n" + bodyLines.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `competicoes_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
