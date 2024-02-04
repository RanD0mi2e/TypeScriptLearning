## 安装依赖

建议使用`pnpm i`进行依赖安装，pnpm强大，好！

## 运行ts

安装完依赖之后可以使用`ts-node`直接运行ts，推荐安装`Code Runner`插件，右上角点击运行或者Ctrl+Alt+N运行当前ts文件。

## 调试运行

可以打断点或者debugger之后使用F5进入调试运行，需要选择`TS_debug`作为vscode的调试配置

## 其他

如果未来遇到“是否需要更改目标库? 请尝试将 “lib” 编译器选项更改为“esxxxx”或更高版本。ts(2550)”错误，可以将`tsconfig.json`文件下`compilerOptions.target`修改为可兼容你所使用语法/api的版本