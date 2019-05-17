const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {

    let Szefuncio = message.guild.roles.find("name", "SZEFUNCIO 🎓");

    let pass = (args[0]);
    let mode = args.join(" ").slice(7);
    const zasady1 = "**»** WIĘCEJ NIŻ 50 OSÓB WALCZYMY OD ZAMKNIĘCIA SIĘ 3 STREFY !"
    const zasady2 = "**»** MNIEJ NIŻ 50 OSÓB WALCZYMY OD ZAMKNIĘCIA SIĘ 4 STREFY !"
    const zasady3 = "**»** JEŻELI WŁĄCZY SIĘ GNIEW BURZY BIJEMY SIĘ PO 10 SEKUNDACH !"
    const check = '579026088487813160'

    if(!message.member.roles.has(Szefuncio.id)) return message.reply("oops");
    if(!args[0]) return message.channel.send("❌ _Wprowadź prawidłowe wartości, **b!late hasło tryb**_ ❌").then(() =>
    {
        message.channel.send("❌ _**Hasło musi posiadać dokładnie 7 znaków!**_ ❌");
    })
    message.delete();
    let customEmbed = new Discord.RichEmbed()
    .setColor("#008ae6")
    .setTitle("__**POWIADOMIENIE O NOWEJ GRZE**__")
    .addField("Hasło:", `**${pass}**`)
    .addField("Tryb Gry:", `**${mode}**`)
    .addField("Zasady:", zasady1 + `\n`+ zasady2 + `\n`+ zasady3)
    .setTimestamp(message.createdAt)
    .setFooter("Kliknij reakcje jeśli grasz", "https://i.imgur.com/g10ycEV.png");
    message.channel.send(customEmbed).then(function (message) {
        message.react(check)
    })
}

module.exports.help = {
    name: "late"
}
