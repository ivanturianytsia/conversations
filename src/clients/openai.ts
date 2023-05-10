import { Configuration, OpenAIApi } from 'openai'

export interface Message {
  role: 'system' | 'assistant' | 'user'
  content: string
}

export async function getCompletion(messages: Message[], temperature = 0) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_TOKEN,
  })
  const openai = new OpenAIApi(configuration)

  const result = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    temperature,
  })

  return result.data.choices[0].message?.content!
}
