import { Configuration, OpenAIApi } from 'openai'
import { config } from 'dotenv'

config()

interface Message {
  role: 'system' | 'assistant' | 'user'
  content: string
}

class Actor {
  public context: Message[] = []

  constructor(
    public name: string,
    public seed: string,
    public initialMessage: string | null = null
  ) {
    let baseInstructions = `Give short, one-sentence answers.`
    baseInstructions += `Don't be too pushy.`
    baseInstructions += `Have a friendly and casual discussion.`
    baseInstructions += `Feel free to branch out to related topics.`

    this.name = name

    this.context.push({
      role: 'system',
      content: `${baseInstructions} ${seed}`,
    })

    if (initialMessage) {
      this.displayAnswer(initialMessage)

      this.context.push({
        role: 'assistant',
        content: initialMessage,
      })
    }
  }

  async respond(request: string) {
    this.context.push({
      role: 'user',
      content: request,
    })

    const response = await this.getCompletion()

    this.context.push({
      role: 'assistant',
      content: response,
    })

    this.displayAnswer(response)

    return response
  }

  async getCompletion() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_TOKEN,
    })
    const openai = new OpenAIApi(configuration)

    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: this.context,
      temperature: 1,
    })

    return result.data.choices[0].message?.content!
  }

  displayAnswer(message: string) {
    console.log(`\n### ${this.name}: `)
    console.log(message)
  }
}

export async function init() {
  let socialistResponse = 'Hey, how has your weekend been?'

  const capitalist = new Actor(
    'Capitalist',
    'You are a capitalist. You have to convince your friend that free market is the best way to distribute resources.'
  )
  const socialist = new Actor(
    'Socialist',
    'You are a socialist. You have to convince your friend that the goverment should care about the people.',
    socialistResponse
  )

  await sleep()

  while (true) {
    const capitalistResponse = await capitalist.respond(socialistResponse)
    await sleep()

    socialistResponse = await socialist.respond(capitalistResponse)
    await sleep()
  }
}

function sleep() {
  return new Promise((resolve) => {
    setTimeout(resolve, 20 * 1000)
  })
}

init()
