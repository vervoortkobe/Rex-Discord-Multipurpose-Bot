const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
    const loading = client.emojis.cache.get("615988699796340768");
    const discord = client.emojis.cache.get("647789513053175808");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    const mEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setDescription(`${loading} **|** ***Calculating...***`)

    const m = await message.channel.send(mEmbed);

    const pingEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`🏓 | Ping`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`***Pong!***\n> 💬 **| Message Latency:** \`${m.createdTimestamp - message.createdTimestamp}\`**ms**
    > ${discord} **| Discord API Heartbeat:** \`${Math.round(client.ws.ping)}\`**ms**`)
    m.edit(pingEmbed)
    .then(message.react("🏓"));
  }

  module.exports.help = {
    name: "ping",
    aliases: [],
    category: "about"
}