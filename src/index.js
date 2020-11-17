import { bootClient } from './boot.js'
import { CommandHandler } from './command-handler.js'
import { PresenceSwitcher } from './presence-switcher.js'

const client = bootClient()

client.on('ready', () => {
    console.log('Client connected as', client.user.username)
    client.user.setActivity('!among hosts')
})

client.on('message', (message) => CommandHandler(message))

client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (newPresence?.user?.bot) {
        return false
    }

    PresenceSwitcher(oldPresence, newPresence)
})
