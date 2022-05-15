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

    if(!args[0] || !args[0] === `mod` || !args[0] === `moderation` || !args[0] === `config` || !args[0] === `configuration` || !args[0] === `tickets` || !args[0] === `other` || !args[0] === `fun` || !args[0] === `img` || !args[0] === `images` || !args[0] === `nsfw` || !args[0] === `music` || !args[0] === `about` || !args[0] === `owner`) {
      const helpEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`🤖 | Help`)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`***• Use \`${prefix}setup\` to setup the ticket system***`)
      .addField(`⛑ | Moderation`, `\`\`\`${prefix}help mod\`\`\``, true)
      .addField(`⚙️ | Configuration`, `\`\`\`${prefix}help config\`\`\``, true)
      .addField(`🎫 | Tickets`, `\`\`\`${prefix}help tickets\`\`\``, true)
      .addField(`🆙 | Levels`, `\`\`\`${prefix}help levels\`\`\``, true)
      .addField(`📁 | Other`, `\`\`\`${prefix}help other\`\`\``, true)
      .addField(`😂 | Fun`, `\`\`\`${prefix}help fun\`\`\``, true)
      .addField(`📷 | Images`, `\`\`\`${prefix}help imgs\`\`\``, true)
      .addField(`🔞 | Nsfw`, `\`\`\`${prefix}help nsfw\`\`\``, true)
      .addField(`ℹ️ | About`, `\`\`\`${prefix}help about\`\`\``, true)
      .addField(`🤖 | Links`, `**»** ***[Support Server](https://rexbot.ga/discord)***\n**»** ***[Invite](https://rexbot.ga/invite)***`, true)
      .addField(`💻 | Docs`, `**»** ***[Website](https://rexbot.ga)***\n**»** ***[Commands](https://rexbot.ga/commands)***`, true)
      .setFooter(`» Page 1/10`)
      return message.channel.send(helpEmbed)
      .then(message.react("🤖"))
      .then(m => {
        m.react("🤖");
        m.react("⛑");
        m.react("⚙️");
        m.react("🎫");
        m.react("🆙");
        m.react("📁");
        m.react("😂");
        m.react("📷");
        m.react("🔞");
        m.react("ℹ️");
      });
    }

    if(args[0] === `mod` || args[0] === `moderation`) {
      const helpModEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`🤖 | Help Moderation`)
      .addField(`⛑ | Moderation (11)`, `\`\`\`${prefix}ban, ${prefix}delwarns, ${prefix}kick, ${prefix}lock, ${prefix}mute, ${prefix}purge, ${prefix}unban, ${prefix}unlock, ${prefix}unmute, ${prefix}warn, ${prefix}warnings\`\`\``)
      .setFooter(`» Page 2/10`)
      return message.channel.send(helpModEmbed)
      .then(message.react("⛑"))
      .then(m => {
        m.react("🤖");
        m.react("⛑");
        m.react("⚙️");
        m.react("🎫");
        m.react("🆙");
        m.react("📁");
        m.react("😂");
        m.react("📷");
        m.react("🔞");
        m.react("ℹ️");
      });
    }

    if(args[0] === `config` || args[0] === `configuration`) {
      const helpConfigEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`🤖 | Help Configuration`)
      .addField(`⚙️ | Configuration (7)`, `\`\`\`${prefix}automod, ${prefix}autorole, ${prefix}joinleave, ${prefix}prefix, ${prefix}rex-logs, ${prefix}rex-msglogs, ${prefix}serverstats\`\`\``)
      .setFooter(`» Page 3/10`)
      return message.channel.send(helpConfigEmbed)
      .then(message.react("⚙️"))
      .then(m => {
        m.react("🤖");
        m.react("⛑");
        m.react("⚙️");
        m.react("🎫");
        m.react("🆙");
        m.react("📁");
        m.react("😂");
        m.react("📷");
        m.react("🔞");
        m.react("ℹ️");
      });
    }

    if(args[0] === `tickets`) {
      const helpTicketsEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`🤖 | Help Tickets`)
      .addField(`🎫 | Tickets (10)`, `\`\`\`${prefix}adduser, ${prefix}close, ${prefix}closedcat, ${prefix}removeuser, ${prefix}rename, ${prefix}setup, ${prefix}ticket, ${prefix}ticketcat, ${prefix}ticketcreationgui, ${prefix}transcript\`\`\``)
      .setFooter(`» Page 4/10`)
      return message.channel.send(helpTicketsEmbed)
      .then(message.react("🎫"))
      .then(m => {
        m.react("🤖");
        m.react("⛑");
        m.react("⚙️");
        m.react("🎫");
        m.react("🆙");
        m.react("📁");
        m.react("😂");
        m.react("📷");
        m.react("🔞");
        m.react("ℹ️");
      });
    }

    if(args[0] === `levels` || args[0] === `leveling` || args[0] === `lvls`) {
      const helpLevelsEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`🤖 | Help Levels`)
      .addField(`🆙 | Levels (3)`, `\`\`\`${prefix}leaderboard, ${prefix}level, ${prefix}resetlevel\`\`\``)
      .setFooter(`» Page 5/10`)
      return message.channel.send(helpLevelsEmbed)
      .then(message.react("🆙"))
      .then(m => {
        m.react("🤖");
        m.react("⛑");
        m.react("⚙️");
        m.react("🎫");
        m.react("🆙");
        m.react("📁");
        m.react("😂");
        m.react("📷");
        m.react("🔞");
        m.react("ℹ️");
      });
    }

    if(args[0] === `other`) {
      const helpOtherEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`🤖 | Help Other`)
      .addField(`📁 | Other (10)`, `\`\`\`${prefix}avatar, ${prefix}colorpicker, ${prefix}geoip, ${prefix}invites, ${prefix}membercount, ${prefix}poll, ${prefix}servericon, ${prefix}say, ${prefix}serverinfo, ${prefix}whois\`\`\``)
      .setFooter(`» Page 6/10`)
      return message.channel.send(helpOtherEmbed)
      .then(message.react("📁"))
      .then(m => {
        m.react("🤖");
        m.react("⛑");
        m.react("⚙️");
        m.react("🎫");
        m.react("🆙");
        m.react("📁");
        m.react("😂");
        m.react("📷");
        m.react("🔞");
        m.react("ℹ️");
      });
    }

    if(args[0] === `fun`) {
      const helpFunEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`🤖 | Help Fun`)
      .addField(`😂 | Fun (11)`, `\`\`\`${prefix}8ball, ${prefix}binary, ${prefix}counting, ${prefix}hack, ${prefix}howgay, ${prefix}joke, ${prefix}meme, ${prefix}pokedex, ${prefix}ppsize, ${prefix}ship, ${prefix}tictactoe\`\`\``)
      .setFooter(`» Page 7/10`)
      return message.channel.send(helpFunEmbed)
      .then(message.react("😂"))
      .then(m => {
        m.react("🤖");
        m.react("⛑");
        m.react("⚙️");
        m.react("🎫");
        m.react("🆙");
        m.react("📁");
        m.react("😂");
        m.react("📷");
        m.react("🔞");
        m.react("ℹ️");
      });
    }

    if(args[0] === `imgs` || args[0] === `images`) {
      const helpImgsEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`🤖 | Help Images`)
      .addField(`📷 | Images (55)`, `\`\`\`${prefix}abandon, ${prefix}aww, ${prefix}bear, ${prefix}birb, ${prefix}car, ${prefix}cat, ${prefix}cry, ${prefix}cuddle, ${prefix}dog, ${prefix}dolphin, ${prefix}duckbutt, ${prefix}eevee, ${prefix}elephant, ${prefix}excuseme, ${prefix}facepalm, ${prefix}fish, ${prefix}food, ${prefix}fox, ${prefix}gay, ${prefix}giraffe, ${prefix}goose, ${prefix}hippo, ${prefix}horse, ${prefix}hug, ${prefix}invert, ${prefix}kangaroo, ${prefix}killerwhale, ${prefix}kiss, ${prefix}koala, ${prefix}lion, ${prefix}lizard, ${prefix}llama, ${prefix}panda, ${prefix}pat, ${prefix}penguin, ${prefix}pig, ${prefix}pikachu, ${prefix}quokka, ${prefix}raccoon, ${prefix}redpanda, ${prefix}rip, ${prefix}seal, ${prefix}shark, ${prefix}shiba, ${prefix}slap, ${prefix}snake, ${prefix}spider, ${prefix}spin, ${prefix}triggered, ${prefix}turtle, ${prefix}wanted, ${prefix}wasted, ${prefix}whale, ${prefix}wink, ${prefix}ytcomment\`\`\``)
      .setFooter(`» Page 8/10`)
      return message.channel.send(helpImgsEmbed)
      .then(message.react("📷"))
      .then(m => {
        m.react("🤖");
        m.react("⛑");
        m.react("⚙️");
        m.react("🎫");
        m.react("🆙");
        m.react("📁");
        m.react("😂");
        m.react("📷");
        m.react("🔞");
        m.react("ℹ️");
      });
    }

    if(args[0] === `nsfw`) {
      if(message.channel.nsfw === false) {
        const helpNoNsfwEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Nsfw`)
        .addField(`🔞 | Nsfw (25)`, `${x} **|** ***I couldn't show the nsfw commands, because this isn't an nsfw channel!***`)
        .setFooter(`» Page 9/10`)
        return message.channel.send(helpNoNsfwEmbed)
        .then(message.react("🔞"))
        .then(m => {
          m.react("🤖");
          m.react("⛑");
          m.react("⚙️");
          m.react("🎫");
          m.react("🆙");
          m.react("📁");
          m.react("😂");
          m.react("📷");
          m.react("🔞");
          m.react("ℹ️");
        });
      }
    }

    if(args[0] === `nsfw`) {
      if(message.channel.nsfw === true) {
        const helpNsfwEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Nsfw`)
        .addField(`🔞 | Nsfw (25)`, `\`\`\`${prefix}anal, ${prefix}boobs, ${prefix}booty, ${prefix}classic, ${prefix}ero, ${prefix}femdom, ${prefix}futanari, ${prefix}hanal,${prefix}hblowjob, ${prefix}hboobs, ${prefix}hcum, ${prefix}hentai, ${prefix}hgif, ${prefix}hpussy, ${prefix}htits, ${prefix}lesbian, ${prefix}lewd, ${prefix}lewdneko, ${prefix}neko, ${prefix}nsfwneko, ${prefix}pussy, ${prefix}pwankg, ${prefix}spank, ${prefix}trap, ${prefix}yuri \`\`\``)
        .setFooter(`» Page 9/10`)
        return message.channel.send(helpNsfwEmbed)
        .then(message.react("🔞"))
        .then(m => {
          m.react("🤖");
          m.react("⛑");
          m.react("⚙️");
          m.react("🎫");
          m.react("🆙");
          m.react("📁");
          m.react("😂");
          m.react("📷");
          m.react("🔞");
          m.react("ℹ️");
        });
      }
    }

    if(args[0] === `about`) {
      const helpAboutEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`🤖 | Help About`)
      .addField(`ℹ️ | About (7)`, `\`\`\`${prefix}botinfo, ${prefix}botstats, ${prefix}donate, ${prefix}invite, ${prefix}ping, ${prefix}support, ${prefix}website\`\`\``)
      .setFooter(`» Page 10/10`)
      return message.channel.send(helpAboutEmbed)
      .then(message.react("ℹ️"))
      .then(m => {
        m.react("🤖");
        m.react("⛑");
        m.react("⚙️");
        m.react("🎫");
        m.react("🆙");
        m.react("📁");
        m.react("😂");
        m.react("📷");
        m.react("🔞");
        m.react("ℹ️");
      });
    }

    if(args[0] === `owner`) {
      if(message.author.id === "408289224761016332") {
        const helpOwnerEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Owner`)
        .addField(`👑 | Owner (8)`, `\`\`\`${prefix}abuseban, ${prefix}abusekick, ${prefix}createinv, ${prefix}deop, ${prefix}eval, ${prefix}op, ${prefix}restart, ${prefix}serverlist\`\`\``)
        .setFooter(`» Page 11/10`)
        return message.channel.send(helpOwnerEmbed)
        .then(message.react("👑"))
        .then(m => {
          m.react("🤖");
          m.react("⛑");
          m.react("⚙️");
          m.react("🎫");
          m.react("🆙");
          m.react("📁");
          m.react("😂");
          m.react("📷");
          m.react("🔞");
          m.react("ℹ️");
        });
      }
    }
  }

  module.exports.help = {
    name: "help",
    aliases: [],
    category: "help"
}