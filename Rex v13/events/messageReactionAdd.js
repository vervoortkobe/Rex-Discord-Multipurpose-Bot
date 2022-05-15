const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const levels = require("../levels.json");
const db = require("quick.db");
const moment = require("moment");

module.exports.run = async (client, reaction, user) => {

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
        reaction.message.edit({ embeds: [ helpEmbed ]})
      }
      if(reaction.emoji.name === "⛑") {
        reaction.message.reactions.resolve("⛑").users.remove(user);

        const helpModerationEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Moderation`)
        .addField(`⛑ | Moderation (11)`, `\`\`\`${prefix}ban, ${prefix}delwarns, ${prefix}kick, ${prefix}lock, ${prefix}mute, ${prefix}purge, ${prefix}unban, ${prefix}unlock, ${prefix}unmute, ${prefix}warn, ${prefix}warnings\`\`\``)
        .setFooter(`» Page 2/10`)
        reaction.message.edit({ embeds: [ helpModerationEmbed ]});
      }

      if(reaction.emoji.name === "⚙️") {
        reaction.message.reactions.resolve("⚙️").users.remove(user);
        
        const helpConfigEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Configuration`)
        .addField(`⚙️ | Configuration (7)`, `\`\`\`${prefix}automod, ${prefix}autorole, ${prefix}joinleave, ${prefix}prefix, ${prefix}rex-logs, ${prefix}rex-msglogs, ${prefix}serverstats\`\`\``)
        .setFooter(`» Page 3/10`)
        reaction.message.edit({ embeds: [ helpConfigEmbed ]});
      }

      if(reaction.emoji.name === "🎫") {
        reaction.message.reactions.resolve("🎫").users.remove(user);
        
        const helpTicketsEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Tickets`)
        .addField(`🎫 | Tickets (10)`, `\`\`\`${prefix}add, ${prefix}close, ${prefix}closedcat, ${prefix}remove, ${prefix}rename, ${prefix}setup, ${prefix}ticket, ${prefix}ticketcat, ${prefix}ticketcreationgui, ${prefix}transcript\`\`\``)
        .setFooter(`» Page 4/10`)
        reaction.message.edit({ embeds: [ helpTicketsEmbed ]});
      }

      if(reaction.emoji.name === "🆙") {
        reaction.message.reactions.resolve("🆙").users.remove(user);
        
        const helpLevelsEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Levels`)
        .addField(`🆙 | Levels (3)`, `\`\`\`${prefix}leaderboard, ${prefix}level, ${prefix}resetlevel\`\`\``)
        .setFooter(`» Page 5/10`)
        reaction.message.edit({ embeds: [ helpLevelsEmbed ]});
      }

      if(reaction.emoji.name === "📁") {
        reaction.message.reactions.resolve("📁").users.remove(user);
        
        const helpOtherEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Other`)
        .addField(`📁 | Other (10)`, `\`\`\`${prefix}avatar, ${prefix}colorpicker, ${prefix}geoip, ${prefix}invites, ${prefix}membercount, ${prefix}poll, ${prefix}servericon, ${prefix}say, ${prefix}serverinfo, ${prefix}whois\`\`\``)
        .setFooter(`» Page 6/10`)
        reaction.message.edit({ embeds: [ helpOtherEmbed ]});
      }

      if(reaction.emoji.name === "😂") {
        reaction.message.reactions.resolve("😂").users.remove(user);
        
        const helpFunEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Fun`)
        .addField(`😂 | Fun (11)`, `\`\`\`${prefix}8ball, ${prefix}binary, ${prefix}counting, ${prefix}hack, ${prefix}howgay, ${prefix}joke, ${prefix}meme, ${prefix}pokedex, ${prefix}ppsize, ${prefix}ship, ${prefix}tictactoe\`\`\``)
        .setFooter(`» Page 7/10`)
        reaction.message.edit({ embeds: [ helpFunEmbed ]});
      }

      if(reaction.emoji.name === "📷") {
        reaction.message.reactions.resolve("📷").users.remove(user);
        
        const helpImgsEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help Images`)
        .addField(`📷 | Images (55)`, `\`\`\`${prefix}abandon, ${prefix}aww, ${prefix}bear, ${prefix}birb, ${prefix}car, ${prefix}cat, ${prefix}cry, ${prefix}cuddle, ${prefix}dog, ${prefix}dolphin, ${prefix}duckbutt, ${prefix}eevee, ${prefix}elephant, ${prefix}excuseme, ${prefix}facepalm, ${prefix}fish, ${prefix}food, ${prefix}fox, ${prefix}gay, ${prefix}giraffe, ${prefix}goose, ${prefix}hippo, ${prefix}horse, ${prefix}hug, ${prefix}invert, ${prefix}kangaroo, ${prefix}killerwhale, ${prefix}kiss, ${prefix}koala, ${prefix}lion, ${prefix}lizard, ${prefix}llama, ${prefix}panda, ${prefix}pat, ${prefix}penguin, ${prefix}pig, ${prefix}pikachu, ${prefix}quokka, ${prefix}raccoon, ${prefix}redpanda, ${prefix}rip, ${prefix}seal, ${prefix}shark, ${prefix}shiba, ${prefix}slap, ${prefix}snake, ${prefix}spider, ${prefix}spin, ${prefix}triggered, ${prefix}turtle, ${prefix}wanted, ${prefix}wasted, ${prefix}whale, ${prefix}wink, ${prefix}ytcomment\`\`\``)
        .setFooter(`» Page 8/10`)
        reaction.message.edit({ embeds: [ helpImgsEmbed ]});
      }

      if(reaction.emoji.name === "🔞") {
        reaction.message.reactions.resolve("🔞").users.remove(user);
        
        if(reaction.message.channel.nsfw === false) {
          const helpNoNsfwEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`🤖 | Help Nsfw`)
          .addField(`🔞 | Nsfw (24)`, `${x} **|** ***I couldn't show the nsfw commands, because this isn't an nsfw channel!***`)
          .setFooter(`» Page 9/10`)
          reaction.message.edit({ embeds: [ helpNoNsfwEmbed]});
        }

        if(reaction.message.channel.nsfw === true) {
          const helpNsfwEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`🤖 | Help Nsfw`)
          .addField(`🔞 | Nsfw (24)`, `\`\`\`${prefix}anal, ${prefix}booty, ${prefix}classic, ${prefix}ero, ${prefix}femdom, ${prefix}futanari, ${prefix}hanal,${prefix}hblowjob, ${prefix}hboobs, ${prefix}hcum, ${prefix}hentai, ${prefix}hgif, ${prefix}hpussy, ${prefix}htits, ${prefix}lesbian, ${prefix}lewd, ${prefix}lewdneko, ${prefix}neko, ${prefix}nsfwneko, ${prefix}pussy, ${prefix}pwankg, ${prefix}spank, ${prefix}trap, ${prefix}yuri \`\`\``)
          .setFooter(`» Page 9/10`)
          reaction.message.edit({ embeds: [ helpNsfwEmbed ]});
        }
      }

      if(reaction.emoji.name === "ℹ️") {
        reaction.message.reactions.resolve("ℹ️").users.remove(user);
        
        const helpAboutEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🤖 | Help About`)
        .addField(`ℹ️ | About (7)`, `\`\`\`${prefix}botinfo, ${prefix}botstats, ${prefix}donate, ${prefix}invite, ${prefix}ping, ${prefix}support, ${prefix}website\`\`\``)
        .setFooter(`» Page 10/10`)
        reaction.message.edit({ embeds: [ helpAboutEmbed ]});
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
        reaction.message.edit({ embeds: [ colorpickerEmbed ]})
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
          return reaction.message.channel.send({ embeds: [ errorEmbed ]});
        }
        const existingTicket = reaction.message.guild.channels.cache.find(c => c.name === `ticket-${message.author.username.toLowerCase().replace(" ", "-")}-${message.author.discriminator}`);
        if(!existingTicket) {
    
          reaction.message.guild.channels.create(`ticket-${user.username.toLowerCase()}-${message.author.discriminator}`, {
            type: "GUILD_TEXT",
            reason: `This ticket was created by ${user.tag}, because of ${reason}!`,
            topic: `This ticket was created by ${user}, because of ${reason}!`
          }).then(c => {
    
            setTimeout(() => {
    
              let everyone = reaction.message.guild.roles.everyone;
    
              c.permissionOverwrites.edit(user, {
                "SEND_MESSAGES": true,
                "VIEW_CHANNEL": true,
                "READ_MESSAGE_HISTORY": true,
                "ATTACH_FILES": true,
                "ADD_REACTIONS": false
              });
    
              c.permissionOverwrites.edit(ticketsupportrolefind, {
                "VIEW_CHANNEL": true,
                "READ_MESSAGE_HISTORY": true,
                "SEND_MESSAGES": true,
                "ATTACH_FILES": true,
                "ADD_REACTIONS": false
              });
    
              c.permissionOverwrites.edit(everyone, {
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
                return reaction.message.channel.send({ embeds: [ errorEmbed ]});
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
              c.send({ embeds: [ ticketEmbed ]}).then(m => {
                m.react("🗑️");
                m.react("📝");
              });
              
              const ticketSupportRole = reaction.message.guild.roles.cache.find(r => r.name === `Ticket Support`);
              c.send(`> ${ticketSupportRole}`)
              .then(m => setTimeout(() => m.delete(), 5000));
            }, 1000);
              
            const checkEmbed = new Discord.MessageEmbed()
            .setColor(0x43b481)
            .setDescription(`${v} **|** ***${user}, your ticket has been created: <#${c.id}>!***`)
            reaction.message.channel.send({ embeds: [ checkEmbed ]})
            .then(m => setTimeout(() => m.delete(), 5000));
    
            const logChannel = reaction.message.guild.channels.cache.find(c => c.name === `ticket-logs`);
            if(logChannel) {
              const ticketLogEmbed = new Discord.MessageEmbed()
              .setColor(0x43b481)
              .setAuthor(`⚙️ | Logs`)
              .setDescription(`**» TICKET_CREATE:**
              \n**${user} created a new ticket: #${c.name}**, because of **${reason}**!
              `)
              logChannel.send({ embeds: [ ticketLogEmbed ]});
            }
            
          }).catch(err => console.log(err));
          
        } else {
          const errorEmbed = new Discord.MessageEmbed()
          .setColor(0xf04947)
          .setDescription(`${x} **|** ***You already created a ticket!***`)
          return reaction.message.channel.send({ embeds: [ errorEmbed ]})
          .then(m => setTimeout(() => m.delete(), 5000));
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
        return reaction.message.channel.send({ embeds: [ errorEmbed ]});
      }
    
      let closedcats = JSON.parse(fs.readFileSync("./closedcats.json", "utf-8"));
      if(closedcats[reaction.message.guild.id] && reaction.message.guild.channels.cache.find(c => c.id === closedcats[reaction.message.guild.id])) {
      let closedcat = closedcats[reaction.message.guild.id].closedcats;
        
        if(reaction.message.channel.parent.id === `${closedcat}`) {
  
          //DELETED IN CLOSEDCAT // SEND TRANSCRIPT TO LOGS
          
          const checkEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setDescription(`${v} **|** ***I will delete this ticket in \`10\` seconds...***`)
          reaction.message.channel.send({ embeds: [ checkEmbed ]});
  
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
              logChannel.send({ embeds: [ deleteLogEmbed ], files: ["./ticket-transcript.html"] });
            }
            
          }, 10000);
          
        } else {
  
          //CLOSED & MOVED TO CLOSEDCAT // SEND TRANSCRIPT TO TICKETOWNER
        
          const checkEmbed = new Discord.MessageEmbed()
          .setColor(0x43b481)
          .setDescription(`${v} **|** ***I will close this ticket in \`10\` seconds...***`)
          reaction.message.channel.send({ embeds: [ checkEmbed ]});
  
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
                findTicketowner.send({ embeds: [ dmTicketownerEmbed ], files: ["./ticket-transcript.html"] });
              }
            }

            setTimeout(() => {
              
              reaction.message.channel.members.forEach(m => {
                if(!m.user.bot && !m.roles.cache.has(`Ticket Support`)) {
                  reaction.message.channel.permissionOverwrites.edit(m, {
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

              reaction.message.channel.permissionOverwrites.edit(tisurole, {
                "SEND_MESSAGES": true,
                "VIEW_CHANNEL": true,
                "READ_MESSAGE_HISTORY": true,
                "ATTACH_FILES": true,
                "ADD_REACTIONS": false
              });
              
              reaction.message.channel.permissionOverwrites.edit(everyone, {
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
            reaction.message.channel.send({ embeds: [ checkEmbed ]});
            
            const logChannel = reaction.message.guild.channels.cache.find(c => c.name === `ticket-logs`);
            if(logChannel) {
              const closeLogEmbed = new Discord.MessageEmbed()
              .setColor(0xff5858)
              .setAuthor(`⚙️ | Logs`)
              .setDescription(`**» TICKET_CLOSE:**
              \n**${user} closed a ticket: #${reaction.message.channel.name}**!
              `)
              logChannel.send({ embeds: [ closeLogEmbed ]});
            }
  
          }, 10000);
        }
        
      } else {
  
        //DELETED IN TICKETCAT & NO CLOSEDCAT // SEND TRANSCRIPT TO TICKETOWNER & LOGS
  
        const checkEmbed = new Discord.MessageEmbed()
        .setColor(0x43b481)
        .setDescription(`${v} **|** ***I will delete this ticket in \`10\` seconds...***`)
        reaction.message.channel.send({ embeds: [ checkEmbed ]});
        
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
              findTicketowner.send({ embeds: [ dmTicketownerEmbed ], files: ["./ticket-transcript.html"] });
            }
          }

          reaction.message.channel.delete();
            
          const logChannel = reaction.message.guild.channels.cache.find(c => c.name === `ticket-logs`);
          if(logChannel) {
            const deleteLogEmbed = new Discord.MessageEmbed()
            .setColor(0xf04947)
            .setAuthor(`⚙️ | Logs`)
            .setDescription(`**» TICKET_DELETE:**\n**${user} deleted a ticket: #${reaction.message.channel.name}**!\n**» **I have created a **transcript** of **this ticket**!\n**» **Check the file below this message. ⬇️`)
            logChannel.send({ embeds: [ deleteLogEmbed ], files: ["./ticket-transcript.html"] });
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
          return reaction.message.channel.send({ embeds: [ errorEmbed ]});
        }

        const loadingEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setDescription(`${loading} **|** ***The transcript is being created...***`)
        reaction.message.channel.send({ embeds: [ loadingEmbed ]})
        .then(m => setTimeout(() => m.delete(), 5000));

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
            reaction.message.channel.send({ embeds: [ transcriptEmbed ], files: ["./ticket-transcript.html"] });

            let logChannel = message.guild.channels.cache.find(c => c.name === "ticket-logs");
            if(logChannel) {
              const transcriptLogEmbed = new Discord.MessageEmbed()
              .setColor(0x03a9f4)
              .setAuthor(`⚙️ | Logs`)
              .setDescription(`**${user}** created a **transcript** of ticket **#${reaction.message.channel.name}**!\n**» **Check the file below this message. ⬇️`)
              logChannel.send({ embeds: [ transcriptLogEmbed ], files: ["./ticket-transcript.html"] });
            }

          }, 500);
        });
      }
    }
  }

  module.exports.help = {
    name: "messageReactionAdd"
}