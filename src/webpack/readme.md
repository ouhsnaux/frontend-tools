# 打包工具

webpack

## 作用

本质上，webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。
当 webpack 处理应用程序时，它会在内部构建一个依赖图(dependency graph)，
此依赖图对应映射到项目所需的每个模块，并生成一个或多个 `bundle`。

建议先学 `npm`，对 `node` 有一些了解。

## 分类

`webpack` 是一个比较大的知识点，做了许多事，分为 6 部分来描述。建议按顺序读。

1. [指南]('./guide.md')，举例子告诉你如何用 `webpack` 解决问题。
2. 概念，从理论方面告诉你 `webpack` 是什么，能干嘛，怎么用。
3. loader，`webpack` 的一部分，处理特定的文件
4. plugin，额外的功能
5. config，教你使用webpack
6. api，教你写自己的plugin和loader
