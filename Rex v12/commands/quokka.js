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

    let replies = ["https://cdn.discordapp.com/attachments/614912483865526275/626394754908684298/quokka-up-close--s--rohrlach-flickr.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394727280803840/57159-istock-486456250.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394705705435157/Quokka.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394663980630026/quokka.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394651422883884/rguiv7xysbg21.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394583399530517/c4763839b968e520f2ec2ee6e3f9fa50.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394564357259284/quokka-glimlach.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394266033324042/ECLIrxrXUAABJGl.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394222248984588/1488330286332.png", "https://cdn.discordapp.com/attachments/614912483865526275/626394220680183828/Happy-quokka.png", "https://cdn.discordapp.com/attachments/614912483865526275/626393914634403860/Quokka_Sam-West.png"];
    let result = Math.floor((Math.random() * replies.length));

    const quokkaEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`🐿 | Quokka`)
    .setImage(replies[result])
    message.channel.send(quokkaEmbed)
    .then(message.react("🐿"));
  }

  module.exports.help = {
    name: "quokka",
    aliases: [],
    category: "imgs"
}