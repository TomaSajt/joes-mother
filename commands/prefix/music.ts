import { PrefixCommand } from "../../modules/commandutils";
import { GuildChannel, TextChannel, VoiceConnection } from "discord.js";
import Music, { getURL } from '../../managers/MusicManager'

export default new PrefixCommand({
    names: ["music"],
    bypassPause: false,
    adminOnly: false,
    action: async ({ args, message, client }) => {
        if (!message.member) return
        if (!(message.channel instanceof TextChannel)) return
        var keyword = args.shift()

        switch (keyword) {
            case 'join':
                
                break;
            case 'play':
                message.channel.send(`First video when searched: ${await getURL(args.join(' '))}`)
                break;
            case 'leave':
                break;

            default:
                message.channel.send("unknown arg")
                break;
        }
    },
    description: 'Music, music, music and music'
})