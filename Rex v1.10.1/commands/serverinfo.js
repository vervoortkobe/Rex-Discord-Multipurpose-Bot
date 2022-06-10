const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const superagent = require("superagent");
const prefix = (config.prefix);

module.exports.run = async (client, message, args) => {

    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
      };
    
      let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
      let region = {
        "brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };
  
      const serverinfoEmbed = new Discord.RichEmbed()
        .setColor(0xff0000)
        .setTitle(`🤖 | ${client.user.username} Serverinfo`)
        .setThumbnail(message.guild.iconURL)
        .addField(`Server Name`, message.guild.name, true)
        .addField(`Server ID`, message.guild.id, true)
        .addField(`Server Creation Date`, `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
        .addField(`Server Owner`, `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
        .addField(`Server Verification Level`, verifLevels[message.guild.verificationLevel], true)
        .addField(`Region`, region [message.guild.region], true)
        .addField(`Total | Humans | Bots`, `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
        .addField(`Channels Count`, message.guild.channels.size, true)
        .addField(`Roles Count`, `${message.guild.roles.size}` - 1, true)
        .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
        message.channel.send(serverinfoEmbed);
      }

  module.exports.help = {
    name: "serverinfo"
}