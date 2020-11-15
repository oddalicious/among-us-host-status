import { hostAdded, hostRemoved, hostsInGuild } from '../store/hostsSlice.js'
import store from '../store/store.js'

export default {
    name: 'among-us-host-presence',
    description:
        'Stores the lobby and ID of people hosting Among Us lobbies on the server',
    args: false,
    requirementsMatch: (oldPresence, newPresence) => {
        const appId =
            newPresence?.activities[0]?.applicationID ||
            oldPresence.activities[0]?.applicationID

        const newActivity = newPresence?.activities[0] || {}
        const oldActivity = oldPresence?.activities[0] || {}

        if (appId !== '477175586805252107') {
            return false
        }

        if (
            newActivity?.details === 'Hosting a game' ||
            oldActivity.details === 'Hosting a game'
        ) {
            return true
        }

        return false
    },
    execute: (oldPresence, newPresence, store) => {
        const newActivity = newPresence?.activities[0]
        const oldActivity = oldPresence?.activities[0]

        if (oldActivity?.details === newActivity?.details) {
            return
        }

        if (newActivity?.details === 'Hosting a game') {
            addHost(newPresence, store)
        } else if (oldActivity?.details === 'Hosting a game') {
            removeHost(oldPresence, store)
        }
    },
}

const addHost = (presence) => {
    const { id: partyId } = presence.activities[0].party
    const { id: guildId } = presence.guild
    const { username, id: hostId } = presence.user
    store.dispatch(hostAdded({ partyId, username, guildId, id: hostId }))
}

const removeHost = ({ user: { id } }) => {
    store.dispatch(hostRemoved({ id }))
}

export const getHosts = ({ guild }, store) => {
    const hosts = hostsInGuild(store.getState(), guild.id)

    return hosts.map((host) => {
        const channel = guild.channels.cache.find(
            (channel) =>
                channel.type === 'voice' &&
                channel.members.find((member) => member.id === host.id)
        )

        if (channel) {
            return `${host.username} is hosting ${host.partyId} in ${channel.name}`
        }

        return
    })
}
