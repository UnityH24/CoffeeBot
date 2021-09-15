const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const { token } = require("./config.json")
const prefix = 'do '
const help = "coffeerate: rates your coffee\ncoffee: beg for coffeebeg\nping: Find out!\ngoogle: get me to google something\nkick: kick a user from the server\nhi: make me say hi to you\nhelp: bring up this menu"
const author = "UnityH#2310"


client.once("ready", () => {
    console.log(`${client.user.tag} is online`);
});

client.on("message", message => {
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

    var args = message.content.slice(prefix.length).split(/ /);
    var command = args.shift().toLowerCase();


    if (command === "ping") {
        message.channel.send("pong!");
    }

    else if (command === "google") {
        if (args.length > 0) {
            message.channel.send("google it yourself you lazy fuck");
        }
        else {
            message.channel.send("You didn't even say what you want me to google dumbass");
        }
    }

    else if (command === "hi") {
        message.channel.send(`Hi, ${message.author.toString()}`);
    }

    else if (command === "coffeebeg" && args.length == 0) {
        message.channel.send(`@everyone ${message.author.tag} is begging for coffee ☕ LMAO!`);
    }

    else if (command === "kick" && message.guild) {      
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

                        console.error(err);
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

    else if (command === "coffeerate") {
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

    else if (command === "help") {
        message.channel.send(help)
    }

    else if (command === "author") {
        message.channel.send(`This bot was created by ${author} on September 14.`)
    }
});


client.login(token);
