const Discord=require('discord.js');
const bot=new Discord.Client();
const mysql = require('mysql');
const config=require('./config.json');

bot.login( config.token );

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
    const logChannel = newMember.guild.channels.get(config.logChannel);
    const upgradeRules = newMember.guild.channels.get("605505155030319110");

    if( newMember.roles.has( config.verifiedRole ) ) {
        upgradeChannel.send( newMember + " you've been verified, please type \"`upgrade`\" in this channel to view the subscription options. If you have questions about the subscription process please check out " + upgradeRules + " Thank you so much for the support!");
        logChannel.send( `Yay, ${newMember} was verified.`);
    }
});