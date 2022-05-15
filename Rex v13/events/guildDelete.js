const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const levels = require("../levels.json");
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, guild) => {

//GUILDS LOG LEAVE
    const guildslogleaveChannel = client.guilds.cache.get("516227189251768330").channels.cache.find(c => c.name === `rex-guilds-log`);
    if(!guildslogleaveChannel) return console.log(`WARNINGERROR: There is no channel named #rex-guilds-log in the server with id: 516227189251768330!`);

    let guildowner = client.users.cache.get(guild.ownerId);

    const guildslogleaveEmbed = new Discord.MessageEmbed()
    .setColor(0xf04947)
    .setTitle(`<a:no:615983201156071424> | Guilds Log Leave`)
    .setThumbnail(guild.iconURL())
    .setDescription(`**» GUILD_LEFT:** I have **left** \`${guild.name}\`!\n**» Guild ID:** \`${guild.id}\`\n**» Guild Owner (ID):** \`${guildowner.tag}\` - \`${guild.ownerId}\`\n**» Guild Members:** This guild has \`${guild.memberCount}\` members!\n**» Cached Servers:** \`${client.guilds.cache.size}\`\n**» Cached Users:** \`${client.users.cache.size}\``)
    guildslogleaveChannel.send({ embeds: [ guildslogleaveEmbed ]});
  }

  module.exports.help = {
    name: "guildDelete"
}