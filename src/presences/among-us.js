import {
    hostAdded,
    hostRemoved,
    getHosts,
    getHostById,
    hostUpdated,
} from '../store/hosts-slice.js'
import store from '../store/store.js'

const amongUsHostHandler = {
    name: 'among-us-host-presence',
    description:
        'Stores the lobby and ID of people hosting Among Us lobbies on the server',
    args: false,
    requirementsMatch: (oldPresence, newPresence) => {
        const newActivity = fetchAmongUsActivity(newPresence)

        const oldActivity = fetchAmongUsActivity(oldPresence)

        if (oldActivity.details === newActivity.details) return false

        if (
            newActivity.details === 'Hosting a game' ||
            oldActivity.details === 'Hosting a game'
        ) {
            return true
        }

        return false
    },
    execute: (oldPresence, newPresence) => {
        const newActivity = fetchAmongUsActivity(newPresence)
        const oldActivity = fetchAmongUsActivity(oldPresence)

        if (oldActivity?.details === newActivity?.details) {
            return
        }

        if (newActivity?.details === 'Hosting a game') {
            handleHostAddition(newPresence)
        } else if (oldActivity?.details === 'Hosting a game') {
            removeHost(oldPresence)
        }
    },
}

const handleHostAddition = (presence) => {
    const host = getHostById(store.getState(), presence.user.id)
    if (host) {
        return updateHost(presence, host)
    }

    addHost(presence)
}

const fetchAmongUsActivity = (presence) =>
    presence?.activities?.find(
        (activity) => activity.applicationID === '477175586805252107'
    ) || {}

const addHost = (presence) => {
    const {
        party: { id: partyId },
    } = fetchAmongUsActivity(presence)
    const { displayName, id: hostId } = presence.member
    const { id: guildId } = presence.guild
    store.dispatch(
        hostAdded({ partyId, displayName, id: hostId, guilds: [guildId] })
    )
}

const updateHost = (presence, host) => {
    const { id: hostId } = presence.user
    const { id: guildId } = presence.guild
    const guilds = [...host.guilds, guildId]

    store.dispatch(hostUpdated({ id: hostId, changes: { guilds } }))
}

const removeHost = ({ user: { id } }) => {
    if (getHostById(store.getState(), id)) {
        store.dispatch(hostRemoved({ id }))
    }
}

export const getHostStrings = ({ guild }) => {
    const { id: guildId } = guild
    const hosts = getHosts(store.getState())

    return hosts
        .filter(
            (host) =>
                host.guilds.includes(guildId) &&
                guild.voiceStates.resolve(host.id)?.channelID
        )
        .map((host) => {
            return `${host.displayName} is hosting ${host.partyId} in ${
                guild.voiceStates.resolve(host.id)?.channel?.name
            }`
        })
}

export default amongUsHostHandler
