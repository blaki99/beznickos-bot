const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {

    let Szefuncio = message.guild.roles.find("name", "SZEFUNCIO 🎓");

    let msg = (args[0]);
    let msg2 = args.slice(1).join(' ')
    const ramka = "```yaml"
    const ramka2 = "```"
    const check = '579026088487813160'

    if(!message.member.roles.has(Szefuncio.id)) return message.reply("Ooops, nie posiadasz uprawnień!");
    if(!args[0]) return message.channel.send("❌ _Wprowadź prawidłowe wartości, **!msg <wiadomość>**_ ❌")
    message.delete();
    let msgEmbed = new Discord.RichEmbed()
    .setColor("#FF0000")
    .setDescription(`**KOMUNIKAT OD:** ${message.author}`)
    .addField("__**INFORMACJA**__", `${ramka}
${msg} ${msg2}${ramka2}`)
    .setTimestamp(message.createdAt)
    .setFooter("Kliknij reakcje jeśli przeczytałeś", "https://i.imgur.com/mNBIfzO.png");
    message.channel.send(msgEmbed).then(function (message) {
        message.react(check)
    })
}

module.exports.help = {
    name: "msg"
}
