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
        this.getGuildMusicManager(guild)
    }

}
class GuildMusicManager {

}
export const Music = new MusicManger()


export type Song = {
    name: string
    url: string
    getStream: (...args: any[]) => Promise<Readable>
}
export function GetSong(url: string): Song {
    return {
        name: "Unkown title",
        url,
        getStream: async () => await ytdl(url)
    }
}

function getURL(term: string) {
    search(term, {maxResults:1, key:process.env.YOUTUBE_API_KEY})
}
