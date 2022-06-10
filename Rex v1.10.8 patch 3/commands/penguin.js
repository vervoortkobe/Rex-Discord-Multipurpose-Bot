const config = require("../config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    let replies = ["https://cdn.discordapp.com/attachments/614912483865526275/636275931601698816/disneynature-penguins.jpg", "https://cdn.discordapp.com/attachments/614912483865526275/636275928208637952/1000x-1.jpg", "https://cdn.discordapp.com/attachments/614912483865526275/636275926790963200/01_adelie_penguin.jpg", "https://cdn.discordapp.com/attachments/614912483865526275/636275926564470823/1-adelie-penguins-species-1524251364.jpg", "https://cdn.discordapp.com/attachments/614912483865526275/636275841155858487/EmperorPenguins_11278870305_f6ea2ae166_o_ChristopherMichelFlickr.jpg", "https://cdn.discordapp.com/attachments/614912483865526275/636275841210384394/images.jpg", "https://cdn.discordapp.com/attachments/614912483865526275/636275838882545696/emperor-penguin.jpg", "https://cdn.discordapp.com/attachments/614912483865526275/636275839490850816/antarctica-wildlife-adelie-penguins-icehopping-istock-800x600-c-default.jpg", "https://cdn.discordapp.com/attachments/614912483865526275/636275834860077075/1556175266452_1.jpg", "https://cdn.discordapp.com/attachments/614912483865526275/636275767206084619/South_Shetland-2016-Deception_IslandChinstrap_penguin_Pygoscelis_antarctica_04.jpg", "https://cdn.discordapp.com/attachments/614912483865526275/636275740610002951/thumb_32639_default_1600.jpeg", "https://cdn.discordapp.com/attachments/614912483865526275/636275729256153130/shutterstock-542167180.jpg", "https://cdn.discordapp.com/attachments/614912483865526275/636275728026959906/photo-1551986782-d0169b3f8fa7.jpg", "https://cdn.discordapp.com/attachments/614912483865526275/636275727544614925/Penguins-header.jpg", "https://cdn.discordapp.com/attachments/614912483865526275/636275723027611679/penguins-antarctica-e1542748360311.jpg", "https://cdn.discordapp.com/attachments/614912483865526275/636275722565976120/Penguin_shuvuu.jpg", "https://cdn.discordapp.com/attachments/614912483865526275/636275719072251914/p06kfbnl.jpg"];
    let result = Math.floor((Math.random() * replies.length));

    const penguinEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`🐧 | ${client.user.username} Penguin`)
    .setImage(replies[result])
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(penguinEmbed);
  }

  module.exports.help = {
    name: "penguin"
}