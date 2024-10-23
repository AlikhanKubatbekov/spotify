const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      semi: ['error'],
      quotes: ['warn', 'single', { avoidEscape: true }],
      eqeqeq: ['error', 'smart'],
      'no-template-curly-in-string': 'error',
      camelcase: ['warn', { ignoreImports: true }],
      'no-else-return': 'error',
      'no-empty': 'error',
      'no-empty-function': 'error',
      'no-lone-blocks': 'error',
      'no-nested-ternary': 'error',
      'no-return-assign': 'error',
      'prefer-arrow-callback': ['error', { allowUnboundThis: true }],
      'prefer-const': ['error', { destructuring: 'all' }],
      'require-await': 'error',
      'comma-dangle': ['error', 'only-multiline'],
      'object-curly-spacing': ['warn', 'always'],
      'space-in-parens': ['error', 'never'],
      'arrow-parens': ['error', 'always'],
    },
  },
];
