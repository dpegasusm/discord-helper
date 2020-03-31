const Discord=require('discord.js');
const bot=new Discord.Client();
const mysql = require('mysql');
const ontime = require('ontime');
const config=require('./config.json');
                    
bot.login( config.token );

bot.on('ready',  async () => {
    console.log( "Bot Ready for action." );
});

/** 
CREATE TABLE `free_trial` (
  `discord_id` VARCHAR(50) NOT NULL,
  `start_date` DATETIME NULL,
  `end_date` DATETIME NULL,
  PRIMARY KEY (`discord_id`),
  UNIQUE INDEX `discord_id_UNIQUE` (`discord_id` ASC));
*/

async function GetFreeTrial(database, discord_id) {
    return await new Promise(function(resolve) {
        let connection = mysql.createConnection(database);
    
        connection.connect(async function(error) {
            if(error) {
                console.log( "Error connecting to SQL: " + error.stack );
                connection.end();
                return resolve(false);
            }
    
            let sqlQuery = "SELECT * FROM "+database.database+".free_trial WHERE discord_id = '"+discord_id+"' AND end_date < NOW();";

            connection.query( sqlQuery, async function(error, results) {
                if(error) { 
                    console.log( "Error connecting to SQL: " + error.stack );
                    connection.end();
                    return resolve(false);
                }

                if ( 0 === results.length ) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }

            });
    
            connection.end();
        });
    });
}

async function SetFreeTrial(database, discord_id)
{
    return await new Promise(function(resolve) {
        let connection = mysql.createConnection(database);
    
        connection.connect(async function(error) {
            if(error) {
                console.log("Error connecting to SQL: "+error.stack);
                connection.end();
                return resolve(false);
            }
    
            let sqlQuery = "INSERT INTO "+database.database+".free_trial (discord_id,start_date,end_date) VALUES ('"+discord_id+"',NOW(), NOW() + INTERVAL "+config.trialDays+" DAY );";

            connection.query(sqlQuery, async function(error, results) {
				if(error) { 
                    console.log("Error adding user to DB");
                    return resolve(false);
                }

				return resolve(true);
			});
    
            connection.end();
        });
    });
}

ontime({
	cycle:[config.remindTime]
}, async function(ot) {
	await outputDailyReminders( config );
	return ot.done();
});

// remove the free trial at the remove time.
ontime({
	cycle:[config.trialRemoveTime]
}, async function(ot) {
	await RemoveFreeTrials( config );
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

bot.on( 'guildMemberUpdate', async ( oldMember, newMember ) => {
    const upgradeChannel = bot.channels.get(config.upgradeChannel);
    const logChannel = bot.channels.get(config.logChannel);
    const upgradeRules = bot.channels.get(config.upgradeRulesChannel);
    const rotomSupport = bot.channels.get(config.rotomSupportChannel);
    const rotomChannel = bot.channels.get(config.rotomChannel);
    const rotomPlusChannel = bot.channels.get(config.rotomPlusChannel);
    let addTrial = false;

    if( newMember.roles.has( config.verifiedRole ) && ! oldMember.roles.has( config.verifiedRole ) ) {
        upgradeChannel.send( newMember + " you've been verified, please type \"`upgrade`\" in this channel to view the subscription options. If you have questions about the subscription process please check out " + upgradeRules + " Thank you so much for the support!" );
        logChannel.send( `${newMember} was verified.` );
        addTrial = true;
    }

    if( ( newMember.roles.has( config.trialRole ) && ! oldMember.roles.has( config.trialRole ) ) || addTrial === true ) {
        // add free trial role if database says its not already there
        let trialEligible = await GetFreeTrial( config.sqlConnection, newMember.id );

        if ( trialEligible === true ) {

            let freeTrialSet = await SetFreeTrial( config.sqlConnection, newMember.id );

            if( freeTrialSet ) { 
                // Add the role!
                newMember.addRole( config.trialRole ).catch(console.error);

                // send removal notice
                bot.channels.get( config.upgradeChannel ).send( "A free trial has been added to your account." );
            } else {
                // Add the role!
                if( newMember.roles.has(config.trialRole) ) {
                    newMember.removeRole(config.trialRole).catch(console.error);
                }

                bot.channels.get( config.upgradeChannel ).send( "Looks like you already had a free trial and cannot add another." ); 
            }
        } else {
            // remove trial
            if( newMember.roles.has(trialRole) ) {
                newMember.removeRole( config.trialRole ).catch(console.error);
            }

            // send removal notice
            bot.channels.get( config.upgradeChannel ).send( "Looks like you already had a trial. This command cannot be used to add another one." );
        }
    }

    if( newMember.roles.has( config.collectorRole ) && ! oldMember.roles.has( config.collectorRole ) ) {
        rotomChannel.send( newMember + " thanks for upgrading to collector, please type \"`!rotom`\" in this channel to set up personalized direct notifications about spawns, raids and quests in your area. If you have questions please check out out " + rotomSupport + " or type \"`?rotomhelp`\" in the support channel or DM Rotom \"`!help`\" for command lists." );
        logChannel.send( `${newMember} was upgraded to Collector.` );
    }

    if( newMember.roles.has( config.aceRole ) && ! oldMember.roles.has( config.aceRole ) ) {
        rotomPlusChannel.send( newMember + " thanks for upgrading to ace trainer, please type \"`$rotom2`\" in this channel to set up personalized direct notifications about spawns, raids and quests in your area. If you have questions please check out out " + rotomSupport + " or type \"`?rotomhelp`\" in the support channel or DM Rotom++ \"`$help`\" for command lists." );
        logChannel.send( `${newMember} was upgraded to Ace Trainer.` );
    }
});

// Remove the free trials from members whose time has expired.
async function RemoveFreeTrials( config ) {
	return await new Promise( function( resolve ) {

        let trialMembers = bot.guilds.get( config.guild ).members.filter(member => { 
            if ( member.roles.has( config.trialRole ) ) {
                return false;
            } else {
                return true;
            }
        }).map(member => {
            return member;
        });

        for ( const member of trialMembers ) {
            //let trialEligible = await GetFreeTrial( config.sqlConnection, member.id );

            if ( false === trialEligible ) {
                // remove trial
                member.removeRole(config.trialRole).catch(console.error);

                // send removal notice
                bot.channels.get( config.welcomeChannel ).send( newMember + "Unfortunately it looks as tho your trial perios is over. You can subscribe in the " + upgradeChannel + " if you wish to continue." );
            }
        }

        return resolve(true);
	});
}

async function outputDailyReminders( config ) {
	return await new Promise( function( resolve ) {

        let unverifiedMembers = bot.guilds.get( config.guild ).members.filter(member => { 
            if ( member.roles.has( config.verifiedRole ) ) {
                return false;
            } else {
                return true;
            }
        }).map(member => {
            return member;
        });

        for ( const member of unverifiedMembers ) {
            randomMessage = getReminder( member );
            bot.channels.get( config.welcomeChannel ).send( randomMessage );
        }

        return resolve(true);
	});
}

function getReminder( member ) {
    let reminders = [
        `Hey ${member}, are you even verified? I can do this all day. Verify and I'll stop nagging.`,
        `Hey ${member}, you're missing out on new hundo spawns every hour, get verified today!`,
        `Hey ${member}. you have 7 days to verify until I kick you out. Don't make me be a naughty bot.`,
        `Hey ${member}, looks like you're still not verified. Verification is awesome. you should do it right away.`,
        `Hey ${member}, it's me again, your friendly bot, Patrat. I think you should verify.`            
    ];	
    
    return reminders[ Math.floor( Math.random()*reminders.length ) ];
}

// allow a message responder
bot.on("message", async (message) => {
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
        
        case "freetrial" :
            // get role by ID
            let trialRole = message.guild.roles.get(config.trialRole);

            if( message.member.roles.has(trialRole.id) ) {
                return message.reply( "Looks like you aleady have a free trial ongoing." );
            } else {
    
                // add free trial role if database says its not already there
                let trialEligible = await GetFreeTrial( config.sqlConnection, message.member.id );
        
                if ( true == trialEligible ) {
                    let freeTrialSet = await SetFreeTrial( config.sqlConnection, message.member.id );

                    if( freeTrialSet ) { 
                        // Add the role!
                        message.member.addRole(trialRole).catch(console.error);
                        // send removal notice
                        return message.reply( "A free trial has been added to your account." );
                    } else {
                        // Add the role!
                        if( message.member.roles.has(trialRole) ) {
                            message.member.removeRole(trialRole).catch(console.error);
                        }
                        return message.reply( "Looks like you already had a free trial and cannot add another." ); 
                    }
        
                } else {        
                    // send removal notice
                    if( message.member.roles.has(trialRole) ) {
                        message.member.removeRole(trialRole).catch(console.error);
                    }
                    return message.reply( "Looks like you already had a trial. This command cannot be used to add another one." );
                }
            }

            break;
    }
});