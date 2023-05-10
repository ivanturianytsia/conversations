import { config } from 'dotenv'
import { Conversation } from './conversation'
import { Actor } from './actor'

config()

async function init() {
  Actor.baseInstruction = `
  When you think the coversation is over, say "END OF CONVERSATION".
  `
  Actor.temperature = 0.5

  const conversation = new Conversation([
    new Actor(
      'User 1',
      `
      We are playing charades. You are thinking of the word "Spain". The user is trying to guess where you are from. You can only answer yes or no.
      `
    ),
    new Actor(
      'User 2',
      `
      We are playing charades. Ask the user yes or no questions to guess where they are from. When you think you know the answer, say it.
      `
    ),
  ])

  conversation.talk("Let's play! Is this country big?")
}

init()
