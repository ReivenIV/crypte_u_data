module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['json-format'],
  extends: ['plugin:json-format/recommended'],
  rules: {
    'json-format/indent': ['error', 2],
    'json-format/quotes': ['error', 'double'],
  },
};
