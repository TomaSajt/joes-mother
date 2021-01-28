const Discord = require('discord.js');
const config = require('./config.json');
var crashing = false;
var pause = false;
var normalCommands = [
    require('./commands/normal/sync/karesz.js'),
    require('./commands/normal/sync/joe mama.js'),
    require('./commands/normal/sync/whos joe.js'),
    require('./commands/normal/sync/help.js'),
    require('./commands/normal/sync/pog.js')
]
var normalAwaitCommands = [
    require('./commands/normal/async/timer.js'),
    require('./commands/normal/async/crash.js')
]

var client = new Discord.Client();
client.once('ready', () => {
    console.log('Restarted');
});

client.on('message', async message => {
    var text = message.content.toLowerCase()
    if (message.author.bot) return;
    if (text == `${config.prefix}unpause`) {
        pause = false;
        message.channel.send("Unpaused instance this instance of the bot")
    }
    if (pause) return;
    if (text == `${config.prefix}pause`) {
        pause = true;
        message.channel.send("Paused instance this instance of the bot")
    }
    normalCommands.forEach(comm => comm(message))
    normalAwaitCommands.forEach(async awComm => await awComm(message))
    
});
client.login(config.token);