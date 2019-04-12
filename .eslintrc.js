module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:react/recommended'],
  plugins: ['import', 'react'],
  env: {
    browser: true,
    node: true,
  },
  settings: {
    'import/resolver': 'node',
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-underscore-dangle': 0,
    indent: ['error', 2],
    'no-alert': 1,
    'no-console': 1,
    'react/jsx-filename-extension': 'off',
  },
};
