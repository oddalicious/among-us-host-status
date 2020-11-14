export default {
    name: 'ping',
    description: 'Ping!',
    args: false,
    execute: (message, _args) => {
        message.channel.send('Pong.')
    },
}
