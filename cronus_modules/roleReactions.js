const path = require(`path`)

async function assignRoles(reaction, user) {
        if (reaction.message.channel.id === "813589521035821127") {
            let rolesArray = fs.readFileSync(path.join(__dirname, "..", "./database/reactionRoles.txt"),'utf8').toString().split(`|`);
            i = 0
            var member = reaction.message.guild.members.cache.get(user.id)
                      
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
        var roleToRAssign = reaction.message.guild.roles.cache.find(role => role.name === reactedRoleName);	
        if(!restrictedRole){					
            await member.roles.add(roleToRAssign)
        } else {
            const responseChannel = reaction.message.guild.channels.cache.get("775878357782364171");
            let activeRequests = fs.readFileSync(path.join(__dirname, "..", '../database/roleCalls.txt'),'utf8').toString().split(`\n`);
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
                    textFile = fs.readFileSync(path.join(__dirname, "..", '../database/roleCalls.txt'),'utf8')
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
    }

    exports.assignRoles = assignRoles;