import amongUsPresence from './presences/among-us.js'

export const PresenceSwitcher = (oldPresence, newPresence, store) => {
    if (amongUsPresence.requirementsMatch(oldPresence, newPresence)) {
        amongUsPresence.execute(oldPresence, newPresence, store)
    }
}
