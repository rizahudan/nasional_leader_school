module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  extends: ['airbnb-base', 'plugin:react/recommended'],
  plugins: ['import', 'react', 'meteor'],
  env: {
    browser: true,
    meteor: true
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
