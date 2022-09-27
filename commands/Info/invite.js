const {
	MessageEmbed, MessageButton, MessageActionRow
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const { handlemsg } = require(`${process.cwd()}/handlers/functions`)
module.exports = {
  name: "invite",
  category: "🔰 Info",
  aliases: ["add"],
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      let user = message.mentions.users.first() || client.user;
      if(user) {
        if(!user.bot) return interaction?.reply({ephemeral: true, content: "<a:crossmark:1024362593621651476> **That's An Human User, You Can't Forcefully Join Someone To Your Server**"})
        
        
        let button_invite = new MessageButton().setStyle('LINK').setLabel("Button Under Test").setURL(`https://discord.com`)
        //array of all buttons
             const allbuttons = [new MessageActionRow().addComponents([ button_invite])]
        message.reply({ 
          embeds: [new MessageEmbed()
            .setColor("#2F3136")
            .setTitle(`Invite **${user.tag}**`)
            .setDescription(`Well That's Understandable!\nYou Wanted To Invite This Bot But In Simple This Bot Is Under Development And Will Get Ready Soon`)],
          components: allbuttons
        });
      }
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.getFooter(es))
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
      ]});
    }
  }
}