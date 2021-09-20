module.exports = {
    name: "shutdown",
    description: "shut down the bot ☹",
    async execute(message, args) {
        if (message.member.roles.cache.find(role => role.name === "ad men")) {
            await message.channel.send("Shutting down...")
            await process.exit();
        }

        else {
            message.channel.send("You don't have permissions to do that");
        }
    }
}