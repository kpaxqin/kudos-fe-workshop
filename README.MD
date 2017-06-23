Kudos
=======

## 运行
Run `npm start` for dev and `npm run build` for build production bundle.

## 目录结构
* `src`: 源代码
  * `.jsx`: 包含jsx语法的文件,  
  * `.less`: 样式文件
  * `__tests__`: 单元测试文件夹
    * `.specs.js(x)`: 单元测试
* `test`: 运行测试的基础设施
* `mock`: 前端Mock数据脚本
* `webpack`: webpack 配置 
* `_dist`: 打包输出路径
* `coverage`: 测试覆盖率路径

## 技术方案

* [es2015](https://babeljs.io/learn-es2015/) + [stage-1](https://babeljs.io/docs/plugins/preset-stage-1/) + JSX : 语言规范
* [React](https://facebook.github.io/react/) : 视图层
* [Redux](reduxjs.org) : 状态管理
* [Lodash](lodash.com/docs) : 工具函数库
* [Less](http://lesscss.org/) : CSS预处理
* [bootstrap](getbootstrap.com) : 基础样式
* [React-Router](https://reacttraining.com/react-router/) : 路由 **可能替换**
* [Dyson](https://github.com/webpro/dyson) : API数据Mock
* [Webpack](webpack.github.io) : 打包工具
* [React-bootstrap](react-bootstrap.github.io) : 基础组件库

## 概述

### 基础架构

![architechture](http://oqt8yhdub.bkt.clouddn.com/arch.png)

*架构图*

本项目使用React作为视图层库，React在社区和公司内都有较广泛的群众基础，学习和推广成本都较低。

使用React-bootstrap作为基础组件库，样式上也用了bootstrap的第三方主题。这是考虑到Bootstrap能够在保证较高UI风格一致性的前提下加快开发效率，且有大量第三方主题方便各项目组定制。

同时使用Redux作为状态管理框架，它在提倡纯函数、强可预测性方面有显著的竞争力，上图`Page`-> `Action creator`-> `Action`-> `store`即是其单向数据流思想的体现(虚线圆环)。

使用React-Router作为路由库，但抛弃了官方推荐的`路由即组件`，转而采用了扁平、集中的路由，如上图所示，在架构中路由是完全独立的一部分，不侵入组件代码，仅仅承担url到Page的转发作用。

### 代码结构

``` 
src
├── store : 业务模块
│   ├── actions : *action目录，可选，可为单文件
│   ├── components : 组件目录
│   │   ├── StoreList.jsx : 业务组件
│   │   └── StoreList.less : 业务组件对应样式，同文件名不同后缀
│   ├── constants : *常量目录，可选，可为单文件
│   ├── pages : 页面
│   │   ├── List.jsx : 列表页
│   │   └── Detail.jsx : 详情页
│   ├── reducers : *reducer目录，可选，可为单文件
│   └── index.js  业务模块的入口文件，默认导出所有pages
├── shared : 通用组件、工具文件夹
├── routes.jsx : 路由配置
├── index.tpl.html : 项目html模板
└── index.jsx : 项目入口文件
```

## 入门示例
下面以创建一个页面`localhost:3000/management-web/example`为例

> 代码在项目的example分支

### 创建页面

首先创建`src/example/pages/Hello.jsx`和`src/example/index.js`文件：

```js
//src/example/pages/Hello.jsx
import React from 'react';

const Hello = () => (<div>Hello</div>);

export default Hello;
```

```js
//src/example/index.js
import Hello from './pages/Hello';

export default { Hello };
```

然后在路由中添加example页的路由配置(以下为示例代码，具体见example分支)：

```js
import { Route, Switch } from 'react-router-dom';
import Example from './example';

export default function getRoutes() {
  return (
    <Switch>
      {/* other configs */}
      <Route exact path="/example" component={Example.Hello} />
    </Switch>
  )
}
```

在完成这些工作后，`npm run start`启动项目，然后打开 `localhost:3000/management-web/example`就能看到刚刚新建的页面了。

### 添加redux

在实际工作中，我们需要为页面添加交互，这时候就需要使用redux来管理状态。

以添加一个简单的点击计数为例：

```js
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createAction } from 'redux-action-tools';
import { withRedux } from '../../shared/redux';

const Hello = ({ count, addCountAction }) => (
  <div>
    Hello, current count is : {count}
    <button onClick={addCountAction}>Click to add</button>
  </div>
);

Hello.propTypes = {
  count: PropTypes.number.isRequired,
  addCountAction: PropTypes.func.isRequired,
};

// action type字符串
const EXAMPLE_ADD_COUNT = 'EXAMPLE_ADD_COUNT';

// 创建action
const addCountAction = createAction(EXAMPLE_ADD_COUNT);

//这里我们嵌套使用了高阶组件，等效于: const hoc1 = connect(config)(Comp), hoc2 = withRedux(config)(hoc1);
//withRedux是初始化redux的高阶组件，具体见参考手册-Redux实践
export default withRedux({
  pageReducers: { 
    count: (state = 0, action) => {
      switch (action.type) {
        case EXAMPLE_ADD_COUNT: return state + 1;
        default: return state;
      }
    },
  },
})(connect(state => state, { addCountAction })(Hello)); //这里嵌套使用了高阶组件，

```

> 本项目大量使用高阶组件作为复用手段，[不了解？](https://segmentfault.com/a/1190000004598113)

嵌套的函数阅读和维护体验非常差，对此我推荐使用[lodash.flowRight](https://lodash.com/docs/4.17.4#flowRight)重构：

```js
import {flowRight} from 'lodash';

const decoraters = flowRight(
  withRedux({
    pageReducers: {
      count: (state = 0, action) => {
        switch (action.type) {
          case EXAMPLE_ADD_COUNT: return state + 1;
          default: return state;
        }
      },
    },
  }),
  connect(state => state, { addCountAction }),
);
	
export default decoraters(Hello);
```

它的本质是函数式编程中的[`组合(compose)`](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch5.html)

### 配置布局

在实际项目中，如果用户已经登录。在系统内往往是多个页面共用一套布局框架，在页面间高度重复的`导航`、`用户信息`、`退出系统`等功能都在公共布局区域内完成，如下图：

![layout](http://oqt8yhdub.bkt.clouddn.com/layout.jpeg)

通常情况下页面只需要关注`功能区`的开发即可。

下面我们就把刚才开发的页面"嵌入"到项目的布局(名为dashboard)中去：

```js
// src/example/pages/Hello.jsx
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { createAction } from 'redux-action-tools';
import { withRedux } from '../../shared/redux';

// 引入dashboard layout
import { layoutWrapper } from '../../shared/dashboard'; 

const Hello = ({ count, addCountAction }) => (
  <div>
    Hello, current count is : {count}
    <button onClick={addCountAction}>Click to add</button>
  </div>
);

Hello.propTypes = {
  count: PropTypes.number.isRequired,
  addCountAction: PropTypes.func.isRequired,
};

const EXAMPLE_ADD_COUNT = 'EXAMPLE_ADD_COUNT';

const addCountAction = createAction(EXAMPLE_ADD_COUNT);

const decoraters = flowRight(
  withRedux({
    pageReducers: {
      count: (state = 0, action) => {
        switch (action.type) {
          case EXAMPLE_ADD_COUNT: return state + 1;
          default: return state;
        }
      },
    },
  }),
  layoutWrapper, //在withRedux后加入layoutWrapper
  connect(state => state, { addCountAction }),
);
	
export default decoraters(Hello);
```

利用高阶组件，整个复用只需要两行代码。

这里的重点是需要**注意高阶组件的顺序问题**，layoutWrapper依赖了store.currentUser(展示用户信息用)，因此需要放在withRedux之后，而connect(config)是直接被Hellow组件使用的，因此需要放在最末。

高阶组件的嵌套关系如下图：

![hoc](http://oqt8yhdub.bkt.clouddn.com/hoc.jpeg)

>熟悉高阶组件的嵌套关系需要一定练习，通过Chrome的React devtool查看组件树能提供非常大的帮助。


### 鉴权与导航

然而完成上面的步骤后，刷新页面，你会发现自己被重定向到了其它页面。

这是由于layoutWrapper不仅仅是单一的"布局"，也封装了鉴权相关的逻辑，一旦当前页面与用户权限不符，会立即跳转到登录页或用户有权限的其它页面。

要解决这个问题，需要在`src/shared/constants/navigation.js`中添加example页的配置：

```js
const MenuConfig = {
  id: 'root',
  name: 'Home',
  link: '/',
  icon: 'fa-home',
  children: [
    //...other  configs
    {//作为根结点的直接子元素，即第一级导航
      id: 'example',
      name: 'Example', // 在菜单、面包屑中显示的名称
      link: '/example', //页面的链接，如果是类似/user/:id的页面则配置为 pattern: '/user/:id'
      permissions: ['MANAGER'], // 权限配置，若用户拥有至少一个此数组中声明的权限，则可访问此页面，否则将被重定向
    },
  ]
}
```

在完成配置后，重新访问example页不仅能够正常显示，还可以看到左侧的导航栏多出了Example链接并且处于active状态。

>navigation.js从设计上类似于站点地图，借助它我们可以简单地声明整个应用的链接和它们的父子关系、权限控制。
>
>与路由不同的是它面向展示和业务，在路由中声明这些信息容易臃肿和不灵活，因此我们倾向于将它们分离。
>
>进一步的设计思路见参考手册

### 小结

以上是入门示例的全部内容，展示了如何通过简单的配置就引入状态管理方案、通用布局、导航与鉴权，完成这些内容后应该可以开始初步的业务开发。

如果在开发过程中遇到问题，或者对项目某部分有疑问，请查阅[参考手册](https://kpaxqin.gitbooks.io/cookbook/content/)