const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const levels = require("../levels.json");
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, guild) => {
  
//GUILDS LOG JOIN
    const guildslogjoinChannel = client.guilds.cache.get("516227189251768330").channels.cache.find(c => c.name === `rex-guilds-log`);
    if(!guildslogjoinChannel) return console.log(`WARNINGERROR: There is no channel named #rex-guilds-log in the server with id: 516227189251768330!`);

    let guildowner = client.users.cache.get(guild.ownerId);

    const guildslogjoinEmbed = new Discord.MessageEmbed()
    .setColor(0x43b481)
    .setTitle(`<a:yes:615983179341496321> | Guilds Log Join`)
    .setThumbnail(guild.iconURL())
    .setDescription(`**» GUILD_JOINED:** I have **joined** \`${guild.name}\`\n**» Guild ID:** \`${guild.id}\`\n**» Guild Owner (ID):** \`${guildowner.tag}\` - \`${guild.ownerId}\`\n**» Guild Members:** This guild has \`${guild.memberCount}\` members!\n**» Cached Servers:** \`${client.guilds.cache.size}\`\n**» Cached Users:** \`${client.users.cache.size}\``)
    guildslogjoinChannel.send({ embeds: [ guildslogjoinEmbed ]});
  }

  module.exports.help = {
    name: "guildCreate"
}