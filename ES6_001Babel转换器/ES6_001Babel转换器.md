# ES6

## $\color{purple}{Babel转码器}$

**$\color{green}{1.Bable转码器的作用}$**

**Babel 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行。**

这意味着，你可以用 ES6 的方式编写程序，又不用担心现有环境是否支持。

**$\color{green}{2.Bable转码器的安装}$**

```javascript
    npm install --save-dev @babel/core
```

**$\color{green}{3.Bable转码器的配置文件(.babelrc)}$**

Babel 的配置文件是$\color{red}{.babelrc}$，存放在项目的根目录下。
使用 Babel 的第一步，就是配置这个文件。

**3.1.该文件用来设置转码规则和插件，基本格式如下。**

```javascript
{
  "presets": [],
  "plugins": []
}
```

**解析：**

**$\color{red}{presets}$：设定转码规则**

**3.2.官方提供以下的规则集，可以根据需要安装:**

```javascript

# 最新转码规则
$ npm install --save-dev @babel/preset-env

# react 转码规则
$ npm install --save-dev @babel/preset-react

```

**3.3.将这些规则加入配置文件 ($\color{red}{.babelrc}$):**

```javascript
  {
    "presets": [
      "@babel/env",
      "@babel/preset-react"
    ],
    "plugins": []
  }
```

**注意：**
所有 Babel 工具和模块的使用，都必须先写好($\color{red}{.babelrc}$)

**$\color{green}{4.命令行转码}$**

**Babel 提供命令行工具@babel/cli，用于命令行转码。**

**4.1.安装命令：**

```javascript
    npm install --save-dev @babel/cli
```

**4.2.基本使用：**

```javascript
 //转码结果输出到标准输出
 npx babel example.js
 //转码结果写入一个文件
 //--out-file 或 -o 参数指定输出文件
 npx babel example.js --out-file compiled.js
 //或者
 npx babel example.js -o compiled.js
 //整个目录转码
 //--out-dir 或 -d 参数指定输出目录
 npx babel src --out-dir lib
 //或者
 npx babel src -d lib
 //-s 参数生成source map文件
 npx babel src -d lib -s

```

**$\color{green}{5.babel-node模块}$**

- **@babel/node模块的babel-node命令，提供一个支持 ES6 的 REPL 环境。**
- **它支持 Node 的 REPL 环境的所有功能，而且可以直接运行 ES6 代码。**

**5.1.安装模块：**

```javascript
npm install --save-dev @babel/node
```

**5.2.进入 REPL 环境 (直接运行es6代码或es6脚本):**

```javascript
//直接运行es6代码
npx babel-node
(x => x * 2)(1)
2
//将上述代码创建到es6.js的脚本中，直接运行es6脚本
npx babel-node es6.js
2
```

**$\color{green}{6.babel/register模块}$**

- **@babel/register模块改写require命令，为它加上一个钩子。**
- **此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用 Babel 进行转码。**

**5.1.安装模块：**

```javascript
npm install --save-dev @babel/register
```

**5.2.模块的使用:**
转码文件之前
必须首先加载@babel/register。

```javascript
require('@babel/register');
// index.js内容
// (x => x * 2)(1)
require('./index.js');
```

当加载@babel/register和index.js转码文件后，就不需要对index.js进行转码了

```javascript
node index.js
2
```

**@babel/register只会对require命令加载的文件转码，而不会对当前文件转码。**
**另外，由于它是实时转码，所以只适合在开发环境使用。**

**$\color{green}{7.在线的REPL 在线编译器}$**

```javascript
https://babeljs.io/repl/#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=B4AgvAfCoFQgTEA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.9.0&externalPlugins=
```
