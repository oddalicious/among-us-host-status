import { clearHosts, getHosts, updateHosts } from '../store/hosts-slice.js'
import store from '../store/store.js'

export default {
    name: 'clear',
    description:
        'Clears your guild from the members currently hosting, this can be used to clean up stale hosts',
    args: false,
    execute: (message) => {
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
