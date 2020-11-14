import fs from 'fs'

const commandSwitcher = () => {
    if (content.substring(0, 1) == '!') {
        const args = content.substring(1).split(' ')
        const cmd = args[0]

        switch (cmd) {
            default:
                break
        }
    }
}

export default commandSwitcher
