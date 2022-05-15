const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const levels = require("../levels.json");
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, member) => {

//LEAVE
    let jlchannels = JSON.parse(fs.readFileSync("./jlchannels.json", "utf-8"));
    if(!jlchannels[member.guild.id]) return;
    let jlchannel = jlchannels[member.guild.id].jlchannels;

    let leavechannel = member.guild.channels.cache.find(c => c.id === jlchannel);
    if(leavechannel) {

      let {data} = await fetch;

      fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=leave&background=23&textcolor=darkred&text=Bye!&username=${member.user.username}&discriminator=${member.user.discriminator}&subtext=${member.guild.memberCount}th&avatar=${member.user.displayAvatarURL().split(".webp")[0] + ".png"}`)
      .then(res => res).then(data => {
        if(data.error) {

          const leaveEmbed = new Discord.MessageEmbed()
          .setColor(0xf04947)
          .setAuthor(`😢 | Leave`)
          .setThumbnail(member.user.displayAvatarURL())
          .setDescription(`**Bye** ${member}!`)
          .setFooter(`${member.guild.name} now has ${member.guild.memberCount} members!`)
          leavechannel.send({ embeds: [ leaveEmbed ]});

        } else {

          let leavePic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=leave&background=23&textcolor=darkred&text=Bye!&username=${member.user.username}&discriminator=${member.user.discriminator}&subtext=${member.guild.memberCount}th&avatar=${member.user.displayAvatarURL().split(".webp")[0] + ".png"}`, "leave.png");

          const leaveEmbed = new Discord.MessageEmbed()
          .setColor(0xf04947)
          .setAuthor(`😢 | Leave`)
          .setDescription(`**Bye** ${member}!`)
          .setImage("attachment://leave.png")
          .setFooter(`${member.guild.name} now has ${member.guild.memberCount} members!`)
          leavechannel.send({ embeds: [ leaveEmbed ], files: [ leavePic ] });
        }
      });
    }

    let logChannel = member.guild.channels.cache.find(c => c.name === `rex-logs`);
    if(logChannel) {
      
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

      const leaveLogEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setAuthor(`⚙️ | Logs`)
      .setThumbnail(member.user.displayAvatarURL())
      .setDescription(`**» MEMBER_LEFT:**\n\`${member.user.tag}\` **left** the server!\n**» Account Creation Date:**\n\`${member.user.createdAt.toLocaleDateString("nl-BE")}\`\n\`${createdat} days ago\``)
      .setFooter(`${member.guild.name} now has ${member.guild.memberCount} members!`)
      logChannel.send({ embeds: [ leaveLogEmbed ]});
    }
    
//MEMBERCOUNTS LOG
    const membercountslogChannel = client.guilds.cache.get("516227189251768330").channels.cache.find(c => c.name === `rex-membercounts-log`);
    if(!membercountslogChannel) return console.log(`WARNINGERROR: There is no channel named #rex-membercounts-log in the server with id: 516227189251768330!`);
    membercountslogChannel.send(`${member.guild.id}; total: ${member.guild.memberCount}, humans: ${member.guild.memberCount - member.guild.members.cache.filter(member => member.user.bot).size}, bots: ${member.guild.members.cache.filter(member => member.user.bot).size}`);
  }

  module.exports.help = {
    name: "guildMemberRemove"
}