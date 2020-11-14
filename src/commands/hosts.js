import { getHosts } from '../presences/among-us.js'

export default {
    name: 'hosts',
    description:
        'Displays a list of the players in the Discord server hosting a lobby of Among Us',
    args: false,
    execute: (message, _args) => {
        const output = getHosts(message)

        if (output.length > 0) {
            return message.channel.send(output)
        }

        return message.channel.send(
            'No hosts in this Guild currently hosting Among Us!'
        )
    },
}
