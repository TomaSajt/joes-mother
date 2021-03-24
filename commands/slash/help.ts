import { MessageEmbed } from "discord.js";
import { SlashCommand } from "../../modules/commandutils";

export default new SlashCommand({
    definition: {
        name: "help",
        description: "Help? You want it?",
    },
    action: async ({ channel, client, guild, sch }) => {
        var botMember = guild.members.resolve(client.user?.id!)!
        var ch = sch.handler
        var pch = ch.prefixHandler;
        var ich = ch.includesHandler;
        var embed = new MessageEmbed()
            .setAuthor(botMember.displayName, botMember.user.avatarURL({ dynamic: true }) ?? undefined)
            .setColor("#0099ff")
            .setTitle("Help menu")

        for (const prefixCmd of pch.commands) {
            if (!prefixCmd.hidden) {
                embed.addField(prefixCmd.names[0], prefixCmd.description ?? 'no description set')
            }
        }
        channel.send(embed)
    }
})