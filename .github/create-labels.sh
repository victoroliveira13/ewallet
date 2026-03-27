#!/usr/bin/env bash
# Script para criar labels no repositório GitHub do ewallet-app
# Pré-requisito: gh CLI autenticado (gh auth login)
# Uso: bash .github/create-labels.sh

REPO="victoroliveira13/ewallet"

echo "🏷️  Criando labels para $REPO..."

# Remove labels padrão do GitHub (opcional — descomente se quiser)
# gh label delete "bug" --repo $REPO --yes 2>/dev/null
# gh label delete "documentation" --repo $REPO --yes 2>/dev/null
# gh label delete "duplicate" --repo $REPO --yes 2>/dev/null
# gh label delete "enhancement" --repo $REPO --yes 2>/dev/null
# gh label delete "good first issue" --repo $REPO --yes 2>/dev/null
# gh label delete "help wanted" --repo $REPO --yes 2>/dev/null
# gh label delete "invalid" --repo $REPO --yes 2>/dev/null
# gh label delete "question" --repo $REPO --yes 2>/dev/null
# gh label delete "wontfix" --repo $REPO --yes 2>/dev/null

# ── TIPO ──────────────────────────────────────────────────────────────────
echo "Criando labels de tipo..."

gh label create "type: bug" \
  --color "d73a4a" \
  --description "Comportamento incorreto ou crash" \
  --repo $REPO --force

gh label create "type: feature" \
  --color "0075ca" \
  --description "Nova funcionalidade ou melhoria visível ao usuário" \
  --repo $REPO --force

gh label create "type: improvement" \
  --color "a2eeef" \
  --description "Melhoria em funcionalidade existente" \
  --repo $REPO --force

gh label create "type: security" \
  --color "e4e669" \
  --description "Vulnerabilidade ou problema de segurança" \
  --repo $REPO --force

gh label create "type: docs" \
  --color "cfd3d7" \
  --description "Documentação (README, comentários, wiki)" \
  --repo $REPO --force

gh label create "type: chore" \
  --color "e4e669" \
  --description "Tarefa técnica: deps, config, refactor, CI" \
  --repo $REPO --force

gh label create "type: performance" \
  --color "84b6eb" \
  --description "Melhoria de performance / otimização" \
  --repo $REPO --force

# ── PRIORIDADE ────────────────────────────────────────────────────────────
echo "Criando labels de prioridade..."

gh label create "priority: critical" \
  --color "b60205" \
  --description "App inutilizável, resolver imediatamente" \
  --repo $REPO --force

gh label create "priority: high" \
  --color "d93f0b" \
  --description "Funcionalidade principal comprometida" \
  --repo $REPO --force

gh label create "priority: medium" \
  --color "fbca04" \
  --description "Importante mas há workaround" \
  --repo $REPO --force

gh label create "priority: low" \
  --color "c2e0c6" \
  --description "Nice-to-have ou cosmético" \
  --repo $REPO --force

# ── STATUS ────────────────────────────────────────────────────────────────
echo "Criando labels de status..."

gh label create "status: in-progress" \
  --color "0052cc" \
  --description "Sendo trabalhado ativamente" \
  --repo $REPO --force

gh label create "status: review" \
  --color "bfd4f2" \
  --description "Aguardando revisão de PR" \
  --repo $REPO --force

gh label create "status: blocked" \
  --color "ee0701" \
  --description "Bloqueado por dependência externa" \
  --repo $REPO --force

gh label create "status: wont-fix" \
  --color "ffffff" \
  --description "Não será corrigido / implementado" \
  --repo $REPO --force

echo ""
echo "✅ Labels criadas com sucesso!"
echo "👉 Verifique em: https://github.com/$REPO/labels"
