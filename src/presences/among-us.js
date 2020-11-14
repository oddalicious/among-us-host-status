export const hosts = {}

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
            return null
        }

        const user = guild.voiceStates.cache.find((voiceUser) => {
            return voiceUser.id === host.hostId
        })

        if (user) {
            return `${host.username} is hosting ${host.partyId}`
        }
    })
}

export const amongUsPresence = (oldPresence, newPresence) => {
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
}
