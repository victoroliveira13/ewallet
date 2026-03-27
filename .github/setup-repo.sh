#!/usr/bin/env bash
# ============================================================
# setup-repo.sh — Configuração completa do repositório GitHub
# ewallet-app (victoroliveira13/ewallet)
# ============================================================
# Pré-requisito: gh CLI instalado e autenticado
#   brew install gh        (macOS)
#   winget install gh      (Windows)
#   gh auth login
#
# Uso: bash .github/setup-repo.sh
# ============================================================

set -e

REPO="victoroliveira13/ewallet"

echo "🚀 Configurando repositório: $REPO"
echo ""

# ── 1. LABELS ────────────────────────────────────────────────
echo "━━━ 1/4 Labels ━━━"
bash "$(dirname "$0")/create-labels.sh"
echo ""

# ── 2. BRANCH PROTECTION ─────────────────────────────────────
echo "━━━ 2/4 Branch Protection Rules ━━━"

# master: require PR + 1 approval + status checks + no force push
echo "Protegendo branch: master..."
gh api repos/$REPO/branches/master/protection \
  --method PUT \
  --header "Accept: application/vnd.github+json" \
  --field required_status_checks='{"strict":true,"contexts":["type-check"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false \
  --field required_linear_history=false \
  --silent && echo "  ✅ master protegida"

# beta: require PR + 1 approval + status checks
echo "Protegendo branch: beta..."
gh api repos/$REPO/branches/beta/protection \
  --method PUT \
  --header "Accept: application/vnd.github+json" \
  --field required_status_checks='{"strict":true,"contexts":["type-check"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":false}' \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false \
  --silent && echo "  ✅ beta protegida"

# develop: apenas status checks (sem review obrigatório para agilidade)
echo "Protegendo branch: develop..."
gh api repos/$REPO/branches/develop/protection \
  --method PUT \
  --header "Accept: application/vnd.github+json" \
  --field required_status_checks='{"strict":false,"contexts":["type-check"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews=null \
  --field restrictions=null \
  --field allow_force_pushes=true \
  --field allow_deletions=false \
  --silent && echo "  ✅ develop protegida"

echo ""

# ── 3. MILESTONES ────────────────────────────────────────────
echo "━━━ 3/4 Milestones ━━━"

gh api repos/$REPO/milestones \
  --method POST \
  --field title="v1.1.0" \
  --field description="Primeiras funcionalidades pós-MVP: integração com API real, autenticação, melhorias de UX" \
  --field state="open" \
  --silent && echo "  ✅ Milestone v1.1.0 criado"

gh api repos/$REPO/milestones \
  --method POST \
  --field title="v2.0.0" \
  --field description="Evolução estrutural: nova arquitetura, features avançadas, refatorações grandes" \
  --field state="open" \
  --silent && echo "  ✅ Milestone v2.0.0 criado"

echo ""

# ── 4. REPOSITORY SETTINGS ───────────────────────────────────
echo "━━━ 4/4 Repository Settings ━━━"

# Desabilita merge commits (force squash ou rebase para histórico limpo)
gh api repos/$REPO \
  --method PATCH \
  --field allow_squash_merge=true \
  --field allow_merge_commit=false \
  --field allow_rebase_merge=true \
  --field delete_branch_on_merge=true \
  --field squash_merge_commit_title="PR_TITLE" \
  --field squash_merge_commit_message="PR_BODY" \
  --silent && echo "  ✅ Merge settings configurados (squash + rebase, delete branch on merge)"

echo ""
echo "🎉 Configuração concluída!"
echo ""
echo "👉 Verifique em:"
echo "   Branches:   https://github.com/$REPO/settings/branches"
echo "   Labels:     https://github.com/$REPO/labels"
echo "   Milestones: https://github.com/$REPO/milestones"
