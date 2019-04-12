# React + LePage脚手架模板

- 因lePage上传的是私有仓库，所以需要使用[gnpm](http://npm.test.gegejia.com/package/@lib/hello-world)安装依赖

```jsx
gnpm install
```

- 启动

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