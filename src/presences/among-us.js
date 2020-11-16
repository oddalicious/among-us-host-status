import {
    hostAdded,
    hostRemoved,
    getHosts,
    getHostById,
    hostUpdated,
} from '../store/hostsSlice.js'
import store from '../store/store.js'

const amongUsHostHandler = {
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
            handleHostAddition(newPresence, store)
        } else if (oldActivity?.details === 'Hosting a game') {
            removeHost(oldPresence, store)
        }
    },
}

const handleHostAddition = (presence, store) => {
    const host = getHostById(store.getState(), presence.user.id)
    if (host) {
        return updateHost(presence, host, store)
    }

    addHost(presence, store)
}

const addHost = (presence, store) => {
    const { id: partyId } = presence.activities[0].party
    const { username, id: hostId } = presence.user
    const { id: guildId } = presence.guild
    store.dispatch(
        hostAdded({ partyId, username, id: hostId, guilds: [guildId] })
    )
}

const updateHost = (presence, host, store) => {
    const { id: hostId } = presence.user
    const { id: guildId } = presence.guild
    const guilds = [...host.guilds, guildId]

    store.dispatch(hostUpdated({ id: hostId, changes: { guilds } }))
}

const removeHost = ({ user: { id } }) => {
    store.dispatch(hostRemoved({ id }))
}

export const getHostStrings = ({ guild }, store) => {
    const hosts = getHosts(store.getState())

    return hosts.map((host) => {
        if (!host.guilds.includes(guild.id)) {
            return
        }
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

export default amongUsHostHandler
