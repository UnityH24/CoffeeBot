const Scraper = require("images-scraper");
const axios = require("axios");
const tf = require("@tensorflow/tfjs-node")
const { search } = require("yt-search");
const nsfwjs = require("nsfwjs");

const Google = new Scraper({
    puppeteer: {
        headless: true
    }
});

const nsfwCheck = async (url) => {
    const pic = await axios.get(url, {
        responseType: 'arraybuffer',
    });

    const model = nsfwjs.load();

    const image = await tf.node.decodeImage(pic.data, 3);
    const predictions = await (await model).classify(image);

    image.dispose();
    return predictions;

    // predictions[0].className

}

const getIndex = (args) => {
    var index = 0;

    for (var i = 0; i < args.length; ++i) {
        if (parseInt(args[i])) {
            if (args[i - 1] == '|') {
                args.splice(i - 1, 1);
                continue
            }
            index = i;
        }
    }

    return index;
}

module.exports = {
    name: "image",
    description: "search images on google!",
    async execute(message, args, Discord) {

        if (!args[0]) return message.channel.send("Please enter what you want to search");

        var index = getIndex(args);

        if (index != 0) {
            args.splice(index, 1);
        }

        const results = await Google.scrape(args.join(' '), index + 1);

        const nsfwResults = await nsfwCheck(results[index].url);

        console.log(nsfwResults);

        var imageEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Found this image for the search: " + args.join(' '))
            .setURL(results[index].url)
            .setImage(results[index].url);

        var rickRollEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("No NSFW please")
            .setURL(results[index].url)
            .setImage("https://cdn.vox-cdn.com/thumbor/HWPOwK-35K4Zkh3_t5Djz8od-jE=/0x86:1192x710/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg");

        switch (nsfwResults[0].className) {

            case ("Neutral"): {
                return message.channel.send(imageEmbed);
            }

            case ("Sexy"): {
                return (nsfwResults[0].probability < 0.9) ? message.channel.send(imageEmbed) : message.channel.send(rickRollEmbed);
            }

            case "Drawing": {
                if (nsfwResults[1].className === "Hentai" && nsfwResults[1].probability > 0.3) {
                    return message.channel.send(rickRollEmbed);
                }
                return message.channel.send(imageEmbed);
            }


            default: {
                return message.channel.send(rickRollEmbed);
            }
        }

    }
}