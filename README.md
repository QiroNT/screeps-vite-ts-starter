# Screeps + TypeScript + Vite 模板

这是一个使用 TypeScript + Vite 的 Screeps 模板，你可以从这个模板开始搭建自己的 Screeps AI。

## 基本使用

你需要在本地准备：

- [Node.js](https://nodejs.org/zh-cn/) (v12 及以上，推荐尽可能使用最新版)
- 一个能用的包管理器（自带的 npm 等都可以，这里推荐 [pnpm](https://pnpm.io/zh/)）

之后在[这里](https://github.com/QiroNT/screeps-vite-ts-starter/archive/master.zip)下载模板，解压到你要写代码的文件夹里。

在文件夹中打开系统终端，让你的包管理器安装这个模板需要的包。

```bash
# npm
npm i

# yarn
yarn

# pnpm
pnpm i
```

之后打开你的编辑器，开始你的 Screeps 之旅吧！

### Vite 与代码上传

这个模板使用 [Vite](https://vitejs.dev/) 来打包和上传代码。

Vite 底层使用 rollup 打包代码，所以适用于 rollup 的配置在此大多都适用。

复制或者重命名 `screeps.sample.json` 为 `screeps.json`，填上你的登录信息，也可以增减一些配置。

执行 `pnpm build` 会打包代码但不上传到 Screeps 服务器，
执行 `pnpm push-main` 会打包并将代码上传到 `screeps.json` 中 `main` 配置的服务器位置。

注：在上传代码到私有服务器时，你需要在服务端安装 [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth) 插件。

## TypeScript 类型

这个模板使用 [typed-screeps](https://github.com/screepers/typed-screeps) 的类型定义。
