import { PrefixCommand } from "../../modules/commandutils";

export const test = new PrefixCommand({
    names: ['test'],
    action: pcaargs => { pcaargs.message.channel.send('test message') }
});

export const ping = new PrefixCommand({
    names: ['ping', 'ping-me', 'ping-pong'],
    action: pcaargs => { pcaargs.message.channel.send(`🏓Latency is ${Date.now() - pcaargs.message.createdTimestamp}ms. API Latency is ${Math.round(pcaargs.client.ws.ping)}ms`); }
});