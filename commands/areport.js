const Discord = require('discord.js');
const readline = require('readline');

module.exports = {
	name: 'areport',
	aliases: ['ar'],
	description: 'Tool to manage the report channel for staff. `io` adds the offender.',
	args: false,
	usage: `<io> | <resolve/decline>`,
	staffOnly: true,
	execute(message, args){

		messageChannel = message.channel;
		logChannel = message.guild.channels.cache.get("808895462169247744")
		text = fs.readFileSync('./database/activeReports.txt','utf8').toString().split(`\n`);
		textFile = fs.readFileSync('./database/activeReports.txt','utf8')
		i = 0;


		//gather info

		while (i < text.length) {

			let reportChannel = text[i].substring(
						text[i].lastIndexOf(`!`)+3,
						text[i].lastIndexOf(`£`)-1
					)

			if(reportChannel == messageChannel){
				break;
			}
			i++
		}

			let reporterID = text[i].substring(
				text[i].lastIndexOf(`|`)+3,
				text[i].lastIndexOf(`^`)-1
			)
			let offenderID = text[i].substring(
				text[i].lastIndexOf(`[`)+3,
				text[i].lastIndexOf(`}`)-1
			)
			let reportChannelID = text[i].substring(
				text[i].lastIndexOf(`!`)+3,
				text[i].lastIndexOf(`£`)-1			
			)
			let messageID = text[i].substring(
				text[i].lastIndexOf(`(`)+1,
				text[i].lastIndexOf(`)`)
			)
			let reportReason = text[i].substring(
				text[i].lastIndexOf(`*`)+1,
				text[i].lastIndexOf(`&`)
			)
	
			let offender = message.guild.members.cache.get(offenderID)
			let reporter = message.guild.members.cache.get(reporterID)
			let reportChannel = message.guild.channels.cache.get(reportChannelID)
			let originalEmbed = logChannel.messages.fetch(messageID)

			if(offender == undefined){
				offender = "N/A"
			}
			
			//function to escape chars
			function escapeRegExp(str) {
			    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
			}

			var newValue = textFile.replace(new RegExp(escapeRegExp(text[i])), '');			


		if (args[0] == "io" && offender !== "N/A"){

			messageChannel.updateOverwrite(offender, { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true, READ_MESSAGE_HISTORY: true, });
			messageChannel.send(`${offender}, you have been reported by ${reporter}. You may make your case here.`)
			return;

		}
		if (args[0] == "decline"){
			
			if(!args[1]){
				message.reply(`provide a reason for declining this report.`)
				return;
			} else {
				trashReason = args.slice(1).join(` `);
				let declinedLogEmbed = new Discord.MessageEmbed()
					.setTitle(`DECLINED REPORT`)
					.setDescription(`**Reporter:** ${reporter}\n **Offender:** ${offender}\n **Reason:** ${reportReason}\n\n Declined by ${message.author}\n**Reason:** ${trashReason}`)
					.setColor(`LIGHT_GREY`)
					
				originalEmbed.then(message => {
				message.edit(declinedLogEmbed).catch(console.log);
				message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			})
				
				reportChannel.delete();
				fs.writeFileSync('./database/activeReports.txt', newValue, 'utf-8');

				if(offender == undefined){			
					reporter.send(`Your report has been declined by ${message.author}. **Reason**: ${trashReason}`).catch(error => {
						logChannel.send(`${message.author}, a DM could not be sent to ${reporter}. Consider contacting them to update them.`)	
					});
				} else {
					reporter.send(`Your report has been declined by ${message.author}. **Reason**: ${trashReason}`).catch(error => {
						logChannel.send(`${message.author}, a DM could not be sent to ${reporter}. Consider contacting them to update them.`)	
					});
				}
				return;
			}
		}
		if (args[0] == "resolve"){
			
			

			if (args[1]){
				resolveComment = args.slice(1).join(` `);
				reportChannel.delete();
				fs.writeFileSync('./database/activeReports.txt', newValue, 'utf-8');
				let resolvedLogEmbedComment = new Discord.MessageEmbed()
					.setTitle(`RESOLVED REPORT`)
					.setDescription(`**Reporter:** ${reporter}\n **Offender:** ${offender}\n **Reason:** ${reportReason}\n\nResolved by ${message.author}\n**Comment(s):** ${resolveComment}`)
					.setColor(`BLUE`)
					
				originalEmbed.then(message => {
				message.edit(resolvedLogEmbedComment).catch(console.log);
				message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			})
				

				//notifications ----------------------
				if(offender == "N/A"){

					reporter.send(`Your report has been resolved by ${message.author}. **Comment(s)**: ${resolveComment}`).catch(error => {
						logChannel.send(`${message.author}, a DM could not be sent to ${reporter}. Consider contacting them to update them.`)	
					});			
				} else {
					
					reporter.send(`Your report on ${offender} has been resolved by ${message.author}. **Comment(s)**: ${resolveComment}`).catch(error => {
						logChannel.send(`${message.author}, a DM could not be sent to ${reporter}. Consider contacting them to update them.`)	
					});


					offender.send(`The report on you by ${reporter} has been resolved by ${message.author}. **Comment(s)**: ${resolveComment}`).catch(error => {
						logChannel.send(`${message.author}, a DM could not be sent to ${offender}. Consider contacting them to update them.`)	
					});
				}

				return;
			} else {
				let resolvedLogEmbed = new Discord.MessageEmbed()
					.setTitle(`RESOLVED REPORT`)
					.setDescription(`**Reporter:** ${reporter}\n **Offender:** ${offender}\n **Reason:** ${reportReason}\n\nResolved by ${message.author}`)
					.setColor(`BLUE`)
					
				originalEmbed.then(message => {
				message.edit(resolvedLogEmbed).catch(console.log);
				message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			})
				reportChannel.delete();
				fs.writeFileSync('./database/activeReports.txt', newValue, 'utf-8');
				//notifications ------------------------
				if(offender == undefined){
					reporter.send(`Your report on has been resolved by ${message.author}.`).catch(error => {
						logChannel.send(`${message.author}, a DM could not be sent to ${reporter}. Consider contacting them to update them.`)	
					});
				} else {
					reporter.send(`Your report on ${offender} has been resolved by ${message.author}.`).catch(error => {
						logChannel.send(`${message.author}, a DM could not be sent to ${reporter}. Consider contacting them to update them.`)	
					});
					offender.send(`The report on you by ${reporter} has been resolved by ${message.author}.`).catch(error => {
						logChannel.send(`${message.author}, a DM could not be sent to ${offender}. Consider contacting them to update them.`)	
					});
				}
				return;
			}
		}

}}