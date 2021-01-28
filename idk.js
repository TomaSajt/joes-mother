
const fetch = require('node-fetch');
const config = require("./config.json")

deleteCommand()
async function deleteCommand() {
    var url = "https://discord.com/api/v8/applications/777905452084101121/guilds/718399828970700910/commands/804402282632445973"
    var response = await fetch(url, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bot ${config.token}`
        }
    });
    console.log(response);
}