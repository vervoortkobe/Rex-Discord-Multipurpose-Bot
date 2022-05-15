const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const levels = require("../levels.json");
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, interaction) => {

    if(!interaction.isCommand()) return;
    const { commandName, options } = interaction;

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[interaction.guild.id]) {
      prefixes[interaction.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[interaction.guild.id].prefixes;

    if(commandName === "help") {
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
      const m = await interaction.reply({ embeds: [ helpEmbed ], fetchReply: true })
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

  module.exports.help = {
    name: "interactionCreate"
}