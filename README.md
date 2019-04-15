# React + LePage脚手架模板

## node/npm 安装

- 打开nodejs官网：[node下载](<https://nodejs.org/en/>)
- 点击下载完后，一路点安装 就安装完成了
- 然后打开-终端-输入node -v 会返回当前安装的版本号

## 项目依赖

- 因lePage上传的是私有仓库，所以需要使用[gnpm](http://npm.test.gegejia.com/package/@lib/hello-world)安装依赖

```jsx
gnpm install
```

## 启动

```jsx
npm start
```

## 目录结构

### common

- defaultSettings.js  项目默认配置
- defaultTheme.js 项目样式相关配置

### config

- config.js  项目结构设置，包含打包设置，代理设置等
- router.config.js  路由配置

### mock

- mock数据相关

### src

- components 公共组件存放位置
- layouts 布局相关
- pages 页面开发文件
- services api接口相关
- utils 工具类

### lepage文档

具体开发规范可以参考[lepage](https://fe-lebooks.gegejia.com/doc-lepage/leForm/)

ps：文档持续开发中