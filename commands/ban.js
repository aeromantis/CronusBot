const fs = require('fs');

module.exports = {
	name: 'ban',
	aliases: ['b'],
	description: 'Logs a ban against a user.',
	args: true,
	usage: `<@user/steamID> <length> <reason>`,
	staffOnly: true,
	execute(message, args) {

		let isLengthNum = /^\d+$/.test(args[1]);	

		if(!args[1] || !args[2] || !isLengthNum){
			return message.channel.send(`${message.author}, incorrect arguments. \`!ban <user> <length> <reason>\``);
		}
		
		
		bannedUser = args[0];
		banLength = parseInt(args[1]);
		mentionedMember = message.mentions.members.first();
		banMessage = args.slice(2).join(` `);
		let banChannel = message.guild.channels.cache.get(`778044344359452695`)
		let isNum = /^\d+$/.test(args[0]);	
		
		function formatted_date()
		{
		   var result="";
		   var d = new Date();
		   result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
		   return result;
		}
		function dateToUnban()
		{
		   var result="";
		   var d = new Date();
		   d.setHours(d.getHours()+banLength)
		   result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getHours();
		   return result;
		}

		if (!isNum){

	        if(mentionedMember.roles.cache.some(role => role.name === "Staff")) {
	            message.reply('you can\'t ban a staff member.');
	            return;
	        };


			fs.appendFile('./database/warnings.txt', `\n${formatted_date()} | [BAN] | ${bannedUser.toString()} | "${banMessage}" | ${banLength} hours.`, function (err) {
			  if (err) throw err;
			});
			fs.appendFile('./database/discordBanList.txt', `\n${bannedUser} | "${formatted_date()}" | [${dateToUnban()}]>`, function (err) {
			  if (err) throw err;
			});

			mentionedMember.send(`You have been BANNED from Elysium by ${message.author}. Reason: \'${banMessage}\' for **${banLength}** hours. If you feel that this is unjust, message the senior staff.`)
				.catch(error => {
					console.error(`Could not send BAN DM to ${mentionedMember}.\n`, error);
					message.react(`💢`);			
				});
			mentionedMember.ban()
			banChannel.send(`[DISCORD] ${message.author} has banned ${bannedUser} for **${banLength}** hours. Reason: \'${banMessage}\'`);
			message.react(`☑️`)

			

		} else {
			banChannel.send(`[SERVER] ${message.author} has banned ${bannedUser} for **${banLength}** hours. Reason: \'${banMessage}\'`);

			fs.appendFile('./database/warnings.txt', `\n${formatted_date()} | [BAN] | <${bannedUser.toString()}> | "${banMessage}" | ${banLength} hours.`, function (err) {
			  if (err) throw err;
			});
		}
	}	
};