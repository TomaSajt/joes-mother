import { TextChannel } from "discord.js";
import { SlashCommand } from "../../../modules/commandutils";

export default new SlashCommand({
  adminOnly: false,
  definition: {
    name: "button",
    description: "Button test, bottom text"
  },
  action: async ({ args, guild, channel, interaction }) => {
    return {
      type: 4,
      data: {
        content: "test",
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                label: "Click me",
                style: 1,
                custom_id: "click_one"

              }
            ]
          }
        ]
      }
    }
  },
})