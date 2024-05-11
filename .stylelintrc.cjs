// https://stylelint.io/user-guide/get-started
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-recess-order',
  ],
  rules: {
    // 禁用less @变量检测
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': null,
    // 选择器的命名规则，必须全部小写,中线或下划线
    'selector-class-pattern': '^[a-z-_]+$',
    'font-family-no-missing-generic-family-keyword': null,
  },
};
