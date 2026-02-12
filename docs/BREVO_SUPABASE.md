# Integração Brevo + Supabase (e-mails de autenticação)

Este guia configura o **Brevo** (ex-Sendinblue) como servidor SMTP do Supabase para envio de e-mails de autenticação: confirmação de cadastro, recuperação de senha e magic links.

## 1. Configurar o Brevo

### 1.1 Conta e SMTP

1. Acesse [Brevo](https://www.brevo.com/) e faça login.
2. Vá em **Configurações** (ícone de engrenagem) → **Remetentes, domínios e endereços** (ou **SMTP & API**).
3. Na seção **SMTP**, anote ou crie as credenciais:
   - **Servidor SMTP:** `smtp-relay.brevo.com`
   - **Porta:** `587` (TLS)
   - **Usuário:** seu e-mail de login SMTP (ex.: `no-reply@seudominio.com` ou o e-mail da conta)
   - **Senha:** chave SMTP (não é a senha da conta nem a API key). Em *SMTP* → *Gerar nova chave SMTP* se precisar.

### 1.2 Remetente verificado

1. Em **Remetentes e IP**, adicione um remetente (ex.: `no-reply@seudominio.com`).
2. Verifique o domínio (DKIM/SPF) conforme as instruções do Brevo para evitar caixa de spam.
3. Esse e-mail será usado como **From** nos e-mails do Supabase.

Referência: [Enviar e-mails transacionais com Brevo SMTP](https://help.brevo.com/hc/en-us/articles/7924908994450-Send-transactional-emails-using-Brevo-SMTP).

---

## 2. Configurar SMTP no Supabase

1. Abra o [Dashboard do Supabase](https://supabase.com/dashboard) e selecione seu projeto.
2. Vá em **Authentication** → **SMTP Settings** (ou **Project Settings** → **Auth** → **SMTP**).
3. Ative **Enable Custom SMTP** e preencha:

| Campo | Valor |
|-------|--------|
| **Sender email** | E-mail verificado no Brevo (ex.: `no-reply@seudominio.com`) |
| **Sender name** | Nome que aparece no remetente (ex.: `RUNLAB`) |
| **Host** | `smtp-relay.brevo.com` |
| **Port** | `587` |
| **Username** | Seu usuário SMTP do Brevo (e-mail) |
| **Password** | Chave SMTP do Brevo |

4. Salve e use **Send test email** para validar.

Documentação Supabase: [Send emails with custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp).

---

## 3. URLs de redirecionamento (recuperação de senha)

Para o fluxo de **recuperação de senha** funcionar, a URL para onde o usuário é enviado ao clicar no link do e-mail precisa estar na lista de redirecionamento do projeto.

1. No Supabase: **Authentication** → **URL Configuration** (ou **Redirect URLs**).
2. Em **Redirect URLs**, adicione:
   - Desenvolvimento: `http://localhost:5173/recuperacao-senha` (ou a porta que o Vite usar).
   - Produção: `https://seudominio.com/recuperacao-senha`.
3. Salve.

Sem isso, o Supabase pode bloquear o redirect após o usuário clicar no link de “redefinir senha” no e-mail.

---

## 4. Fluxo de recuperação de senha (resumo)

1. Usuário informa o e-mail em **Recuperação de senha**.
2. A aplicação chama `supabase.auth.resetPasswordForEmail(email, { redirectTo: '.../recuperacao-senha' })`.
3. O Supabase envia o e-mail (via Brevo) com o link de recuperação.
4. O usuário clica no link e é redirecionado para `/recuperacao-senha` com tokens na URL.
5. O Supabase estabelece a sessão; a página exibe o formulário “Definir nova senha”.
6. Após `updateUser({ password })`, a senha é alterada e o usuário pode fazer login com a nova senha.

---

## 5. Templates de e-mail (HTML)

Na pasta **`docs/supabase-email-templates/`** há HTML prontos para colar no Supabase:

- **recovery.html** — Recuperação de senha  
- **confirmation.html** — Confirmação de cadastro  
- **magic_link.html** — Magic link  
- **invite.html** — Convite de usuário  
- **email_change.html** — Confirmação de mudança de e-mail  

Em **Authentication** → **Email Templates**, escolha o tipo, copie o **Subject** (comentário no topo do arquivo) e o **Body** (conteúdo HTML). Não remova as variáveis `{{ .ConfirmationURL }}`, `{{ .Email }}`, etc.

---

## 6. Solução de problemas

- **E-mail não chega:** verifique pasta de spam, domínio verificado (DKIM) no Brevo e credenciais SMTP no Supabase. Desative “link tracking” no Brevo para esse remetente, para não alterar o link do Supabase.
- **Redirect bloqueado:** confira se a URL exata (incluindo path `/recuperacao-senha`) está em **Redirect URLs** no Supabase.
- **Erro de autenticação SMTP:** confirme usuário/senha (chave SMTP) e porta 587. No Brevo, re gere a chave SMTP se necessário.
