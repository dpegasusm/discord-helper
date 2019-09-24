const Discord=require('discord.js');
const bot=new Discord.Client();
const mysql = require('mysql');
const config=require('./config.json');

bot.login(config.token);

bot.on('ready',  async () => {
    console.log("Bot Ready for action.");
});

bot.on( 'guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const welcomeChannel = member.guild.channels.get( config.welcomeChannel );
  // Do nothing if the channel wasn't found on this server
  if (!welcomeChannel) return;
  // Send the message, mentioning the member
  welcomeChannel.send(`Welcome to the server, ${member}`);
});

bot.on( 'guildMemberUpdate', ( oldMember, newMember ) => {
    const upgradeChannel = newMember.guild.channels.get(config.upgradeChannel);

    if( newMember.roles.has( config.verifiedRole ) ) {
        console.log(`Yay, member has the role!`);
    } else {
        console.log(`Nope, noppers, nadda.`);
    }
    /*
    const embed = new Discord.RichEmbed()
        .setColor('#FE2E2E')
        .setTimestamp()
        .setAuthor('Role added!')
        .addField(`Member:`, `${oldMember.user.tag} (${oldMember.id})`);
        
    upgradeChannel.send({
        embed
    });
    */
});