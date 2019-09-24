const Discord=require('discord.js');
const bot=new Discord.Client();
const mysql = require('mysql');
const config=require('./config.json');

bot.login(config.token);

bot.on('ready',  async () => {
});

bot.on('guildMemberAdd', member => {
    member.guild.channels.get(config.welcomeChannel).send("Welcome"); 
});

exports.run = async (client, oldMember, newMember) => {
    const messagechannel = msg.guild.channels.find('name', 'YOUR NAME OF YOUR CHANNEL');
    if (oldMember.roles.size < newMember.roles.size) {
        const embed = new Discord.RichEmbed()
            .setColor('#FE2E2E')
            .setTimestamp()
            .setAuthor('Role added!')
            .addField(`Member:`, `${oldMember.user.tag} (${oldMember.id})`);
        for (const role of newMember.roles.map(x => x.id)) {
            if (!oldMember.roles.has(role)) {
                embed.addField(`Role:`, `${oldMember.guild.roles.get(role).name}`);
            }
        }
        messagechannel.send({
            embed
        });
    }
}