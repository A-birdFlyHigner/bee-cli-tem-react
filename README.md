## bee-cli-tem-react

### 写在开头

> ​ 为保证项目顺利运行，请使用 [yarn](https://yarn.bootcss.com/) 进行 install

### 技术栈

> [typeScript](https://jkchao.github.io/typescript-book-chinese/) && [react](https://yuchengkai.cn/react/) && [webpack](https://www.webpackjs.com/) && [yaml](http://www.ruanyifeng.com/blog/2016/07/yaml.html) && less

### 工具库

> 1.  组件库：[Ant Design](https://ant.design/docs/react/introduce-cn)
> 2.  表单库：[lePage](https://fe-lebooks.gegejia.com/doc-lepage/leForm/)
> 3.  函数库：[lodash](https://www.lodashjs.com/docs/latest)
> 4.  时间库 [moment](http://momentjs.cn/docs/)

### 工程目录

```javascript
├── README.md
├── build 															//webpack 编译配置
├── config 															//工程暴露全局变量、主题等配置相关
│   ├── global.development.yml
│   ├── global.production.yml
│   ├── global.test.yml
│   ├── global.const.yml								//项目全局变量注入
│   ├── project.config.js								//webpack devServer 配置
│   └── theme.yml												//antd 自定义主题
├── public															// html模版
├── src
│   ├── api															//业务请求相关
│   ├── app.tsx													//项目入口
│   ├── components											//共享组件组件
│   ├── layouts
│   ├── routers													//路由规则
│   ├── stores													//全局store
│   ├── styles
│   ├── utils
│   └── views														//视图目录
├── global.d.ts													//typescript 全局路径
├── package.json
├── postcss.config.js
├── tsconfig.json
└── webpack.config.js										//webpack入口

```

### 编程规约

##### 命名规约

> 视图命名：采用小驼峰规则 ：**myFirstName**
>
> 组件命名：采用大驼峰规则： **MyFirstName**
>
> 方法名、参数名，遵循 lowerCamelCase 风格，首字母小写： getHttpMessage() / value
>
> 样式类名借鉴 BEM 方法，使用下划线分割：header_nav_icon
>
> 一个视图对应一个文件夹，文件夹下依据业务需要可存在:
>
> ├ components // 当前业务组件
>
> ├ config // lepage 相关配置
>
> ├ style.scss //页面样式
>
> └ index.tsx. //默认视图入口

##### 引用路径规约

> 如需引用 src/ 下的文件，如 api、components、utils 等... 通过@别名应用 : @components
>
> 当前业务的文件/组件，使用相对路径即可。

### 业务快速开发

##### 新建导航

```javascript
//目前导航暂时前端管理，临时路径为：src/layouts/menu.ts， 根据导航关系进行添加
 {
   name: '投放中心',
   icon: 'pay-circle',
   path: 'delivery',
   children: [
     {
       name: '页面列表',
       path: 'pageList'
     }
 }
```

##### 新建路由

```javascript
// 路径：src/routers
│   ├── routers
│   │   ├── page1
│   │   ├── page2
│   │   └── routes.ts				 // *根据业务模块 在views下创建 当前业务routes.ts 文件
 {
    path: '/delivery/resourcesList',
    component: () => import('@views/delivery/resourcesList')
  },
```

##### 网络请求

```javascript
//待完善
```

