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

  let embed = new Discord.RichEmbed()
  .setTitle( "Welcome!" )
  .setAuthor( client.user.username, client.user.avatarURL)
  .setColor("#FF8000")
  .setDescription( `Hi ${member}! Welcome to Boston PoGo! Please be sure to checkout ${readmeChannel} for the rules of the server and the verification process. Once you’re ready, please post your verification screenshots and acknowledgement here.` )
  .setFooter( "Boston PoGo Map", null);

  // Send the message, mentioning the member
  welcomeChannel.send({embed});
});

bot.on( 'guildMemberUpdate', ( oldMember, newMember ) => {
    const upgradeChannel = newMember.guild.channels.get(config.upgradeChannel);
    const logChannel = newMember.guild.channels.get(config.logChannel);
    const upgradeRules = newMember.guild.channels.get(config.upgradeRulesChannel);

    let embed = new Discord.RichEmbed()
    .setTitle( "Verification Complete" )
    .setAuthor( client.user.username, client.user.avatarURL)
    .setColor("#FF8000")
    .setDescription( newMember + " you've been verified, please type \"`upgrade`\" in this channel to view the subscription options. If you have questions about the subscription process please check out " + upgradeRules + " Thank you so much for the support!" )
    .setFooter( "Boston PoGo Map", null);
   
    if( newMember.roles.has( config.verifiedRole ) && ! oldMember.roles.has( config.verifiedRole ) ) {
        upgradeChannel.send({embed});
        logChannel.send( `Yay, ${newMember} was verified.`);
    }
});