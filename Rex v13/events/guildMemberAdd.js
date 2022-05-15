const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const levels = require("../levels.json");
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, member) => {

//JOIN
    let jlchannels = JSON.parse(fs.readFileSync("./jlchannels.json", "utf-8"));
    if(!jlchannels[member.guild.id]) return;
    let jlchannel = jlchannels[member.guild.id].jlchannels;

    let joinchannel = member.guild.channels.cache.find(c => c.id === jlchannel);
    if(joinchannel) {

      let {data} = await fetch;

      fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=join&background=22&textcolor=darkgreen&text=Welcome!&username=${member.user.username}&discriminator=${member.user.discriminator}&subtext=${member.guild.memberCount}th&avatar=${member.user.displayAvatarURL().split(".webp")[0] + ".png"}`)
      .then(res => res).then(data => {
        if(data.error) {

          const joinEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setAuthor(`🤗 | Join`)
          .setThumbnail(member.user.displayAvatarURL())
          .setDescription(`**Welcome** ${member}!`)
          .setFooter(`${member.guild.name} now has ${member.guild.memberCount} members!`)
          joinchannel.send({ embeds: [ joinEmbed ]});

        } else {

          let joinPic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=join&background=22&textcolor=darkgreen&text=Welcome!&username=${member.user.username}&discriminator=${member.user.discriminator}&subtext=${member.guild.memberCount}th&avatar=${member.user.displayAvatarURL().split(".webp")[0] + ".png"}`, "join.png");

          const joinEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setAuthor(`🤗 | Join`)
          .setDescription(`**Welcome** ${member}!`)
          .setImage("attachment://join.png")
          .setFooter(`${member.guild.name} now has ${member.guild.memberCount} members!`)
          joinchannel.send({ embeds: [ joinEmbed ], files: [ joinPic ] });
        }
      });
    }
      
    let ctotalSeconds = ((Date.now() - member.user.createdAt) / 1000);
    let cyears = Math.floor(ctotalSeconds / 31556926);
    ctotalSeconds %= 31556926;
    let cdays = Math.floor(ctotalSeconds / 86400);
    ctotalSeconds %= 86400;
    let chours = Math.floor(ctotalSeconds / 3600);
    ctotalSeconds %= 3600;
    let cminutes = Math.floor(ctotalSeconds / 60);
    let cseconds = Math.floor(ctotalSeconds % 60);
    let createdat = `${cyears}y ${cdays}d ${chours}h ${cminutes}m ${cseconds}s`;

    let logChannel = member.guild.channels.cache.find(c => c.name === `rex-logs`);
    if(logChannel) {

      const joinLogEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setAuthor(`⚙️ | Logs`)
      .setThumbnail(member.user.displayAvatarURL())
      .setDescription(`**» MEMBER_JOINED:**\n\`${member.user.tag}\` **joined** the server!\n**» Account Creation Date:**\n\`${member.user.createdAt.toLocaleDateString("nl-BE")}\`\n\`${createdat} days ago\``)
      .setFooter(`${member.guild.name} now has ${member.guild.memberCount} members!`)
      logChannel.send({ embeds: [ joinLogEmbed ]});
    }

    if(cdays <= 3) {

      let automods = JSON.parse(fs.readFileSync("./automods.json", "utf-8"));
      if(!automods[member.guild.id]) {
        automods[member.guild.id] = {
          antiswear: "disable",
          antispam: "disable",
          antiinvites: "disable",
          antiraid: "disable"
        }
      }
      let antiraid = automods[member.guild.id].antiraid;

      if(antiraid === "enable") {
        if(!member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {

          const automodPmEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`⛑️ | Automod`)
          .setThumbnail(member.guild.iconURL())
          .setDescription(`AUTOMOD banned you from \`${member.guild.name}\`, because of \`raiding\`!\n**» Server:** \`${member.guild.name}\`\n**» Punishment:** \`Ban\`\n**» Reason:** \`Raiding\``)
          member.send({ embeds: [ automodPmEmbed ]})
          .catch(err => console.log(err));

          member.guild.members.ban(`${member.id}`, { days: 7, reason: "Raiding" });

          const logChannel = member.guild.channels.cache.find(c => c.name === `rex-logs`);
          if(logChannel) {
            const automodLogEmbed = new Discord.MessageEmbed()
            .setColor(0x03a9f4)
            .setAuthor(`⚙️ | Logs`)
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`**» AUTOMOD:**\n**AUTOMOD banned ${member.author}**, because of **Raiding**!`)
            logChannel.send({ embeds: [ automodLogEmbed ]});
          }
        }
      }
    }

//AUTOROLE
    let autoroles = JSON.parse(fs.readFileSync("./autoroles.json", "utf-8"));
    if(autoroles[member.guild.id]) {
      let autorole = autoroles[member.guild.id].autoroles;

      let guildautorole = member.guild.roles.cache.find(r => r.id === `${autorole}`);
      if(guildautorole) {
        member.roles.add(guildautorole);
      }
    }

//MEMBERCOUNTS LOG
    const membercountslogChannel = client.guilds.cache.get("516227189251768330").channels.cache.find(c => c.name === `rex-membercounts-log`);
    if(!membercountslogChannel) return console.log(`WARNINGERROR: There is no channel named #rex-membercounts-log in the server with id: 516227189251768330!`);
    membercountslogChannel.send(`${member.guild.id}; total: ${member.guild.memberCount}, humans: ${member.guild.memberCount - member.guild.members.cache.filter(member => member.user.bot).size}, bots: ${member.guild.members.cache.filter(member => member.user.bot).size}`);
  }

  module.exports.help = {
    name: "guildMemberAdd"
}