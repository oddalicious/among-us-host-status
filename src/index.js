import { bootClient } from './boot.js'
import { presenceHandler } from './command-handler.js'
import { presenceHandler } from './presence-handler.js'

const client = bootClient()

client.on('ready', () => {
    console.log('Client connected as', client.user.username)
    client.user.setActivity('!among hosts')
})

client.on('message', (message) => presenceHandler(message))

client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (newPresence?.user?.bot) {
        return false
    }

    presenceHandler(oldPresence, newPresence)
})
