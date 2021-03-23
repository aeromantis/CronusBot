const fs = require('fs');

module.exports = {
	name: 'warn',
	aliases: ['warning', 'w'],
	description: 'Warns a user and saves it.',
	args: true,
	usage: `<@user/steamID> <reason>`,
	staffOnly: true,
	execute(message, args) {

		if(!args[1]){
			return message.channel.send(`${message.author}, no reason provided. \`!warn <user> <reason>\``);
		}
		
		warnedUser = args[0];
		warnMessage = args.slice(1).join(` `);
		let warnChannel = message.guild.channels.cache.get(`775878357782364171`)
		let isNum = /^\d+$/.test(args[0]);	
		
		function formatted_date()
		{
		   var result="";
		   var d = new Date();
		   result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
		   return result;
		}

		if (!isNum){
			warnChannel.send(`[DISCORD] ${warnedUser.toString()} has been warned for: ${warnMessage} by: ${message.author}`);

			fs.appendFile('./database/warnings.txt', `\n${formatted_date()} | [WARN] | ${warnedUser.toString()} | "${warnMessage}"`, function (err) {
			  if (err) throw err;
			});

		} else {
			warnChannel.send(`[SERVER] ${warnedUser.toString()} has been warned for: ${warnMessage} by: ${message.author}`);

			fs.appendFile('./database/warnings.txt', `\n${formatted_date()} | [WARN] | <${warnedUser.toString()}> | "${warnMessage}"`, function (err) {
			  if (err) throw err;
			});
		}
	}	
};