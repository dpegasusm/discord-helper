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
        logChannel.send( `Yay, ${newMember} was verified.` );
    }
});

bot.on("message", (message) => {
    // Messages need to be prefixed.
    if (!message.content.startsWith( config.prefix ) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    switch (command) {
        case "rotomhelp" :
            message.channel.send({embed: {
                color: 3447003,
                author: {
                name: 'Rotom',
                icon_url: "https://cdn.discordapp.com/avatars/605111494408929280/3589dadf593215dca78b05ea2942dc96.png?size=256"
                },
                title: "Rotom Support Commands",
                description: `**!help**
                !help sends instructions on some basic commands 
                
                **!rotom**
                !rotom is the command to register for alarms.
                This is available in a designated channel set by the admin.
                Once you successfully register, the bot will send you a DM with a greeting message
                
                **!stop**
                !stop Temporarily stops alarms
                
                **!start**
                !start Restarts alarms if they were stopped
                
                **!unregister**
                !unregister Deletes all users tracking information. After !unregistering, you would need to register again with !rotom before new alarms.
                
                **!location**
                !location Tallinn kesklinn for example, would register a users's location to 59.42685179999999,24.7595564
                Instead of "Tallinn kesklinn" you can search for any address, city, country or known area available in google or specify a Latitude and Longitude.
                
                **!area add**
                !area add Tallinn If the admin has set up a Geofence name Tallinn, this command will add tracking from that area to the user.
                In case the area is not configured, the bot will reply with the areas that are available.
                You can also use multiple areas in the same command (separated by spaces) and only available ones will be added.
                
                **!area remove**
                !area remove Tallinn Removes Tallinn from tracked areas if configured and currently tracked. You can also use multiple areas in the same command (separated by spaces) and only available ones will be removed.
                
                **!area list**
                !area list lists the possible areas you can add.
                
                **!tracked**
                !tracked Shows a details list of Monsters, Raids, Eggs and quests user is tracking. Should the message exceed 6000 charecters, it will be uploaded into hastebin and a link will be sent to user. If hastebin is down (like it often is), the bot will create a temporary file and upload it to discord as a reply.
                
                See #rotom-support for more.`,
                timestamp: new Date(),
                footer: {
                text: "Boston Pogo"
                }
              }
            });
            break;
    }
});