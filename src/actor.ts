import { Message, getCompletion } from './clients/openai'

export class Actor {
  public static baseInstruction = ''
  public static temperature = 0

  public context: Message[] = []
  public systemInstruction: string

  constructor(public name: string, additionalInstruction: string) {
    this.systemInstruction = `${Actor.baseInstruction} ${additionalInstruction}`

    this.context.push({
      role: 'system',
      content: this.systemInstruction,
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
