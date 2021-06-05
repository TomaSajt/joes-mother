import { Guild, GuildMember, TextChannel, VoiceChannel, VoiceConnection } from 'discord.js'
import { Readable } from 'stream'
import ytdl from 'ytdl-core-discord'
import search from 'youtube-search'


class MusicManger {
    private guildMap = new Map<Guild, GuildMusicManager>()
    private getGuildMusicManager(guild: Guild) {
        var gmm = this.guildMap.get(guild)
        if (!gmm) {
            gmm = new GuildMusicManager()
            this.guildMap.set(guild, gmm)
        }
        return gmm
    }

    play(guild: Guild, member: GuildMember, textChannel: TextChannel, searchTerm: string) {
        this.getGuildMusicManager(guild).play(member, textChannel, searchTerm)
    }

}
class GuildMusicManager {
    queue: Song[] = []
    play(member: GuildMember, textChannel: TextChannel, searchTerm: string) {

    }
}
export default new MusicManger()


export type Song = {
    name: string
    url: string
}

export async function getURL(term: string) {
    var regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/

    var data = await search(term, {type: 'video', maxResults:1, key:process.env.YOUTUBE_API_KEY, regionCode:'US'}).then(res => res.results[0])
    return data.link
}
