import { PrefixCommand } from "../../modules/commandutils";

export const cmd = new PrefixCommand({
    names: ['timer'],
    bypassPause: false,
    adminOnly: true,
    action: async args => {
        var key = args.pch.prefix + args.name
        var inputArgs = args.message.content.substring(args.message.content.indexOf(key) + key.length).trim().split(' ').filter(str => str != "");
        if (inputArgs.length == 1) {
            var n = parseInt(inputArgs[0])
            if (n) {
                var m = await args.message.channel.send(`starting countdown for ${n} seconds`)
                for await (var remaining of countdown(n)) {
                    if (m.deleted) break;
                    m.edit(remaining)
                }
                if (!m.deleted) args.message.channel.send('countdown over')
            } else {
                args.message.channel.send("Argument not of type 'number'")
            }
        } else {
            args.message.channel.send('Ivalid argument amount')
        }
    }
});


async function* countdown(n: number) {
    yield n
    while (n > 0) {
        await delay(1000)
        yield --n
    }
}

async function delay(millis: number) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(0), millis)
    })
}