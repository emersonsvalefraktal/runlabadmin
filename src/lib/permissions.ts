/**
 * Chaves de permissão para administradores.
 * Usadas em admin_permissions e na UI (Acessos, AddUserSheet, guards).
 */
export const PERMISSION_KEYS = {
  ACESSOS_VIEW: "acessos.view",
  ACESSOS_EDIT: "acessos.edit",
  USUARIOS_VIEW: "usuarios.view",
  USUARIOS_ADD: "usuarios.add",
  USUARIOS_EDIT: "usuarios.edit",
  USUARIOS_DELETE: "usuarios.delete",
  USUARIOS_APPROVE_PARTNERS: "usuarios.approve_partners",
  COMPETICOES_VIEW: "competicoes.view",
  COMPETICOES_ADD: "competicoes.add",
  COMPETICOES_EDIT: "competicoes.edit",
  FINANCEIRO_VIEW: "financeiro.view",
  FINANCEIRO_EDIT: "financeiro.edit",
} as const;

export type PermissionKey = (typeof PERMISSION_KEYS)[keyof typeof PERMISSION_KEYS];

/** Todas as chaves em ordem para UI */
export const ALL_PERMISSION_KEYS: PermissionKey[] = [
  PERMISSION_KEYS.ACESSOS_VIEW,
  PERMISSION_KEYS.ACESSOS_EDIT,
  PERMISSION_KEYS.USUARIOS_VIEW,
  PERMISSION_KEYS.USUARIOS_ADD,
  PERMISSION_KEYS.USUARIOS_EDIT,
  PERMISSION_KEYS.USUARIOS_DELETE,
  PERMISSION_KEYS.USUARIOS_APPROVE_PARTNERS,
  PERMISSION_KEYS.COMPETICOES_VIEW,
  PERMISSION_KEYS.COMPETICOES_ADD,
  PERMISSION_KEYS.COMPETICOES_EDIT,
  PERMISSION_KEYS.FINANCEIRO_VIEW,
  PERMISSION_KEYS.FINANCEIRO_EDIT,
];

/** Grupos para exibição em accordion (label + chaves) */
export const PERMISSION_GROUPS: { title: string; keys: PermissionKey[] }[] = [
  {
    title: "Acessos",
    keys: [PERMISSION_KEYS.ACESSOS_VIEW, PERMISSION_KEYS.ACESSOS_EDIT],
  },
  {
    title: "Módulo de usuários",
    keys: [
      PERMISSION_KEYS.USUARIOS_VIEW,
      PERMISSION_KEYS.USUARIOS_ADD,
      PERMISSION_KEYS.USUARIOS_EDIT,
      PERMISSION_KEYS.USUARIOS_DELETE,
      PERMISSION_KEYS.USUARIOS_APPROVE_PARTNERS,
    ],
  },
  {
    title: "Gestão de competições",
    keys: [
      PERMISSION_KEYS.COMPETICOES_VIEW,
      PERMISSION_KEYS.COMPETICOES_ADD,
      PERMISSION_KEYS.COMPETICOES_EDIT,
    ],
  },
  {
    title: "Financeiro",
    keys: [PERMISSION_KEYS.FINANCEIRO_VIEW, PERMISSION_KEYS.FINANCEIRO_EDIT],
  },
];

const LABELS: Record<PermissionKey, string> = {
  [PERMISSION_KEYS.ACESSOS_VIEW]: "Visualizar acessos",
  [PERMISSION_KEYS.ACESSOS_EDIT]: "Editar acessos",
  [PERMISSION_KEYS.USUARIOS_VIEW]: "Acessar o módulo de usuários",
  [PERMISSION_KEYS.USUARIOS_ADD]: "Adicionar usuários",
  [PERMISSION_KEYS.USUARIOS_EDIT]: "Editar dados dos usuários",
  [PERMISSION_KEYS.USUARIOS_DELETE]: "Excluir usuários",
  [PERMISSION_KEYS.USUARIOS_APPROVE_PARTNERS]: "Aprovar ou reprovar parceiros RunLab",
  [PERMISSION_KEYS.COMPETICOES_VIEW]: "Visualizar competições",
  [PERMISSION_KEYS.COMPETICOES_ADD]: "Adicionar competições",
  [PERMISSION_KEYS.COMPETICOES_EDIT]: "Editar competições",
  [PERMISSION_KEYS.FINANCEIRO_VIEW]: "Visualizar financeiro",
  [PERMISSION_KEYS.FINANCEIRO_EDIT]: "Editar financeiro",
};

export function getPermissionLabel(key: PermissionKey): string {
  return LABELS[key] ?? key;
}
