import { PrefixCommand } from "../../modules/commandutils";
import Discord from 'discord.js'

export const test = new PrefixCommand({
    names: ['test'],
    action: pcaargs => {

        var embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Some title')
			.setURL('https://discord.js.org/')
			.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
			.setDescription('Some description here')
			.setThumbnail('https://i.imgur.com/wSTFkRM.png')
			.addFields(
				{ name: 'Regular field title', value: 'Some value here' },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
			)
			.addField('Inline field title', 'Some value here', true)
			.setImage('https://i.imgur.com/wSTFkRM.png')
			.setTimestamp()
			.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
        pcaargs.message.channel.send(embed)
    }
});

export const ping = new PrefixCommand({
    names: ['ping', 'ping-me', 'ping-pong'],
    action: pcaargs => { pcaargs.message.channel.send(`🏓Latency is ${Date.now() - pcaargs.message.createdTimestamp}ms. API Latency is ${Math.round(pcaargs.client.ws.ping)}ms`); }
});