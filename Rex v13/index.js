const express = require("express");
var Client = require("uptime-robot");
const cors = require("cors");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(cors());

const listener = app.listen(process.env.PORT, function() {
  console.log("✔️  Your app is listening on port: " + listener.address().port);
});

///////////////////////////////////////////////////////////////////////////////////

const Discord = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const client = new Discord.Client({ allowedMentions: { parse: ["users", "roles"], repliedUser: true }, intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGES], partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"] });
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
const fetch = require("node-fetch");
//const superagent = require("superagent");
//const ChartJsImage = require("chartjs-to-image");
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
    console.log("\x1b[31m", "❌  I couldn't find the commands folder!");
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

fs.readdir("./events/", (err, files) => {
 
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0) {
    console.log("\x1b[31m", "❌  I couldn't find the events folder!");
    console.log("\x1b[0m", "");
    return;
  }
   
  jsfile.forEach((f, i) => {

    let props = require(`./events/${f}`);
    console.log("\x1b[0m", `• ${f} was loaded!`);
    client.events.set(props.help.name, props);
    
  });

});


/////////////////////////////////////////////////////////////////////////////////////////////
//READY
  client.on("ready", async () => {
    function commandsReady() {
      fs.readdir("./commands/", (err, files) => {
        let jsfile = files.filter(f => f.split(".").pop() === "js");

        console.log("\x1b[0m", "");
        console.log("\x1b[36m", `» Loaded Commands: ${jsfile.length}`);
      });
    }

    function eventsReady() {
      fs.readdir("./events/", (err, files) => {
        let jsfile = files.filter(f => f.split(".").pop() === "js");

        console.log("\x1b[36m", `» Loaded Events: ${jsfile.length}`);
        console.log("\x1b[36m", `» Cached Servers: ${client.guilds.cache.size}`);
        console.log("\x1b[36m", `» Cached Users: ${client.users.cache.size}`);
        console.log("\x1b[0m", "");
        console.log("\x1b[36m", `» Activity: PLAYING ${process.env.PREFIX}help | ${client.user.username} | rexbot.ga`);
        console.log("\x1b[32m", `✔️  ${client.user.username} was started!`);
      });
    }

    commandsReady();
    setTimeout(eventsReady, 10);

    client.user.setActivity(`${process.env.PREFIX}help | ${client.user.username} | rexbot.ga`, { type: "PLAYING" });

    let commands = client.application?.commands;
    commands?.create({
      name: "help",
      description: "» Replies with the help command"
    });

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
//INTERACTION_CREATE
  client.on("interactionCreate", async interaction => {
    let eventfile = client.events.get("interactionCreate");
    if(eventfile) eventfile.run(client, interaction);
  });

/////////////////////////////////////////////////////////////////////////////////////////////
//GUILD_CREATE
  client.on("guildCreate", guild => {
    let eventfile = client.events.get("guildCreate");
    if(eventfile) eventfile.run(client, guild);
  });

//GUILD_DELETE
  client.on("guildDelete", guild => {
    let eventfile = client.events.get("guildDelete");
    if(eventfile) eventfile.run(client, guild);
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
//GUILD_MEMBER_ADD
  client.on("guildMemberAdd", async member => {
    let eventfile = client.events.get("guildMemberAdd");
    if(eventfile) eventfile.run(client, member);
  });

//GUILD_MEMBER_REMOVE
  client.on("guildMemberRemove", async member => {
    let eventfile = client.events.get("guildMemberRemove");
    if(eventfile) eventfile.run(client, member);
  });

////////////////////////////////////////////////////////////////////////////////////////////////////
//MESSAGE_DELETE
  client.on("messageDelete", async delMsg => {
    let eventfile = client.events.get("messageDelete");
    if(eventfile) eventfile.run(client, delMsg);
  });

////////////////////////////////////////////////////////////////////////////////////////////////////
//MESSAGE_UPDATE
  client.on("messageUpdate", async (oldMsg, newMsg) => {
    let eventfile = client.events.get("messageUpdate");
    if(eventfile) eventfile.run(client, oldMsg, newMsg);
  });

////////////////////////////////////////////////////////////////////////////////////////////////////
//MESSAGE_REACTION_ADD
  client.on("messageReactionAdd", async (reaction, user) => {
    let eventfile = client.events.get("messageReactionAdd");
    if(eventfile) eventfile.run(client, reaction, user);
  });

////////////////////////////////////////////////////////////////////////////////////////////////////
//MESSAGE_CREATE
  client.on("messageCreate", async message => {
    let eventfile = client.events.get("messageCreate");
    if(eventfile) eventfile.run(client, message);
});
 
client.login(process.env.REXBETATOKEN);