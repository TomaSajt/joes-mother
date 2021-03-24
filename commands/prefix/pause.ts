import { PrefixCommand } from "../../modules/commandutils";

export default new PrefixCommand({
  names: ["pause"],
  bypassPause: true,
  adminOnly: true,
  action: ({ pch, message }) => {
    if (!pch.handler.paused) {
      pch.handler.paused = true;
      message.channel.send("Paused the handler.");
    }
  },
  description: 'pauses the instance of the bot, that recieved it'
})