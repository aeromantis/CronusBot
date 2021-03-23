
const fs = require('fs');
const { report } = require('process');
const readline = require('readline');

module.exports = {
	name: 'report',
	aliases: ['r'],
	description: 'Report a user.',
	args: false,
	usage: `(@user) <reason>`,
	staffOnly: false,
	execute(message, args){

		reporter = message.author;
		offender = message.mentions.members.first()
		server = message.guild;
		channelID = server.channels.cache.find(c => c.name == `${reporter.username}-report`);
		staff = message.guild.roles.cache.find(role => role.name === "Staff");
		logChannel = message.guild.channels.cache.get("808895462169247744")
		embedID = ""

		if (!offender){
			offender = "N/A"
			reportReason = args.slice(0).join(` `);
			message.delete();
		} else{
			reportReason = args.slice(1).join(` `);
			message.delete();
		}

		if (!reportReason){
			message.reply(`you must provide a reason.`);
			message.delete();
			return;
		}
		
		if (channelID){
			message.reply("You already have a report active. Contact staff if you'd like to make another.")
			message.delete();
			return;
		}

		//create channel

		server.channels.create(`${reporter.username}-report`)
			.then(channel => {
			    let category = server.channels.cache.find(c => c.name == "Reports" && c.type == "category");
			    if (!category) throw new Error("Category channel does not exist");
			    channel.setParent(category.id);
			    channel.setTopic(`Report against ${offender} by ${reporter}.`)
			    channel.overwritePermissions([
					{
					    id: reporter,
					    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES'],					    
					},
					{
						id: message.guild.id,
					    deny: ['VIEW_CHANNEL'],
					},
					{
						id:staff,
						allow:['MANAGE_CHANNELS', 'VIEW_CHANNEL']
					}

				]).catch(console.error);

			    let embed = new Discord.MessageEmbed()
					.setTitle(`Active Report`)
					.setDescription(`**Reporter:** ${reporter}\n **Offender:** ${offender}\n **Reason:** ${reportReason}\n\n You may post your evidence here, staff will get back to you ASAP.`)
					.setColor(`RED`)
				channel.send(embed)

				let logEmbed = new Discord.MessageEmbed()
					.setTitle(`NEW REPORT`)
					.setDescription(`**Reporter:** ${reporter}\n **Offender:** ${offender}\n **Reason:** ${reportReason}`)
					.setColor(`RED`)
				logChannel.send(logEmbed).then(sent => {
					console.log(sent.id)
					embedID = sent.id
					sent.react(`🔍`)
					function escapeRegExp(str) {
						return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
					}
					fs.appendFile('./database/activeReports.txt', `|${reporter}^ - [${offender}} - !${channel}£ - *${escapeRegExp(reportReason)}& - (${embedID})\n`, function (err) {
						if (err) throw err;
				  });
				})

				
		}).catch(console.error);

		


		

			

}}