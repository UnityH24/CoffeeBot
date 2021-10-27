/* requires */
const fs = require("fs");
const Discord = require("discord.js");
const { token } = require("./config.json");
const { time, timeEnd } = require("console");
require("discord-reply");

/* constants used all over the program */
const client = new Discord.Client();
const prefix = 'cc ';


/* bot commands */
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for (var file of commandFiles) {
    var command = require(`./commands/${file}`);
    
    client.commands.set(command.name, command)
}


client.once("ready", () => {
    console.log(`${client.user.tag} is online`);
});

client.on("message", message => {
    if ((!message.content.toLowerCase().startsWith(prefix) || message.author.bot) && message.author.id == 309715097755058176) return;

    var args = message.content.slice(prefix.length).split(/ /);
    var command = args.shift().toLowerCase();

    if (command === "ping") {
        client.commands.get("ping").execute(message, args);
    }

    else if (command === "kick" && message.guild) {      
        client.commands.get("kick").execute(message, args);
    }

    else if (command === "coffeer8" || command === "cr" || command === "coffeerate") {
        client.commands.get("coffeerate").execute(message, args);
    }

    else if (command === "help") {
        client.commands.get("help").execute(message, args);
    }

    else if (command === "author") {
        message.channel.send(`${message.author.toString()} https://github.com/UnityH24`);
    }

    else if (command === "shutdown") {
        client.commands.get("shutdown").execute(message, args);
    }

    else if (command === "play") {
        client.commands.get("play").execute(message, args, Discord);
    }
    else if (command === "chess") {
        client.commands.get("chess").execute(message, args, client);
    }

    else if (command === "image") {
        client.commands.get("image").execute(message, args, Discord);
    } 

    else if (command === "letters") {
        client.commands.get("letters").execute(message, args)
    }

    else if (["fizzbuzz", "fb"].includes(command)) {
        client.commands.get("fizzbuzz").execute(message, args)
    }
}); 


client.login(token);