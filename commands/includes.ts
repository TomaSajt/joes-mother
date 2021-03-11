import { IncludesCommand, IncludesReactCommand } from "../modules/commandutils";

export const cmds = [
    new IncludesReactCommand({
        names: ['karesz'],
        emoji: '776413600117030913'
    }),
    new IncludesReactCommand({
        names: ['pog'],
        emoji: '777804089290784808'
    }),
    new IncludesCommand({
        names: ["who's joe", "who is joe", "whos joe", "who s joe"],
        action: ({ message }) => {
            message.channel.send("joe mama")
        }
    }),
    new IncludesCommand({
        names: ['joe mama'],
        action: ({ message }) => {
            message.channel.send(`> You are almost as funny as me ${message.author}`, { files: [randomPicture()] })

            function randomPicture(): string {
                var pictures = [
                    "https://i.imgur.com/Fl4DpvB.jpg",
                    "https://i.imgur.com/Fl4DpvB.jpg",
                    "https://i.imgur.com/6iueg8x.png"
                ]
                return pictures[Math.floor(Math.random() * pictures.length)]
            }
        }
    })
]