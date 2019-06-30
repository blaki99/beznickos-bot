const blakiconfig = require("./blakiconfig.json");
const Discord = require('discord.js');
const blaki = new Discord.Client({disableEveryone: true});
require('dotenv-flow').config();

const fs = require("fs");
blaki.commands = new Discord.Collection();

const config = {
    token: process.env.TOKEN
};

let date = require('date-and-time');

blaki.on('ready', async () => 
{
  console.log(`${blaki.user.username} jest online!`);
  blaki.user.setActivity('KOD BEZNICKOS W SKLEPIE', { type: 'WATCHING'});
    
  const guild = blaki.guilds.get('575434337554792450');
  setInterval(function() 
  {
    let now = new Date();
    const DateChannel = blaki.channels.get("575439646197284864");
    const HumansChannel = blaki.channels.get("575434927303032833");
    const OnlineChannel = blaki.channels.get("575439698516770836");
    var HumansCount = guild.memberCount;
    var OnlineCount = guild.members.filter(member => member.presence.status == 'online' || member.presence.status == 'idle' || member.presence.status == 'dnd').size
    DateChannel.setName("📅 " + date.format(now, 'DD.MM.YYYY'));
    OnlineChannel.setName("💚 Aktywni: " + OnlineCount);
    HumansChannel.setName("🐰 Jest Nas: " + HumansCount);
  }, 20000)
});

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    blaki.commands.set(props.help.name, props);
  });

});

blaki.on("message", async message => {
    if(message.author.blaki) return;
    if(message.channel.type === "dm") return;
  
    let prefix = blakiconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
    let commandfile = blaki.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(blaki,message,args);
  
});

blaki.on('guildMemberAdd', async member =>
{
  let WelcomeChannel = blaki.channels.get("575434920327905281");
  WelcomeChannel.send(`Hejka ${member} Witamy Cię wśród króliczkowej rodzinki Beznickosa 🥕 🐰!`);
});

blaki.login(config.token);
