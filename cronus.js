const fs = require('fs');
const Discord = require('discord.js');
const readline = require('readline');

const { prefix, token } = require('./config.json');
const { report } = require('process');
const client = new Discord.Client({ partials: ["MESSAGE","CHANNEL","REACTION"]});
const cooldowns = new Discord.Collection();
const staffOnly = new Discord.Collection();
const managerOnly = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}



client.once('ready', () => {
	console.log('Ready!');
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('Elysium - !help', { type: 'PLAYING' });
 });

client.on('guildMemberAdd', (member) => {
		
	    channel = member.guild.channels.cache.get("775572248857542678");
		infoChannel = member.guild.channels.cache.get(`775581852035448842`)

			var welcomeItems = Array("It\'s great to have you onboard!", "We're glad to see you here!", "Hope you enjoy your time here!", "Come and say hello!", "We\'re happy to see you here!", "So glad you joined us!")
            var helloItems = Array("Hey there, ", "Hello, ", "Heyo, ", "Welcome, ", "Good to see you, ", "WOO! It's ")
            var welcomeMessage = welcomeItems[Math.floor(Math.random() * welcomeItems.length)]
            var helloMessage = helloItems[Math.floor(Math.random() * helloItems.length)]

            const welcomeEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(helloMessage + `${member.user.username}!`)
            .addField(welcomeMessage, `Check out the ${infoChannel} channel to get started!`, true)
            .setThumbnail(member.user.avatarURL())
            .setTimestamp()
		channel.send(welcomeEmbed);
	})

client.on('message', async message => {


	const args = message.content.slice(prefix.length).trim().split(/ +/)
	const commandName = args.shift().toLowerCase();
	if (message.content.indexOf(prefix) !== 0) return;
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if (!command) return;

	if(command.staffOnly){
		if (!message.member.roles.cache.some(role => role.name === 'Staff')){
			message.react('❌');
			return message.reply(`you are not staff!`).then(sentMessage => {
			sentMessage.delete({ timeout: 5000 });
		})         
		}	
		if(command.managerOnly){
			if (!message.member.roles.cache.some(role => role.id === '775572523873861643')){
				message.react('❌');
				return message.reply(`you are not authorised!`).then(sentMessage => {
				sentMessage.delete({ timeout: 5000 });
			})
				
			}		
		}	
	}
		



	if (command.args && !args.length) {
	let reply = `You didn't provide any arguments, ${message.author}!`;
	message.react('❌');
	if (command.usage) {
		reply += `\n\`${prefix}${command.name} ${command.usage}\``;
	}
		return message.channel.send(reply).then(sentMessage => {
			sentMessage.delete({ timeout: 10000 });
		});
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`).then(sentMessage => {
			sentMessage.delete({ timeout: 10000 });
		});
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


	try {
		command.execute(message, args);
		
	} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!').then(sentMessage => {
			sentMessage.delete({ timeout: 5000 }).catch(error => {
					
			});
		});
	message.react('❌');
	}	
		
	if (!message.content.startsWith(prefix) || message.author.bot) return;



	})

	function unbanInterval() {
	    var text = fs.readFileSync('./database/discordBanList.txt','utf8').toString().split(`\n`);
	    i = 0;
	    var d = new Date();

	    while (i < text.length) {
		    banLength = 
				text[i].substring(
				text[i].lastIndexOf(`[`)+1,
				text[i].lastIndexOf(`]`)
			)

			timesArray = banLength.split(`/`);
			banYear = timesArray[0];
			banMonth = timesArray[1];
			banDay = timesArray[2];
			banHour = timesArray[3];

			if(banYear <= d.getFullYear()){
				if (banMonth <= d.getMonth()+1){
					if (banDay <= d.getDate()){
						if(banHour  <= d.getHours()){
							idToUnban = 
							text[i].substring(
							text[i].lastIndexOf(`<`)+3,
							text[i].lastIndexOf(`>`)
						)

							message.guild.fetchBans().then(bans=> {
						      if(bans.size == 0) return console.log(`no bans found`)
						      let bUser = message.guild.fetchBan(idToUnban)
						      if(!bUser) return console.log(`user is not banned`)
						      message.guild.members.unban(idToUnban)
						  	console.log(`${idToUnban} has been automatically unbanned.`);
							});
							
							
						}
					}

				}
			}
			i++
		}
		console.log(`unban check ran`)
	}	

	client.setInterval(function() {
		unbanInterval();
	  }, 60000);

		client.on("messageReactionAdd", async (reaction, user) => {
			if (reaction.message.partial) await reaction.message.fetch();
			if (user.bot) return;
			if (!reaction.message.guild) return;
			var member = reaction.message.guild.members.cache.get(user.id)

			//automated role from files
			if (reaction.message.channel.id === "813589521035821127") {
				let rolesArray = fs.readFileSync('./database/reactionRoles.txt','utf8').toString().split(`|`);
				i = 0
						  
				while (i < rolesArray.length) {
					currentLine = rolesArray[i];
					splitLine = currentLine.split(" - ")
					reactedEmoji = splitLine[0];
					var reactedRoleName = splitLine[1];
					if(splitLine[2] == "restricted"){
						var restrictedRole = true;
					} else {
						var restrictedRole = false;
					}
					if(reaction.emoji.name == reactedEmoji){
						break
					}
					i++
			}
			console.log(rolesArray);
			console.log(restrictedRole);			
			var roleToRAssign = reaction.message.guild.roles.cache.find(role => role.name === reactedRoleName);	
			if(!restrictedRole){					
				await member.roles.add(roleToRAssign)
			} else {
				const responseChannel = reaction.message.guild.channels.cache.get("775878357782364171");
				let activeRequests = fs.readFileSync('./database/roleCalls.txt','utf8').toString().split(`\n`);
				if(activeRequests.includes(member.toString())){
					responseChannel.send(`${member}, you already have an active request. Please wait.`)
					return
				} else if(member.roles.cache.some(role => role.name === reactedRoleName)){
					return
				}
				fs.appendFile('./database/roleCalls.txt', `${member}\n`, function (err) {
					if (err) throw err;
			  	});
				const logChannel =  reaction.message.guild.channels.cache.get("777150428616982538");
								
				logChannel.send(`| ${member} is requesting the **${roleToRAssign.name}** role! React below to accept or reject this request.`).then(async function (message) {
					await message.react('☑️')
					await message.react('❌')
					responseChannel.send(`${member}, your request has been submitted. Please be patient.`)
					const filter = (reaction, user) => {
						return user !== client.id
					};
	
					const collector = message.createReactionCollector(filter, { time: 1800000 });
					var forcedEnd = false;
	
					collector.on('collect', (reaction, user) => {
						   if (reaction.emoji.name === `☑️`){
							   member.roles.add(roleToRAssign);
							   responseChannel.send(`${member}, your request has been approved by ${user}`)
								forcedEnd = true;
							   collector.stop();
							   
						   } else {
							   responseChannel.send(`${member}, your request has been rejected by ${user}`)
							   forcedEnd = true;
							   collector.stop();
							   
						   }
					});
					collector.on('end', collected => {
						textFile = fs.readFileSync('./database/roleCalls.txt','utf8')
						let newValue = textFile.replace(member, ``);
						fs.writeFileSync('./database/roleCalls.txt', newValue, 'utf-8');	
						if(!forcedEnd){
							responseChannel.send(`${member}, your request has timed out. Please try again later.`)
							message.delete();													
						}
	
					});
				})
			}
		}
			//confirm role
			if (reaction.message.id === "776916894761615441") {
				if (reaction.emoji.name ==="🇨") {
					await member.roles.add("775859415068442664")
				}
			}
			//Roles for staff
			if (reaction.message.channel.id === "776147540399489044") {
				if (reaction.emoji.name ==="🇦") {
					await member.roles.add("808148304697360414")
				}
			}

			//report roles

			if (reaction.emoji.name === "🔍"){
				i = 0;
				let text = fs.readFileSync('./database/activeReports.txt','utf8').toString().split(`\n`);
				while (i < text.length) {


					messageID = text[i].substring(
								text[i].lastIndexOf(`(`)+1,
								text[i].lastIndexOf(`)`)
							)
		
					if(messageID == reaction.message.id){						
						break;
					}
					i++
				}

				let reportChannelID = text[i].substring(
					text[i].lastIndexOf(`!`)+3,
					text[i].lastIndexOf(`£`)-1
				)
				let reportChannel = reaction.message.guild.channels.cache.get(reportChannelID)
				if(reportChannel == undefined){
					return;
				}

				let embed = new Discord.MessageEmbed()
					.setTitle(`REPORT CLAIMED`)
					.setDescription(`${member} has claimed this report.`)
					.setColor(`GREEN`)
				reportChannel.send(embed)
			}

		})

		client.on("messageReactionRemove", async (reaction, user) => {
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
		})

	
	

client.login(`Nzc1NzA2NjUyNjI3Njk3Njk1.X6qPHQ.BFwwBA3ZmuK29yGPyAsD6A_68OI`);