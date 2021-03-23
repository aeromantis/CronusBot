module.exports = {
	name: 'prune',
	aliases: ['delete', 'clear'],
	description: 'Deletes <amount> of messages!',
	args: true,
	usage: `<amount>`,
	staffOnly: true,
	execute(message, args) {
		const amount = parseInt(args[0]);

		if (isNaN(amount)) {
			message.react('❌');
			return message.reply('that doesn\'t seem to be a valid number.').then(sentMessage => {
			sentMessage.delete({ timeout: 5000 });
		});
		}
		else if (amount < 2 || amount > 100){
			message.react('❌');
			return message.reply(`You need to input a number between 2 and 100.`).then(sentMessage => {
			sentMessage.delete({ timeout: 5000 });
		});			
		}

		message.channel.bulkDelete(amount);
		message.channel.send(`${amount} messages deleted!`).then(sentMessage => {
			sentMessage.delete({ timeout: 5000 });
		});

	},
};