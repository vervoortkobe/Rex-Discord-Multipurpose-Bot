const config = require("./config.json");
const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const superagent = require("superagent");
const math = require("mathjs");
const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();
const lvl = require("./lvl.json");

fs.readdir("./commands/", (err, files) => {
 
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("Can/'t find the commands map!");
      return;
    }
   
    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} was loaded!`);
      client.commands.set(props.help.name, props);
    });
  });


  client.on("ready", async () => {
    console.log(`${client.user.username} was started!`);
    client.user.setActivity(`${config.prefix} | ${client.user.username} | rexbot.ga`, {type: "PLAYING"});
  });

  client.on("reconnecting", async () => {
   console.log(`Reconnecting to ${client.user.username}!`)
  });

  client.on("disconnect", async () => {
    console.log(`${client.user.username} got disconnected!`)
  });
   
  client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (server id: ${guild.id}), serverowner: ${guild.owner.username} (serverowner id: ${guild.owner.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers with ${client.users.size} users!`);
  });
   
  client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (server id: ${guild.id}), serverowner: ${guild.owner.username} (serverowner id: ${guild.owner.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers with ${client.users.size} users!`);
  });

  //GUILDS LOG JOIN
  client.on("guildCreate", guild => {

    const guildslogjoinChannel = client.guilds.get("516227189251768330").channels.find(c => c.name === `rex-guilds-log`);
    if(!guildslogjoinChannel) return console.log(`WARNINGERROR: There is no channel named #rex-guilds-log in the server with id: 662385116651323402!`)

    const guildslogjoinEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Guilds Log Join`)
    .setDescription(`New guild joined: ${guild.name} (server id: ${guild.id}), serverowner: ${guild.owner.username} (serverowner id: ${guild.owner.id}). This guild has ${guild.memberCount} members!`)
    .addField(`Servers`, `Serving \`${client.guilds.size}\` servers!`, true)
    .addField(`Users`, `Serving \`${client.users.size}\` users!`, true)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    guildslogjoinChannel.send(guildslogjoinEmbed)
  });

  //GUILDS LOG LEAVE
  client.on("guildDelete", guild => {

    const guildslogleaveChannel = client.guilds.get("516227189251768330").channels.find(c => c.name === `rex-guilds-log`);
      if(!guildslogleaveChannel) return console.log(`WARNINGERROR: There is no channel named #rex-guilds-log in the server with id: 662385116651323402!`)

    const guildslogleaveEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Guilds Log Leave`)
    .setDescription(`I have been removed from: ${guild.name} (server id: ${guild.id}), serverowner: ${guild.owner.username} (serverowner id: ${guild.owner.id}). This guild has ${guild.memberCount} members!`)
    .addField(`Servers`, `Serving \`${client.guilds.size}\` servers!`, true)
    .addField(`Users`, `Serving \`${client.users.size}\` users!`, true)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    guildslogleaveChannel.send(guildslogleaveEmbed)
  });

  //AUTOROLE
  client.on("guildMemberAdd", member => {

    let autoroles = JSON.parse(fs.readFileSync("./autoroles.json", "utf-8"));
      if(!autoroles[member.guild.id]) {
        return;
      }
    let autorole = autoroles[member.guild.id].autoroles;

    member.addRole(autorole);
  });

  //JOIN
  client.on("guildMemberAdd", member => {

    let joinchannel = member.guild.channels.find(c => c.name === `join-leave`);
      if(!joinchannel) return;

    const joinEmbed = new Discord.RichEmbed()
    .setColor(0x00ff00)
    .setTitle(`🤗 | ${client.user.username} Join`)
    .setDescription(`**Welcome** \`${member.user.tag}\`!\n${member.guild.name} now has \`${member.guild.memberCount}\` members!`)
    .setThumbnail(member.user.avatarURL)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    joinchannel.send(joinEmbed)
  });

  //LEAVE
  client.on("guildMemberRemove", member => {

    let leavechannel = member.guild.channels.find(c => c.name === `join-leave`);
      if(!leavechannel) return;

    const leaveEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`😢 | ${client.user.username} Leave`)
    .setDescription(`**Bye** \`${member.user.tag}\`!\n${member.guild.name} now has \`${member.guild.memberCount}\` members!`)
    .setThumbnail(member.user.avatarURL)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    leavechannel.send(leaveEmbed)
  });
  
  //MESSAGE DELETE
  client.on("messageDelete", (messageDelete) => {

    const msglogChannel = messageDelete.guild.channels.find(c => c.name === `rex-msglogs`);
      if(!msglogChannel) return;

      const msgdelLogEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`⚙️ | ${client.user.username} Logs`)
      .addField(`MESSAGE_DELETE`, `${messageDelete.author.tag} just **deleted a message in ${messageDelete.channel}**!`)
      .addField(`Deleted Message`, messageDelete.content)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      msglogChannel.send(msgdelLogEmbed);
  });

////////////////////////////////////////////////////////////////////////////////////////////////////

  client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
   
    //CUSTOM PREFIXES
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: config.prefix
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    //LVL
    if(!lvl[message.author.id]) {
      lvl[message.author.id] = {
        lvl: 0
      };
  }

  if(message.author.id === config.donator1 || 
     message.author.id === config.donator2 || 
     message.author.id === config.donator3 || 
     message.author.id === config.donator4 || 
     message.author.id === config.donator5 ||
     message.author.id === config.premium1 || 
     message.author.id === config.premium2 || 
     message.author.id === config.premium3 || 
     message.author.id === config.premium4 || 
     message.author.id === config.premium5
    ) {
    let lvlAmt = Math.floor(Math.random() * 2) + 1;
    let baseAmt = Math.floor(Math.random() * 2) + 1;

    
  if(lvlAmt === baseAmt) {
    lvl[message.author.id] = {
      lvl: lvl[message.author.id].lvl + lvlAmt
    };
  fs.writeFile("./lvl.json", JSON.stringify(lvl), (err) => {
    if(err) console.log(err)
      })
    }

  } else {

  let lvlAmt = Math.floor(Math.random() * 1) + 1;
  let baseAmt = Math.floor(Math.random() * 1) + 1;

  if(lvlAmt === baseAmt) {
    lvl[message.author.id] = {
      lvl: lvl[message.author.id].lvl + lvlAmt
    };
  fs.writeFile("./lvl.json", JSON.stringify(lvl), (err) => {
    if(err) console.log(err)
      })
    }
  }

  //AUTOMOD
  if(message.content.includes(`FUCK`) && message.author.bannable || message.content.includes(`Fuck`) && message.author.bannable  || message.content.includes(`fuck`) && message.author.bannable  || 
     message.content.includes(`FY`) && message.author.bannable  || message.content.includes(`Fy`) && message.author.bannable  || message.content.includes(`fy`) && message.author.bannable  || 
     message.content.includes(`BITCH`) && message.author.bannable  || message.content.includes(`Bitch`) && message.author.bannable  || message.content.includes(`bitch`) && message.author.bannable  || 
     message.content.includes(`CUNT`) && message.author.bannable  || message.content.includes(`Cunt`) && message.author.bannable  || message.content.includes(`cunt`) && message.author.bannable  || 
     message.content.includes(`NIGGA`) && message.author.bannable  || message.content.includes(`Nigga`) && message.author.bannable  || message.content.includes(`nigga`) && message.author.bannable  || 
     message.content.includes(`DICK`) && message.author.bannable  || message.content.includes(`Dick`) && message.author.bannable  || message.content.includes(`dick`) && message.author.bannable  || 
     message.content.includes(`KANKER`) && message.author.bannable  || message.content.includes(`Kanker`) && message.author.bannable  || message.content.includes(`kanker`) && message.author.bannable  || 
     message.content.includes(`CANCER`) && message.author.bannable  || message.content.includes(`Cancer`) && message.author.bannable  || message.content.includes(`cancer`) && message.author.bannable  || 
     message.content.includes(`PEDO`) && message.author.bannable  || message.content.includes(`Pedo`) && message.author.bannable  || message.content.includes(`pedo`) && message.author.bannable || 
     message.content.includes(`TERING`) && message.author.bannable || message.content.includes(`Tering`) && message.author.bannable || message.content.includes(`tering`) && message.author.bannable
    ) {

    message.delete();

    message.channel.send(`✅ | **<@${message.author.id}> just got warned by AUTOMOD** because of: BAD WORD USAGE!`);

    const automodPmEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⛑️ | ${client.user.username} Automod`)
    .setDescription(`AUTOMOD just warned you on \`${message.guild.name}\`, because of \`BAD WORD USAGE\`!`)
    .addField(`Server`, `\`${message.guild.name}\``)
    .addField(`Reason`, `\`BAD WORD USAGE\``)
    .addField(`Bad Word`, `||\`${message.content}\`||`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    message.author.send(automodPmEmbed);

    const logChannel = message.guild.channels.find(c => c.name === `rex-logs`);
    if(!logChannel) return;

    const automodLogEmbed = new Discord.RichEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | ${client.user.username} Logs`)
    .addField(`AUTOMOD`, `**AUTOMOD just warned ${message.author.tag}** because of: BAD WORD USAGE!`)
    .addField(`Bad Word`, `||\`${message.content}\`||`)
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    logChannel.send(automodLogEmbed);
  }


  //let prefix = config.prefix;
  if(!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = client.commands.get(command.slice(prefix.length));
  if(commandfile) commandfile.run(client, message, args);


});
 
client.login(config.token);