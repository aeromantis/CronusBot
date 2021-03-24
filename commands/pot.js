const Discord = require(`discord.js`)


module.exports = {
	name: 'pot',
	aliases: ['pot'],
	description: 'A command for managing Path of Titans.',
	args: true,
	usage: ``,
	staffOnly: true,
    managerOnly: true,
	cooldown:5,
	execute(message, args) {

        const carniEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Carnivores`)
            .setDescription(`Rules for **Carnivorous** dinosaurs.`)
            .addField(`Overhunting`, `**Do not** overhunt. Eat what you (and your pack) can eat, and no more. \n **Example:** A pack of large carnivores may feasibly kill 
            multiple smaller creatures to feed themselves, but if a group of small carnivores take down a large creature, they **cannot** go hunting again until they are hungry.`, false)
            //overhunting ^^^^^^^^^^^^^^^^^^^^^^^^^^^^

            .addField(`Bodies`, `**#1**: When the target of your hunt falls, the hunt should end. **However**, if the target is in a group, and the group continues fighting, 
            you are free to continue until they back off. \n**#2**: A body that you have claimed (**Killing automatically claims**) is tethered to you, and you shouldn't go 
            hunting until you lose claim, or finish the body.\n **#3**: Bodies can be challenged, and fought for. You may cede the body to an assailant simply by leaving, or 
            submissive calling. Aggressive behaviour, biting at, or otherwise approaching the body may be interpreted as challenges.`, false)
            //bodies ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


            .addField(`Territories`, `Apexes, and large groups may claim certain territories as \'their own\'. Once claimed, the \'rulers\' of the territory may chase away 
            potential competition. **A baby raptor, or a small herbivore is NOT competition to an Allosaurus**`, false)
            // territories ^^^^^^^^^^^^^^
            .setThumbnail(`https://cdn.discordapp.com/attachments/812023029382250546/823194676663681074/unknown.png`)
            .setTimestamp()

            

            const generalEmbed = new Discord.MessageEmbed()
            .setColor('#800080')
            .setTitle(`Global Chat Rules`)
            .setAuthor('Elysium', message.member.guild.iconURL(), '')
            .setDescription(`These apply everywhere in our community. Including our Discord, and game servers.`)
            .addField(`➼ The usage of slurs is NOT tolerated.`, `We will not and do not allow discrimination of any kind in our server. This is a safe place for everyone. 
            Swearing is acceptable, as long as it is not overly excessive.\nSlurs include: **r-word, n-word, f-word, calling someone/something autistic as an insult**, etc.
            Discriminative talk without the use of slurs is treated the same as if it were a slur. **Homophobia, racism, sexism, sexual harassment, insults/jokes about 
            mental illnesses/suicide** are **NOT** permitted.`, false)
            //slurs ^^^^^^^^^^^^^^^^^^^^^^^^^^^^

            .addField(`➼ Excessive drama is NOT tolerated.`, `A short disagreement/argument or two is fine, but when it gets to the point that things become heated, or carry on for an extended time, drop the subject or take it somewhere private.`, false)
            //drama ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


            .addField(`➼ Do not spam global chat.`, `Minor spam is okay, excessive is not.`, false)
            // spam ^^^^^^^^^^^^^^

            .addField(`➼ No overly sexual topics/images.`, `Unless you're in an NSFW labelled section, all NSFW content is prohibited.`, false)

            .addField(`➼ Keep all topics in their respective channels. (Discord)`, `Please refrain from posting random memes in #general, venting anywhere other than #vent, talking through text to someone you're in a voice channel with outside of #no-mic-chat, and so on.`, false)
            .setFooter('Written by taelvoe', ``);

            const rolesEmbed = new Discord.MessageEmbed()
            .setColor('#800080')
            .setTitle(`Roles`)
            .addField(`➼ Our bot handles all role requests! See`, `**${message.guild.channels.cache.get(`813589521035821127`)}**`, true)
            .addField(`➼ You must have the NSFW role in order to gain access to NSFW channels.`, `\u200B`, true)
            .addField(`➼ React with :regional_indicator_c: after you have read ALL rules. This will give access to all public channels.`, `\u200B`, true)
            .setImage(`https://cdn.discordapp.com/attachments/812023029382250546/824023661799014400/unknown.png`)

            if(args[0] == "srules"){
                message.channel.send(generalEmbed)
                message.channel.send(rolesEmbed)
                message.channel.send(`**If you have any questions or confusion regarding our rules, please contact an admin!**`)
            }

    }
}