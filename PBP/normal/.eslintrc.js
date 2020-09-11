module.exports = {
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  parser: 'babel-eslint',
  plugins: ['import'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingCommas: 'es5',
        arrowParens: 'always',
        htmlWhitespaceSensitivity: 'ignore',
      },
    ],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './build/local.config.js', // 你本地的 webpack 配置
      },
    },
  },
};