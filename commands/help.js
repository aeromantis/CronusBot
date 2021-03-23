const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'help',
	aliases: ['h'],
	description: 'Receive help about commands.',
	args: false,
	usage: `(command)`,
	staffOnly: false,
	managerOnly: false,
	execute(message, args){

		const { commands } = message.client;

		const commandNamesString = commands.map(command => command.name).toString();
		const nameData = commandNamesString.split(`,`);
		if(args[0]){
			var requestedHelp = args[0].toLowerCase()
			var command = commands.get(requestedHelp) || commands.find(c => c.aliases && c.aliases.includes(requestedHelp));
			if (!command){
				return message.reply(`invalid argument. Provide a command`)
			}
			let commandEmbed = new Discord.MessageEmbed()
			.setTitle(`!${command.name}`)
			.addField(`\`!${command.name} ${command.usage}\``, `${command.description}\n**Aliases:** !${command.aliases}`)
			.setColor(`BLUE`)
			message.channel.send(commandEmbed);
			
		}		
		if(!args[0]){
			let helpEmbed = new Discord.MessageEmbed()
			.setTitle(`Help`)
			.setDescription(`Arguments in **(example)** are optional. Arguments in **<example>** are mandatory.`)
			.setColor(`BLUE`)
			for (let i = 0;i < nameData.length; i++){
				commandL = commands.get(nameData[i])
				if(commandL.staffOnly){
					if (!message.member.roles.cache.some(role => role.name === 'Staff')){
						continue
					}
					if(commandL.managerOnly){
						if (!message.member.roles.cache.some(role => role.name === 'Community Manager')){
							continue
						}
					}
				}
				
				helpEmbed.addField(`!${commandL.name}, ${commandL.aliases}`, `\`${commandL.usage}\``, false)
			}

			message.channel.send(helpEmbed);
		} 
}}