const blakiconfig = require("./blakiconfig.json");
const Discord = require('discord.js');
const blaki = new Discord.Client({disableEveryone: false});
require('dotenv-flow').config();

const fs = require("fs");
blaki.commands = new Discord.Collection();

const config = {
    token: process.env.TOKEN
};

const aktywnosc = [
    "WPISZ 🖤", 
    "KOD 🧡", 
    "BEZNICKOS 💚",
    "W SKLEPIE 💛"
];

let date = require('date-and-time');

blaki.on('ready', async () => 
{
  console.log(`${blaki.user.username} jest online!`);
  setInterval(function() {
      var actID = Math.floor(Math.random() * Math.floor(aktywnosc.length));
      blaki.user.setActivity(aktywnosc[actID]);
  }, 5000);
    
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
  
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: blakiconfig.prefix
      };
    }

    let prefix = prefixes[message.guild.id].prefixes;
    if(!message.content.startsWith(prefix)) return;
    
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
    let commandfile = blaki.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(blaki,message,args);
  
});

blaki.on('guildMemberAdd', async member =>
{
  let WelcomeChannel = blaki.channels.get("575434920327905281");
  WelcomeChannel.send(`Hejka ${member} wśród króliczkowej rodzince Beznickosa 🥕 🐰!`);
});

blaki.login(config.token);
