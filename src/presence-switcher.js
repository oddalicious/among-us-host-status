import { amongUsPresence } from './presences/among-us.js'

export const PresenceSwitcher = (oldPresence, newPresence) => {
    const appId =
        newPresence?.activities[0]?.applicationID ||
        oldPresence.activities[0]?.applicationID

    if (appId === '477175586805252107') {
        amongUsPresence(oldPresence, newPresence)
    }
}
