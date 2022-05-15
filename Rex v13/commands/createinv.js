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
  
    if(message.author.id == "408289224761016332") {
      
      const findServer = client.guilds.cache.get(args[0]);
      if(!findServer) {
        const usageEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setAuthor(`⚙️ | Createinv`)
        .setDescription(`${x} **|** ***Usage: ${prefix}createinv <server ID>***`)
        return message.channel.send({ embeds: [ usageEmbed ]});
      }

      const firstChannel = findServer.channels.cache.filter(c => c.type === "text").find(x => x.position == 0);

      if(!firstChannel) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***I couldn't create an invite for this server, because this server doesn't have any text channels or because I don't have the correct permissions (CREATE_INSTANT_INVITE) to do this!***`)
        return message.channel.send({ embeds: [ errorEmbed ]});
      }

      if(!args[0]) {
        const usageEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setAuthor(`⚙️ | Create Invite`)
        .setDescription(`${x} **|** ***Usage: ${prefix}createinv <server ID>***`)
        return message.channel.send({ embeds: [ usageEmbed ]});
      }

      message.delete();

      const checkEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setDescription(`${v} **|** ***I sent it in your dm, ${message.author}!***`)
      message.channel.send({ embeds: [ checkEmbed ]});

      let invite = await firstChannel.createInvite({ maxAge: 86400, maxUses: 10 }).catch(console.error);

      const createinvEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`🔍 | Create Invite`)
      .setThumbnail(findServer.iconURL())
      .setDescription(`Here is an invite of \`${findServer.name}\`, with ID: \`${findServer.id}\`.\n**» Server Name:** \`${findServer.name}\`\n**» Server ID:** \`${findServer.id}\`\n**» Server Owner (ID):** \`${client.users.cache.get(findServer.ownerId).tag}\` - \`${findServer.ownerId}\`\n**» Membercount:** \`${findServer.memberCount}\``)
      message.member.send({ embeds: [ createinvEmbed ]})
      .catch(err => console.log(err));
      message.member.send(`${invite}`)
      .catch(err => console.log(err));
    }
  }
  
  module.exports.help = {
    name: "createinv",
    aliases: ["createinvite"],
    category: "owner"
}