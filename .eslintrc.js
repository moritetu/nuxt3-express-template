module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: [
    '/node_modules/**',
    '/.nuxt/**',
    'package-lock.json',
    '/.output/**',
    '/.vsode/**',
    '*.min.js',
    'src/client/public/**/*',
    'coverage/**',
  ],
  rules: {
    'import/no-named-as-default-member': 0,
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
    'vue/multi-word-component-names': 0,
    // vue3 is ok syntax
    // https://v3.ja.vuejs.org/guide/migration/v-model.html#v-model-%E3%81%AE%E5%BC%95%E6%95%B0
    'vue/no-v-model-argument': 0,
    'tailwindcss/no-custom-classname': 0,
    // For prefix tw-, no conflict
    'tailwindcss/no-contradicting-classname': 0,
  },
}
