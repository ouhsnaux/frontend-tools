module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    '@vue/prettier'
  ],
  plugins: ['import'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': [1],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
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
    }
  }
}