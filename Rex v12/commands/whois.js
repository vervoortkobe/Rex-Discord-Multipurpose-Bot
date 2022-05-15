const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    const hypesquadevents = client.emojis.cache.get("787778776926781512");
    const hypesquadbravery = client.emojis.cache.get("787778785604272128");
    const hypesquadbrilliance = client.emojis.cache.get("787782296774246431");
    const hypesquadbalance = client.emojis.cache.get("787778810275037235");
    const earlysupporter = client.emojis.cache.get("787778767770353666");
    const verifiedbot = client.emojis.cache.get("787778755778052136");
    const verifieddeveloper = client.emojis.cache.get("787778799898722394");

    const flags = {
      DISCORD_EMPLOYEE: `\`Discord Employee\``,
      DISCORD_PARTNER: `\`Discord Partner\``,
      BUGHUNTER_LEVEL_1: `\`Bug Hunter (Level 1)\``,
      BUGHUNTER_LEVEL_2: `\`Bug Hunter (Level 2)\``,
      HYPESQUAD_EVENTS: `${hypesquadevents} \`HypeSquad Events\``,
      HOUSE_BRAVERY: `${hypesquadbravery} \`House of Bravery\``,
      HOUSE_BRILLIANCE: `${hypesquadbrilliance} \`House of Brilliance\``,
      HOUSE_BALANCE: `${hypesquadbalance} \`House of Balance\``,
      EARLY_SUPPORTER: `${earlysupporter} \`Early Supporter\``,
      TEAM_USER: `\`Team User\``,
      SYSTEM: `\`System\``,
      VERIFIED_BOT: `${verifiedbot} \`Verified Bot\``,
      VERIFIED_DEVELOPER: `${verifieddeveloper} \`Verified Bot Developer\``
    }

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;

    if(!args[0]) {

      //JOINEDAT ARRAY 100+
      let differarr = [];
      message.guild.members.cache.forEach(user => {
        differarr.push(user.id);
      });

      let allmemberlength = differarr.length;

      let mesarr = [];

      for(let i = 0; i < allmemberlength; i++) {

        let jtotalSeconds = ((Date.now() - message.guild.members.cache.get(`${differarr[i]}`).joinedAt) / 1000);
        let jdays = Math.floor(jtotalSeconds / 86400);
        let joinedat = `${jdays}`;

        let gettheamount = joinedat;

        let theamount;
        if(gettheamount) {
          theamount = gettheamount;
        } else {
          theamount = "0";
        }

        mesarr.push({
          name: differarr[i],
          amount: theamount
        });
      }

      mesarr.sort((a, b) => b.amount - a.amount);

      var joinrank;
      if(mesarr[0].name === message.author.id) joinrank = "1st";
      else if(mesarr[1].name === message.author.id) joinrank = "2nd";
      else if(mesarr[2].name === message.author.id) joinrank = "3rd";
      else if(mesarr[3].name === message.author.id) joinrank = "4th";
      else if(mesarr[4].name === message.author.id) joinrank = "5th";
      else if(mesarr[5].name === message.author.id) joinrank = "6th";
      else if(mesarr[6].name === message.author.id) joinrank = "7th";
      else if(mesarr[7].name === message.author.id) joinrank = "8th";
      else if(mesarr[8].name === message.author.id) joinrank = "9th";
      else if(mesarr[9].name === message.author.id) joinrank = "10th";
      else if(mesarr[10].name === message.author.id) joinrank = "11th";
      else if(mesarr[11].name === message.author.id) joinrank = "12th";
      else if(mesarr[12].name === message.author.id) joinrank = "13th";
      else if(mesarr[13].name === message.author.id) joinrank = "14th";
      else if(mesarr[14].name === message.author.id) joinrank = "15th";
      else if(mesarr[15].name === message.author.id) joinrank = "16th";
      else if(mesarr[16].name === message.author.id) joinrank = "17th";
      else if(mesarr[17].name === message.author.id) joinrank = "18th";
      else if(mesarr[18].name === message.author.id) joinrank = "19th";
      else if(mesarr[19].name === message.author.id) joinrank = "20th";
      else if(mesarr[20].name === message.author.id) joinrank = "21th";
      else if(mesarr[21].name === message.author.id) joinrank = "22th";
      else if(mesarr[22].name === message.author.id) joinrank = "23th";
      else if(mesarr[23].name === message.author.id) joinrank = "24th";
      else if(mesarr[24].name === message.author.id) joinrank = "25th";
      else if(mesarr[25].name === message.author.id) joinrank = "26th";
      else if(mesarr[26].name === message.author.id) joinrank = "27th";
      else if(mesarr[27].name === message.author.id) joinrank = "28th";
      else if(mesarr[28].name === message.author.id) joinrank = "29th";
      else if(mesarr[29].name === message.author.id) joinrank = "30th";
      else if(mesarr[30].name === message.author.id) joinrank = "31th";
      else if(mesarr[31].name === message.author.id) joinrank = "32th";
      else if(mesarr[32].name === message.author.id) joinrank = "33th";
      else if(mesarr[33].name === message.author.id) joinrank = "34th";
      else if(mesarr[34].name === message.author.id) joinrank = "35th";
      else if(mesarr[35].name === message.author.id) joinrank = "36th";
      else if(mesarr[36].name === message.author.id) joinrank = "37th";
      else if(mesarr[37].name === message.author.id) joinrank = "38th";
      else if(mesarr[38].name === message.author.id) joinrank = "39th";
      else if(mesarr[39].name === message.author.id) joinrank = "40th";
      else if(mesarr[40].name === message.author.id) joinrank = "41th";
      else if(mesarr[41].name === message.author.id) joinrank = "42th";
      else if(mesarr[42].name === message.author.id) joinrank = "43th";
      else if(mesarr[43].name === message.author.id) joinrank = "44th";
      else if(mesarr[44].name === message.author.id) joinrank = "45th";
      else if(mesarr[45].name === message.author.id) joinrank = "46th";
      else if(mesarr[46].name === message.author.id) joinrank = "47th";
      else if(mesarr[47].name === message.author.id) joinrank = "48th";
      else if(mesarr[48].name === message.author.id) joinrank = "49th";
      else if(mesarr[49].name === message.author.id) joinrank = "50th";
      else if(mesarr[50].name === message.author.id) joinrank = "51th";
      else if(mesarr[51].name === message.author.id) joinrank = "52th";
      else if(mesarr[52].name === message.author.id) joinrank = "53th";
      else if(mesarr[53].name === message.author.id) joinrank = "54th";
      else if(mesarr[54].name === message.author.id) joinrank = "55th";
      else if(mesarr[55].name === message.author.id) joinrank = "56th";
      else if(mesarr[56].name === message.author.id) joinrank = "57th";
      else if(mesarr[57].name === message.author.id) joinrank = "58th";
      else if(mesarr[58].name === message.author.id) joinrank = "59th";
      else if(mesarr[59].name === message.author.id) joinrank = "60th";
      else if(mesarr[60].name === message.author.id) joinrank = "61th";
      else if(mesarr[61].name === message.author.id) joinrank = "62th";
      else if(mesarr[62].name === message.author.id) joinrank = "63th";
      else if(mesarr[63].name === message.author.id) joinrank = "64th";
      else if(mesarr[64].name === message.author.id) joinrank = "65th";
      else if(mesarr[65].name === message.author.id) joinrank = "66th";
      else if(mesarr[66].name === message.author.id) joinrank = "67th";
      else if(mesarr[67].name === message.author.id) joinrank = "68th";
      else if(mesarr[68].name === message.author.id) joinrank = "69th";
      else if(mesarr[69].name === message.author.id) joinrank = "70th";
      else if(mesarr[70].name === message.author.id) joinrank = "71th";
      else if(mesarr[71].name === message.author.id) joinrank = "72th";
      else if(mesarr[72].name === message.author.id) joinrank = "73th";
      else if(mesarr[73].name === message.author.id) joinrank = "74th";
      else if(mesarr[74].name === message.author.id) joinrank = "75th";
      else if(mesarr[75].name === message.author.id) joinrank = "76th";
      else if(mesarr[76].name === message.author.id) joinrank = "77th";
      else if(mesarr[77].name === message.author.id) joinrank = "78th";
      else if(mesarr[78].name === message.author.id) joinrank = "79th";
      else if(mesarr[79].name === message.author.id) joinrank = "80th";
      else if(mesarr[80].name === message.author.id) joinrank = "81th";
      else if(mesarr[81].name === message.author.id) joinrank = "82th";
      else if(mesarr[82].name === message.author.id) joinrank = "83th";
      else if(mesarr[83].name === message.author.id) joinrank = "84th";
      else if(mesarr[84].name === message.author.id) joinrank = "85th";
      else if(mesarr[85].name === message.author.id) joinrank = "86th";
      else if(mesarr[86].name === message.author.id) joinrank = "87th";
      else if(mesarr[87].name === message.author.id) joinrank = "88th";
      else if(mesarr[88].name === message.author.id) joinrank = "89th";
      else if(mesarr[89].name === message.author.id) joinrank = "90th";
      else if(mesarr[90].name === message.author.id) joinrank = "91th";
      else if(mesarr[91].name === message.author.id) joinrank = "92th";
      else if(mesarr[92].name === message.author.id) joinrank = "93th";
      else if(mesarr[93].name === message.author.id) joinrank = "94th";
      else if(mesarr[94].name === message.author.id) joinrank = "95th";
      else if(mesarr[95].name === message.author.id) joinrank = "96th";
      else if(mesarr[96].name === message.author.id) joinrank = "97th";
      else if(mesarr[97].name === message.author.id) joinrank = "98th";
      else if(mesarr[98].name === message.author.id) joinrank = "99th";
      else if(mesarr[99].name === message.author.id) joinrank = "100th";
      else joinrank = "100+";

      var status;
      if(message.author.presence.status === "online") status = "🟢 Online";
      if(message.author.presence.status === "idle") status = "🟡 Idle";
      if(message.author.presence.status === "dnd") status = "🔴 DND";
      if(message.author.presence.status === "offline") status = "⚫ Offline";

      const userflags = message.author.flags.toArray();

      let ctotalSeconds = ((Date.now() - message.author.createdAt) / 1000);
      let cyears = Math.floor(ctotalSeconds / 31556926);
      ctotalSeconds %= 31556926;
      let cdays = Math.floor(ctotalSeconds / 86400);
      ctotalSeconds %= 86400;
      let chours = Math.floor(ctotalSeconds / 3600);
      ctotalSeconds %= 3600;
      let cminutes = Math.floor(ctotalSeconds / 60);
      let cseconds = Math.floor(ctotalSeconds % 60);
      let createdat = `${cyears}y ${cdays}d ${chours}h ${cminutes}m ${cseconds}s`;

      let jtotalSeconds = ((Date.now() - message.member.joinedAt) / 1000);
      let jyears = Math.floor(jtotalSeconds / 31556926);
      jtotalSeconds %= 31556926;
      let jdays = Math.floor(jtotalSeconds / 86400);
      jtotalSeconds %= 86400;
      let jhours = Math.floor(jtotalSeconds / 3600);
      jtotalSeconds %= 3600;
      let jminutes = Math.floor(jtotalSeconds / 60);
      let jseconds = Math.floor(jtotalSeconds % 60);
      let joinedat = `${jyears}y ${jdays}d ${jhours}h ${jminutes}m ${jseconds}s`;

      let rolesmemberhas = message.member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(r => r.toString())
      .join(", ");

      let permsmemberhas = message.member.permissions
      .toArray()
      .join(", ");

      const whoisEmbed = new Discord.MessageEmbed()
      .setColor(0x03a9f4)
      .setAuthor(`👤 | Whois`)
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(`**» Username:** \`${message.author.tag}\`\n**» ID:** \`${message.author.id}\`\n**» Status:** \`${status}\`\n**» Badges (${userflags.length}):** ${userflags.length ? userflags.map(flag => flags[flag]).join(", ") : "None"}\n**» Account Creation Date:** \`${message.author.createdAt.toLocaleDateString("nl-BE")}\`\n\`${createdat} ago\`\n**» Server Join Date:** \`${message.member.joinedAt.toLocaleDateString("nl-BE")}\`\n\`${joinedat} ago\`\n**» Join Rank:** \`#${joinrank}\`\n**» Roles (${message.member.roles.cache.size}):** ${rolesmemberhas}\n**» Permissions:** \`\`\`${permsmemberhas}\`\`\``)
      return message.channel.send(whoisEmbed)
      .then(message.react("👤"));
    }

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {
      const errorEmbed = new Discord.MessageEmbed()
      .setColor(0xf04947)
      .setDescription(`${x} **|** ***Please mention a valid member!***`)
      return message.channel.send(errorEmbed);
    }

    //JOINEDAT ARRAY 100+
    let differarr = [];
    message.guild.members.cache.forEach(user => {
      differarr.push(user.id);
    });

    let allmemberlength = differarr.length;

    let mesarr = [];

    for(let i = 0; i < allmemberlength; i++) {

      let jtotalSeconds = ((Date.now() - message.guild.members.cache.get(`${differarr[i]}`).joinedAt) / 1000);
      let jdays = Math.floor(jtotalSeconds / 86400);
      let joinedat = `${jdays}`;

      let gettheamount = joinedat;

      let theamount;
      if(gettheamount) {
        theamount = gettheamount;
      } else {
        theamount = "0";
      }

      mesarr.push({
        name: differarr[i],
        amount: theamount
      });
    }

    mesarr.sort((a, b) => b.amount - a.amount);

    var joinrank;
    if(mesarr[0].name === member.id) joinrank = "1st";
    else if(mesarr[1].name === member.id) joinrank = "2nd";
    else if(mesarr[2].name === member.id) joinrank = "3rd";
    else if(mesarr[3].name === member.id) joinrank = "4th";
    else if(mesarr[4].name === member.id) joinrank = "5th";
    else if(mesarr[5].name === member.id) joinrank = "6th";
    else if(mesarr[6].name === member.id) joinrank = "7th";
    else if(mesarr[7].name === member.id) joinrank = "8th";
    else if(mesarr[8].name === member.id) joinrank = "9th";
    else if(mesarr[9].name === member.id) joinrank = "10th";
    else if(mesarr[10].name === member.id) joinrank = "11th";
    else if(mesarr[11].name === member.id) joinrank = "12th";
    else if(mesarr[12].name === member.id) joinrank = "13th";
    else if(mesarr[13].name === member.id) joinrank = "14th";
    else if(mesarr[14].name === member.id) joinrank = "15th";
    else if(mesarr[15].name === member.id) joinrank = "16th";
    else if(mesarr[16].name === member.id) joinrank = "17th";
    else if(mesarr[17].name === member.id) joinrank = "18th";
    else if(mesarr[18].name === member.id) joinrank = "19th";
    else if(mesarr[19].name === member.id) joinrank = "20th";
    else if(mesarr[20].name === member.id) joinrank = "21th";
    else if(mesarr[21].name === member.id) joinrank = "22th";
    else if(mesarr[22].name === member.id) joinrank = "23th";
    else if(mesarr[23].name === member.id) joinrank = "24th";
    else if(mesarr[24].name === member.id) joinrank = "25th";
    else if(mesarr[25].name === member.id) joinrank = "26th";
    else if(mesarr[26].name === member.id) joinrank = "27th";
    else if(mesarr[27].name === member.id) joinrank = "28th";
    else if(mesarr[28].name === member.id) joinrank = "29th";
    else if(mesarr[29].name === member.id) joinrank = "30th";
    else if(mesarr[30].name === member.id) joinrank = "31th";
    else if(mesarr[31].name === member.id) joinrank = "32th";
    else if(mesarr[32].name === member.id) joinrank = "33th";
    else if(mesarr[33].name === member.id) joinrank = "34th";
    else if(mesarr[34].name === member.id) joinrank = "35th";
    else if(mesarr[35].name === member.id) joinrank = "36th";
    else if(mesarr[36].name === member.id) joinrank = "37th";
    else if(mesarr[37].name === member.id) joinrank = "38th";
    else if(mesarr[38].name === member.id) joinrank = "39th";
    else if(mesarr[39].name === member.id) joinrank = "40th";
    else if(mesarr[40].name === member.id) joinrank = "41th";
    else if(mesarr[41].name === member.id) joinrank = "42th";
    else if(mesarr[42].name === member.id) joinrank = "43th";
    else if(mesarr[43].name === member.id) joinrank = "44th";
    else if(mesarr[44].name === member.id) joinrank = "45th";
    else if(mesarr[45].name === member.id) joinrank = "46th";
    else if(mesarr[46].name === member.id) joinrank = "47th";
    else if(mesarr[47].name === member.id) joinrank = "48th";
    else if(mesarr[48].name === member.id) joinrank = "49th";
    else if(mesarr[49].name === member.id) joinrank = "50th";
    else if(mesarr[50].name === member.id) joinrank = "51th";
    else if(mesarr[51].name === member.id) joinrank = "52th";
    else if(mesarr[52].name === member.id) joinrank = "53th";
    else if(mesarr[53].name === member.id) joinrank = "54th";
    else if(mesarr[54].name === member.id) joinrank = "55th";
    else if(mesarr[55].name === member.id) joinrank = "56th";
    else if(mesarr[56].name === member.id) joinrank = "57th";
    else if(mesarr[57].name === member.id) joinrank = "58th";
    else if(mesarr[58].name === member.id) joinrank = "59th";
    else if(mesarr[59].name === member.id) joinrank = "60th";
    else if(mesarr[60].name === member.id) joinrank = "61th";
    else if(mesarr[61].name === member.id) joinrank = "62th";
    else if(mesarr[62].name === member.id) joinrank = "63th";
    else if(mesarr[63].name === member.id) joinrank = "64th";
    else if(mesarr[64].name === member.id) joinrank = "65th";
    else if(mesarr[65].name === member.id) joinrank = "66th";
    else if(mesarr[66].name === member.id) joinrank = "67th";
    else if(mesarr[67].name === member.id) joinrank = "68th";
    else if(mesarr[68].name === member.id) joinrank = "69th";
    else if(mesarr[69].name === member.id) joinrank = "70th";
    else if(mesarr[70].name === member.id) joinrank = "71th";
    else if(mesarr[71].name === member.id) joinrank = "72th";
    else if(mesarr[72].name === member.id) joinrank = "73th";
    else if(mesarr[73].name === member.id) joinrank = "74th";
    else if(mesarr[74].name === member.id) joinrank = "75th";
    else if(mesarr[75].name === member.id) joinrank = "76th";
    else if(mesarr[76].name === member.id) joinrank = "77th";
    else if(mesarr[77].name === member.id) joinrank = "78th";
    else if(mesarr[78].name === member.id) joinrank = "79th";
    else if(mesarr[79].name === member.id) joinrank = "80th";
    else if(mesarr[80].name === member.id) joinrank = "81th";
    else if(mesarr[81].name === member.id) joinrank = "82th";
    else if(mesarr[82].name === member.id) joinrank = "83th";
    else if(mesarr[83].name === member.id) joinrank = "84th";
    else if(mesarr[84].name === member.id) joinrank = "85th";
    else if(mesarr[85].name === member.id) joinrank = "86th";
    else if(mesarr[86].name === member.id) joinrank = "87th";
    else if(mesarr[87].name === member.id) joinrank = "88th";
    else if(mesarr[88].name === member.id) joinrank = "89th";
    else if(mesarr[89].name === member.id) joinrank = "90th";
    else if(mesarr[90].name === member.id) joinrank = "91th";
    else if(mesarr[91].name === member.id) joinrank = "92th";
    else if(mesarr[92].name === member.id) joinrank = "93th";
    else if(mesarr[93].name === member.id) joinrank = "94th";
    else if(mesarr[94].name === member.id) joinrank = "95th";
    else if(mesarr[95].name === member.id) joinrank = "96th";
    else if(mesarr[96].name === member.id) joinrank = "97th";
    else if(mesarr[97].name === member.id) joinrank = "98th";
    else if(mesarr[98].name === member.id) joinrank = "99th";
    else if(mesarr[99].name === member.id) joinrank = "100th";
    else joinrank = "100+";
    
    var status;
    if(member.user.presence.status === "online") status = "🟢 Online";
    if(member.user.presence.status === "idle") status = "🟡 Idle";
    if(member.user.presence.status === "dnd") status = "🔴 DND";
    if(member.user.presence.status === "offline") status = "⚫ Offline";

    const userflags = member.user.flags.toArray();

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

    let jtotalSeconds = ((Date.now() - member.joinedAt) / 1000);
    let jyears = Math.floor(jtotalSeconds / 31556926);
    jtotalSeconds %= 31556926;
    let jdays = Math.floor(jtotalSeconds / 86400);
    jtotalSeconds %= 86400;
    let jhours = Math.floor(jtotalSeconds / 3600);
    jtotalSeconds %= 3600;
    let jminutes = Math.floor(jtotalSeconds / 60);
    let jseconds = Math.floor(jtotalSeconds % 60);
    let joinedat = `${jyears}y ${jdays}d ${jhours}h ${jminutes}m ${jseconds}s`;

    let rolesmemberhas = member.roles.cache
    .sort((a, b) => b.position - a.position)
    .map(r => r.toString())
    .join(", ");

    let permsmemberhas = member.permissions
    .toArray()
    .join(", ");

    const whoisEmbed = new Discord.MessageEmbed()
    .setColor(0x03a9f4)
    .setAuthor(`👤 | Whois`)
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(`**» Username:** \`${member.user.tag}\`\n**» ID:** \`${member.user.id}\`\n**» Status:** \`${status}\`\n**» Badges (${userflags.length}):** ${userflags.length ? userflags.map(flag => flags[flag]).join(", ") : "\`None\`"}\n**» Account Creation Date:** \`${member.user.createdAt.toLocaleDateString("nl-BE")}\`\n\`${createdat} ago\`\n**» Server Join Date:** \`${member.joinedAt.toLocaleDateString("nl-BE")}\`\n\`${joinedat} ago\`\n**» Join Rank:** \`#${joinrank}\`\n**» Roles (${member.roles.cache.size}):** ${rolesmemberhas}\n**» Permissions:** \`\`\`${permsmemberhas}\`\`\``)
    message.channel.send(whoisEmbed)
    .then(message.react("👤"));
  }

  module.exports.help = {
    name: "whois",
    aliases: ["userinfo"],
    category: "other"
}