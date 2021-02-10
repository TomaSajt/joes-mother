const Discord = require('discord.js');
const gTTS = require('gtts')
const txtomp3 = require('text-to-mp3')
const fs = require("fs")
const filename = 'tts.mp3'

module.exports.definition = {
    data: {
        name: 'tts',
        description: "Send a TTS mp3 to the channel",
        options: [
            {
                name: "text",
                description: "Text to speak",
                type: 3, //string
                required: true
            },
            {
                name: "language",
                description: "Text to speak",
                type: 3,
                required: true,
                choices: [
                    //{ name: "Afrikaans", value: "af" },
                    //{ name: "Irish", value: "ga" },
                    //{ name: "Albanian", value: "sq" },
                    { name: "Italian", value: "it" },
                    //{ name: "Arabic", value: "ar" },
                    //{ name: "Japanese", value: "ja" },
                    //{ name: "Azerbaijani", value: "az" },
                    //{ name: "Kannada", value: "kn" },
                    //{ name: "Basque", value: "eu" },
                    //{ name: "Korean", value: "ko" },
                    //{ name: "Bengali", value: "bn" },
                    //{ name: "Latin", value: "la" },
                    //{ name: "Belarusian", value: "be" },
                    //{ name: "Latvian", value: "lv" },
                    //{ name: "Bulgarian", value: "bg" },
                    //{ name: "Lithuanian", value: "lt" },
                    //{ name: "Catalan", value: "ca" },
                    //{ name: "Macedonian", value: "mk" },
                    //{ name: "Chinese Simplified", value: "zh-CN" },
                    //{ name: "Malay", value: "ms" },
                    //{ name: "Chinese Traditional", value: "zh-TW" },
                    //{ name: "Maltese", value: "mt" },
                    //{ name: "Croatian", value: "hr" },
                    //{ name: "Norwegian", value: "no" },
                    //{ name: "Czech", value: "cs" },
                    //{ name: "Persian", value: "fa" },
                    //{ name: "Danish", value: "da" },
                    //{ name: "Polish", value: "pl" },
                    //{ name: "Dutch", value: "nl" },
                    //{ name: "Portuguese", value: "pt" },
                    { name: "English", value: "en" },
                    //{ name: "Romanian", value: "ro" },
                    { name: "Esperanto", value: "eo" },
                    //{ name: "Russian", value: "ru" },
                    //{ name: "Estonian", value: "et" },
                    //{ name: "Serbian", value: "sr" },
                    //{ name: "Filipino", value: "tl" },
                    //{ name: "Slovak", value: "sk" },
                    //{ name: "Finnish", value: "fi" },
                    //{ name: "Slovenian", value: "sl" },
                    { name: "French", value: "fr" },
                    { name: "Spanish", value: "es" },
                    //{ name: "Galician", value: "gl" },
                    //{ name: "Swahili", value: "sw" },
                    //{ name: "Georgian", value: "ka" },
                    //{ name: "Swedish", value: "sv" },
                    { name: "German", value: "de" },
                    //{ name: "Tamil", value: "ta" },
                    //{ name: "Greek", value: "el" },
                    //{ name: "Telugu", value: "te" },
                    //{ name: "Gujarati", value: "gu" },
                    //{ name: "Thai", value: "th" },
                    //{ name: "Haitian Creole", value: "ht" },
                    //{ name: "Turkish", value: "tr" },
                    //{ name: "Hebrew", value: "iw" },
                    //{ name: "Ukrainian", value: "uk" },
                    //{ name: "Hindi", value: "hi" },
                    //{ name: "Urdu", value: "ur" },
                    { name: "Hungarian", value: "hu" },
                    //{ name: "Vietnamese", value: "vi" },
                    //{ name: "Icelandic", value: "is" },
                    //{ name: "Welsh", value: "cy" },
                    //{ name: "Indonesian", value: "id" },
                    //{ name: "Yiddish", value: "yi" }
                ]
            }
        ]
    }
}
module.exports.action = async (interaction, client) => {
    if (interaction.data.name == "tts") {
        var guild = client.guilds.cache.get(interaction.guild_id)
        var channel = guild.channels.cache.get(interaction.channel_id)
        if (channel instanceof Discord.TextChannel) {
            if (interaction.data.options[0].name == 'gtts') {
                var gtts = new gTTS(interaction.data.options[0].options[0].value, interaction.data.options[0].options[1].value);
                await gtts.save(filename, function (err, result) {
                    if (err) { throw new Error(err); }
                    console.log("Text to speech converted!");
                    channel.send({
                        files: [filename]
                    })
                });
            } else if (interaction.data.options[0].name == 'legacy') {
                txtomp3.getMp3(interaction.data.options[0].options[0].value).then(stream => {
                    var file = fs.createWriteStream(filename);
                    file.write(stream);
                    file.end();
                    file.on("close", async () => {
                        await channel.send({
                            files: [filename]
                        })
                    })
                }).catch(e => console.log("Error", e));
            }
        }
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 2 //ack
            }
        })
    }
}