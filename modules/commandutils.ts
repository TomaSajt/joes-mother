import Discord, { Snowflake } from 'discord.js'

type HandlerArgs = {
    client: Discord.Client,
    admins?: string[],
    pchArgs: PrefixCommandHandlerArgs
}
type PrefixCommandHandlerArgs = {
    prefix: string,
    commands: PrefixCommand[]
}
type PrefixCommandArgs = {
    adminOnly?: boolean,
    bypassPause?: boolean,
    botExecutable?: boolean
    names: string[],
    action: (client: Discord.Client, message: Discord.Message, prefixCommandHandler: PrefixCommandHandler) => void
}

export class Handler {
    readonly client: Discord.Client
    readonly prefixHandler: PrefixCommandHandler
    paused: boolean = false
    admins: string[]

    constructor(args: HandlerArgs) {
        this.client = args.client
        this.admins = args.admins ?? []
        this.prefixHandler = new PrefixCommandHandler(args.client, this, args.pchArgs)
    }

}

export class PrefixCommandHandler {
    private commands: PrefixCommand[]
    readonly client: Discord.Client
    prefix: string
    readonly handler: Handler

    constructor(client: Discord.Client, handler: Handler, args: PrefixCommandHandlerArgs) {
        this.client = client
        this.handler = handler
        this.prefix = args.prefix
        this.commands = args.commands

        client.on('message', message => {
            if (message.content.startsWith(this.prefix)) {
                this.handleMessage(message);
            }
        })
    }

    private handleMessage(message: Discord.Message) {
        this.commands.forEach(cmd => {
            var flag1 = cmd.names.some(name => message.content.startsWith(`${this.prefix}${name}`))

            var flag2 = !cmd.adminOnly || (message.member && this.handler.admins.includes(message.member.id))

            var flag3 = !this.handler.paused || cmd.bypassPause

            var flag4 = !message.author.bot || cmd.botExecutable

            if (flag1 && flag2 && flag3 && flag4) {
                cmd.action(this.client, message, this)
            }
            if (!flag2) {
                message.channel.send("Insufficient permissions.")
            }
        })
    }
}

export class PrefixCommand {
    readonly adminOnly: boolean
    readonly bypassPause: boolean
    readonly botExecutable: boolean
    readonly names: string[]
    readonly action: (client: Discord.Client, message: Discord.Message, prefixCommandHandler: PrefixCommandHandler) => void

    constructor(args: PrefixCommandArgs) {
        this.adminOnly = args.adminOnly ?? false;
        this.bypassPause = args.bypassPause ?? false;
        this.botExecutable = args.botExecutable ?? false
        this.names = args.names;
        this.action = args.action;
    }
}