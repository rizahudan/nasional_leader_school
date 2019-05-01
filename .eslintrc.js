module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  extends: ['airbnb-base', 'plugin:react/recommended'],
  plugins: ['import', 'react', 'meteor', 'module-resolver'],
  env: {
    browser: true,
    meteor: true
  },
  settings: {
    'import/resolver': {
      "babel-module": {}
    }
  },
  rules: {
    'import/extensions': ['off', 'never'],
    // 'meteor' should be listed in the project's dependencies.
    'import/no-extraneous-dependencies': ['off', 'never'],
    'import/no-absolute-path': ['off', 'never'],
    'no-underscore-dangle' : 0,
    'module-resolver/use-alias': 2,
    'react/prop-types': 1,
    'linebreak-style': ['error', 'windows'],
  },
};
