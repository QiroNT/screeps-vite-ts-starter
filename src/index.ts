import { ErrorMapper } from './utils/ErrorMapper'

// 报错的行号和文件名在使用 Vite 打包之后会发生变动，
// 这个 ErrorMapper 可以把变动后的位置转换回去
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`现在的游戏内 tick 数是 ${Game.time}`)

  // 自动删除不存在的 Creep 的 memory
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name]
    }
  }
})
