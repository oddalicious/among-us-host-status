import { bootClient } from './boot.js'
import { CommandHandler } from './command-handler.js'
import { PresenceSwitcher } from './presence-switcher.js'
import store from './store/store.js'

const client = bootClient()

client.on('ready', () => {
    console.log('Client connected as', client.user.username)
    client.user.setActivity('!among hosts')
})

client.on('message', (message) => CommandHandler(message, store))

client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (newPresence?.user?.bot) {
        return false
    }

    PresenceSwitcher(oldPresence, newPresence, store)
})
