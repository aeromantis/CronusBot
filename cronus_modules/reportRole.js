const path = require(`path`)
const Discord = require(`discord.js`)

async function reportRoles(reaction, user, member){
    if (reaction.emoji.name === "🔍"){
        i = 0;
        let text = fs.readFileSync(path.join(__dirname, "..", './database/activeReports.txt'),'utf8').toString().split(`\n`);
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
}

exports.reportRoles = reportRoles;