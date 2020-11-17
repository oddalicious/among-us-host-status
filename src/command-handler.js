import config from '../config.json'
import { client } from './boot.js'

const fallback = (message) => {
    message.reply(
        `Known commands currently:
        > \`!among hosts\` - Display users in your server hosting a lobby of Among Us on voice chat.
        > \`!among clear\` - Clear hosts in your server from appearing in your list`
    )
}

export const CommandHandler = (message) => {
    const { prefix } = config

    const args = message.content.slice(prefix.length).trim().split(/ +/)

    if (!message.content.startsWith(prefix || message.author.bot)) return

    const commandName = args.shift().toLowerCase()

    if (!commandName) {
        return fallback(message)
    }

    if (!client.commands.has(commandName)) return

    const command = client.commands.get(commandName)

    try {
        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}`

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
            }

            return message.channel.sendreply()
        }
        command.execute(message, args)
    } catch (error) {
        console.error(error)
        message.reply('There was an error trying to execute that command!')
    }
}
