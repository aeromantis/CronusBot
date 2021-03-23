
const fs = require('fs');

module.exports = {
	name: 'rolemanager',
	aliases: ['rm'],
	description: 'Command for managers to manage roles. DO NOT USE UNLESS YOU KNOW WHAT YOU\'RE DOING!!',
	args: true,
	usage: `<emoji> <state> <role>`,
	staffOnly: true,
	managerOnly: true,
	execute(message, args){

		if (args[0] == "build") {
			reactionFile = fs.readFileSync('./database/reactionRoles.txt','utf8').toString().split(`|`);
			
			reactionMessage = reactionFile.join(`\n`)
			personalArray = []
			gamesArray = []
			otherArray = []
			requestArray = []
			i = 0

			while(i < reactionFile.length){
				currentLine = reactionFile[i].split(" - ")
				cleanedLine = currentLine[0] + " - " + currentLine[1]
				if(currentLine[2] == "personal"){
					personalArray.push(`${cleanedLine}\n`)
				}
				if(currentLine[2] == "game"){
					gamesArray.push(`${cleanedLine}\n`)
				}
				if(currentLine[2] == "other"){
					otherArray.push(`${cleanedLine}\n`)
				}
				if(currentLine[2] == "restricted"){
					requestArray.push(`${cleanedLine}\n`)
				}
				i++
			}

			var embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Reaction Roles')
			.setDescription('React to this post to get a role! You\'ll need certain roles to see certain parts of the server.')
			.addFields(
				{ name: 'Games', value: `${gamesArray.join("")}`},
				{ name: 'About You', value: `${personalArray.join("")}`},
				{ name: 'Other', value: `${otherArray.join("")}`},
				{ name: 'Request Required', value: `${requestArray.join("")}`},
			)

			if(args[1] == "update"){
				rolesEmbed = message.channel.messages.fetch("814269233676156940")
				rolesEmbed.edit(embed).catch(console.log);
				return;
			} 

					
			sentMessage = message.channel.send(embed).then(sentMessage =>{
				i = 0;
				reactionFile = fs.readFileSync('./database/reactionRoles.txt','utf8').toString().split(`|`);
				while(i < reactionFile.length){
					currentLine = reactionFile[i];
					splitLine = currentLine.split(" - ")
					sentMessage.react(splitLine[0])
					i++					
				}

			}).catch(console.error);
			return;
		}

		

		roleName = args.slice(2).join(` `);
		emojiName = args[0];
							
		fs.appendFile('./database/reactionRoles.txt', `${emojiName} - ${roleName} - ${args[1]}|`, function (err) {
				if (err) throw err;
		  });
}}