const express = require("express");
var Client = require("uptime-robot");
const cors = require("cors");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("online");
});

app.use(cors());

const listener = app.listen(process.env.PORT, function() {
  console.log("✔️  Your app is listening on port: " + listener.address().port);
});

///////////////////////////////////////////////////////////////////////////////////

const Discord = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const client = new Discord.Client({ disableMentions: "everyone", ws: { intents: new Discord.Intents(Discord.Intents.ALL) }, partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"] });
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const fetch = require("node-fetch");
//const superagent = require("superagent");
const levels = require("./levels.json");
const db = require("quick.db");
const moment = require("moment");
const cooldown = new Set();
const cdtime = 1000;

const v = client.emojis.cache.get("615983179341496321");
const x = client.emojis.cache.get("615983201156071424");
const loading = client.emojis.cache.get("615988699796340768");
const ban = client.emojis.cache.get("808732827406958632");

fs.readdir("./commands/", (err, files) => {
 
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0) {
    console.log("\x1b[31m", "❌  I couldn't find the commands map!");
    console.log("\x1b[0m", "");
    return;
  }
   
  jsfile.forEach((f, i) => {

    let props = require(`./commands/${f}`);
    console.log("\x1b[0m", `• ${f} was loaded!`);
    client.commands.set(props.help.name, props);

    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
    
  });

});


  client.on("ready", async () => {
    fs.readdir("./commands/", (err, files) => {
      let jsfile = files.filter(f => f.split(".").pop() === "js");

      console.log("\x1b[0m", "");
      console.log("\x1b[36m", `» All ${jsfile.length} commands were loaded!`);
      console.log("\x1b[36m", `» Cached Servers: ${client.guilds.cache.size}`);
      console.log("\x1b[36m", `» Cached Users: ${client.users.cache.size}`);
      console.log("\x1b[32m", `✔️  ${client.user.username} was started!`);
      console.log("\x1b[0m", "");

    });
    client.user.setActivity(`${process.env.PREFIX}help | ${client.user.username} | rexbot.ga`, {type: "PLAYING"});

    app.get("/api/", (req, res) => {
      res.json({
        "botstats": {
          "servers": client.guilds.cache.size,
          "users": client.users.cache.size
        }
      });
    });
  });

/////////////////////////////////////////////////////////////////////////////////////////////
//GUILDS LOG JOIN
  client.on("guildCreate", guild => {

    const guildslogjoinChannel = client.guilds.cache.get("516227189251768330").channels.cache.find(c => c.name === `rex-guilds-log`);
    if(!guildslogjoinChannel) return console.log(`WARNINGERROR: There is no channel named #rex-guilds-log in the server with id: 516227189251768330!`);

    let guildowner = client.users.cache.get(guild.ownerID);

    const guildslogjoinEmbed = new Discord.MessageEmbed()
    .setColor(0x43b481)
    .setTitle(`<a:yes:615983179341496321> | Guilds Log Join`)
    .setThumbnail(guild.iconURL())
    .setDescription(`**» GUILD_JOINED:** I have **joined** \`${guild.name}\`\n**» Guild ID:** \`${guild.id}\`\n**» Guild Owner (ID):** \`${guildowner.tag}\` - \`${guild.ownerID}\`\n**» Guild Members:** This guild has \`${guild.memberCount}\` members!\n**» Cached Servers:** \`${client.guilds.cache.size}\`\n**» Cached Users:** \`${client.users.cache.size}\``)
    guildslogjoinChannel.send(guildslogjoinEmbed);
  });

//GUILDS LOG LEAVE
  client.on("guildDelete", guild => {

    const guildslogleaveChannel = client.guilds.cache.get("516227189251768330").channels.cache.find(c => c.name === `rex-guilds-log`);
    if(!guildslogleaveChannel) return console.log(`WARNINGERROR: There is no channel named #rex-guilds-log in the server with id: 516227189251768330!`);

    let guildowner = client.users.cache.get(guild.ownerID);

    const guildslogleaveEmbed = new Discord.MessageEmbed()
    .setColor(0xf04947)
    .setTitle(`<a:no:615983201156071424> | Guilds Log Leave`)
    .setThumbnail(guild.iconURL())
    .setDescription(`**» GUILD_LEFT:** I have **left** \`${guild.name}\`!\n**» Guild ID:** \`${guild.id}\`\n**» Guild Owner (ID):** \`${guildowner.tag}\` - \`${guild.ownerID}\`\n**» Guild Members:** This guild has \`${guild.memberCount}\` members!\n**» Cached Servers:** \`${client.guilds.cache.size}\`\n**» Cached Users:** \`${client.users.cache.size}\``)
    guildslogleaveChannel.send(guildslogleaveEmbed)
  });

/////////////////////////////////////////////////////////////////////////////////////////////
//SERVERSTATS
  setInterval(() => { //UPDATES EVERY 10 MINUTES
    client.guilds.cache.forEach(g => {
      g.channels.cache.forEach(c => {
        if(c.type === "voice" && c.name.includes("Total: ") && !c.name.includes(g.memberCount)) {
          c.setName(`📈 | Total: ${g.memberCount}`);
        }
        if(c.type === "voice" && c.name.includes("Humans: ") && !c.name.includes(g.memberCount - g.members.cache.filter(member => member.user.bot).size)) {
          c.setName(`😄 | Humans: ${g.memberCount - g.members.cache.filter(member => member.user.bot).size}`);
        }
        if(c.type === "voice" && c.name.includes("Bots: ") && !c.name.includes(g.members.cache.filter(member => member.user.bot).size)) {
          c.setName(`🤖 | Bots: ${g.members.cache.filter(member => member.user.bot).size}`);
        }
      });
    });
  }, 600000);

/////////////////////////////////////////////////////////////////////////////////////////////
//JOIN
  client.on("guildMemberAdd", async member => {

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
          joinchannel.send(joinEmbed);

        } else {

          let joinPic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=join&background=22&textcolor=darkgreen&text=Welcome!&username=${member.user.username}&discriminator=${member.user.discriminator}&subtext=${member.guild.memberCount}th&avatar=${member.user.displayAvatarURL().split(".webp")[0] + ".png"}`, "join.png");

          const joinEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setAuthor(`🤗 | Join`)
          .setDescription(`**Welcome** ${member}!`)
          .attachFiles(joinPic)
          .setImage("attachment://join.png")
          .setFooter(`${member.guild.name} now has ${member.guild.memberCount} members!`)
          joinchannel.send(joinEmbed);
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
      logChannel.send(joinLogEmbed);
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
        if(!member.permissions.has("ADMINISTRATOR")) {

          const automodPmEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`⛑️ | Automod`)
          .setThumbnail(member.guild.iconURL())
          .setDescription(`AUTOMOD banned you from \`${member.guild.name}\`, because of \`raiding\`!\n**» Server:** \`${member.guild.name}\`\n**» Punishment:** \`Ban\`\n**» Reason:** \`Raiding\``)
          member.send(automodPmEmbed)
          .catch(err => console.log(err));

          member.guild.members.ban(`${member.id}`, { reason: "Raiding" });

          const logChannel = member.guild.channels.cache.find(c => c.name === `rex-logs`);
          if(logChannel) {
            const automodLogEmbed = new Discord.MessageEmbed()
            .setColor(0x03a9f4)
            .setAuthor(`⚙️ | Logs`)
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`**» AUTOMOD:**\n**AUTOMOD banned ${member.author}**, because of **Raiding**!`)
            logChannel.send(automodLogEmbed);
          }
        }
      }
    }

//AUTOROLE
    let autoroles = JSON.parse(fs.readFileSync("./autoroles.json", "utf-8"));
    if(!autoroles[member.guild.id]) return;
    let autorole = autoroles[member.guild.id].autoroles;

    let guildautorole = member.guild.roles.cache.find(r => r.id === `${autorole}`);
    if(!guildautorole) return;

    member.roles.add(guildautorole);
  });

//LEAVE
  client.on("guildMemberRemove", async member => {

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
          leavechannel.send(leaveEmbed);

        } else {

          let leavePic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=leave&background=23&textcolor=darkred&text=Bye!&username=${member.user.username}&discriminator=${member.user.discriminator}&subtext=${member.guild.memberCount}th&avatar=${member.user.displayAvatarURL().split(".webp")[0] + ".png"}`, "leave.png");

          const leaveEmbed = new Discord.MessageEmbed()
          .setColor(0xf04947)
          .setAuthor(`😢 | Leave`)
          .setDescription(`**Bye** ${member}!`)
          .attachFiles(leavePic)
          .setImage("attachment://leave.png")
          .setFooter(`${member.guild.name} now has ${member.guild.memberCount} members!`)
          leavechannel.send(leaveEmbed);
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
      logChannel.send(leaveLogEmbed);
    }
  });

////////////////////////////////////////////////////////////////////////////////////////////////////
//MESSAGE_DELETE
  client.on("messageDelete", async delMsg => {

    if(!delMsg.partial) {

      const msglogChannel = delMsg.guild.channels.cache.find(c => c.name === `rex-msglogs`);
      if(msglogChannel) {
        if(delMsg.content === "") return;

        if(delMsg.length > 1000) {
          const msgdelLogEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`⚙️ | Logs`)
          .setThumbnail(delMsg.author.displayAvatarURL())
          .setDescription(`**» MESSAGE_DELETE:**\nA message of **${delMsg.author.tag} in ${delMsg.channel} was deleted**!\n**» Deleted Message:** \`\`\`This message was too long to display!\`\`\``)
          return msglogChannel.send(msgdelLogEmbed);
        }

        let delmsgcontent;
        if(delMsg.content) {
          delmsgcontent = delMsg.content;
        } else {
          delmsgcontent = "Unknown Message";
        }

        const msgdelLogEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setThumbnail(delMsg.author.displayAvatarURL())
        .setDescription(`**» MESSAGE_DELETE:**\nA message of **${delMsg.author.tag} in ${delMsg.channel} was deleted**!\n**» Deleted Message:** \`\`\`${delmsgcontent}\`\`\``)
        msglogChannel.send(msgdelLogEmbed);
      }
    }
  });

////////////////////////////////////////////////////////////////////////////////////////////////////
//MESSAGE_UPDATE
  client.on("messageUpdate", async (oldMsg, newMsg) => {

    if(!oldMsg.partial) {

      if(newMsg.author.id === client.user.id) return;

      const msglogChannel = newMsg.guild.channels.cache.find(c => c.name === `rex-msglogs`);
      if(msglogChannel) {
        if(oldMsg.content === "" || newMsg.content === "" || oldMsg.content === newMsg.content) return;

        let oldmsg;
        let newmsg;
        if(oldMsg.length > 1000) oldmsg = `This message was too long to display!`;
        else oldmsg = oldMsg.content;
        if(newMsg.length > 1000) newmsg = `This message was too long to display!`;
        else newmsg = newMsg.content;

        msgupdEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setThumbnail(newMsg.author.displayAvatarURL())
        .setDescription(`**» MESSAGE_UPDATE:**\nA ***[message](https://discord.com/channels/${newMsg.guild.id}/${newMsg.channel.id}/${newMsg.id})*** from **${newMsg.author} in ${newMsg.channel}** was **edited**!\n**» Old Message:** \`\`\`${oldmsg}\`\`\`\n**» New Message:** \`\`\`${newmsg}\`\`\``)
        msglogChannel.send(msgupdEmbed);
      }
    }
  });

////////////////////////////////////////////////////////////////////////////////////////////////////

  client.on("messageReactionAdd", async (reaction, user) => {

    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
    const loading = client.emojis.cache.get("615988699796340768");
    
////////////////////////////////////////////////////////////////////////////////////////////////////
//HELP COMMAND REACTION

    if(!user.bot && reaction.message.author.id === client.user.id) {

      let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
      if(!prefixes[reaction.message.guild.id]) {
        prefixes[reaction.message.guild.id] = {
          prefixes: process.env.PREFIX
        }
      }
      let prefix = prefixes[reaction.message.guild.id].prefixes;
      
      if(reaction.emoji.name === "🤖") {
        reaction.message.reactions.resolve("🤖").users.remove(user);

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
        reaction.message.edit(helpEmbed)
      }
      if(reaction.emoji.name === "⛑") {
        reaction.message.reactions.resolve("⛑").users.remove(user);

        const helpModerationEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Moderation`)
        .addField(`⛑ | Moderation (11)`, `\`\`\`${prefix}ban, ${prefix}delwarns, ${prefix}kick, ${prefix}lock, ${prefix}mute, ${prefix}purge, ${prefix}unban, ${prefix}unlock, ${prefix}unmute, ${prefix}warn, ${prefix}warnings\`\`\``)
        .setFooter(`» Page 2/10`)
        reaction.message.edit(helpModerationEmbed);
      }

      if(reaction.emoji.name === "⚙️") {
        reaction.message.reactions.resolve("⚙️").users.remove(user);
        
        const helpConfigEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Configuration`)
        .addField(`⚙️ | Configuration (7)`, `\`\`\`${prefix}automod, ${prefix}autorole, ${prefix}joinleave, ${prefix}prefix, ${prefix}rex-logs, ${prefix}rex-msglogs, ${prefix}serverstats\`\`\``)
        .setFooter(`» Page 3/10`)
        reaction.message.edit(helpConfigEmbed);
      }

      if(reaction.emoji.name === "🎫") {
        reaction.message.reactions.resolve("🎫").users.remove(user);
        
        const helpTicketsEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Tickets`)
        .addField(`🎫 | Tickets (10)`, `\`\`\`${prefix}adduser, ${prefix}close, ${prefix}closedcat, ${prefix}removeuser, ${prefix}rename, ${prefix}setup, ${prefix}ticket, ${prefix}ticketcat, ${prefix}ticketcreationgui, ${prefix}transcript\`\`\``)
        .setFooter(`» Page 4/10`)
        reaction.message.edit(helpTicketsEmbed);
      }

      if(reaction.emoji.name === "🆙") {
        reaction.message.reactions.resolve("🆙").users.remove(user);
        
        const helpLevelsEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Levels`)
        .addField(`🆙 | Levels (3)`, `\`\`\`${prefix}leaderboard, ${prefix}level, ${prefix}resetlevel\`\`\``)
        .setFooter(`» Page 5/10`)
        reaction.message.edit(helpLevelsEmbed);
      }

      if(reaction.emoji.name === "📁") {
        reaction.message.reactions.resolve("📁").users.remove(user);
        
        const helpOtherEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Other`)
        .addField(`📁 | Other (10)`, `\`\`\`${prefix}avatar, ${prefix}colorpicker, ${prefix}geoip, ${prefix}invites, ${prefix}membercount, ${prefix}poll, ${prefix}servericon, ${prefix}say, ${prefix}serverinfo, ${prefix}whois\`\`\``)
        .setFooter(`» Page 6/10`)
        reaction.message.edit(helpOtherEmbed);
      }

      if(reaction.emoji.name === "😂") {
        reaction.message.reactions.resolve("😂").users.remove(user);
        
        const helpFunEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Fun`)
        .addField(`😂 | Fun (11)`, `\`\`\`${prefix}8ball, ${prefix}binary, ${prefix}counting, ${prefix}hack, ${prefix}howgay, ${prefix}joke, ${prefix}meme, ${prefix}pokedex, ${prefix}ppsize, ${prefix}ship, ${prefix}tictactoe\`\`\``)
        .setFooter(`» Page 7/10`)
        reaction.message.edit(helpFunEmbed);
      }

      if(reaction.emoji.name === "📷") {
        reaction.message.reactions.resolve("📷").users.remove(user);
        
        const helpImgsEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Images`)
        .addField(`📷 | Images (55)`, `\`\`\`${prefix}abandon, ${prefix}aww, ${prefix}bear, ${prefix}birb, ${prefix}car, ${prefix}cat, ${prefix}cry, ${prefix}cuddle, ${prefix}dog, ${prefix}dolphin, ${prefix}duckbutt, ${prefix}eevee, ${prefix}elephant, ${prefix}excuseme, ${prefix}facepalm, ${prefix}fish, ${prefix}food, ${prefix}fox, ${prefix}gay, ${prefix}giraffe, ${prefix}goose, ${prefix}hippo, ${prefix}horse, ${prefix}hug, ${prefix}invert, ${prefix}kangaroo, ${prefix}killerwhale, ${prefix}kiss, ${prefix}koala, ${prefix}lion, ${prefix}lizard, ${prefix}llama, ${prefix}panda, ${prefix}pat, ${prefix}penguin, ${prefix}pig, ${prefix}pikachu, ${prefix}quokka, ${prefix}raccoon, ${prefix}redpanda, ${prefix}rip, ${prefix}seal, ${prefix}shark, ${prefix}shiba, ${prefix}slap, ${prefix}snake, ${prefix}spider, ${prefix}spin, ${prefix}triggered, ${prefix}turtle, ${prefix}wanted, ${prefix}wasted, ${prefix}whale, ${prefix}wink, ${prefix}ytcomment\`\`\``)
        .setFooter(`» Page 8/10`)
        reaction.message.edit(helpImgsEmbed);
      }

      if(reaction.emoji.name === "🔞") {
        reaction.message.reactions.resolve("🔞").users.remove(user);
        
        if(reaction.message.channel.nsfw === false) {
          const helpNoNsfwEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`🤖 | Help Nsfw`)
          .addField(`🔞 | Nsfw (25)`, `${x} **|** ***I couldn't show the nsfw commands, because this isn't an nsfw channel!***`)
          .setFooter(`» Page 9/10`)
          reaction.message.edit(helpNoNsfwEmbed);
        }

        if(reaction.message.channel.nsfw === true) {
          const helpNsfwEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`🤖 | Help Nsfw`)
          .addField(`🔞 | Nsfw (25)`, `\`\`\`${prefix}anal, ${prefix}boobs, ${prefix}booty, ${prefix}classic, ${prefix}ero, ${prefix}femdom, ${prefix}futanari, ${prefix}hanal,${prefix}hblowjob, ${prefix}hboobs, ${prefix}hcum, ${prefix}hentai, ${prefix}hgif, ${prefix}hpussy, ${prefix}htits, ${prefix}lesbian, ${prefix}lewd, ${prefix}lewdneko, ${prefix}neko, ${prefix}nsfwneko, ${prefix}pussy, ${prefix}pwankg, ${prefix}spank, ${prefix}trap, ${prefix}yuri \`\`\``)
          .setFooter(`» Page 9/10`)
          reaction.message.edit(helpNsfwEmbed);
        }
      }

      if(reaction.emoji.name === "ℹ️") {
        reaction.message.reactions.resolve("ℹ️").users.remove(user);
        
        const helpAboutEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help About`)
        .addField(`ℹ️ | About (7)`, `\`\`\`${prefix}botinfo, ${prefix}botstats, ${prefix}donate, ${prefix}invite, ${prefix}ping, ${prefix}support, ${prefix}website\`\`\``)
        .setFooter(`» Page 10/10`)
        reaction.message.edit(helpAboutEmbed);
      }
    }
    
////////////////////////////////////////////////////////////////////////////////////////////////////
//COLORPICKER RANDOM REACTION

    if(!user.bot && reaction.message.author.id === client.user.id) {
      if(reaction.emoji.name === "🔁") {
        reaction.message.reactions.resolve("🔁").users.remove(user);

        let color = Math.floor(Math.random() * 0xFFFFFF).toString(16);
        let colorimage = `https://tsunamiapi.tsunami2360.repl.co/color/?hex=${color}`;
        let hexedcolor = "#" + color;

        const colorpickerEmbed = new Discord.MessageEmbed()
        .setColor(hexedcolor)
        .setAuthor(`🎨 | Colorpicker`)
        .setDescription(`**» Hexadecimal:** \`${hexedcolor}\``)
        .setImage(colorimage)
        reaction.message.edit(colorpickerEmbed)
        .then(m => m.react("🔁"));
      }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////
//CREATE TICKET REACTION

    if(!user.bot && reaction.message.author.id === client.user.id) {
      if(reaction.emoji.name === "🎫" && reaction.message.reactions.length === 1) {
        reaction.message.reactions.resolve("🎫").users.remove(user);
    
        let reason = "No reason given";
        let ticketsupportrolefind = reaction.message.guild.roles.cache.find(r => r.name === `Ticket Support`);
        if(!ticketsupportrolefind) {
          const errorEmbed = new Discord.MessageEmbed()
          .setColor(0xf04947)
          .setDescription(`${x} **|** ***This server doesn't have a*** *Ticket Support* ***role, so the ticket won't be created!\nIf you're an Administrator, please create a \`Ticket Support\` role and give it to users that should be able to manage the tickets.***`)
          return reaction.message.channel.send(errorEmbed);
        }
        const existingTicket = reaction.message.guild.channels.cache.find(c => c.name === `ticket-${message.author.username.toLowerCase().replace(" ", "-")}-${message.author.discriminator}`);
        if(!existingTicket) {
    
          reaction.message.guild.channels.create(`ticket-${user.username.toLowerCase()}-${message.author.discriminator}`, {
            type: "text",
            reason: `This ticket was created by ${user.tag}, because of ${reason}!`,
            topic: `This ticket was created by ${user}, because of ${reason}!`
          }).then(c => {
    
            setTimeout(() => {
    
              let everyone = reaction.message.guild.roles.everyone;
    
              c.updateOverwrite(user, {
                "SEND_MESSAGES": true,
                "VIEW_CHANNEL": true,
                "READ_MESSAGE_HISTORY": true,
                "ATTACH_FILES": true,
                "ADD_REACTIONS": false
              });
    
              c.updateOverwrite(ticketsupportrolefind, {
                "VIEW_CHANNEL": true,
                "READ_MESSAGE_HISTORY": true,
                "SEND_MESSAGES": true,
                "ATTACH_FILES": true,
                "ADD_REACTIONS": false
              });
    
              c.updateOverwrite(everyone, {
                "VIEW_CHANNEL": false,
                "READ_MESSAGE_HISTORY": false,
                "SEND_MESSAGES": false,
                "ATTACH_FILES": false,
                "ADD_REACTIONS": false
              });
    
            }, 2000);
        
            let ticketcats = JSON.parse(fs.readFileSync("./ticketcats.json", "utf-8"));
            if(ticketcats[reaction.message.guild.id]) {
    
              let ticketcat = ticketcats[reaction.message.guild.id].ticketcats;
              
              let isthereticketcat = reaction.message.guild.channels.cache.find(c => c.id === ticketcat);
              if(!isthereticketcat) {
                const errorEmbed = new Discord.MessageEmbed()
                .setColor(0xf04947)
                .setDescription(`${x} **|** ***Error: Something went wrong! Please try again!***`)
                return reaction.message.channel.send(errorEmbed);
              }
    
              c.setParent(`${ticketcat}`);
    
              let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));
    
              ticketowners[c.id] = {
                ticketowners: user.id
              }
    
              fs.writeFile("./ticketowners.json", JSON.stringify(ticketowners), (err) => {
                if(err) console.log(err);
              });
    
            }
    
            setTimeout(() => {
              const ticketEmbed = new Discord.MessageEmbed()
              .setColor(0x03a9f4)
              .addField(`Hey, ${message.author}!`, `**You've made a ticket, because of \`${reason}\`!**
              \nPls explain your request as detailed as possible!
              \nOur **Support Team** will help you as fast as possible!`)
              .addField(`Do you want to close this ticket?`, `Simply **react** with the \`🗑️\` reaction on this message!`)
              .addField(`Do you want to create a transcript of this ticket?`, `Simply **react** with the \`📝\` reaction on this message!`)
              c.send(ticketEmbed).then(m => {
                m.react("🗑️");
                m.react("📝");
              });
              
              const ticketSupportRole = reaction.message.guild.roles.cache.find(r => r.name === `Ticket Support`);
              c.send(`> ${ticketSupportRole}`)
              .then(m => m.delete({ timeout: 5000 }));
            }, 1000);
              
            const checkEmbed = new Discord.MessageEmbed()
            .setColor(0x43b481)
            .setDescription(`${v} **|** ***${user}, your ticket has been created: <#${c.id}>!***`)
            reaction.message.channel.send(checkEmbed)
            .then(m => m.delete({ timeout: 5000 }));
    
            const logChannel = reaction.message.guild.channels.cache.find(c => c.name === `ticket-logs`);
            if(logChannel) {
              const ticketLogEmbed = new Discord.MessageEmbed()
              .setColor(0x43b481)
              .setAuthor(`⚙️ | Logs`)
              .setDescription(`**» TICKET_CREATE:**
              \n**${user} created a new ticket: #${c.name}**, because of **${reason}**!
              `)
              logChannel.send(ticketLogEmbed);
            }
            
          }).catch(err => console.log(err));
          
        } else {
          const errorEmbed = new Discord.MessageEmbed()
          .setColor(0xf04947)
          .setDescription(`${x} **|** ***You already created a ticket!***`)
          return reaction.message.channel.send(errorEmbed)
          .then(m => m.delete({ timeout: 5000 }));
        }
      }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////
//CLOSE TICKET REACTION

  if(reaction.message.channel.name.startsWith("ticket-") && reaction.message.channel.name !== "ticket-creation" && reaction.message.channel.name !== "ticket-logs" && !user.bot && reaction.message.author.id === client.user.id) {
    if(reaction.emoji.name === "🗑️") {
      reaction.message.reactions.resolve("🗑️").users.remove(user);
  
      if(!reaction.message.channel.name.startsWith(`ticket-`)) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***You can't use that command outside of a ticket channel!***`)
        return reaction.message.channel.send(errorEmbed);
      }
    
      let closedcats = JSON.parse(fs.readFileSync("./closedcats.json", "utf-8"));
      if(closedcats[reaction.message.guild.id] && reaction.message.guild.channels.cache.find(c => c.id === closedcats[reaction.message.guild.id])) {
      let closedcat = closedcats[reaction.message.guild.id].closedcats;
        
        if(reaction.message.channel.parent.id === `${closedcat}`) {
  
          //DELETED IN CLOSEDCAT // SEND TRANSCRIPT TO LOGS
          
          const checkEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setDescription(`${v} **|** ***I will delete this ticket in \`10\` seconds...***`)
          reaction.message.channel.send(checkEmbed);
  
          setTimeout(() => {
  
            reaction.message.channel.messages.fetch()
            .then(messages => {
  
              var text;
  
              for(let [key, value] of messages) {
                const date = new Date(value.createdTimestamp).toLocaleDateString("nl-BE");
        
                let avatars = "<img src=" + value.author.displayAvatarURL() + ">";
        
                if(value.embeds[0]) {
                  text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${value.embeds[0].title}</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.embeds[0].description}</div>`.replace("null", "");
                }
        
                text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.content}</div>`;
              }
          
              let style = "body { background-color: #36393f; color: white; font-family: 'Arial', normal; } img { width: 43px; height: 43px; border-radius: 50%; } div:hover { background-color: #32353b; }";
              let body = `<head><title>Ticket Transcript • #${reaction.message.channel.name}</title><link rel="icon" type="image/png" href=${reaction.message.guild.iconURL()}></head><body>${text}</body><style>${style}</style>`;
              let output = body.replace("undefined", "<br>");
          
              fs.writeFile("./ticket-transcript.html", JSON.stringify(output), (err) => {
                if(err) console.log(err);
              });
  
            });

            reaction.message.channel.delete();
                
            const logChannel = reaction.message.guild.channels.cache.find(c => c.name === `ticket-logs`);
            if(logChannel) {
              const deleteLogEmbed = new Discord.MessageEmbed()
              .setColor(0xf04947)
              .setAuthor(`⚙️ | Logs`)
              .setDescription(`**» TICKET_DELETE:**
              \n**${user}  deleted a ticket: #${reaction.message.channel.name}**!
              \n**» **I have created a **transcript** of **this ticket**!
              \n**» **Check the file below this message. ⬇️
              `)
              logChannel.send(deleteLogEmbed);
              logChannel.send({ files: ["./ticket-transcript.html"] });
            }
            
          }, 10000);
          
        } else {
  
          //CLOSED & MOVED TO CLOSEDCAT // SEND TRANSCRIPT TO TICKETOWNER
        
          const checkEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setDescription(`${v} **|** ***I will close this ticket in \`10\` seconds...***`)
          reaction.message.channel.send(checkEmbed);
  
          setTimeout(() => {
  
            reaction.message.channel.messages.fetch()
            .then(messages => {
  
              var text;
  
              for(let [key, value] of messages) {
                const date = new Date(value.createdTimestamp).toLocaleDateString("nl-BE");
        
                let avatars = "<img src=" + value.author.displayAvatarURL() + ">";
        
                if(value.embeds[0]) {
                  text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${value.embeds[0].title}</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.embeds[0].description}</div>`.replace("null", "");
                }
        
                text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.content}</div>`;
              }
          
              let style = "body { background-color: #36393f; color: white; font-family: 'Arial', normal; } img { width: 43px; height: 43px; border-radius: 50%; } div:hover { background-color: #32353b; }";
              let body = `<head><title>Ticket Transcript • #${reaction.message.channel.name}</title><link rel="icon" type="image/png" href=${reaction.message.guild.iconURL()}></head><body>${text}</body><style>${style}</style>`;
              let output = body.replace("undefined", "<br>");
          
              fs.writeFile("./ticket-transcript.html", JSON.stringify(output), (err) => {
                if(err) console.log(err);
              });
  
            });
  
            let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));
            if(ticketowners[reaction.message.channel.id]) {
            let ticketowner = ticketowners[reaction.message.channel.id].ticketowners;
  
              const findTicketowner = reaction.message.guild.members.cache.get(ticketowner);
              if(findTicketowner) {
                const dmTicketownerEmbed = new Discord.MessageEmbed()
                .setColor(0xf04947)
                .setAuthor(`⚙️ | Ticket Closed`)
                .setDescription(`Your **ticket** (#${message.channel.name}) was **closed**!
                \n**» **If you want a transcript of it, check the file below this message. ⬇️`)
                findTicketowner.send(dmTicketownerEmbed);
                findTicketowner.send({ files: ["./ticket-transcript.html"] });
              }
            }

            setTimeout(() => {
              
              reaction.message.channel.members.forEach(m => {
                if(!m.user.bot && !m.roles.cache.has(`Ticket Support`)) {
                  reaction.message.channel.updateOverwrite(m, {
                    "SEND_MESSAGES": false,
                    "VIEW_CHANNEL": false,
                    "READ_MESSAGE_HISTORY": false,
                    "ATTACH_FILES": false,
                    "ADD_REACTIONS": false
                  });
                }
              });
                
              let tisurole = reaction.message.guild.roles.cache.find(r => r.name === "Ticket Support");
              let everyone = reaction.message.guild.roles.everyone;

              reaction.message.channel.updateOverwrite(tisurole, {
                "SEND_MESSAGES": true,
                "VIEW_CHANNEL": true,
                "READ_MESSAGE_HISTORY": true,
                "ATTACH_FILES": true,
                "ADD_REACTIONS": false
              });
              
              reaction.message.channel.updateOverwrite(everyone, {
                "SEND_MESSAGES": false,
                "VIEW_CHANNEL": false,
                "READ_MESSAGE_HISTORY": false,
                "ATTACH_FILES": false,
                "ADD_REACTIONS": false
              });

            }, 2000);
            
            reaction.message.channel.setParent(`${closedcat}`);
            const checkEmbed = new Discord.MessageEmbed()
            .setColor(0x43b481)
            .setDescription(`${v} **|** ***${user} closed this ticket: #${message.channel.name}!***`)
            reaction.message.channel.send(checkEmbed);
            
            const logChannel = reaction.message.guild.channels.cache.find(c => c.name === `ticket-logs`);
            if(logChannel) {
              const closeLogEmbed = new Discord.MessageEmbed()
              .setColor(0xff5858)
              .setAuthor(`⚙️ | Logs`)
              .setDescription(`**» TICKET_CLOSE:**
              \n**${user} closed a ticket: #${reaction.message.channel.name}**!
              `)
              logChannel.send(closeLogEmbed);
            }
  
          }, 10000);
        }
        
      } else {
  
        //DELETED IN TICKETCAT & NO CLOSEDCAT // SEND TRANSCRIPT TO TICKETOWNER & LOGS
  
        const checkEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setDescription(`${v} **|** ***I will delete this ticket in \`10\` seconds...***`)
        reaction.message.channel.send(checkEmbed);
        
        setTimeout(() => {
  
          reaction.message.channel.messages.fetch()
          .then(messages => {
  
            var text;
  
            for(let [key, value] of messages) {
              const date = new Date(value.createdTimestamp).toLocaleDateString("nl-BE");
      
              let avatars = "<img src=" + value.author.displayAvatarURL() + ">";
      
              if(value.embeds[0]) {
                text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${value.embeds[0].title}</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.embeds[0].description}</div>`.replace("null", "");
              }
      
              text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.content}</div>`;
            }
        
            let style = "body { background-color: #36393f; color: white; font-family: 'Arial', normal; } img { width: 43px; height: 43px; border-radius: 50%; } div:hover { background-color: #32353b; }";
            let body = `<head><title>Ticket Transcript • #${reaction.message.channel.name}</title><link rel="icon" type="image/png" href=${reaction.message.guild.iconURL()}></head><body>${text}</body><style>${style}</style>`;
            let output = body.replace("undefined", "<br>");
        
            fs.writeFile("./ticket-transcript.html", JSON.stringify(output), (err) => {
              if(err) console.log(err);
            });
  
          });
    
          let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));
          if(ticketowners[reaction.message.channel.id]) {
            let ticketowner = ticketowners[reaction.message.channel.id].ticketowners;
  
            const findTicketowner = reaction.message.guild.members.cache.get(ticketowner);
            if(findTicketowner) {
              const dmTicketownerEmbed = new Discord.MessageEmbed()
              .setColor(0xf04947)
              .setAuthor(`⚙️ | Ticket Deleted`)
              .setDescription(`Your **ticket** (#${message.channel.name}) was **deleted**!
              \n**» **If you want a transcript of it, check the file below this message. ⬇️`)
              findTicketowner.send(dmTicketownerEmbed);
              findTicketowner.send({ files: ["./ticket-transcript.html"] });
            }
          }

          reaction.message.channel.delete();
            
          const logChannel = reaction.message.guild.channels.cache.find(c => c.name === `ticket-logs`);
          if(logChannel) {
            const deleteLogEmbed = new Discord.MessageEmbed()
            .setColor(0xf04947)
            .setAuthor(`⚙️ | Logs`)
            .setDescription(`**» TICKET_DELETE:**\n**${user} deleted a ticket: #${reaction.message.channel.name}**!\n**» **I have created a **transcript** of **this ticket**!\n**» **Check the file below this message. ⬇️`)
            logChannel.send(deleteLogEmbed);
            logChannel.send({ files: ["./ticket-transcript.html"] });
          }

        }, 10000);
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////////////////////////
//CREATE TRANSCRIPT REACTION

    if(reaction.message.channel.name.startsWith("ticket-") && reaction.message.channel.name !== "ticket-creation" && reaction.message.channel.name !== "ticket-logs" && !user.bot) {
      if(reaction.emoji.name === "📝" && reaction.message.author.id === client.user.id) {
        reaction.message.reactions.resolve("📝").users.remove(user);

        if(!reaction.message.channel.name.startsWith(`ticket-`)) {
          const errorEmbed = new Discord.MessageEmbed()
          .setColor(0xf04947)
          .setDescription(`${x} **|** ***You can't use this command outside of a ticket channel!***`)
          return reaction.message.channel.send(errorEmbed);
        }

        const loadingEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setDescription(`${loading} **|** ***The transcript is being created...***`)
        reaction.message.channel.send(loadingEmbed)
        .then(m => m.delete({ timeout: 5000 }));

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        reaction.message.channel.messages.fetch()
        .then(messages => {

          var text;

          for(let [key, value] of messages) {
            const date = new Date(value.createdTimestamp).toLocaleDateString("nl-BE");
    
            let avatars = "<img src=" + value.author.displayAvatarURL() + ">";
    
            if(value.embeds[0]) {
              text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${value.embeds[0].title}</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.embeds[0].description}</div>`.replace("null", "");
            }
    
            text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.content}</div>`;
          }
      
          let style = "body { background-color: #36393f; color: white; font-family: 'Arial', normal; } img { width: 43px; height: 43px; border-radius: 50%; } div:hover { background-color: #32353b; }";
          let body = `<head><title>Ticket Transcript • #${reaction.message.channel.name}</title><link rel="icon" type="image/png" href=${reaction.message.guild.iconURL()}></head><body>${text}</body><style>${style}</style>`;
          let output = body.replace("undefined", "<br>");
      
          fs.writeFile("./ticket-transcript.html", JSON.stringify(output), (err) => {
            if(err) console.log(err);
          });

          setTimeout(() => {

            const transcriptEmbed = new Discord.MessageEmbed()
            .setColor(0x43b481)
            .setAuthor(`📝 | Transcript`)
            .setDescription(`**${user}** created a **transcript** of ticket **#${reaction.message.channel.name}**!\n**» **Check the file below this message. ⬇️`)
            reaction.message.channel.send(transcriptEmbed);
            reaction.message.channel.send({ files: ["./ticket-transcript.html"] });

            let logChannel = message.guild.channels.cache.find(c => c.name === "ticket-logs");
            if(logChannel) {
              const transcriptLogEmbed = new Discord.MessageEmbed()
              .setColor(0x03a9f4)
              .setAuthor(`⚙️ | Logs`)
              .setDescription(`**${user}** created a **transcript** of ticket **#${reaction.message.channel.name}**!\n**» **Check the file below this message. ⬇️`)
              logChannel.send(transcriptLogEmbed);
              logChannel.send({ files: ["./ticket-transcript.html"] });
            }

          }, 500);
        });
      }
    }
    
  });

////////////////////////////////////////////////////////////////////////////////////////////////////

  client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

/////////////////////////////////////////////////////////////////////////////////////////////   
//CUSTOM PREFIXES
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
  
  if(!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: process.env.PREFIX
    }
  }
  let prefix = prefixes[message.guild.id].prefixes;

/////////////////////////////////////////////////////////////////////////////////////////////
//LEVELING
  if(!levels[message.author.id]) {
    levels[message.author.id] = {
      xp: 0
    }
  }
  let xp = levels[message.author.id].xp;

  levels[message.author.id] = {
    xp: xp + 1
  }
  fs.writeFile("./levels.json", JSON.stringify(levels), (err) => {
    if(err) console.log(err);
  });

//LVL1
  if(xp === 1000) {
    let lvl = 1;

    if(message.guild.id === "516227189251768330") {
      let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 1");
      if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
      message.member.roles.add(lvlrole);
    }

    let {data} = await fetch;

    fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
    .then(res => res).then(data => {
      if(data.error) {

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/2000\` xp`)
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));

      } else {

        let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/2000\` xp`)
        .attachFiles(levelpic)
        .setImage("attachment://level.png")
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));
      }
    });
  }
//LVL2
  if(xp === 2000) {
    let lvl = 2;

    if(message.guild.id === "516227189251768330") {
      let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 2");
      if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
      message.member.roles.add(lvlrole);
    }

    let {data} = await fetch;

    fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
    .then(res => res).then(data => {
      if(data.error) {
        
        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/3000\` xp`)
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));

      } else {

        let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/3000\` xp`)
        .attachFiles(levelpic)
        .setImage("attachment://level.png")
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));
      }
    });
  }
//LVL3
  if(xp === 3000) {
    let lvl = 3;

    if(message.guild.id === "516227189251768330") {
      let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 3");
      if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
      message.member.roles.add(lvlrole);
    }

    let {data} = await fetch;

    fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
    .then(res => res).then(data => {
      if(data.error) {
        
        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/4000\` xp`)
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));

      } else {

        let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");
    
        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/4000\` xp`)
        .attachFiles(levelpic)
        .setImage("attachment://level.png")
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));
      }
    });
  }
//LVL4
  if(xp === 4000) {
    let lvl = 4;

    if(message.guild.id === "516227189251768330") {
      let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 4");
      if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
      message.member.roles.add(lvlrole);
    }

    let {data} = await fetch;

    fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
    .then(res => res).then(data => {
      if(data.error) {

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/5000\` xp`)
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));

      } else {

        let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/5000\` xp`)
        .attachFiles(levelpic)
        .setImage("attachment://level.png")
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));
      }
    });
  }
//LVL5
  if(xp === 5000) {
    let lvl = 5;
    
    if(message.guild.id === "516227189251768330") {
      let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 5");
      if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
      message.member.roles.add(lvlrole);
    }

    let {data} = await fetch;

    fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
    .then(res => res).then(data => {
      if(data.error) {
        
        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/6000\` xp`)
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));
      
      } else {

        let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/6000\` xp`)
        .attachFiles(levelpic)
        .setImage("attachment://level.png")
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));
      }
    });
  }
//LVL6
  if(xp === 6000) {
    let lvl = 6;

    if(message.guild.id === "516227189251768330") {
      let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 6");
      if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
      message.member.roles.add(lvlrole);
    }

    let {data} = await fetch;

    fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
    .then(res => res).then(data => {
      if(data.error) {
        
        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/7000\` xp`)
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));

      } else {

        let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/7000\` xp`)
        .attachFiles(levelpic)
        .setImage("attachment://level.png")
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));
      }
    });
  }
//LVL7
  if(xp === 7000) {
    let lvl = 7;

    if(message.guild.id === "516227189251768330") {
      let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 7");
      if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
      message.member.roles.add(lvlrole);
    }

    let {data} = await fetch;

    fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
    .then(res => res).then(data => {
      if(data.error) {

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/8000\` xp`)
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));

      } else {

        let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/8000\` xp`)
        .attachFiles(levelpic)
        .setImage("attachment://level.png")
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));
      }
    });
  }
//LVL8
  if(xp === 8000) {
    let lvl = 8;
  
    if(message.guild.id === "516227189251768330") {
      let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 8");
      if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
      message.member.roles.add(lvlrole);
    }

    let {data} = await fetch;

    fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
    .then(res => res).then(data => {
      if(data.error) {

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/9000\` xp`)
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));

      } else {

        let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/9000\` xp`)
        .attachFiles(levelpic)
        .setImage("attachment://level.png")
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));
      }
    });
  }
//LVL9
  if(xp === 9000) {
    let lvl = 9;

    if(message.guild.id === "516227189251768330") {
      let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 9");
      if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
      message.member.roles.add(lvlrole);
    }

    let {data} = await fetch;

    fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
    .then(res => res).then(data => {
      if(data.error) {
        
        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/10000\` xp`)
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));

      } else {

        let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/10000\` xp`)
        .attachFiles(levelpic)
        .setImage("attachment://level.png")
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));
      }
    });
  }
//LVL10
  if(xp === 10000) {
    let lvl = 10;

    if(message.guild.id === "516227189251768330") {
      let lvlrole = message.guild.roles.cache.find(r => r.name === "〘🏆〙 Level 10");
      if(!lvlrole) return console.log(`no lvlrole found in ${message.guild.name}`);
      message.member.roles.add(lvlrole);
    }

    let {data} = await fetch;

    fetch(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=Level%20${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`)
    .then(res => res).then(data => {
      if(data.error) {

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/~\` xp`)
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));

      } else {

        let levelpic = new Discord.MessageAttachment(`https://tsunamiapi.tsunami2360.repl.co/?accesstoken=${process.env.TSAPIKEY}&event=level&background=3&textcolor=orange&text=Level%20Up!&username=${message.author.username}&discriminator=${message.author.discriminator}&subtext=${lvl}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "level.png");

        const lvlupEmbed = new Discord.MessageEmbed()
        .setColor(0xffb900)
        .setAuthor(`🆙 | Level Up`)
        .setDescription(`🎉 Congratulations, ${message.author}!\nYou leveled up to lvl: \`${lvl}\`\n\n**» Level:** lvl \`${lvl}\`\n**» XP:** \`${xp}/~\` xp`)
        .attachFiles(levelpic)
        .setImage("attachment://level.png")
        message.channel.send(lvlupEmbed)
        .then(message.react("🆙"));
      }
    });
  }

/////////////////////////////////////////////////////////////////////////////////////////////
//AUTOMOD ANTISWEAR
  if(message.content.toLowerCase().includes(`fuck`) || 
     message.content.toLowerCase().includes(`sex`) || 
     message.content.toLowerCase().includes(`seks`) || 
     message.content.toLowerCase().includes(`porn`) || 
     message.content.toLowerCase().includes(`bitch`) || 
     message.content.toLowerCase().includes(`asshole`) || 
     message.content.toLowerCase().includes(`cunt`) || 
     message.content.toLowerCase().includes(`nigger`) || 
     message.content.toLowerCase().includes(`nigga`) || 
     message.content.toLowerCase().includes(`nicker`) || 
     message.content.toLowerCase().includes(`dick`) || 
     message.content.toLowerCase().includes(`kanker`) || 
     message.content.toLowerCase().includes(`kkr`) || 
     message.content.toLowerCase().includes(`cancer`) || 
     message.content.toLowerCase().includes(`pedo`) || 
     message.content.toLowerCase().includes(`tering`) || 
     message.content.toLowerCase().includes("tyfus") || 
     message.content.toLowerCase().includes("godverdomme") || 
     message.content.toLowerCase().includes("neger") || 
     message.content.toLowerCase().includes("mongool") || 
     message.content.toLowerCase().includes("mongol") || 
     message.content.toLowerCase().includes("aids") || 
     message.content.toLowerCase().includes("autist") || 
     message.content.toLowerCase().includes("downie") ||
     message.content.toLowerCase().includes("klootzak")
  ) {

    let automods = JSON.parse(fs.readFileSync("./automods.json", "utf-8"));
    if(!automods[message.guild.id]) {
      automods[message.guild.id] = {
        antiswear: "disable",
        antispam: "disable",
        antiinvites: "disable",
        antiraid: "disable"
      }
    }
    let antiswear = automods[message.guild.id].antiswear;
    
    let v = client.emojis.cache.get("615983179341496321");

    if(antiswear === "enable") {
      if(!message.member.permissions.has("ADMINISTRATOR")) {

        message.delete();

        const automodEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setDescription(`${v} **|** ***AUTOMOD warned ${message.author}, because of swearing!***`)
        message.channel.send(automodEmbed);

        const automodPmEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⛑️ | Automod`)
        .setThumbnail(message.guild.iconURL())
        .setDescription(`AUTOMOD warned you in \`${message.guild.name}\`, because of \`swearing\`!\n**» Server:** \`${message.guild.name}\`\n**» Punishment:** \`Warn\`\n**» Reason:** \`Swearing\`\n**» Swear:** ||\`${message.content}\`||`)
        message.member.send(automodPmEmbed);

        const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
        if(logChannel) {
          const automodLogEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`⚙️ | Logs`)
          .setThumbnail(message.author.displayAvatarURL())
          .setDescription(`**» AUTOMOD:**\n**AUTOMOD warned ${message.author}**, because of **swearing**!\n**» Swear:** ||\`${message.content}\`||`)
          logChannel.send(automodLogEmbed);
        }
      }
    }
  }

/////////////////////////////////////////////////////////////////////////////////////////////
//AUTOMOD ANTISPAM
  let automods = JSON.parse(fs.readFileSync("./automods.json", "utf-8"));
  if(!automods[message.guild.id]) {
    automods[message.guild.id] = {
      antiswear: "disable",
      antispam: "disable",
      antiinvites: "disable",
      antiraid: "disable"
    }
  }
  let antispam = automods[message.guild.id].antispam;

  if(antispam === "enable") {
    if(!message.member.permissions.has("ADMINISTRATOR")) {
      if(!message.channel.name.includes("spam")) {
        
        const v = client.emojis.cache.get("615983179341496321");
        const x = client.emojis.cache.get("615983201156071424");
        const ban = client.emojis.cache.get("808732827406958632");

        let ascounters = JSON.parse(fs.readFileSync("./antispamcounts.json", "utf-8"));
        if(!ascounters[message.author.id]) {
          ascounters[message.author.id] = {
            count: 0
          }
        }
        let ascounter = ascounters[message.author.id].count;

        if(cooldown.has(message.author.id)) {
          ascounters[message.author.id].count = ascounters[message.author.id].count + 1;

          fs.writeFile("./antispamcounts.json", JSON.stringify(ascounters), (err) => {
            if(err) console.log(err);
          });

          message.delete();
        }
//WARN
        if(ascounter === 5) {
          const warnEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setDescription(`${v} **|** ***AUTOMOD warned ${message.author}, because of spamming!***`)
          message.channel.send(warnEmbed);

          db.push(`info.${message.guild.id}.${message.author.id}`, { date: moment().format("DD-MM-YYYY"), warnedby: "AUTOMOD", reason: "Spamming" });

          const warnPmEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`⚠️ | Warned`)
          .setThumbnail(message.guild.iconURL())
          .setDescription(`You were warned in \`${message.guild.name}\`, because of \`spamming\`!\n**» Server:** \`${message.guild.name}\`\n**» Punishment:** \`Warning\`\n**» Reason:** \`AUTOMOD » Spamming\``)
          message.member.send(warnPmEmbed)
          .catch(err => console.log(err));
      
          const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
          if(logChannel) {
            const warnLogEmbed = new Discord.MessageEmbed()
            .setColor(0x03a9f4)
            .setAuthor(`⚙️ | Logs`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`**» MEMBER_WARN:**\nAUTOMOD **warned ${message.author}, because of spamming**!`)
            logChannel.send(warnLogEmbed);
          }

          ascounters[message.author.id].count = ascounters[message.author.id].count + 1;

          fs.writeFile("./antispamcounts.json", JSON.stringify(ascounters), (err) => {
            if(err) console.log(err);
          });
        }
//KICK
        if(ascounter === 10) {
          const kickEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setDescription(`${v} **|** ***AUTOMOD kicked ${message.author.tag}, because of spamming!***`)
          message.channel.send(kickEmbed);

          const kickPmEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`⛑️ | Kicked`)
          .setThumbnail(message.guild.iconURL())
          .setDescription(`You were \`kicked\` from \`${message.guild.name}\`, because of \`spamming\`!\n**» Server:** \`${message.guild.name}\`\n**» Punishment:** \`Kick\`\n**» Reason:** \`AUTOMOD » Spamming\``)
          message.member.send(kickPmEmbed)
          .catch(err => console.log(err));
          
          message.member.kick("AUTOMOD » Spamming");
      
          const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
          if(logChannel) {
            const kickLogEmbed = new Discord.MessageEmbed()
            .setColor(0x03a9f4)
            .setAuthor(`⚙️ | Logs`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`**» MEMBER_KICK:**\nAUTOMOD **kicked ${message.author.tag}, because of spamming**!`)
            .setFooter(`${message.guild.name} now has ${message.guild.memberCount} members!`)
            logChannel.send(kickLogEmbed);
          }

          ascounters[message.author.id].count = ascounters[message.author.id].count + 1;

          fs.writeFile("./antispamcounts.json", JSON.stringify(ascounters), (err) => {
            if(err) console.log(err);
          });
        }
//BAN
        if(ascounter === 15 || 
           ascounter === 20 || 
           ascounter === 25 || 
           ascounter === 30 || 
           ascounter === 35 || 
           ascounter === 40 || 
           ascounter === 45 || 
           ascounter === 50
          ) {
          const banEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setDescription(`${v} **|** ***AUTOMOD banned ${message.author.tag}, because of spamming!***`)
          message.channel.send(banEmbed);

          const banPmEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setTitle(`${ban} | Banned`)
          .setThumbnail(message.guild.iconURL())
          .setDescription(`You were \`banned\` from \`${message.guild.name}\`, because of \`spamming\`!\n**» Server:** \`${message.guild.name}\`\n**» Punishment:** \`Ban\`\n**» Reason:** \`AUTOMOD » Spamming\``)
          message.member.send(banPmEmbed)
          .catch(err => console.log(err));
      
          const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
          if(logChannel) {
            const banLogEmbed = new Discord.MessageEmbed()
            .setColor(0x03a9f4)
            .setAuthor(`⚙️ | Logs`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`**» MEMBER_BAN_ADD:**\nAUTOMOD **banned ${message.author.tag}, because of spamming**!`)
            .setFooter(`${message.guild.name} now has ${message.guild.memberCount} members!`)
            logChannel.send(banLogEmbed);
          }

          message.guild.members.ban(`${message.author.id}`, { reason: "AUTOMOD » Spamming" });

          ascounters[message.author.id].count = ascounters[message.author.id].count + 1;

          fs.writeFile("./antispamcounts.json", JSON.stringify(ascounters), (err) => {
            if(err) console.log(err);
          });
        }

        cooldown.add(message.author.id);

        setTimeout(() => {
          cooldown.delete(message.author.id);
        }, cdtime);

      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  //AUTOMOD ANTIINVITES
    if(message.content.toLowerCase().includes("discord.gg") || message.content.includes("discord.com/invite/") || message.content.includes("discord.link") || message.content.includes("invite.gg") || message.content.includes("discord.io")
    ) {
  
      let automods = JSON.parse(fs.readFileSync("./automods.json", "utf-8"));
      if(!automods[message.guild.id]) {
        automods[message.guild.id] = {
          antiswear: "disable",
          antispam: "disable",
          antiinvites: "disable",
          antiraid: "disable"
        }
      }
      let antiinvites = automods[message.guild.id].antiinvites;
      
      let v = client.emojis.cache.get("615983179341496321");
  
      if(antiinvites === "enable") {
        if(!message.member.permissions.has("ADMINISTRATOR")) {
  
          message.delete();
  
          const automodEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setDescription(`${v} **|** ***AUTOMOD warned ${message.author}, because of sending invites!***`)
          message.channel.send(automodEmbed);
  
          const automodPmEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`⛑️ | Automod`)
          .setThumbnail(message.guild.iconURL())
          .setDescription(`AUTOMOD warned you in \`${message.guild.name}\`, because of \`sending invites\`!\n**» Server:** \`${message.guild.name}\`\n**» Punishment:** \`Warn\`\n**» Reason:** \`Sending Invites\`\n**» Message:** ||\`${message.content}\`||`)
          message.member.send(automodPmEmbed);
  
          const logChannel = message.guild.channels.cache.find(c => c.name === `rex-logs`);
          if(logChannel) {
            const automodLogEmbed = new Discord.MessageEmbed()
            .setColor(0x03a9f4)
            .setAuthor(`⚙️ | Logs`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`**» AUTOMOD:**\n**AUTOMOD warned ${message.author}**, because of **sending invites**!\n**» Message:** ||\`${message.content}\`||`)
            logChannel.send(automodLogEmbed);
          }
        }
      }
    }
  
/////////////////////////////////////////////////////////////////////////////////////////////
//COUNTING & COOLDOWN
  let countings = JSON.parse(fs.readFileSync("./countings.json", "utf-8"));
  if(countings[message.channel.id] && countings[message.channel.id].status === "start") {
    let count = countings[message.channel.id].count;

    if(Number.isInteger(parseInt(message.content))) {
      if(parseInt(message.content) === (count + 1)) {

        let cooldowns = JSON.parse(fs.readFileSync("./cooldowns.json", "utf-8"));
        if(!cooldowns[message.channel.id]) {
          cooldowns[message.channel.id] = {
            cooldown: 0
          }
        }
        let cooldown = cooldowns[message.channel.id].cooldown;

        if(cooldown === message.author.id) {
          message.delete();

          const x = client.emojis.cache.get("615983201156071424");
    
          const cooldownEmbed = new Discord.MessageEmbed()
          .setColor(0xf04947)
          .setDescription(`${x} **|** ***${message.author}, you're on counting cooldown until another member has counted \`1\` number further!***`)
          return message.channel.send(cooldownEmbed)
          .then(m => m.delete({ timeout: 5000 }));
        }

        const v = client.emojis.cache.get("615983179341496321");
        message.react(v);

        let countings = JSON.parse(fs.readFileSync("./countings.json", "utf-8"));

        countings[message.channel.id] = {
          status: "start",
          count: count + 1
        }

        fs.writeFile("./countings.json", JSON.stringify(countings), (err) => {
          if(err) console.log(err);
        });

        //let cooldowns = JSON.parse(fs.readFileSync("./cooldowns.json", "utf-8"));

        cooldowns[message.channel.id] = {
          cooldown: message.author.id
        }

        fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
          if(err) console.log(err);
        });

      } else {

        message.delete();

        const x = client.emojis.cache.get("615983201156071424");

        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***The number \`${message.content}\` doesn't come after number \`${count}\`!***`)
        message.channel.send(errorEmbed)
        .then(m => m.delete({ timeout: 5000 }));
      }
    } else {

      if(!message.content.toLowerCase() === `${prefix}counting` || 
         !message.content.toLowerCase() === `${prefix}counting start` || 
         !message.content.toLowerCase() === `${prefix}counting stop`
        ) {

        message.delete();

        const x = client.emojis.cache.get("615983201156071424");

        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xf04947)
        .setDescription(`${x} **|** ***You aren't allowed to chat in this channel!***`)
        message.channel.send(errorEmbed)
        .then(m => m.delete({ timeout: 5000 }));
      }
    }
  }

/////////////////////////////////////////////////////////////////////////////////////////////

  //let prefix = config.prefix;
  if(message.mentions.has(client.user) && message.content.includes("help")) {

    const mentionEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`🤖 | Mention`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Hey, ${message.author}!\n**» Current Prefix:** \`${prefix}\`\n**» Help Command:** \`${prefix}help\`\n**» Website: [rexbot.ga](https://rexbot.ga)**`)
    message.channel.send(mentionEmbed)
    .then(message.react("🤖"));

  }
  if(!message.content.toLowerCase().startsWith(prefix)) return;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.aliases.get(command.slice(prefix.length)));
  if(commandfile) commandfile.run(client, message, args);

/////////////////////////////////////////////////////////////////////////////////////////////

  const commandslogChannel = client.guilds.cache.get("516227189251768330").channels.cache.find(c => c.name === `rex-commands-log`);
  if(!commandslogChannel) return console.log(`WARNINGERROR: There is no channel named #rex-commands-log in the server with id: 516227189251768330!`);
  if(message.content.startsWith(prefix)) commandslogChannel.send(`\`\`\`[${message.guild.name}] #${message.channel.name} > ${message.author.tag}: ${message.content}\`\`\``);

});
 
client.login(process.env.REXBETATOKEN);
