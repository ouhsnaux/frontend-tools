# npm

## 作用

包管理工具，代码复用，可方便的使用别人的代码。

## 安装

安装 `node.js`。

## 使用

### 管理包

创建 `package.json` 配置文件,
在配置项 `dependencies` 中列出需要依赖的包及其版本。
在配置项 `devDependencies` 中列出仅在开发和测试环境需要依赖的包和版本。

在安装指定包的时候，会自动修改 `package.json` 文件。
当运行 `npm install lodash` 时，`package.json` 会在 `dependencies` 中添加 `lodash` 及最新版本。
运行 `npm install lodash --save-dev` 或 `npm i lodash -D` 会在 `devDependencies` 中添加包信息。

### 命令

* `init` 手动创建或使用 `npm` 自带的功能 `npm init` 回答问题创建文件，
如果全部默认可添加参数 `--yes`。
* `set` 可以使用 `npm set` 修改默认值。
* `config` 修改配置，修改源

  ```npm
  // 修改为淘宝源
  npm config set registry http://registry.npm.taobao.org/
  // 修改为官方源
  npm config set registry https://registry.npmjs.org/
  ```

* `install`

  ```npm
  npm install <package_name>
  ```

  如果 `package.json` 中含有此包，则将安装指定版本的包。
  否则，安装最新的包

* `uninstall`

  ```npm
  npm uninstall <pkg_name>
  ```

### 参数

* `-g` 全局
* `-D` 开发和测试环境
* `--save` 修改 `package.json` 文件

### 版本

包的版本号有三位，A.B.C

* A = Major releases，主版本，不同主版本的代码不保证兼容
* B = Minor releases，次版本，增加了新功能
* C = Patch releases，补丁版本，bug修复
* 后缀，引用不同开发阶段的代码，下面是一些约定，不一定严格遵守
  * alpha 内测
  * beta  公测
  * rc    预览

引用程序版本号的几种书写方式

* 不论版本号 `*` 或 `x`。
* 固定主版本 `1` 或 `1.x` 或 `^1.0.0`
* 固定主版本与测版本 `1.0` 或 `1.0.x` 或 `~1.0.0`
* 固定版本号 `1.0.0`
* 不同开发阶段的代码 `1.0.0-beta`

## 其它

### cnpm

使用淘宝镜像

### npx

在命令行中使用未全局安装的module。

```npm
// 普通方式，在本地安装mocha后，执行
node-modules/.bin/mocha --version

// npx方式，甚至不用提前安装
npx mocha --version
```

### yarn

与 `npm` 功能一致的包管理工具
