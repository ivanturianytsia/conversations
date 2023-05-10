import fs from 'fs'
import path from 'path'

export class Logger {
  private static logDirectory = 'logs/'
  public path: string

  constructor() {
    this.path = path.join(Logger.logDirectory, new Date().toISOString())
  }

  log(actor: string, message: string) {
    if (!fs.existsSync(Logger.logDirectory)) {
      fs.mkdirSync(Logger.logDirectory)
    }
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, '')
    }
    fs.appendFileSync(this.path, `### ${actor}:\n${message}\n\n`)
    console.log(`\n### ${actor}:`)
    console.log(message)
  }
}
