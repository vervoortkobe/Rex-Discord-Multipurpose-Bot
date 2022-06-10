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
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers with ${client.users.size} users!`);
  });


  //AUTOROLE
  client.on("guildMemberAdd", member => {

    const autorole = member.guild.roles.find(r => r.name === `=MEMBERS=`, `✅ | Chatter/Gamer`, `〚-〛Member`, `🐸Member🐸`, `Member`, `member`, `MEMBER`, `Members`, `members`, `MEMBERS`);
      if(!autorole)return;
  
    member.addRole(autorole);
  });
      

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