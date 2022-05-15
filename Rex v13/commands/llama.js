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

    let replies = ["https://cdn.discordapp.com/attachments/614912483865526275/626397608373518371/104154075_gettyimages-154948449.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397667328524308/national-llama-day-640x514.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397764326260787/Llama_presidencial.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397826737504266/llama-attack.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397846299738113/iStock_000076568217_Large.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397900884279298/TELEMMGLPICT000125964190_trans_NvBQzQNjv4BqpVlberWd9EgFPZtcLiMQfy2dmClwgbjjulYfPTELibA.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397974368485376/9k.png", "https://cdn.discordapp.com/attachments/614912483865526275/626398022015647745/79c2712c10611c7099169859b9f43944.png", "https://cdn.discordapp.com/attachments/614912483865526275/626398060083281931/CJA_3953-624x936.png"];
    let result = Math.floor((Math.random() * replies.length));

    const llamaEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`🦙 | Llama`)
    .setImage(replies[result])
    message.channel.send({ embeds: [ llamaEmbed ]})
    .then(message.react("🦙"));
  }

  module.exports.help = {
    name: "llama",
    aliases: [],
    category: "imgs"
}