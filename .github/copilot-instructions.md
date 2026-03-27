# GitHub Copilot — Instruções do Projeto ewallet-app

## Contexto do Projeto

- **App:** E-Wallet — carteira digital mobile
- **Repositório:** https://github.com/victoroliveira13/ewallet
- **Stack:** React Native 0.81 + Expo 54 + NativeWind v4 (Tailwind CSS) + TypeScript + react-router-native
- **Versão atual:** ver `package.json` (tag base: `v1.0.0`)
- **Licença:** MIT

## Estrutura de Pastas

```
src/
├── screens/      HomeScreen, SendScreen, ReceiveScreen, HistoryScreen, ProfileScreen, NotificationsScreen
├── components/   BalanceCard, BottomNavBar, ContactItem, NumPad, QuickAction, TransactionItem
│   └── ui/       Button, Badge, Card
├── navigation/   AppRouter.tsx
├── constants/    mockData.ts, colors.ts
└── types/        index.ts
```

## Estratégia de Branches

Fluxo: `feature/* → develop → beta → master`

| Branch | Propósito | PR obrigatório |
|--------|-----------|----------------|
| `master` | Produção — releases estáveis | ✅ 1 aprovação + status check |
| `beta` | Pré-release / QA | ✅ 1 aprovação + status check |
| `develop` | Desenvolvimento ativo | ❌ só status check |

- Sempre sincronizar `develop` e `beta` após mudanças em `master`
- Branches temporárias: `feature/nome`, `fix/nome`, `hotfix/nome`

## Conventional Commits (obrigatório)

Formato: `<tipo>(<escopo>): descrição em minúsculas`

**Tipos:** `feat` · `fix` · `hotfix` · `refactor` · `chore` · `docs` · `style` · `test` · `perf` · `ci` · `revert`

**Escopos válidos:** `home` · `send` · `receive` · `history` · `profile` · `notifications` · `navigation` · `components` · `ui` · `types` · `constants` · `deps` · `config` · `ci` · `release`

**Exemplos:**
```
feat(home): adicionar gráfico de saldo mensal
fix(send): corrigir validação de valor mínimo
chore(deps): atualizar expo para 54.1.0
```

Todo commit passa pelos hooks do Husky (commitlint + tsc --noEmit).

## CI/CD (GitHub Actions)

| Arquivo | Trigger | O que faz |
|---------|---------|-----------|
| `ci.yml` | Push/PR em qualquer branch | `tsc --noEmit` + `expo-doctor` |
| `beta.yml` | Push em `beta` | Pre-release tag `v1.x.x-beta.N` |
| `release.yml` | Push em `master` | Bump semântico em `package.json`+`app.json`, tag e GitHub Release |

## Labels disponíveis no GitHub

**Tipo:** `type: bug` · `type: feature` · `type: improvement` · `type: security` · `type: docs` · `type: chore` · `type: performance`

**Prioridade:** `priority: critical` · `priority: high` · `priority: medium` · `priority: low`

**Status:** `status: in-progress` · `status: review` · `status: blocked` · `status: wont-fix`

## Autenticação GitHub API

O `gh` CLI não funciona neste ambiente. Usar sempre via PowerShell:

```powershell
$credInput = "protocol=https`nhost=github.com`n"
$TOKEN = ($credInput | git credential fill 2>&1) | Where-Object { $_ -match "^password=" } | ForEach-Object { $_ -replace "^password=", "" }
$H = @{ "Authorization" = "Bearer $TOKEN"; "Accept" = "application/vnd.github+json"; "X-GitHub-Api-Version" = "2022-11-28" }
```

## Preferências do Usuário

- **Idioma:** Português BR em toda comunicação
- **Autonomia:** executar tudo sem pedir permissão para cada passo (instalar dependências, criar arquivos, fazer commits, etc.)
- **Após cada mudança:** sempre sincronizar `develop` e `beta` com `master` via `git merge --ff-only`
- **Commits:** sempre incluir `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`
- **Qualidade:** rodar `tsc --noEmit` antes de considerar qualquer tarefa concluída

## Issues abertas (referência rápida)

As 22 issues existentes cobrem: ESLint (#1), Testes (#2), Zustand (#3), Auth (#4), API layer (#5), bugs de UI (#6–#10), melhorias de UX (#11–#15), refactoring (#16–#18), EAS Build (#19), testes unitários (#20), notificações push (#21), gráficos (#22).

Milestones: **v1.1.0** (MVP completo) e **v2.0.0** (evolução estrutural).
