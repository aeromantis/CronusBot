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

        const rulesEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Carnivores`)
            .setDescription(`Rules for **Carnivorous** dinosaurs.`)
            .addField(`Overhunting`, `**Do not** overhunt. Eat what you (and your pack) can eat, and no more. \n **Example:** A pack of large carnivores may feasibly kill multiple smaller creatures to feed themselves, but if a group of small carnivores take down a large creature, they **cannot** go hunting again until they are hungry.`, false)
            .addField(`Bodies`, `**#1**: When the target of your hunt falls, the hunt should end. **However**, if the target is in a group, and the group continues fighting, you are free to continue until they back off. \n**#2**: A body that you have claimed (**Killing automatically claims**) is tethered to you, and you shouldn't go hunting until you lose claim, or finish the body.\n **#3**: Bodies can be challenged, and fought for. You may cede the body to an assailant simply by leaving, or submissive calling. Aggressive behaviour, biting at, or otherwise approaching the body may be interpreted as challenges.`, false)
            .addField(`Territories`, `Apexes, and large groups may claim certain territories as \'their own\'. Once claimed, the \'rulers\' of the territory may chase away potential competition. **A baby raptor, or a small herbivore is NOT competition to an Allosaurus**`, false)
            .setThumbnail(`https://cdn.discordapp.com/attachments/812023029382250546/823194676663681074/unknown.png`)
            .setTimestamp()

            message.channel.send(rulesEmbed)

    }
}