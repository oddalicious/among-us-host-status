import amongUsPresence from './presences/among-us.js'

export const PresenceSwitcher = (oldPresence, newPresence) => {
    if (amongUsPresence.requirementsMatch(oldPresence, newPresence)) {
        amongUsPresence.execute(oldPresence, newPresence)
    }
}
