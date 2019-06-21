# React + LePage脚手架模板

## node/npm 安装

- 打开nodejs官网：[node下载](<https://nodejs.org/en/>)
- 点击下载完后，一路点安装 就安装完成了
- 然后打开-终端-输入node -v 会返回当前安装的版本号

## 项目依赖

- 因lePage上传的是私有仓库，所以需要使用nrm设置[gnpm](http://npm.test.gegejia.com/package/@lib/hello-world)源。ps：如果nrm安装失败请升级npm。

```jsx
npm install -g nrm
nrm ls
nrm add gnpm http://47.97.104.37:7001/
nrm use gnpm
nrm ls
npm install
```

## 调试

项目默认使用小区乐管理后台进行本地接口测试，开发人员需适配各项目环境。（本模板暂时只支持cookie模式，即公司统一登录方式）

### 模板代码配置

* confg/config.js 

```jsx
proxy: {
  '/api': {   // api是拦截标识与services配置头相同
    target: 'http://101.37.228.181/', // 配置成自己请求的服务ip
    ...
  },
},
```

* src/services/user.js 

```jsx
// 接口示例
export async function queryCurrent(data) {
  return request('/api/user/user', { // 配置接口地址，开头api与config文件保持相同
    method: 'POST',
    body: data
  });
}
```

### 启动

```jsx
npm start
```

### cookie共享设置

* 首先在测试环境登录好(eg: http://test-life-admin.51bushou.com)，不要关闭
* 切换host至本地：
  * 下载安装Gas Mask
  * 增加local配置：127.0.0.1 test-life-admin.51bushou.com  (ps：配置第一步的域名)
  * 保存后右上角切换到loacl配置，chrome打开[设置](chrome://net-internals/#sockets)，点击第二个按钮Flush socket pools，清楚host缓存
  * chrome切到第一步测试环境的标签页在域名后增加端口号（本地npm start后的端口号，eg：http://test-life-admin.51bushou.com:8000），回车。

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