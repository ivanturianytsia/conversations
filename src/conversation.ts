import { Actor } from './actor'
import { Logger } from './logger'

export class Conversation {
  public logger: Logger

  constructor(public actors: [Actor, Actor]) {
    this.logger = new Logger()

    for (const actor of actors) {
      this.logger.log(actor.name, actor.seed)
    }
  }

  async talk(initialPhrase: string) {
    this.actors[1].say(initialPhrase)
    this.logger.log(this.actors[1].name, initialPhrase)

    let prevResponse = initialPhrase
    while (true) {
      for await (const actor of this.actors) {
        prevResponse = await actor.respond(prevResponse)
        this.logger.log(actor.name, prevResponse)

        await sleep()
      }
    }
  }
}

function sleep(timeSeconds = 20) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeSeconds * 1000)
  })
}
