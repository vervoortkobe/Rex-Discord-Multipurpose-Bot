const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
    
    const enabled = client.emojis.cache.get("792517063918223380");
    const disabled = client.emojis.cache.get("792517072956817409");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    if(!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't enable/disable my Automod for this server, you don't have the correct permissions (ADMINISTRATOR) to do this!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    if(!args[0] || !args[0] === "antiswear" || !args[0] === "antispam" || !args[0] === "antiinvites" || !args[0] === "antiraid" || !args[0] === "all" || !args[1] || !args[1] === "enable" || !args[1] === "disable") {
      let automods = JSON.parse(fs.readFileSync("./automods.json", "utf-8"));

      if(!automods[message.guild.id]) {
        automods[message.guild.id] = {
          antiswear: "disable",
          antispam: "disable",
          antiinvites: "disable",
          antiraid: "disable"
        }
      }
      //let automod = automods[message.guild.id].automods;

      let text1;
      let text2;
      let text3;
      let text4;
      //TEXT1
      if(automods[message.guild.id].antiswear === "enable") {
        text1 = `${enabled} \`Enabled\``;
      }
      if(automods[message.guild.id].antiswear === "disable") {
        text1 = `${disabled} \`Disabled\``;
      }
      //TEXT2
      if(automods[message.guild.id].antispam === "enable") {
        text2 = `${enabled} \`Enabled\``;
      }
      if(automods[message.guild.id].antispam === "disable") {
        text2 = `${disabled} \`Disabled\``;
      }
      //TEXT3
      if(automods[message.guild.id].antiinvites === "enable") {
        text3 = `${enabled} \`Enabled\``;
      }
      if(automods[message.guild.id].antiinvites === "disable") {
        text3 = `${disabled} \`Disabled\``;
      }
      //TEXT4
      if(automods[message.guild.id].antiraid === "enable") {
        text4 = `${enabled} \`Enabled\``;
      }
      if(automods[message.guild.id].antiraid === "disable") {
        text4 = `${disabled} \`Disabled\``;
      }

      const usageEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Automod`)
      .setDescription(`${x} **|** ***Usage: ${prefix}automod <antispam/antiswear/antiinvites/antiraid/all> <enable/disable>***\n> **» Antiswear:** ${text1}\n> **» Antispam:** ${text2}\n> **» Antiinvites:** ${text3}\n> **» Antiraid:** ${text4}`)
      return message.channel.send({ embeds: [ usageEmbed ]});
    }

//AUTOMOD ANTISWEAR
    if(args[0] === "antiswear") {
      if(args[1] === "enable" || args[1] === "disable") {

        let automods = JSON.parse(fs.readFileSync("./automods.json", "utf-8"));
        if(!automods[message.guild.id]) {
          automods[message.guild.id] = {
            antiswear: "disable",
            antispam: "disable",
            antiinvites: "disable",
            antiraid: "disable"
          }
        }

        automods[message.guild.id].antiswear = args[1];

        fs.writeFile("./automods.json", JSON.stringify(automods), (err) => {
          if(err) console.log(err);
        });

        const automodEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setAuthor(`⚙️ | Automod Antiswear`)
        .setDescription(`${v} **|** ***My AUTOMOD Antiswear for this server has been set to: \`${args[1]}\`***`)
        message.channel.send({ embeds: [ automodEmbed ]})
        .then(message.react("⚙️"));

        const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
        if(logChannel) {
          const automodLogEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`⚙️ | Logs`)
          .setThumbnail(message.guild.iconURL())
          .setDescription(`**» CONFIG_AUTOMOD_ANTISWEAR:**\nMy **AUTOMOD Antiswear** for this server has been set to: \`${args[1]}\``)
          logChannel.send({ embeds: [ automodLogEmbed ]});
        }

      } else {

        const usageEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setAuthor(`⚙️ | Automod`)
        .setDescription(`${x} **|** ***Usage: ${prefix}automod <antispam/antiswear/antiinvites/antiraid/all> <enable/disable>***`)
        return message.channel.send({ embeds: [ usageEmbed ]});
      }
    }

//AUTOMOD ANTISPAM
    if(args[0] === "antispam") {
      if(args[1] === "enable" || args[1] === "disable") {

        let automods = JSON.parse(fs.readFileSync("./automods.json", "utf-8"));
        if(!automods[message.guild.id]) {
          automods[message.guild.id] = {
            antiswear: "disable",
            antispam: "disable",
            antiinvites: "disable",
            antiraid: "disable"
          }
        }

        automods[message.guild.id].antispam = args[1];

        fs.writeFile("./automods.json", JSON.stringify(automods), (err) => {
          if(err) console.log(err);
        });

        const automodEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setAuthor(`⚙️ | Automod Antispam`)
        .setDescription(`${v} **|** ***My AUTOMOD Antispam for this server has been set to: \`${args[1]}\`***`)
        message.channel.send({ embeds: [ automodEmbed ]})
        .then(message.react("⚙️"));

        const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
        if(logChannel) {
          const automodLogEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`⚙️ | Logs`)
          .setThumbnail(message.guild.iconURL())
          .setDescription(`**» CONFIG_AUTOMOD_ANTISPAM:**\nMy **AUTOMOD Antispam** for this server has been set to: \`${args[1]}\``)
          logChannel.send({ embeds: [ automodLogEmbed ]});
        }

      } else {

        const usageEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setAuthor(`⚙️ | Automod`)
        .setDescription(`${x} **|** ***Usage: ${prefix}automod <antispam/antiswear/antiinvites/antiraid/all> <enable/disable>***`)
        return message.channel.send({ embeds: [ usageEmbed ]});
      }
    }
    
//AUTOMOD ANTIINVITES
if(args[0] === "antiinvites") {
  if(args[1] === "enable" || args[1] === "disable") {

    let automods = JSON.parse(fs.readFileSync("./automods.json", "utf-8"));
    if(!automods[message.guild.id]) {
      automods[message.guild.id] = {
        antiswear: "disable",
        antispam: "disable",
        antiinvites: "disable",
        antiraid: "disable"
      }
    }

    automods[message.guild.id].antiinvites = args[1];

    fs.writeFile("./automods.json", JSON.stringify(automods), (err) => {
      if(err) console.log(err);
    });

    const automodEmbed = new Discord.MessageEmbed()
    .setColor(0x43b481)
    .setAuthor(`⚙️ | Automod Antiinvites`)
    .setDescription(`${v} **|** ***My AUTOMOD Antiinvites for this server has been set to: \`${args[1]}\`***`)
    message.channel.send({ embeds: [ automodEmbed ]})
    .then(message.react("⚙️"));

    const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
    if(logChannel) {
      const automodLogEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`⚙️ | Logs`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(`**» CONFIG_AUTOMOD_ANTIINVITES:**\nMy **AUTOMOD Antiinvites** for this server has been set to: \`${args[1]}\``)
      logChannel.send({ embeds: [ automodLogEmbed ]});
    }

  } else {

    const usageEmbed = new Discord.MessageEmbed()
    .setColor(0xf04947)
    .setAuthor(`⚙️ | Automod`)
    .setDescription(`${x} **|** ***Usage: ${prefix}automod <antispam/antiswear/antiinvites/antiraid/all> <enable/disable>***`)
    return message.channel.send({ embeds: [ usageEmbed ]});
  }
}
    
//AUTOMOD ANTIRAID
if(args[0] === "antiraid") {
  if(args[1] === "enable" || args[1] === "disable") {

    let automods = JSON.parse(fs.readFileSync("./automods.json", "utf-8"));
    if(!automods[message.guild.id]) {
      automods[message.guild.id] = {
        antiswear: "disable",
        antispam: "disable",
        antiinvites: "disable",
        antiraid: "disable"
      }
    }

    automods[message.guild.id].antiraid = args[1];

    fs.writeFile("./automods.json", JSON.stringify(automods), (err) => {
      if(err) console.log(err);
    });

    const automodEmbed = new Discord.MessageEmbed()
    .setColor(0x43b481)
    .setAuthor(`⚙️ | Automod Antiraid`)
    .setDescription(`${v} **|** ***My AUTOMOD Antiraid for this server has been set to: \`${args[1]}\`***`)
    message.channel.send({ embeds: [ automodEmbed ]})
    .then(message.react("⚙️"));

    const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
    if(logChannel) {
      const automodLogEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`⚙️ | Logs`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(`**» CONFIG_AUTOMOD_ANTIRAID:**\nMy **AUTOMOD Antiraid** for this server has been set to: \`${args[1]}\``)
      logChannel.send({ embeds: [ automodLogEmbed ]});
    }

  } else {

    const usageEmbed = new Discord.MessageEmbed()
    .setColor(0xf04947)
    .setAuthor(`⚙️ | Automod`)
    .setDescription(`${x} **|** ***Usage: ${prefix}automod <antispam/antiswear/antiinvites/antiraid/all> <enable/disable>***`)
    return message.channel.send({ embeds: [ usageEmbed ]});
  }
}

//AUTOMOD ALL
    if(args[0] === "all") {
      if(args[1] === "enable" || args[1] === "disable") {

        let automods = JSON.parse(fs.readFileSync("./automods.json", "utf-8"));
        if(!automods[message.guild.id]) {
          automods[message.guild.id] = {
            antiswear: "disable",
            antispam: "disable",
            antiinvites: "disable",
            antiraid: "disable"
          }
        }

        automods[message.guild.id] = {
          antiswear: args[1],
          antispam: args[1],
          antiinvites: args[1],
          antiraid: args[1]
        }

        fs.writeFile("./automods.json", JSON.stringify(automods), (err) => {
          if(err) console.log(err);
        });

        const automodEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setAuthor(`⚙️ | Automod All`)
        .setDescription(`${v} **|** ***My AUTOMOD All for this server has been set to: \`${args[1]}\`***`)
        message.channel.send({ embeds: [ automodEmbed ]})
        .then(message.react("⚙️"));

        const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
        if(logChannel) {
          const automodLogEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`⚙️ | Logs`)
          .setThumbnail(message.guild.iconURL())
          .setDescription(`**» CONFIG_AUTOMOD_ALL:**\nMy **AUTOMOD All** for this server has been set to: \`${args[1]}\``)
          logChannel.send({ embeds: [ automodLogEmbed ]});
        }

      } else {

        const usageEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setAuthor(`⚙️ | Automod`)
        .setDescription(`${x} **|** ***Usage: ${prefix}automod <antispam/antiswear/antiinvites/antiraid/all> <enable/disable>***`)
        return message.channel.send({ embeds: [ usageEmbed ]});
      }
    }
  }

  module.exports.help = {
    name: "automod",
    aliases: [],
    category: "config"
}