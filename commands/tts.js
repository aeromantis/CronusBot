const say = require(`say`);
const path =  require(`path`);
const FS = require('fs');
const Discord = require('discord.js');

module.exports = {
	name: 'tts',
	aliases: ['s', `say`],
	description: 'Converts voice to TTS in a voice channel. `d` to disconnect. `hp` for high pitch.',
	args: true,
	usage: `<text> | <d> <text> | <hp> <text>`,
	staffOnly: true,
	managerOnly: false,
	execute(message, args){

        var messageString = args.slice(0).join(` `);
        var pitch = 1;

        if (args[0] == "d"){
            message.guild.me.voice.channel.leave();
            return;
        }
        if(args[0] == "hp"){
            messageString = args.slice(1).join(` `);
            pitch = 1.5
        }

        const timestamp = new Date().getTime();
        const soundPath = `.\\temp\\${timestamp}.wav`;

        if (message.member.voice.channel) {
            const voice = message.member.voice.channel;
            

            async function tts(voiceChannel, text) {
                if (!FS.existsSync('./temp')){
                    FS.mkdirSync('./temp');
                }
                const connection = await message.member.voice.channel.join()
                
                say.export(text, "Microsoft James", pitch, soundPath, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }else{
                        
                        const dispatcher = connection.play(soundPath)
                        dispatcher.on('start', () => {
                            
                        });
                        
                        dispatcher.on('finish', () => {
                            FS.unlinkSync(path.join(__dirname, ".." ,soundPath))
                        });                 

                        }
                });
            } 
            tts(voice, messageString)
            
        } else {
            message.reply("you're not in a voice channel.")
            return;
        }
        

        

        

    }}