// @ts-check
const fs = require('fs')
const path = require('path')
const screeps = require('rollup-plugin-screeps')

let cfg
const dest = process.env.DEST
if (!dest) {
  console.log('No destination specified - code will be compiled but not uploaded')
} else if ((cfg = require('./screeps.json')[dest]) == null) {
  throw new Error('Invalid upload destination')
}

// 这里的内容将始终注入在整个脚本之前
const banner = fs.readFileSync(path.join(__dirname, './src/banner.js'))

/**
 * Vite Configuration File
 * @type {import('vite').UserConfig}
 */
module.exports = {
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src/') }],
  },
  plugins: [
    // 自动上传代码
    // @ts-ignore
    screeps({ config: cfg, dryRun: cfg == null }),
  ],
  build: {
    // 脚本的最大大小限制是 1MB
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false,
    lib: {
      // 在这里指定脚本入口
      entry: path.resolve(__dirname, './src/index.ts'),
      formats: ['cjs'],
    },
    rollupOptions: {
      // 这里也需要指定一次
      input: 'src/index.ts',
      // 不要修改 output 的内容，除非你知道你在做什么
      output: {
        dir: undefined,
        file: 'dist/main.js',
        format: 'cjs',
        sourcemap: true,
        manualChunks: {},
        banner,
      },
    },
    sourcemap: true,
  },
}
