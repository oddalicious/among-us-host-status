export const hosts = {}

export default {
    name: 'among-us-host-presence',
    description:
        'Stores the lobby and ID of people hosting Among Us lobbies on the server',
    args: false,
    requirementsMatch: (oldPresence, newPresence) => {
        const appId =
            newPresence?.activities[0]?.applicationID ||
            oldPresence.activities[0]?.applicationID

        return appId === '477175586805252107'
    },
    execute: (oldPresence, newPresence, store) => {
        const newActivity = newPresence?.activities[0]
        const oldActivity = oldPresence?.activities[0]

        if (oldActivity?.details === newActivity?.details) {
            return
        }

        const targetChannel = newPresence.guild.channels.cache.get(
            '737528188145631262'
        )

        if (!targetChannel) {
            return
        }

        if (newActivity?.details === 'Hosting a game') {
            addHost(newPresence, targetChannel)
        } else if (oldActivity?.details === 'Hosting a game') {
            removeHost(oldPresence, targetChannel)
        }
    },
}

const addHost = (presence, targetChannel) => {
    const { id: partyId } = presence.activities[0].party
    const { id: guildId } = presence.guild
    const { username, id: hostId } = presence.user
    hosts[hostId] = { partyId, username, guildId, hostId }
}

const removeHost = (presence) => {
    const hostId = presence.user.id
    delete hosts[hostId]
}

export const getHosts = (message) => {
    const { guild } = message
    return Object.values(hosts).map((host) => {
        if (host.guildId !== guild.id) {
            return
        }

        const channels = guild.channels.cache.filter((c) => c.type === 'voice')
        let userFoundInVoice = false
        channels.forEach((channel) => {
            if (channel.members.find((member) => member.id === host.hostId)) {
                userFoundInVoice = true
                return
            }
        })

        if (userFoundInVoice) {
            return `${host.username} is hosting ${host.partyId}`
        }

        return
    })
}
