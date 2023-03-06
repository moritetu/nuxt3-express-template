module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-recess-order', 'stylelint-config-prettier'],
  plugins: [],
  ignoreFiles: ['**/node_modules/**', '.output/**', '.nuxt/**', '*.min.css', 'coverage/**'],
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global'],
      },
    ],
  },
}
