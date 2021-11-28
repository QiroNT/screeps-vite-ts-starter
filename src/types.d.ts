/**
 * 这里是一些类型示例，你可以自行增减调整这些类型。
 * 注意：写在这里的只是类型声明，并不代表在代码中能一定读的到对应字段，在使用的时候赋值的工作还是一定要做。
 *      例如如果要使用 creep.memory 的 role 字段，你需要在 spawnCreep 的时候指定 memory 中的 role。
 * 这里标注的类型会和 `@types/screeps` 中的类型声明合并，所以这样就能在 `@types/screeps` 的基础上做拓展。
 */

// 为 Memory 指定类型
interface Memory {
  uuid: number
  log: any
}

// 为 creep.memory 指定类型，其余同理
interface CreepMemory {
  role: string
  room: string
  working: boolean
}
interface FlagMemory {}
interface PowerCreepMemory {}
interface RoomMemory {}
interface SpawnMemory {}

// 为挂载到 global 的对象指定类型，这些对象可以在游戏内控制台使用
// (这里的例子是 global.log)
declare namespace NodeJS {
  interface Global {
    log: any
  }
}
