module.exports = {
    name: "ping",
    description: "ping a member",
    execute(message, args) {
        var user = message.mentions.users.first();

        if (user === undefined || !user) {
            message.channel.send("That user isn't in the server");
            return;
        }

        message.channel.send(`${user.toString()} ${message.author.toString()} just pinged you`);
    }
}