/**
 * 这里的内容将始终注入在整个脚本之前，适合做一些真正运行前的工作
 */

console.log('脚本已重载')
if (Game.cpu.bucket < 200) {
  console.log(`剩余 CPU 过少，跳过脚本运行。 (bucket: ${Game.cpu.bucket})`)
  throw 'no time'
}
