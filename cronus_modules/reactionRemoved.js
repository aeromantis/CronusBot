async function reactionRemovedRun(reaction, user) {
	if (reaction.message.partial) await reaction.message.fetch();
			if (user.bot) return;
			if (!reaction.message.guild) return;
			let member = reaction.message.guild.members.cache.get(user.id)

			if (reaction.message.channel.id === "813589521035821127") {
				let rolesArray = fs.readFileSync('./database/reactionRoles.txt','utf8').toString().split(`|`);
				i = 0
				while (i < rolesArray.length) {
					currentLine = rolesArray[i];
					splitLine = currentLine.split(" - ")
					emoji = splitLine[0];
					reactedEmoji = splitLine[0];
					reactedRoleName = splitLine[1];
					var restrictedState = splitLine[2]
					if(reaction.emoji.name == reactedEmoji){
						break
					}
					i++
			}			
				roleToRAssign = reaction.message.guild.roles.cache.find(role => role.name === reactedRoleName);
				await member.roles.remove(roleToRAssign);
			}
}

exports.reactionRemovedRun = reactionRemovedRun;