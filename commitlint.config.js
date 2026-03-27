module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // nova funcionalidade
        'fix',      // correção de bug
        'hotfix',   // correção urgente em produção
        'refactor', // refatoração sem mudança de comportamento
        'chore',    // tarefas de manutenção (deps, build, config)
        'docs',     // documentação
        'style',    // formatação, espaços (sem mudança de lógica)
        'test',     // adição ou correção de testes
        'perf',     // melhoria de performance
        'ci',       // mudanças em CI/CD
        'revert',   // reverter commit anterior
      ],
    ],
    'scope-enum': [
      1, // warning (não obrigatório, mas recomendado)
      'always',
      [
        'home',
        'send',
        'receive',
        'history',
        'profile',
        'notifications',
        'navigation',
        'components',
        'ui',
        'types',
        'constants',
        'deps',
        'config',
        'ci',
        'release',
      ],
    ],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [1, 'always', 200],
  },
};
