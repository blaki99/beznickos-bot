const Discord = require("discord.js");

module.exports.run = async (blaki, message, args) => {

    let Szefuncio = message.guild.roles.find("name", "SZEFUNCIO 🎓");

    let pass = (args[0]);
    let mode = args.slice(1).join(' ')
    let everyone = message.guild.defaultRole;
    const zasady0 = "***» WALCZYMY OD ZAMKNIĘCIA 2 STREFY JAK JEST 70+ OSÓB LUB JAK SIĘ POJAWI STORM SURGE!***"
    const zasady1 = "***» WALCZYMY OD ZAMKNIĘCIA SIĘ 3 STREFY JAK JEST 55-70 OSÓB !***"
    const zasady2 = "***» MNIEJ NIŻ 55 OSÓB WALCZYMY OD ZAMKNIĘCIA SIĘ 4 STREFY !***"
    const zasady3 = "***» NIE LATAJ NA PODIUM I NIE BIEGAJ ZA BEZNICKOSEM BO ZGINIESZ !***"
    const zasady4 = "***» NIE BIJEMY SIĘ NA PIERWSZYCH MIEJSCÓWKACH !***"
    const check = '579026088487813160'

    if(!message.member.roles.has(Szefuncio.id)) return message.reply("oops");
    if(!args[0]) return message.channel.send("❌ _Wprowadź prawidłowe wartości, **b!late hasło tryb**_ ❌").then(() =>
    {
        message.channel.send("❌ _**Hasło musi posiadać dokładnie 7 znaków!**_ ❌");
    })
    message.delete();
    let customEmbed = new Discord.RichEmbed()
    .setColor("#b7dd80")
    .setTitle("__**POWIADOMIENIE O NOWEJ GRZE**__")
    .addField("**Hasło:**", `**${pass}**`)
    .addField("**Tryb Gry:**", `**${mode}**`)
    .addField("**Zasady:**", zasady0 + `\n` +zasady1 + `\n`+ zasady2 + `\n`+ zasady3 + `\n`+ zasady4)
    .setTimestamp(message.createdAt)
    .setFooter("Kliknij reakcje jeśli grasz", "https://i.imgur.com/g10ycEV.png");
    message.channel.send(everyone.toString());
    message.channel.send(customEmbed).then(function (message) {
        message.react(check)
    })
}

module.exports.help = {
    name: "late"
}
