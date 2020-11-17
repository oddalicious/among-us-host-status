import { bootClient } from './boot.js'
import { commandHandler } from './command-handler.js'
import { presenceHandler } from './presence-handler.js'

const client = bootClient()

client.on('ready', () => {
    console.log('Client connected as', client.user.tag)
    client.user.setActivity('!among')
})

client.on('message', (message) => commandHandler(message))

client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (newPresence?.user?.bot) {
        return false
    }

    presenceHandler(oldPresence, newPresence)
})
