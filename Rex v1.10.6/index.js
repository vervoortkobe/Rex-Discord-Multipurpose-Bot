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
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers with ${client.users.size} users!`);
  });
   
  client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (server id: ${guild.id}), serverowner: ${guild.owner} (serverowner id: ${guild.owner.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers with ${client.users.size} users!`);
  });


  //AUTOROLE
  client.on("guildMemberAdd", member => {

    const autorole = member.guild.roles.find(r => r.name === `=MEMBERS=`, `✅ | Chatter/Gamer`, `〚-〛Member`, `🐸Member🐸`, `Member`, `member`, `MEMBER`, `Members`, `members`, `MEMBERS`);
      if(!autorole)return;
  
    member.addRole(autorole);
  });

  //JOIN
  client.on("guildMemberAdd", member => {

    const joinChannel = member.guild.channels.find(c => c.name === `join-leave`);
      if(!joinChannel) return;

      const joinEmbed = new Discord.RichEmbed()
      .setColor(0x00ff00)
      .setTitle(`🤗 | ${client.user.username} Join`)
      .setDescription(`**Welcome** \`${member.user.tag}\`!\n${member.guild.name} now has \`${member.guild.memberCount}\` members!`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      joinChannel.send(joinEmbed)
  });

  //LEAVE
  client.on("guildMemberRemove", member => {

    const leaveChannel = member.guild.channels.find(c => c.name === `join-leave`);
      if(!leaveChannel) return;

      const leaveEmbed = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTitle(`😢 | ${client.user.username} Leave`)
      .setDescription(`**Bye** \`${member.user.tag}\`!\n${member.guild.name} now has \`${member.guild.memberCount}\` members!`)
      .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
      leaveChannel.send(leaveEmbed)
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


    //let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(command.slice(prefix.length));
    if(commandfile) commandfile.run(client, message, args);


});
 
client.login(config.token);