const Discord=require('discord.js');
const bot=new Discord.Client();
// const mysql = require('mysql');
const ontime = require('ontime');
const config=require('./config.json');
                    
bot.login( config.token );

bot.on('ready',  async () => {
    console.log( "Bot Ready for action." );
});

ontime({
	cycle:[config.remindTime]
}, async function(ot) {
	await outputDailyReminders( config );
	return ot.done();
});

bot.on( 'guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const welcomeChannel = bot.channels.get( config.welcomeChannel );
  const readmeChannel = bot.channels.get(config.readmeChannel);

  // Do nothing if the channel wasn't found on this server
  if (!welcomeChannel) return;
  // Send the message, mentioning the member
  welcomeChannel.send( `Hi ${member}! Welcome to Boston PoGo! Please be sure to checkout ${readmeChannel} for the rules of the server and the verification process. Once you’re ready, please post your verification screenshots and acknowledgement here.` );
});

bot.on( 'guildMemberUpdate', ( oldMember, newMember ) => {
    const upgradeChannel = bot.channels.get(config.upgradeChannel);
    const logChannel = bot.channels.get(config.logChannel);
    const upgradeRules = bot.channels.get(config.upgradeRulesChannel);
    const rotomSupport = bot.channels.get(config.rotomSupportChannel);
    const rotomChannel = bot.channels.get(config.rotomChannel);
    const rotomPlusChannel = bot.channels.get(config.rotomPlusChannel);

    if( newMember.roles.has( config.verifiedRole ) && ! oldMember.roles.has( config.verifiedRole ) ) {
        upgradeChannel.send( newMember + " you've been verified, please type \"`upgrade`\" in this channel to view the subscription options. If you have questions about the subscription process please check out " + upgradeRules + " Thank you so much for the support!" );
        logChannel.send( `${newMember} was verified.` );
    }

    if( newMember.roles.has( config.collectorRole ) && ! oldMember.roles.has( config.collectorRole ) ) {
        rotomChannel.send( newMember + " thanks for upgrading to collector, please type \"`!rotom`\" in this channel to set up personalized direct notifications about spawns, raids and quests in your area. If you have questions please check out out " + rotomSupport + " or type \"`?rotomhelp`\" in the support channel or DM Rotom \"`!help`\" for command lists." );
        logChannel.send( `${newMember} was upgraded to Collector.` );
    }

    if( newMember.roles.has( config.aceRole ) && ! oldMember.roles.has( config.aceRole ) ) {
        rotomPlusChannel.send( newMember + " thanks for upgrading to ace trainer, please type \"`$rotom`\" in this channel to set up personalized direct notifications about spawns, raids and quests in your area. If you have questions please check out out " + rotomSupport + " or type \"`?rotomhelp`\" in the support channel or DM Rotom \"`!help`\" for command lists." );
        logChannel.send( `${newMember} was upgraded to Ace Trainer.` );
    }
});

async function outputDailyReminders( config ) {
	return await new Promise( function( resolve ) {

        let unverifiedMembers = bot.members.filter(member => { 
            return ! member.roles.find( "name", config.verifiedRole );
        }).map(member => {
            return member.user.username;
        });

        for ( const name of unverifiedMembers ) {
            randomMessage = getReminder( name );
            bot.channels.get( config.welcomeChannel ).send( randomMessage );
        }

        return resolve(true);
	});
}

function getReminder( name ) {
    let reminders = [
        `Hey ${name}, are you even verified? I can do this all day. Verify and I'll stop nagging.`,
        `Hey ${name}, you're missing out on new hundo spawns every hour, get verified today!`,
        `Hey ${name}. you have 7 days to verify until I kick you out. Don't make me be a naughty bot.`,
        `Hey ${name}, looks like you're still not verified. Verification is awesome. you should do it right away.`,
        `Hey ${name}, it's me again, your friendly bot, Patrat. I think you should verify.`            
    ];	
    
    return reminders[ Math.floor( Math.random()*reminders.length ) ];
}