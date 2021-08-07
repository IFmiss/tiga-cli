export default `
module.exports = {
  extends: ['@commitlint/config-conventional'],
  helpUrl:
    '=> https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 feature.
        'update', // 常规更新
        'fix', // 修复bug
        'docs', // 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等
        'style', // 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
        'refactor', // 代码重构，没有加新功能或者修复bug
        'test', // 测试用例，包括单元测试、集成测试等
        'chore', // 改变构建流程、或者增加依赖库、工具等
        'revert', // 回滚到上一个版本
      ],
    ],
  },
};
`;
