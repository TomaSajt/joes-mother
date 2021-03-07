import Discord, { Message } from 'discord.js'
import * as config from './config.json'

const client = new Discord.Client({ ws: { intents: new Discord.Intents(Discord.Intents.ALL)}})

//fuck

client.login(config.token)
client.once('ready', () => {
    console.log('logged in')
})

client.on('message', message => {
    
})