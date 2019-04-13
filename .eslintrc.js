module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  extends: ['airbnb-base'],
  plugins: ['import', 'node', 'react-html'],
  env: {
    browser: true,
    node: true,
  },
  settings: {
    'import/resolver': 'node'
  },
  rules: {
    'import/extensions': ['off', 'never'],
    // 'meteor' should be listed in the project's dependencies.
    'import/no-extraneous-dependencies': ['off', 'never'],
    'import/no-absolute-path': ['off', 'never'],
    'no-underscore-dangle' : 0,
  },
};
