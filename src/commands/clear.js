import { clearHosts, getHosts, updateHosts } from '../store/hosts-slice.js'
import store from '../store/store.js'

export default {
    name: 'clear',
    description:
        'Displays a list of the players in the Discord server hosting a lobby of Among Us',
    args: false,
    execute: (message, _args) => {
        message.reply('Clearing hosts from this Server!')

        clearGuildFromHosts(message.guild.id)
    },
}

const clearGuildFromHosts = (guildId) => {
    const hosts = getHosts(store.getState())
        .filter((host) => host.guilds.includes(guildId))
        .map((host) => {
            const guilds = host.guilds.filter((element) => element !== guildId)
            return {
                id: host.id,
                changes: { guilds },
            }
        })

    const removableHosts = hosts
        .filter((host) => host.changes.guilds.length === 0)
        .map((host) => host.id)

    const updateableHosts = hosts.filter(
        (host) => host.changes.guilds.length > 0
    )

    store.dispatch(updateHosts(updateableHosts))

    if (removableHosts.length > 0) {
        store.dispatch(clearHosts(removableHosts))
    }
}
