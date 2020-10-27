# eslint + prettier

## 联系

### 相同点

1. 代码格式化，统一团队代码风格。

### 不同点

1. `eslint` 高可配，团队可根据自己的喜好设置代码风格，而 `prettier` 基本不可配，大一统代码规范。

1. `eslint` 除专注代码规范外，还涉及代码质量和低级 bug 的提示，比如：“字段未定义”、“字段未使用”……

## 合并使用

冲突部分格式化使用 `prettier` 。
使用配置 `eslint-config-prettier` 和插件 `eslint-plugin-prettier`，并在 `.eslintrc.js`中引入。

### 普通项目

1. 初始化项目

    ```
    npm init
    ```

1. 添加依赖项，并安装依赖包

    配置 `package.json`，并执行 `npm i`

    ```
    "devDependencies": {
      "eslint": "^7.8.1"
      "eslint-config-prettier": "^6.11.0",
      "eslint-plugin-prettier": "^3.1.4",
      "prettier": "^2.1.1"
    },
    ```

1. eslint 配置

    执行 `eslint --init` 初始化，并修改配置：

    ```
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
      ],
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
      rules: {
        indent: ['error', 2],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            trailingCommas: 'es5',
            arrowParens: 'always',
            endOfLine: 'auto',
            htmlWhitespaceSensitivity: 'ignore',
          },
        ],
      },
    };
    ```

### vue 项目

使用 vue-cli 创建项目，并选择 `eslint + prettier`

## 参考文献
