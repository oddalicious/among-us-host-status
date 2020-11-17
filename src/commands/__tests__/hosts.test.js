import hosts from '../hosts.js'
import * as amongUsPresence from '../../presences/among-us.js'

describe('Hosts command', () => {
    it('messages the channel that there are no hosts when hostStrings is empty', () => {
        const message = {
            channel: {
                send: jest.fn(),
            },
        }
        jest.spyOn(amongUsPresence, 'getHostStrings').mockReturnValue([])

        hosts.execute(message)

        expect(message.channel.send).toHaveBeenCalledWith(
            'No hosts in this Guild currently hosting Among Us!'
        )
    })

    it('sends the list provided by getHostStrings', () => {
        const message = {
            channel: {
                send: jest.fn(),
            },
        }
        jest.spyOn(amongUsPresence, 'getHostStrings').mockReturnValue([
            'testing one two three',
            'Bob is hosting a round of among us at abc123',
        ])

        hosts.execute(message)

        expect(message.channel.send).toHaveBeenCalledWith([
            'testing one two three',
            'Bob is hosting a round of among us at abc123',
        ])
    })
})
