const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    if(!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't send the ticket creation GUI, you don't have the correct permissions (ADMINISTRATOR) to do this!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    message.delete();

    const ticketcreationEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`🎫 | Ticket Creation`)
    .addField(`Do you want to create a ticket?`, `Simply **react** with the \`🎫\` reaction on this message!`)
    message.channel.send({ embeds: [ ticketcreationEmbed ]})
    .then(m => m.react("🎫"));
  }

  module.exports.help = {
    name: "ticketcreationgui",
    aliases: ["tgui"],
    category: "tickets"
}