/**
 * 校正异常的堆栈信息
 *
 * 由于 rollup 会打包所有代码到一个文件，所以异常的调用栈定位和源码的位置是不同的
 * 本模块就是用来将异常的调用栈映射至源代码位置
 * 
 * @see https://github.com/screepers/screeps-typescript-starter/blob/master/src/utils/ErrorMapper.ts
 */

import { SourceMapConsumer } from 'source-map'

export class ErrorMapper {
  // 进行缓存
  private static _consumer?: SourceMapConsumer

  public static get consumer(): SourceMapConsumer {
    if (this._consumer == null) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      this._consumer = new SourceMapConsumer(require('main.js.map'))
    }

    return this._consumer
  }

  // 缓存映射关系以提高性能
  public static cache: { [key: string]: string } = {}

  /**
   * 使用源映射生成堆栈跟踪，并生成原始标志位
   * 警告 - global 重置之后的首次调用会产生很高的 cpu 消耗 (> 30 CPU)
   * 之后的每次调用会产生较低的 cpu 消耗 (~ 0.1 CPU / 次)
   *
   * @param {Error | string} error 错误或原始追踪栈
   * @returns {string} 映射之后的源代码追踪栈
   */
  public static sourceMappedStackTrace(error: Error | string): string {
    const stack: string = error instanceof Error ? (error.stack as string) : error
    if (Object.prototype.hasOwnProperty.call(this.cache, stack)) {
      return this.cache[stack]
    }

    // eslint-disable-next-line no-useless-escape
    const re = /^\s+at\s+(.+?\s+)?\(?([0-z._\-\\\/]+):(\d+):(\d+)\)?$/gm
    let match: RegExpExecArray | null
    let outStack = error.toString()

    while ((match = re.exec(stack))) {
      if (match[2] === 'main') {
        const pos = this.consumer.originalPositionFor({
          column: parseInt(match[4], 10),
          line: parseInt(match[3], 10),
        })

        if (pos.line != null) {
          if (pos.name) {
            outStack += `\n    at ${pos.name} (${pos.source}:${pos.line}:${pos.column})`
          } else {
            if (match[1]) {
              // 源文件没找到对应文件名，采用原始追踪名
              outStack += `\n    at ${match[1]} (${pos.source}:${pos.line}:${pos.column})`
            } else {
              // 源文件没找到对应文件名并且原始追踪栈里也没有，直接省略
              outStack += `\n    at ${pos.source}:${pos.line}:${pos.column}`
            }
          }
        } else {
          // 无法定位
          break
        }
      } else {
        // 处理结束了
        break
      }
    }

    this.cache[stack] = outStack
    return outStack
  }

  /**
   * 错误追踪包装器
   * 用于把报错信息通过 source-map 解析成源代码的错误位置
   *
   * @param loop 玩家代码主循环
   */
  public static wrapLoop(loop: () => void): () => void {
    return () => {
      try {
        loop()
      } catch (e) {
        if (e instanceof Error) {
          if ('sim' in Game.rooms) {
            const message = `沙盒模式无法使用 source-map - 显示原始追踪栈`
            console.log(`<span style='color:red'>${message}<br>${_.escape(e.stack)}</span>`)
          } else {
            console.log(
              `<span style='color:red'>${_.escape(this.sourceMappedStackTrace(e))}</span>`
            )
          }
        } else {
          // 处理不了，直接抛出
          throw e
        }
      }
    }
  }
}
