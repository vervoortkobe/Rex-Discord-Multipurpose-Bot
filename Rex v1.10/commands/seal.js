const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let replies = ["https://cdn.discordapp.com/attachments/614912483865526275/626397037126221824/shutterstock_343293677.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397062149308426/Seal-D12822.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397084974710804/TELEMMGLPICT000169908378_trans_NvBQzQNjv4BqyuLFFzXshuGqnr8zPdDWXiTUh73-1IAIBaONvUINpkg.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397150229823498/header-saving-seals.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397161818685460/2Q.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397224347369472/ff0c9597d2f673d0df8ee24b8994b2add3429e91629589443226b175b1f4b1a1.png","https://cdn.discordapp.com/attachments/614912483865526275/626397251849420801/image.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397357373915137/seal-wallpapers-25616-4031318.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397364013498368/05-baby-seal.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397372515352578/image.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397392094232590/seal.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397438743412737/HAL500497697_hd.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397444099407882/ill-gewone-zeehond-2010-10sw.png", "https://cdn.discordapp.com/attachments/614912483865526275/626397479524499459/file-20180314-113479-1kj9cxa.png"];
    let result = Math.floor((Math.random() * replies.length));

    const sealEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🐬 | ${client.user.username} Seal`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage(replies[result])
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(sealEmbed);
  }

  module.exports.help = {
    name: "seal"
}