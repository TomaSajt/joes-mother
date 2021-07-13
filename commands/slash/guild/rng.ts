import { SlashCommand } from "@tomasajt/cmd";
import { Interaction } from "@tomasajt/cmd/lib/discord_type_extensions";
import { patchInteraction, respondToInteraction } from "@tomasajt/cmd/lib/interaction_utils";

export default new SlashCommand({
  adminOnly: false,
  definition: {
    name: "rng",
    description: "Button test, bottom text"
  },
  action: async ({ client, channel, interaction }) => {

    var secondsToTimeout = 300

    var onButtonClicked = (interaction: Interaction) => {
      if (interaction.type == 3 && interaction.data?.custom_id == 'rng_gen') {
        respondToInteraction(client, interaction, {
          type: 7, data: {
            content: Math.floor(Math.random() * 100 + 1).toString()
          }
        })
      }
    }
    setTimeout(() => {
      patchInteraction(client, interaction, {
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                label: "Generate number",
                style: 1,
                custom_id: "rng_gen",
                disabled: true
              }
            ]
          }
        ]
      })

      client.ws.removeListener('INTERACTION_CREATE', onButtonClicked)

    }, secondsToTimeout * 1000)

    //@ts-ignore
    client.ws.on('INTERACTION_CREATE', onButtonClicked)
    return {
      type: 4,
      data: {
        content: "Your number will appear here",
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                label: "Generate number",
                style: 1,
                custom_id: "rng_gen",
                disabled: false
              }
            ]
          }
        ]
      }
    }
  },
})