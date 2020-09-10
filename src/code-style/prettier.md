# prettier

## 作用

强制性的代码格式化，将你的代码解析后，以自己的方式输出代码。
`prettier` 很不情愿地提供了少量属性可配置，始皇般霸气！

## 项目中如何使用

1. 安装 `prettier`

    ```
    npm install prettier
    ```

1. 检测

    ```
    npx prettier --check .
    ```

1. 纠正

    ```
    npx prettier --write .
    ```

1. 创建文件 `.prettierignore` 或添加注释 `prettier-ignore` 来忽略检测。

## `vscode` 中使用

安装扩展 `prettier` ，之后会自动变为默认格式化程序，格式化快捷键 `alt + shift + f` 。
如果需要保存时自动格式化，修改设置 -> 文本编辑器 -> 自动格式化，勾选 `Format on Save` 。

## 配置介绍

尽管 `prettier` 是 **opinionated** 的，但是也提供了少量的配置。
通过添加 `.prettierrc.js` 文件来修改配置。

[官方配置说明](https://prettier.io/docs/en/options.html)

配置属性解释

```
modules.exports = {
  printWidth: 80, // 每行代码最大长度
  tabWidth: 2, // 每一个tab产生的空格数
  useTabs: false, // 是否使用tab
  semi: true, // 语句末尾添加分号
  singleQuote: false, // 使用单引号
  quoteProps: 'as-needed', // 对象属性加引号，as-needed|consistent|preserve
  jsxSingleQuote: false, // 在JSX中使用单引号
  trailingCommas: , // 尾逗号，none|es5|all, 2.0.0之前默认值是none
  bracketSpacing: true, // 对象声明的花括号前后输出空格
  jsxBracketSameLine: false, // 多行JSX元素位于最后一个元素的末尾
  arrowParens: 'always', // 箭头函数只有一个参数时添加括号， avoid|always 2.0.0之前默认值是avoid
  endOfLine: 'lf', // 换行符，lf|crlf|cr|auto，2.0.0之前默认值是auto
  htmlWhitespaceSensitivity: 'css', // 空格敏感度 css|strict|ignore，推荐ignore
}
```

可以在 [PlayGround](https://prettier.io/playground) 实验各种配置的不同效果。

## js 推荐配置

```
singleQuote: true,
trailingCommas: "es5",
arrowParens: 'always',
htmlWhitespaceSensitivity: 'ignore',
```

## 参考文献

- [Prettier 官网](https://prettier.io/)
- [prettier 配置翻译](https://segmentfault.com/a/1190000012909159)
