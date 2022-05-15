const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
    const loading = client.emojis.cache.get("615988699796340768");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    if(!message.guild.me.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't setup my ticket system for this server, because I don't have permissions to manage channels!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    if(!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***I couldn't setup my ticket system for this server, you don't have the correct permissions (ADMINISTRATOR) to do this!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    message.react(loading);

    const loadingEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setDescription(`${loading} **|** ***Setting up my ticket system for this server...***`)
    message.channel.send({ embeds: [ loadingEmbed ]})
    .then(m => setTimeout(() => m.delete(), 5000));

    let ticketsupportrole = message.guild.roles.cache.find(r => r.name === "Ticket Support");
    if(!ticketsupportrole) message.guild.roles.create({ name: `Ticket Support` });
    
    let ticketcat = message.guild.channels.cache.find(cat => cat.name === "Ticket Category");
      if(ticketcat) {
      let ticketcats = JSON.parse(fs.readFileSync("./ticketcats.json", "utf-8"));

      ticketcats[message.guild.id] = {
        ticketcats: ticketcat.id
      }

      fs.writeFile("./ticketcats.json", JSON.stringify(ticketcats), (err) => {
        if(err) console.log(err);
      });

    } else {

      message.guild.channels.create("Ticket Category", { type: "category" }).then(cat => {

        let ticketsupportrole = message.guild.roles.cache.find(r => r.name === "Ticket Support");
        let everyone = message.guild.roles.everyone;

        cat.permissionOverwrites.edit(ticketsupportrole, {
          "VIEW_CHANNEL": true,
          "READ_MESSAGE_HISTORY": true,
          "SEND_MESSAGES": true,
          "ATTACH_FILES": true,
          "ADD_REACTIONS": false
        });

        cat.permissionOverwrites.edit(everyone, {
          "VIEW_CHANNEL": false,
          "READ_MESSAGE_HISTORY": false,
          "SEND_MESSAGES": false,
          "ATTACH_FILES": false,
          "ADD_REACTIONS": false
        });

        let ticketcats = JSON.parse(fs.readFileSync("./ticketcats.json", "utf-8"));

        ticketcats[message.guild.id] = {
          ticketcats: cat.id
        }

        fs.writeFile("./ticketcats.json", JSON.stringify(ticketcats), (err) => {
          if(err) console.log(err);
        });

      });
    }

    let tcchannel = message.guild.channels.cache.find(c => c.name === "ticket-creation");
    if(tcchannel) tcchannel.delete();
    message.guild.channels.create("ticket-creation", { type: "GUILD_TEXT" }).then(c => {

      setTimeout(() => {
        let everyone = message.guild.roles.everyone;
        
        c.permissionOverwrites.edit(everyone, {
          "VIEW_CHANNEL": true,
          "READ_MESSAGE_HISTORY": true,
          "SEND_MESSAGES": false,
          "ATTACH_FILES": false,
          "ADD_REACTIONS": false
        });
      }, 200);

      let ticketcats = JSON.parse(fs.readFileSync("./ticketcats.json", "utf-8"));
      if(ticketcats[message.guild.id]) {

        let ticketcat = ticketcats[message.guild.id].ticketcats;
                  
        c.setParent(`${ticketcat}`);
      }

      const ticketcreationEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`🎫 | Ticket Creation`)
      .addField(`Do you want to create a ticket?`, `Simply **react** with the \`🎫\` reaction on this message!`)
      c.send({ embeds: [ ticketcreationEmbed ]})
      .then(m => m.react("🎫"));
    });

    setTimeout(() => {
      let ticketlogs = message.guild.channels.cache.find(c => c.name === "ticket-logs");
      if(!ticketlogs) {
        message.guild.channels.create("ticket-logs", { type: "text" }).then(c => {

          let ticketsupportrole = message.guild.roles.cache.find(r => r.name === "Ticket Support");
          let everyone = message.guild.roles.everyone;
            
          c.permissionOverwrites.edit(ticketsupportrole, {
            "VIEW_CHANNEL": true,
            "READ_MESSAGE_HISTORY": true,
            "SEND_MESSAGES": false,
            "ATTACH_FILES": false,
            "ADD_REACTIONS": false
          });

          c.permissionOverwrites.edit(everyone, {
            "VIEW_CHANNEL": false,
            "READ_MESSAGE_HISTORY": false,
            "SEND_MESSAGES": false,
            "ATTACH_FILES": false,
            "ADD_REACTIONS": false
          });

          let ticketcats = JSON.parse(fs.readFileSync("./ticketcats.json", "utf-8"));
          if(ticketcats[message.guild.id]) {

            let ticketcat = ticketcats[message.guild.id].ticketcats;
              
            c.setParent(`${ticketcat}`);
          }
        });
      }

    }, 2000);
      
    setTimeout(() => {

      const setupEmbed = new Discord.MessageEmbed()
      .setColor(0x43b481)
      .setAuthor(`⚙️ | Setup`)
      .setDescription(`${v} | My **ticket system** for this server has been **setup**!`)
      .addField(`What did I do to setup the ticket system? (1)`,
      `• I have created a category where your tickets will be stored to (${ticketcat})\n• I have created a ticket-logs channel`)
      .addField(
      `What do **you** have to do to **complete the setup**? (1)`, 
      `• Give the \`Ticket Support\` role to the users who should be able to manage the tickets`)
      .addField(
      `Optional functions (1)`, 
      `• Create a category where you want to store all the closed tickets to and add it as your closed category, you can do so with \`${prefix}closedcat\``)
      message.channel.send({ embeds: [ setupEmbed ]});
      
      const logChannel = message.guild.channels.cache.find(c => c.name === "ticket-logs");
      if(logChannel) {
        const setupLogEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`⚙️ | Logs`)
        .setDescription(`**» CONFIG_SETUP:**\nMy **ticket system** for this server has been **setup** by **${message.author}**!`)
        logChannel.send({ embeds: [ setupLogEmbed ]});
      }
    }, 5000);
  }

  module.exports.help = {
    name: "setup",
    aliases: [],
    category: "tickets"
}