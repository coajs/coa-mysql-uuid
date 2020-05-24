import { spawn } from 'cross-spawn'

export default new class {

  // 开始执行
  run = (cmd: string, ...args: string[]) => new Promise<string>((resolve, reject) => {

    const cp = spawn(cmd, [...args])

    let error = '', result = ''

    cp.on('error', s => error += s)
    cp.stdout.on('data', s => result += s)
    cp.stderr.on('data', s => error += s)

    cp.on('close', () => {
      if (error) reject(error.trim())
      else resolve(result.trim())
    })

  })
}