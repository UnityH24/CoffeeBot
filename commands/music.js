const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

module.exports = {
    name: "music",
    description: "plays music from youtube",
    async execute(message, args, Discord) {

        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            message.channel.send("This command must be used while in a voice channel");
            return;
        }

        if (!args[0]) {
            message.channel.send("You need to tell me what to play");
            return;
        }

        if (!(args.join("").toLowerCase() === "!stop") && !(args.join("").toLowerCase() === "!repeat")) {
            
            const connection = await voiceChannel.join();
    
            const getVideo = async (title) => {
                videosFound = await ytSearch(title);
    
                return (videosFound.videos.length > 1) ? videosFound.videos[0] : -1;
            }
    
            const playVideo = (video) => {
                if (video != -1) {
        
                    const videoEmbed = new Discord.MessageEmbed()
                        .setColor("#27CCE6")
                        .setTitle(`Playing music...`)
                        .setURL(video.url)
                        .setDescription(video.title)
                        .setImage(video.thumbnail)
                        .setTimestamp()
                        .setFooter(video.duration);
    
                    message.channel.send(videoEmbed);
        
                    const stream = ytdl(video.url, { filter: 'audioonly' });
                    connection.play(stream, { seek: 0, volume: 1 })
                        .on('finish', () => {
                            voiceChannel.leave();
                        });
    
                }
        
                else {
                    message.channel.send("No results found! Try something else...");
                    voiceChannel.leave();
                }
            }
    
            const video = await getVideo(args.join(' '));
    
            playVideo(video); 
        }

        else {
            if (args.join("").toLowerCase() === "!stop") {
                await message.channel.send("Stopping...");
                voiceChannel.leave();
            }

            else if (args.join("").toLowerCase() === "!repeat") {
            }
        }
        
    }
}
