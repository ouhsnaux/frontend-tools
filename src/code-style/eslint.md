# ESlint

## 作用

保证团队代码风格的一致，提高代码质量和避免错误。

## 项目中如何使用

1. 安装 `eslint`

    - 全局安装 `npm install eslint -g`
    - 本地安装 `npm install eslint --save-dev`

1. 初始化
    **首先确保项目根目录中已经含有 `package.json` 文件**

    - 如果全局安装了 eslint，执行 `eslint --init`
    - 否则，执行 `./node-modules/.bin/eslint --init`

1. 选择合适的选项，推荐 `airbnb`

1. 在`.eslintrc`文件中修改配置，注意使用 `plugins` 和 `extends` 前要安装相应的 `npm` 包。

## 与开发工具 vscode 结合

安装扩展 `eslint`，在 “问题栏” 会显示已打开的文件出现的问题。在 `settings.json` 中添加

```
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
}
```

这样代码保存时就会自动修复问题。

## 配置内容介绍

有两种方式使用配置文件。

使用配置文件的第一种方式是通过 `.eslintrc.*` 和 `package.json` 文件。`ESLint` 将自动在要检测的文件目录里寻找它们，
紧接着是父级目录，一直到文件系统的根目录（指定 `root: true`）。
当你想对一个项目的不同部分的使用不同配置，或当你希望别人能够直接使用 ESLint，
而无需记住要在配置文件中传递什么，这种方式就很有用。

第二种方式是使用 `-c` 选项传递命令行将文件保持到你喜欢的地方。

```
eslint -c myconfig.json myfiletotest.js
```

如果你使用一个配置文件，想要 `ESLint` 忽略任何 `.eslintrc.*` 文件，请确保使用 `--no-eslintrc` 的同时，加上 `-c` 标记。

每种情况，配置文件都会覆盖默认设置。

配置内容包括 `root`、`env`、`parser`、`parserOptions`、`rules`、`plugins`、`extends`。

### 根目录 root

指定是否为系统的根目录，如果是则不再向上查找配置文件。

```
{
  "root": true
}
```

### 环境 env

指定脚本的运行环境。每种环境都有一组特定的预定义全局变量。

[可配置项](https://cn.eslint.org/docs/user-guide/configuring#specifying-environments)

```
{
  "env": {
    // 支持 es6 全局变量
    "es6": true
  }
}
```

### 解析器 parser

可以使用提供的解析器：

- `Esprima` 默认解析器
- `Babel-ESLint`，与 `babel` 相协调，避免 `babel` 支持的语法 `eslint` 不支持导致报错。
- `@typescript-eslint/parser` - 支持 TS。

也可以自己构造解析器，不过需要兼容 `eslint` 。

```
{
  "parser": "babel-eslint"
}

```

### 解析器选项值 parserOptions

常用配置项：

- `ecmaVersion` es 语法版本，可以是 3、5、6，也可以是 2018、2019 等等
- `sourceType` 开发模式，`script`（默认）或 `module`（支持模块化开发）。
- `ecmaFeatures` 额外的语言特性，可配置项：
  - `globalReturn` - 允许在全局作用域下使用 `return` 语句
  - `impliedStrict` - 启用全局 `strict mode`（如果 `ecmaVersion` 是 5 或更高）
  - `jsx` - 启用 `JSX`
  - `experimentalObjectRestSpread` - 启用实验性的 `object rest/spread properties` 支持。
    (重要：这是一个实验性的功能，在未来可能会有明显改变。建议你写的规则 **不要** 依赖该功能，除非当它发生改变时你愿意承担维护成本。)

示例：

```
{
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

### 规则 rules

配置启用的规则，[基础配置项列表](https://cn.eslint.org/docs/rules/)，配置项可选值：

- `"off"` 或 `0` - 关闭规则
- `"warn"` 或 `1` - 开启规则，使用警告级别的错误：`warn` (不会导致程序退出)
- `"error"` 或 `2` - 开启规则，使用错误级别的错误：`error` (当被触发的时候，程序会退出)

如果要修改一个插件（后边会讲）里的规则，需要使用 `plugin1/rule1` 的格式。

```
{
  "rules": {
    "eqeqeq": "off", // 关闭规则
    "curly": 2, // 打开规则
    "vue/order-in-components": 0 // 关闭vue插件里的规则
  }
}
```

如果一个规则有额外的选项，你可以使用数组字面量指定它们，比如：

```
{
  rules: {
    // 为规则 quotes 指定了 “double” 选项
    "quotes": ["error", "double"]
  }
}
```

### 插件 plugins

`ESLint` 支持使用第三方插件。在使用插件之前，你必须使用 `npm` 安装它。

插件通常输出规则，也可以输出一个或多个本篇提到的其它配置。要确保这个包安装在 `ESLint` 能请求到的目录下。
插件名称可以省略 `eslint-plugin-` 前缀。

```
{
  "plugins": [
    "eslint-plugin-plugin1", // 插件名
    "plugin1" // 省略 eslint-plugin- 前缀
  ]
}
```

推荐使用 `eslint-plugin-import` 来规范 `import`的使用，使用方式

1. 安装 `npm` 包
1. 在 `plugins` 中引入

    ```
    "plugins": ["import"]
    ```

1. 在 `extends` 中继承规则

    ```
    "extends": [
      "plugins:import/errors",
      "plugins:import/warnings",
    ]
    ```

### 继承 extends

可以继承基础配置、流行配置（[列表](https://www.npmjs.com/search?q=eslint-config)）
或插件中的配置，流行配置或插件首先需要安装相应的 `npm` 包。
属性值可以是配置字符串或配置字符串组成的数组。
流行配置可以省略前缀 `eslint-config-` ，插件中的配置包括四部分：

- plugin:
- 包名 (可省略前缀 `eslint-plugin-`，比如，`react`)
- /
- 配置名称 (比如 recommended)

示例：

```
{
  "extends: [
    // 基础配置
    "eslint:recommended",

    // eslint-config-airbnb-base 省略了前缀的配置
    "airbnb-base",

    // eslint-plugin-vue 插件中的 recommended 配置
    "plugin:vue/recommended"
  ]
}
```

### 设置 settings

在 `webpack` 中配置别名后，`eslint`无法根据别名找到对应的包，从而报错，解决方法如下：

第一种：直接配置

1. 安装 `eslint-plugin-import` 和 `eslint-import-resolver-alias`。

2. 在 `.eslintrc.js` 中添加 `settings` 配置。

    ```
    module.exports = {
      plugins: ["import"],
      settings: {
        "import/resolver": {
          alias: {
            map: [
              ["@", "./src"],
            ],
            extensions: [".vue", ".json", ".js"]
          }
        }
      }
    }
    ```

第二种：引入 `webpack` 配置

1. 首先需要安装 `eslint-plugin-import` 和 `eslint-import-resolver-webpack` npm 包

2. 在 `.eslintrc.js` 中添加 `settings` 配置

    ```
    {
      settings: {
        'import/resolver': {
          webpack: {
            config: './build/local.config.js', // 你本地的 webpack 配置
          },
        }
      }
    }
    ```

## 检测文件是否符合规范

- 检测指定文件 `eslint ./test.js`
- 检测指定文件夹下的所有文件 `eslint ./`
- 检测指定文件夹下的指定类型文件 `eslint ./ --ext .js`
- 只检测被修改的文件`eslint ./ --cache`

## 忽略检测

### 整体配置

在根目录下添加 `.eslintignore`文件，根据规则匹配到的文件将不会被检测。

- 以 `#` 开头的行被当作注释，不影响忽略模式。
- 忽略模式同 [.gitignore 规范](https://git-scm.com/docs/gitignore)
- 以 `!` 开头的行是否定模式，它将会重新包含一个之前被忽略的模式。

示例：

```
  ./src # 忽略检测src文件夹下所有文件
  *.js  # 忽略所有js文件
  a*.js # 忽略所有a开头的js文件

  # 忽略除src文件夹下的所有js文件
  *.js
  !./src
```

### 文件内部配置

- 代码块

    ```
    /* eslint-disable */

      alert('foo');

    /* eslint-enable */
    ```

  如果将 `/* eslint-disable */` 放到第一行则整个文件都不检测。

- 单行代码

    ```
    alert('foo'); // eslint-disable-line

    // eslint-disable-next-line
    alert('foo');
    ```

每种配置都可以在 disable 后添加具体的规则

## 修复不符合规范的内容

`eslint --fix`

## 与git结合

在执行 `git commit` 命令时，对代码进行检测或修复。
首先安装 `pre-commit` 包，然后修改 `package.json`。

```
{
  "scripts": {
    "eslint": "eslint ./src",
    "eslint:fix": "eslint --fix ./src",
  },
  "pre-commit": ["eslint"] // 或"eslint:fix"
}
```

## 参考文献

[eslint 中文网](https://cn.eslint.org/)
