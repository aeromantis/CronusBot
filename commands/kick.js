const fs = require('fs');

module.exports = {
	name: 'kick',
	aliases: ['k'],
	description: 'Logs a kick against a user.',
	args: true,
	usage: `<@user/steamID> <reason>`,
	staffOnly: true,
	execute(message, args) {

		if(!args[1]){
			return message.channel.send(`${message.author}, no reason provided. \`!kick <user> <reason>\``);
		}
		
		kickedUser = args[0];
		mentionedMember = message.mentions.members.first();
		kickMessage = args.slice(1).join(` `);
		let kickChannel = message.guild.channels.cache.get(`775878357782364171`)
		let isNum = /^\d+$/.test(args[0]);	
		
		function formatted_date()
		{
		   var result="";
		   var d = new Date();
		   result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
		   return result;
		}

		if (!isNum){

	        if(mentionedMember.roles.cache.some(role => role.name === "Staff")) {
	            message.reply('you can\'t kick a staff member.');
	            return;
	        };

			
			mentionedMember.kick()
	        	.then(() => console.log(`${message.author} has kicked ${kickedUser}`))
	            .catch(console.error);

			fs.appendFile('./database/warnings.txt', `\n${formatted_date()} | [KICK] | ${kickedUser.toString()} | "${kickMessage}"`, function (err) {
			  if (err) throw err;
			});

			kickChannel.send(`[DISCORD] ${message.author} has kicked ${kickedUser} for ${kickMessage}`);
			message.react(`☑️`)

			

		} else {
			kickChannel.send(`[SERVER] ${message.author} has kicked ${kickedUser} for ${kickMessage}`);

			fs.appendFile('./database/warnings.txt', `\n${formatted_date()} | [KICK] | <${kickedUser.toString()}> | "${kickMessage}"`, function (err) {
			  if (err) throw err;
			});
		}
	}	
};