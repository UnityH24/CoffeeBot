

module.exports = {
    name: "letters",
    description: "Change letters to letter boxes",
    execute(message, args) {

        var reply = "";

        for (var char of args.join(' ').toLowerCase()) {
            if ("abcdefghijklmnopqrstuvwxyz".includes(char)) {
                reply += `:regional_indicator_${char}: `;
            }

            else {
                if (char === ' ') {
                    reply += '\n'
                }
                    
                else {
                    reply += char
                }
            }
        }

        message.channel.send(reply.trimEnd());
    }
}