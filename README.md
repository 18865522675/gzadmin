> 客房管理端 4.1

# 【简要】
#### 项目环境
``vue-cli 3.0 [vue 2.5.16, vue-router 3.0.1, vuex 3.0.1]``
#### 代码规范
``eslint-prettier``
```
yarn serve lint //整理代码
```
#### 目录结构
```

```
# 【操作】
#### 环境安装
node.js 安装 https://nodejs.org/en/ (LTS)
##### 设置npm国内镜像
```
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```
#### vue脚手架安装
```
npm install -g @vue/cli
```
#### yarn安装
```
npm install -g yarn
```
##### 设置yarn国内镜像
```
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```
#### 初始化项目 (进入项目根目录)
```
npm install
// OR
yarn
```
#### 运行
```
npm run serve
// OR
yarn serve
```
#### 编译
```
npm run build
// OR
yarn build
```
# 【资料】
##### npm常用语句
```
# 初始化
npm install

# 运行
npm run <命令>

# 添加模块 dependencies (生产)
npm install <packageName> --save

# 添加模块 devDependencies (开发)
npm install <packageName> --save–dev

# 全局安装
npm install <packageName> -g

# 删除模块
npm uninstall <packageName>

# 更新所有模块版本
npm update <packageName>
```

##### yarn常用语句
```
# 初始化
yarn

# 运行
yarn <命令>

# 添加模块 dependencies (生产)
yarn add <packageName>

# 添加模块 devDependencies (开发)
yarn add <packageName> --dev

# 全局安装
yarn add <packageName> -g

# 删除模块
yarn remove <packageName>

# 更新所有模块版本
yarn upgrade <packageName>
```