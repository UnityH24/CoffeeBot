module.exports = {
    name: "kick",
    description: "kick a member",
    execute(message, args) {
        var user = message.mentions.users.first();
        
        if (user) {
            var member = message.guild.member(user);

            if (member) {


                member
                    .kick(args.concat())
                    .then(() => {
                        message.channel.send(`Goodbye ${user.tag}`);
                    })
                    .catch(err => {
                        message.reply("Unable to kick member");
                    })
            }

            else {
                message.channel.send("Can't find that member");
            }
        }

        else {
            message.reply("Give me a person to kick moron.");
            console.log(message.content);
        }
    }
}