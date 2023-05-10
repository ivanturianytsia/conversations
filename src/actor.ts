import { Message, getCompletion } from './clients/openai'

export class Actor {
  public static baseInstructions = ''
  public static temperature = 0.5

  public context: Message[] = []
  public seed: string

  constructor(public name: string, seed: string) {
    this.seed = `${Actor.baseInstructions} ${seed}`

    this.context.push({
      role: 'system',
      content: seed,
    })
  }

  async say(message: string) {
    this.context.push({
      role: 'assistant',
      content: message,
    })
  }

  async record(message: string) {
    this.context.push({
      role: 'user',
      content: message,
    })
  }

  async respond(request: string) {
    this.record(request)

    const response = await getCompletion(this.context, Actor.temperature)
    this.say(response)

    return response
  }
}
