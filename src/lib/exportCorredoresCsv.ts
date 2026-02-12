import type { CorredorFilters, CorredorRow } from "@/hooks/useCorredores";
import { fetchCorredoresForExport } from "@/hooks/useCorredores";

const CSV_HEADERS = [
  "Nome",
  "E-mail",
  "Telefone",
  "Preferência",
  "Vínculo",
  "Último acesso",
  "Plano",
];

function escapeCsvCell(value: string): string {
  const s = String(value ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function rowToCsvLine(row: CorredorRow): string {
  return [
    escapeCsvCell(row.nome),
    escapeCsvCell(row.email),
    escapeCsvCell(row.telefone),
    escapeCsvCell(row.preferencia),
    escapeCsvCell(row.vinculo),
    escapeCsvCell(row.ultimoAcesso),
    escapeCsvCell(row.plano),
  ].join(",");
}

export async function downloadCorredoresCsv(filters: CorredorFilters = {}): Promise<void> {
  const rows = await fetchCorredoresForExport(filters);
  const BOM = "\uFEFF";
  const headerLine = CSV_HEADERS.join(",");
  const bodyLines = rows.map(rowToCsvLine);
  const csv = BOM + headerLine + "\n" + bodyLines.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `corredores_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
