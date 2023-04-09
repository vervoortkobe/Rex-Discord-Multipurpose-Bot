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
const client = new Discord.Client({ disableMentions: "everyone", ws: { intents: new Discord.Intents(Discord.Intents.ALL) }, partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"] });


  client.on("ready", async () => {

    console.log("\x1b[0m", "");
    //console.log("\x1b[36m", `» All ${jsfile.length} commands were loaded!`);
    console.log("\x1b[36m", `» Cached Servers: ${client.guilds.cache.size}`);
    console.log("\x1b[36m", `» Cached Users: ${client.users.cache.size}`);
    console.log("\x1b[32m", `✔️  ${client.user.username} was started!`);
    console.log("\x1b[0m", "");

    client.user.setActivity(`${client.user.username} is online!`, {type: "PLAYING"});

    app.get("/api/", (req, res) => {
      res.json({
        "botstats": {
          "servers": client.guilds.cache.size,
          "users": client.users.cache.size
        }
      });
    });

    app.get("/userinfo/", (req, res) => {
      if(!req.query.id) return res.json({"error": "no user id"});
      client.users.fetch(req.query.id).then(u => {
        res.json({
          "userinfo": {
            "id": u.id,
            "username": u.username,
            "bot": u.bot,
            "discriminator": u.discriminator,
            "avatarhash": u.avatar
          }
        });
      });
    });

    app.get("/serverinfo/", (req, res) => {
      if(!req.query.id) return res.json({"error": "no server id"});

      let ctotalSeconds = ((Date.now() - client.guilds.cache.get(req.query.id).createdAt) / 1000);
      let cyears = Math.floor(ctotalSeconds / 31556926);
      ctotalSeconds %= 31556926;
      let cdays = Math.floor(ctotalSeconds / 86400);
      ctotalSeconds %= 86400;
      let chours = Math.floor(ctotalSeconds / 3600);
      ctotalSeconds %= 3600;
      let cminutes = Math.floor(ctotalSeconds / 60);
      let cseconds = Math.floor(ctotalSeconds % 60);
      let createdat = `${cyears}y ${cdays}d ${chours}h ${cminutes}m ${cseconds}s`;
      
      let onlineCount = client.guilds.cache.get(req.query.id).members.cache.filter(member => member.presence !== null && member.presence.status === "online").size;
      let idleCount = client.guilds.cache.get(req.query.id).members.cache.filter(member => member.presence !== null && member.presence.status === "idle").size;
      let dndCount = client.guilds.cache.get(req.query.id).members.cache.filter(member => member.presence !== null && member.presence.status === "dnd").size;
      let offlineCount = client.guilds.cache.get(req.query.id).members.cache.filter(member => member.presence === null).size;
    
      res.json({
        "serverinfo": {
          "id": client.guilds.cache.get(req.query.id).id,
          "servericon": client.guilds.cache.get(req.query.id).iconURL(),
          "servername": client.guilds.cache.get(req.query.id).name,
          "serverowner": client.guilds.cache.get(req.query.id).members.cache.get(client.guilds.cache.get(req.query.id).ownerId),
          "creationdate": client.guilds.cache.get(req.query.id).createdAt.toLocaleDateString("nl-BE") + ", " + createdat,
          "total": client.guilds.cache.get(req.query.id).memberCount,
          "humans": client.guilds.cache.get(req.query.id).memberCount - client.guilds.cache.get(req.query.id).members.cache.filter(member => member.user.bot).size,
          "bots": client.guilds.cache.get(req.query.id).members.cache.filter(member => member.user.bot).size,
          "online": onlineCount,
          "idle": idleCount,
          "dnd": dndCount,
          "offline": offlineCount,
          "channels": client.guilds.cache.get(req.query.id).channels.cache.size,
          "roles": client.guilds.cache.get(req.query.id).roles.cache.size - 1
        }
      });
    });
  });
 
client.login(process.env.TOKEN);
