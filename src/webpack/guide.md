# webpack guide

通过举例子的方式由浅入深了解 `webpack` 的功能。

## 起步，如何使用 `webpack`

引入`webpack`，配置文件，快捷命令

### 0. 原始程序

project

```npm
webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

src/index.js

```
function component() {
  const element = document.createElement('div');

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

index.html

```
<!doctype html>
<html>
  <head>
    <title>起步</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

### 1. 使用 `webpack`

1. 本地安装 `webpack` 和 `webpack-cli` (用于在命令行中运行 `webpack` )。
1. 安装依赖包 `lodash`

    ```
    npm i lodash
    ```

1. 调整程序

    project

    ```
    webpack-demo
      |- package.json
    + |- /dist
    +   |- index.html
    - |- index.html
      |- /src
        |- index.js
    ```

    src/index.js

    ```
    + import _ from 'lodash';
    +
      function component() {
        const element = document.createElement('div');

    -   // lodash（目前通过一个 script 引入）对于执行这一行是必需的
    +   // lodash，现在通过一个 script 引入
        element.innerHTML = _.join(['Hello', 'webpack'], ' ');

        return element;
      }

      document.body.appendChild(component());
    ```

    dist/index.html

    ```
      <!doctype html>
      <html>
      <head>
        <title>起步</title>
    -    <script src="https://unpkg.com/lodash@4.16.6"></script>
      </head>
      <body>
    -    <script src="./src/index.js"></script>
    +    <script src="main.js"></script>
      </body>
      </html>
    ```

    命令行运行 `webpack`

    ```
    webpack
    ```

    `webpack` 默认以 `src/index.js` 作为**起点**，**输出** `dist/main.js`。
    使用浏览器打开 `index.html` 会发现表现与普通程序一致。

### 2. 为 `webpack` 创建配置文件

根目录新增 `webpack.config.js`

```
const path = require('path');

module.exports = {
  // 起点
  entry: './src/index.js',

  // 输出
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

通过配置文件再次执行构建

```
webpack --config webpack.config.js
```

`webpack` 默认使用根目录下 `webpack.config.js`，也可指定其它配置文件

### 3. 快捷命令

1. 调整 `package.json`，在 `script`中添加 `"build": "webpack"`。
2. 命令行执行 `npm run build` 完成构建

## 使用 `loader` 管理资源

`webpack` 根据正则匹配文件，并交给指定的 `loader` 进行处理。

### 使用 `css-loader` 和 `style-loader` 管理 `css` 文件

1. 安装loader

    ```
    npm i css-loader style-loader -D
    ```

1. webpack中添加配置

    ```
    const path = require('path');

      module.exports = {
        entry: './src/index.js',
        output: {
          filename: 'bundle.js',
          path: path.resolve(__dirname, 'dist'),
        },
    +   module: {
    +     rules: [
    +       {
    +         test: /\.css$/,
    +         use: [
    +           'style-loader',
    +           'css-loader',
    +         ],
    +       },
    +     ],
    +   },
      };

    ```

### 使用 `file-loader` 处理图像

### 使用 `file-loader` 处理字体

### 使用 `csv-loader`、`xml-loader` 加载数据

### 资源在文件中的位置

使用 `loader` 之后，可以将相互关联的代码和资源放在同一目录下

```
/moduleA
|- index.js
|- index.css
|- icon.svg
/moduleB
|- index.js
|- index.css
|- icon.svg
```

而不是像之前那样，所有的资源统一放在根目录 `assets` 文件夹中，
当然，除非一个资源被多个组件引用。

## 使用 `plugin` 管理输出

动态输出文件，自动生成html并引入输出的文件，清除历史文件

### 动态输出文件

1. 调整项目

    project

    ```
      webpack-demo
      |- package.json
      |- webpack.config.js
      |- /dist
      |- /src
        |- index.js
    +   |- print.js
      |- /node_modules
    ```

    dist/index.html

    ```
      <!doctype html>
      <html>
        <head>
          <title>管理输出</title>
    +     <script src="./print.bundle.js"></script>
        </head>
        <body>
    -     <script src="./bundle.js"></script>
    +     <script src="./app.bundle.js"></script>
        </body>
      </html>
    ```

    webpack.config.js

    ```
      const path = require('path');

      module.exports = {
    -   entry: './src/index.js',
    +   entry: {
    +     app: './src/index.js',
    +     print: './src/print.js',
    +   },
        output: {
    -     filename: 'bundle.js',
    +     filename: '[name].bundle.js',
          path: path.resolve(__dirname, 'dist'),
        },
      };
    ```

    执行 `npm run build` 将生成 `app.bundle.js` 和 `print.bundle.js`。

    这就引出一个问题，如果我们增加了一个 `js` 文件，或更改了一个文件的名字，我们还需要修改 `html` 中的引用。
    为了解决这个问题，我们就需要使用插件 `HtmlWebpackPlugin` 。

### 使用 `HtmlWebpackPlugin`

此插件会生成自己的 `index.html` 文件，并引入所有的 `bundle`

安装插件

```
npm i html-webpack-plugin -D
```

调整配置

webpack.config.js

```
  const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js',
    },
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: '管理输出',
+     }),
+   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```

### 清除历史文件

使用 `clean-webpack-plugin` 插件，每次构建前，清理 `dist` 文件夹。

安装插件

```
npm i clean-webpack-plugin -D
```

调整配置

webpack.config.js

```
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
+ const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js',
    },
    plugins: [
+     new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: '管理输出',
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```

## `mode` 区分开发环境

如何设置环境，追踪错误，自动编译

### 设置环境

在 `webpack.config.js` 中添加配置 `mode: 'development`，标志当前环境为**开发环境**。

### 排查错误

使用 `webpack` 打包后的代码如果报错，很难定位到问题在源代码中的位置。

为了方便追踪错误，`JavaScript` 提供了 `source map` 功能，可以将编译后的代码映射回原始源代码。

`source map` 有很多选项，可根据需要进行配置。

例如：在 `webpack.config.js` 中
添加 `devtool: 'inline-source-map'`。

### 自动编译代码

每次更新完代码，都要手动运行 `npm run build` 进行编译显得特别麻烦。

`webpack` 提供几种可选方式，帮助你在代码发生变化后自动编译：

* `webpack watch mode`，

  自动编译，需刷新浏览器。

  如果不想在 `watch` 触发增量构建后删除 `index.html` 文件，
  可以配置 `new CleanWebpackPlugin({ cleanStaleWebpackAssets: false })`

* `webpack-dev-server` （常用）实时重新加载

  提供一个简单的 `web server`，并且具有 `live reloading` （实时重新加载）功能。

  首先安装依赖包

  ```
  npm i webpack-dev-server -D
  ```

  修改配置文件，告知 `dev server`，从什么位置查找文件：

  webpack.config.js

  ```
  devServer: {
    contentBase: './dist',
  },
  ```

  以上配置告知 `webpack-dev-server`，将 `dist` 目录下的文件 **`serve`** 到 `localhost:8080` 下。
  （`serve` : 将资源作为`server` 的可访问文件）

  `webpack-dev-server` 在编译后不会写入到任何输出文件。
  而是将 `bundle` 文件保留到内存中，然后将他们 `serve` 到 `server` 中，就好像他们是挂载在 `server` 根路径上的真实文件一样。
  如果你的页面希望在其它不同路径中找到 `bundle` 文件，则可以通过`dev server` 配置中的 `publicPath` 选项进行修改。

* `webpack-dev-middleware`

  一个封装器，可以把 `webpack` 处理过的文件发送到一个 `server`。 `webpack-dev-server` 内部使用了它。

  首先安装依赖包

  ```
  npm i express webpack-dev-middleware -D
  ```

  调整配置文件 `webpack.config.js`

  ```
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
  +   publicPath: '/',
    },
  ```

  新建 `server.js` 创建 `server`。

  ```
  const express = require('express');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');

  const app = express();
  const config = require('./webpack.config.js');
  const compiler = webpack(config);

  // 告知 express 使用 webpack-dev-middleware，
  // 以及将 webpack.config.js 配置文件作为基础配置。
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));

  // 将文件 serve 到 port 3000。
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
  });
  ```

  添加快捷命令

  package.json

  ```
  "server": "node server.js",
  ```

## 代码分离

代码分离、预加载/预获取和bundle分析

### 分离方法

* 入口起点：使用 `entry` 配置手动分离代码
* 防止重复：使用 `splitChunksPlugin` 去重和分离 `chunk`
* 动态导入：通过模块的内联函数调用来分离代码
