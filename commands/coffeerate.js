module.exports = {
    name: "coffeerate",
    description: "Rates your coffee",
    execute(message, args) {
        var num = Math.floor(Math.random() * 101)
        if (num < 30) {
            message.reply("Wow your coffee is garbage");
        }

        else if (num < 50) {
            message.reply("This tastes awful");
        }

        else if (num < 70) {
            message.reply("Kinda average");
        }
        
        else if (num < 90) {
            message.reply("Whoa this tastes good, actually");
        }
        
        else if (num < 100) {
            message.reply("This is amazing coffee");
        }
        
        else {
            message.reply("Teach me your ways, coffee master.")
        }
    }
}