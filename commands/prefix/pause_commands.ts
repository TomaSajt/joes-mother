import { PrefixCommand } from "../../modules/commandutils";

export const pause = new PrefixCommand({
    names: ['pause'],
    bypassPause: true,
    adminOnly: true,
    action: args => {
        if (!args.pch.handler.paused) {
            args.pch.handler.paused = true;
            args.message.channel.send('Paused the handler.')
        }
    }
});

export const unpause = new PrefixCommand({
    names: ['unpause', 'resume'],
    bypassPause: true,
    adminOnly: true,
    action: args => {
        if (args.pch.handler.paused) {
            args.pch.handler.paused = false;
            args.message.channel.send('Unpaused the handler.')
        }
    }
});