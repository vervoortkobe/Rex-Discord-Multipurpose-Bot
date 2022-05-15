const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    if(!message.channel.name.startsWith(`ticket-`)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***You can't use that command outside of a ticket channel!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }
  
    let closedcats = JSON.parse(fs.readFileSync("./closedcats.json", "utf-8"));
    if(closedcats[message.guild.id] && message.guild.channels.cache.find(c => c.id === closedcats[message.guild.id])) {
    let closedcat = closedcats[message.guild.id].closedcats;
      
      if(message.channel.parent.id === `${closedcat}`) {

        //DELETED IN CLOSEDCAT // SEND TRANSCRIPT TO LOGS
        
        const checkEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setDescription(`${v} **|** ***I will delete this ticket in \`10\` seconds...***`)
        message.channel.send({ embeds: [ checkEmbed ]});

        setTimeout(() => {

          message.channel.messages.fetch()
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
            let body = `<head><title>Ticket Transcript • #${message.channel.name}</title><link rel="icon" type="image/png" href=${message.guild.iconURL()}></head><body>${text}</body><style>${style}</style>`;
            let output = body.replace("undefined", "<br>");
        
            fs.writeFile("./ticket-transcript.html", JSON.stringify(output), (err) => {
              if(err) console.log(err);
            });

          });

          message.channel.delete();
              
          const logChannel = message.guild.channels.cache.find(c => c.name === `ticket-logs`);
          if(logChannel) {
            const deleteLogEmbed = new Discord.MessageEmbed()
            .setColor(0xf04947)
            .setAuthor(`⚙️ | Logs`)
            .setDescription(`**» TICKET_DELETE:**\n**${message.author}  deleted a ticket: #${message.channel.name}**!\n**» **I have created a **transcript** of **this ticket**!\n**» **Check the file below this message. ⬇️`)
            logChannel.send({ embeds: [ deleteLogEmbed ], files: ["./ticket-transcript.html"] });
          }
          
        }, 10000);
        
      } else {

        //CLOSED & MOVED TO CLOSEDCAT // SEND TRANSCRIPT TO TICKETOWNER
      
        const checkEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setDescription(`${v} **|** ***I will close this ticket in \`10\` seconds...***`)
        message.channel.send({ embeds: [ checkEmbed ]});

        setTimeout(() => {

          message.channel.messages.fetch()
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
            let body = `<head><title>Ticket Transcript • #${message.channel.name}</title><link rel="icon" type="image/png" href=${message.guild.iconURL()}></head><body>${text}</body><style>${style}</style>`;
            let output = body.replace("undefined", "<br>");
        
            fs.writeFile("./ticket-transcript.html", JSON.stringify(output), (err) => {
              if(err) console.log(err);
            });

          });

          let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));
          if(ticketowners[message.channel.id]) {
          let ticketowner = ticketowners[message.channel.id].ticketowners;

            const findTicketowner = message.guild.members.cache.get(ticketowner);
            if(findTicketowner) {
              const dmTicketownerEmbed = new Discord.MessageEmbed()
              .setColor(0xf04947)
              .setAuthor(`⚙️ | Ticket Closed`)
              .setDescription(`Your **ticket** (#${message.channel.name}) was **closed**!
              \nIf you want a transcript of it, check the file below this message. ⬇️`)
              findTicketowner.send({ embeds: [ dmTicketownerEmbed ], files: ["./ticket-transcript.html"] });
            }
          }
            
          message.channel.members.forEach(m => {
            if(!m.user.bot && !m.roles.cache.has(`Ticket Support`)) {
              message.channel.permissionOverwrites.set([{
                id: m,
                deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "ADD_REACTIONS"]
              }]);
            }
          });
            
          message.channel.permissionOverwrites.set([{
            id: message.guild.roles.cache.find(r => r.name === "Ticket Support"),
            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "ADD_REACTIONS"]
          },
          {
            id: message.guild.roles.everyone,
            deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "ADD_REACTIONS"]
          }]);
          
          message.channel.setParent(`${closedcat}`);
          const checkEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setDescription(`${v} **|** ***${message.author} closed this ticket: #${message.channel.name}!***`)
          message.channel.send({ embeds: [ checkEmbed ]});
          
          const logChannel = message.guild.channels.cache.find(c => c.name === `ticket-logs`);
          if(logChannel) {
            const closeLogEmbed = new Discord.MessageEmbed()
            .setColor(0xff5858)
            .setAuthor(`⚙️ | Logs`)
            .setDescription(`**» TICKET_CLOSE:**\n**${message.author} closed a ticket: #${message.channel.name}**!`)
            logChannel.send({ embeds: [ closeLogEmbed ]});
          }

        }, 10000);
      }
      
    } else {

      //DELETED IN TICKETCAT & NO CLOSEDCAT // SEND TRANSCRIPT TO TICKETOWNER & LOGS

      const checkEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setDescription(`${v} **|** ***I will delete this ticket in \`10\` seconds...***`)
      message.channel.send({ embeds: [ checkEmbed ]});
      
      setTimeout(() => {

        message.channel.messages.fetch()
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
          let body = `<head><title>Ticket Transcript • #${message.channel.name}</title><link rel="icon" type="image/png" href=${message.guild.iconURL()}></head><body>${text}</body><style>${style}</style>`;
          let output = body.replace("undefined", "<br>");
      
          fs.writeFile("./ticket-transcript.html", JSON.stringify(output), (err) => {
            if(err) console.log(err);
          });

        });

        let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));
        if(ticketowners[message.channel.id]) {
          let ticketowner = ticketowners[message.channel.id].ticketowners;

          const findTicketowner = message.guild.members.cache.get(ticketowner);
          if(findTicketowner) {
            const dmTicketownerEmbed = new Discord.MessageEmbed()
            .setColor(0xf04947)
            .setAuthor(`⚙️ | Ticket Deleted`)
            .setDescription(`Your **ticket** (#${message.channel.name}) was **deleted**!\nIf you want a transcript of it, check the file below this message. ⬇️`)
            findTicketowner.send({ embeds: [ dmTicketownerEmbed ], files: ["./ticket-transcript.html"] });
          }
        }
 
        message.channel.delete();
          
        const logChannel = message.guild.channels.cache.find(c => c.name === `ticket-logs`);
        if(logChannel) {
          const deleteLogEmbed = new Discord.MessageEmbed()
          .setColor(0xf04947)
          .setAuthor(`⚙️ | Logs`)
          .setDescription(`**» TICKET_DELETE:**\n**${message.author} deleted a ticket: #${message.channel.name}**!\nI have created a **transcript** of **this ticket**!\nCheck the file below this message. ⬇️`)
          logChannel.send({ embeds: [ deleteLogEmbed ], files: ["./ticket-transcript.html"] });
        }

      }, 10000);
    }
  }

  module.exports.help = {
    name: "close",
    aliases: [],
    category: "tickets"
}