# RUNLAB Admin Web

Painel administrativo RUNLAB: parceiros, financeiro, corredores e gestão de competições.

## Stack

- **Vite** + **React** + **TypeScript**
- **shadcn/ui** + **Tailwind CSS**
- **Supabase** (backend e auth)
- **React Router** + **TanStack React Query**

## Desenvolvimento

```sh
npm install
npm run dev
```

O app sobe em [http://localhost:8080](http://localhost:8080).

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha com a URL e a chave anon do seu projeto Supabase (Project Settings > API).

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run preview` — preview do build
- `npm run lint` — ESLint
