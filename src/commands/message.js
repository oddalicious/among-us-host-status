export default {
    name: 'message',
    description: 'pings you',
    args: false,
    execute: (message, _args) => {
        message.author.send(`Stop being a nerd`)
    },
}
