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
  const readmeChannel = member.guild.channels.get(config.readmeChannel);

  // Do nothing if the channel wasn't found on this server
  if (!welcomeChannel) return;
  // Send the message, mentioning the member
  welcomeChannel.send( `Hi ${member}! Welcome to Boston PoGo! Please be sure to checkout ${readmeChannel} for the rules of the server and the verification process. Once you’re ready, please post your verification screenshots and acknowledgement here.` );
});

bot.on( 'guildMemberUpdate', ( oldMember, newMember ) => {
    const upgradeChannel = newMember.guild.channels.get(config.upgradeChannel);
    const logChannel = newMember.guild.channels.get(config.logChannel);
    const upgradeRules = newMember.guild.channels.get(config.upgradeRulesChannel);

    if( newMember.roles.has( config.verifiedRole ) && ! oldMember.roles.has( config.verifiedRole ) ) {
        upgradeChannel.send( newMember + " you've been verified, please type \"`upgrade`\" in this channel to view the subscription options. If you have questions about the subscription process please check out " + upgradeRules + " Thank you so much for the support!" );
        logChannel.send( `${newMember} was verified.` );
    }

    if( newMember.roles.has( config.collectorRole ) && ! oldMember.roles.has( config.collectorRole ) ) {
        rotomChannel.send( newMember + " thanks for upgrading to collector, please type \"`!rotom`\" in this channel to set up personalized direct notifications about spawns, raids and quests in your area. If you have questions please check out out " + rotomSupport + " or type \"`?rotomhelp`\" or \"`!help`\" for command lists." );
        logChannel.send( `${newMember} was upgraded to Collector.` );
    }

    if( newMember.roles.has( config.aceRole ) && ! oldMember.roles.has( config.aceRole ) ) {
        rotomPlusChannel.send( newMember + " you've been verified, please type \"`upgrade`\" in this channel to view the subscription options. If you have questions about the subscription process please check out " + upgradeRules + " Thank you so much for the support!" );
        logChannel.send( `${newMember} was upgraded to Ace Trainer.` );
    }
});