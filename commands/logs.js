fs = require('fs');
const readline = require('readline');


module.exports = {
	name: 'logs',
	aliases: ['gethistory','fl'],
	description: 'Retrieve the history of a player. types: all, server, discord.',
	args: true,
	usage: `<@user/steamID> <type>`,
	staffOnly: true,
	cooldown:5,
	execute(message, args) {

			var text = fs.readFileSync('./database/warnings.txt','utf8').toString().split(`\n`);
			let logChannel = message.guild.channels.cache.get(`775878571549917195`);
			var i = 0;
			var found = false;
			let isNum = /^\d+$/.test(args[0]);
			var warningsArray = []
			var member = message.mentions.members.first()
			var serverMember

			while (i < text.length) {

				if (isNum){
					username = text[i].substring(
						text[i].lastIndexOf(`<`)+1,
						text[i].lastIndexOf(`>`)
					)
				} else 
					username = text[i].substring(
						text[i].lastIndexOf(`<`),
						text[i].lastIndexOf(`>`)+1
					)



				if (args[0] === username){
				  	console.log(`FOUND`);
				  	serverMember = username
				  	warningsArray.push(`${text[i]}\n`);
				  	found = true;
				}
					i++
			}

			warningsMessage = warningsArray.toString()
			sentMessage = warningsMessage.replace(/[,]+/g, "").trim();
			
			if(found === true){

				j = 0;
				warningCount = 0;
				kickCount = 0;
				banCount = 0;
				while(j < warningsArray.length){

					typeLog = 
						warningsArray[j].substring(
						warningsArray[j].lastIndexOf(`[`)+1,
						warningsArray[j].lastIndexOf(`]`)
					)

					if (typeLog === 'WARN'){
						warningCount++;
					} else if(typeLog === 'KICK'){
						kickCount++;
					} else if(typeLog ==='BAN'){
						banCount++
					}
					j++
				}


			if(!isNum){

			const discordLogEmbed = {
	color: 0x0099ff,
	title: member.user.username,
	author: {
		name: 'Discord Administrative History',
	},
	description: `**Role:** ${member.roles.highest.name}`,
	thumbnail: {
		url: member.user.avatarURL(),
	},
	fields: [
		{
			name: 'History',
			value: sentMessage,
		},
		{
			name: '\u200b',
			value: '\u200b',
			inline: false,
		},
		{
			name: 'Warnings',
			value: warningCount,
			inline: true,
		},
		{
			name: 'Kicks',
			value: kickCount,
			inline: true,
		},
		{
			name: 'Bans',
			value: banCount,
			inline: true,
		},
	],
	timestamp: new Date(),
	footer: {
		text: 'CRONUS',
		icon_url: 'https://cdn.discordapp.com/attachments/775573762644246569/776632078321582090/CronusTech.png',
	},
};

logChannel.send({ embed: discordLogEmbed });
message.react(`☑️`);

} else {
	const serverLogEmbed = {
	color: 0x0099ff,
	title: serverMember,
	author: {
		name: 'Server Administrative History',
	},
	fields: [
		{
			name: 'History',
			value: sentMessage,
		},
		{
			name: '\u200b',
			value: '\u200b',
			inline: false,
		},
		{
			name: 'Warnings',
			value: warningCount,
			inline: true,
		},
		{
			name: 'Kicks',
			value: kickCount,
			inline: true,
		},
		{
			name: 'Bans',
			value: banCount,
			inline: true,
		},
	],
	timestamp: new Date(),
	footer: {
		text: 'CRONUS',
		icon_url: 'https://cdn.discordapp.com/attachments/775573762644246569/776632078321582090/CronusTech.png',
	},
};

logChannel.send({ embed: serverLogEmbed });
message.react(`☑️`);
}
	} else {
		message.react('❌');
		logChannel.send(`No entries found for: ${args[0]}`);
	}
}};