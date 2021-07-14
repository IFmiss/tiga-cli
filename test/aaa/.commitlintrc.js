
module.exports = {
  extends: ['@commitlint/config-conventional'],
  helpUrl: '=> https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'update', 'fix', 'docs', 'style', 'refactor', 'test', 'revert']
    ]
  }
};
