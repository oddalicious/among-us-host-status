import Discord from 'discord.js'
import dotenv from 'dotenv'
import fs from 'fs'
import config from './config.json'
import { PresenceSwitcher } from './src/presence-switcher.js'

dotenv.config()

var client = new Discord.Client()
client.commands = new Discord.Collection()

const commandFiles = fs
    .readdirSync('./src/commands')
    .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
    import(`./src/commands/${file}`).then(({ default: command }) => {
        client.commands.set(command.name, command)
    })
}

client.login(process.env.TOKEN)

client.on('message', (message) => {
    const { prefix } = config

    if (!message.content.startsWith(prefix || message.author.bot)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/)

    const commandName = args.shift().toLowerCase()

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
})

client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (newPresence?.user?.bot) {
        return false
    }

    PresenceSwitcher(oldPresence, newPresence)
})
