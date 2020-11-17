import amongUsPresence from './presences/among-us.js'

export const presenceHandler = (oldPresence, newPresence) => {
    if (amongUsPresence.requirementsMatch(oldPresence, newPresence)) {
        amongUsPresence.execute(oldPresence, newPresence)
    }
}
