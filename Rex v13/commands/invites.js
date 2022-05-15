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

    if(!args[0]) {
      message.guild.invites.fetch()
      .then(invites => {

        let userinvites = invites.find(invite => invite.inviter.id === message.author.id);
        let inviteuses = userinvites.uses;

        if(inviteuses >= 1) {
            const invitesEmbed = new Discord.MessageEmbed()
            .setColor(0x03a9f4)
            .setAuthor(`🙋 | Invites`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`» You have invited \`${inviteuses}\` users to this server!`)
            message.channel.send({ embeds: [ invitesEmbed ]})
            .then(message.react("🙋"));

        } else {

          const invitesEmbed = new Discord.MessageEmbed()
          .setColor(0x03a9f4)
          .setAuthor(`🙋 | Invites`)
          .setThumbnail(message.author.displayAvatarURL())
          .setDescription(`» You have invited \`0\` users to this server!`)
          message.channel.send({ embeds: [ invitesEmbed ]})
          .then(message.react("🙋"));
        }
      });
      return;
    }

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***Please mention a valid member!***`)
      return message.channel.send({ embeds: [ errorEmbed ]});
    }

    message.guild.invites.fetch()
    .then(invites => {

      let userinvites = invites.find(invite => invite.inviter.id === member.id);
      let inviteuses = userinvites.uses;

      if(inviteuses >= 1) {

        const invitesEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🙋 | Invites`)
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`» ${member} has invited \`${inviteuses}\` users to this server!`)
        return message.channel.send({ embeds: [ invitesEmbed ]})
        .then(message.react("🙋"));

      } else {

        const invitesEmbed = new Discord.MessageEmbed()
        .setColor(0x03a9f4)
        .setAuthor(`🙋 | Invites`)
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`» ${member} has invited \`0\` users to this server!`)
        return message.channel.send({ embeds: [ invitesEmbed ]})
        .then(message.react("🙋"));
      }
    });
  }

  module.exports.help = {
    name: "invites",
    aliases: [],
    category: "other"
}