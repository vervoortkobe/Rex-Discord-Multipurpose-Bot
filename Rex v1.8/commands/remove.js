const config = require("./config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let ticketsupportRole = message.guild.roles.find(r => r.name === 'Ticket Support');

    if(!message.member.roles.has(ticketsupportRole)) return message.channel.send(`❌ | Couldn't remove the user from this ticket, because you do not have the correct role (Ticket Support) to do this!`);;

		if(!member) return message.channel.send("❌ | Pls mention a valid member of this server!");
		if (!message.channel.name.startsWith('ticket-')) return message.channel.send(`❌ | You can't use that command outside of a ticket channel!`);

		message.channel.overwritePermissions(member, {
			SEND_MESSAGES: false,
			READ_MESSAGES: false,
    });
    
    message.channel.send(`✅ | ${author.user.tag} just **removed <@${member.user.id}> from the ticket**!`);

    const logChannel = message.guild.channels.find(c => c.name === `rex-logs`);
    if(!logChannel)return;

    const removeLogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .addField(`TICKET_USER_REMOVE`, `${message.author.tag} just **removed ${member.user.username}from a ticket: <#${c.id}>**!`)
    .setFooter(`© Rex was made by Tsunami#6271`)
    logChannel.send(removeLogEmbed);
	}

    module.exports.help = {
        name: "remove"
    }