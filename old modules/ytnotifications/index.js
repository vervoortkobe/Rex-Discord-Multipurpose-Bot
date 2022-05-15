const YouTubeNotifier = require("youtube-notification");
/////////////////////////////////////////////////////////////////////////////////////////////
//YT NOTIFICATIONS
  const notifier = new YouTubeNotifier({
    hubCallback: "https://Rex.tsunami2360.repl.co/youtube",
    path: "/youtube"
  });

  notifier.setup();
  
  notifier.on("notified", data => {

    let ytchannels = JSON.parse(fs.readFileSync("./ytchannels.json", "utf-8"));
      
    if(!ytchannels[data.channel.id]) return;
    let ytchannel = ytchannels[data.channel.id].ytchannels;

    const ytnotichannel = client.channels.cache.get(`${ytchannel}`);

    const ytnotiEmbed = new Discord.MessageEmbed()
    .setColor(0xff0000)
    .setAuthor(`▶ | YouTube Notification`)
    .setThumbnail(data.channel.icon)
    .setDescription(`\`${data.channel.name}\` uploaded a new video titled \`${data.video.title}\`!`)
    ytnotichannel.send(ytnotiEmbed)
    .then(ytnotichannel.send(`${data.video.link}`));
  });
