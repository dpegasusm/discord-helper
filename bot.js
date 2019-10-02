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
        rotomChannel.send( newMember + " thanks for upgrading to collector, please type \"`!rotom`\" in this channel to set up personalized direct notifications about spawns, raids and quests in your area. If you have questions please check out out " + rotomSupport + " or type \"`?rotomhelp`\" or \"`!help`\" in the support channel for command lists." );
        logChannel.send( `${newMember} was upgraded to Collector.` );
    }

    if( newMember.roles.has( config.aceRole ) && ! oldMember.roles.has( config.aceRole ) ) {
        rotomPlusChannel.send( newMember + " thanks for upgrading to ace trainer, please type \"`$rotom`\" in this channel to set up personalized direct notifications about spawns, raids and quests in your area. If you have questions please check out out " + rotomSupport + " or type \"`?rotomhelp`\" or \"`!help`\" in the support channel for command lists." );
        logChannel.send( `${newMember} was upgraded to Ace Trainer.` );
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
        case "populatepvpgreat" :
 
                
                
                
                break;
        case "populatepvpultra" :
            rotomPVPUltraChannel.send( `` );










            break;
    }
});

let great = ARRAY(
    '$track Bulbasaur Ivysaur atk0 maxatk0 def13 maxdef13 sta14 maxsta14 maxlevel38',
    '$track Bulbasaur Ivysaur Venusaur atk0 maxatk0 def14 maxdef14 sta11 maxsta11 maxlevel21',
    '$track Charmander Charmeleon Charizard atk0 maxatk0 def15 maxdef15 sta13 maxsta13 maxlevel19',
    '$track Squirtle Wartortle Blastoise atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel23',
    '$track Caterpie Metapod Butterfree atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel33',
    '$track Weedle Kakuna Beedrill atk0 maxatk0 def13 maxdef13 sta14 maxsta14 maxlevel32',
    '$track Pidgey Pidgeotto Pidgeot atk0 maxatk0 def14 maxdef14 sta14 maxsta14 maxlevel27',
    '$track Rattata Raticate atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel36',
    '$track rattata formalola atk0 maxatk0 def13 maxdef13 sta14 maxsta14 maxlevel39',
    '$track Spearow Fearow atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel28',
    '$track Ekans Arbok atk0 maxatk0 def11 maxdef11 sta14 maxsta14 maxlevel30',
    '$track Pikachu Raichu atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel26',
    '$track raichu formalola atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel24',
    '$track Sandshrew Sandslash atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel24',
    '$track Sandshrew formalola atk0 maxatk0 def14 maxdef14 sta14 maxsta14 maxlevel23',
    '$track Nidoran-f Nidorina Nidoqueen atk0 maxatk0 def15 maxdef15 sta12 maxsta12 maxlevel23',
    '$track Nidoran-m Nidorino Nidoking atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel22',
    '$track Clefairy Clefable atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel23',
    '$track Vulpix Ninetales atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel25',
    '$track vulpix formalola atk0 maxatk0 def14 maxdef14 sta12 maxsta12 maxlevel25',
    '$track Jigglypuff Wigglytuff atk0 maxatk0 def15 maxdef15 sta12 maxsta12 maxlevel30',
    '$track Zubat Golbat atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel29',
    '$track Oddish Gloom atk0 maxatk0 def12 maxdef12 sta14 maxsta14 maxlevel39',
    '$track Oddish Gloom Vileplume atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel22',
    '$track Paras Parasect atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel32',
    '$track Venonat Venomoth atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel27',
    '$track Diglett Dugtrio atk7 maxatk7 def15 maxdef15 sta15 maxsta15 maxlevel40',
    '$track diglett formalola atk0 maxatk0 def12 maxdef12 sta15 maxsta15 maxlevel30',
    '$track Meowth Persian atk0 maxatk0 def14 maxdef14 sta13 maxsta13 maxlevel39',
    '$track meowth formalola atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel34',
    '$track Psyduck Golduck atk0 maxatk0 def10 maxdef10 sta14 maxsta14 maxlevel23',
    '$track Mankey Primeape atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel24',
    '$track Growlithe Arcanine atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel18',
    '$track Poliwag Poliwhirl Poliwrath atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel22',
    '$track Abra Kadabra atk2 maxatk2 def15 maxdef15 sta14 maxsta14 maxlevel27',
    '$track Abra Kadabra Alakazam atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel18',
    '$track Machop Machoke atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel28',
    '$track Machop Machoke Machamp atk0 maxatk0 def14 maxdef14 sta11 maxsta11 maxlevel18',
    '$track Bellsprout Weepinbell atk2 maxatk2 def15 maxdef15 sta15 maxsta15 maxlevel40',
    '$track Bellsprout Weepinbell Victreebel atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel23',
    '$track Tentacool Tentacruel atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel23',
    '$track Geodude Graveler atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel30',
    '$track geodude formalola atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel30',
    '$track Geodude Graveler Golem atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel19',
    '$track geodude formalola atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel19',
    '$track Ponyta Rapidash atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel23',
    '$track Slowpoke Slowbro atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel22',
    '$track Magnemite Magneton atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel22',
    '$track Doduo Dodrio atk0 maxatk0 def12 maxdef12 sta15 maxsta15 maxlevel24',
    '$track Seel Dewgong atk0 maxatk0 def12 maxdef12 sta15 maxsta15 maxlevel29',
    '$track Grimer Muk atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel20',
    '$track muk formalola atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel20',
    '$track Shellder Cloyster atk0 maxatk0 def13 maxdef13 sta13 maxsta13 maxlevel22',
    '$track Gastly Haunter atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel28',
    '$track Gastly Haunter Gengar atk0 maxatk0 def13 maxdef13 sta13 maxsta13 maxlevel19',
    '$track Drowzee Hypno atk0 maxatk0 def13 maxdef13 sta13 maxsta13 maxlevel28',
    '$track Krabby Kingler atk0 maxatk0 def9 maxdef9 sta15 maxsta15 maxlevel20',
    '$track Voltorb Electrode atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel27',
    '$track Exeggcute Exeggutor atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel18',
    '$track exeggutor formalola atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel18',
    '$track Cubone Marowak atk0 maxatk0 def14 maxdef14 sta14 maxsta14 maxlevel33',
    '$track marowak formalola atk0 maxatk0 def14 maxdef14 sta14 maxsta14 maxlevel33',
    '$track Hitmonlee atk2 maxatk2 def15 maxdef15 sta15 maxsta15 maxlevel21',
    '$track Hitmonchan atk0 maxatk0 def11 maxdef11 sta15 maxsta15 maxlevel24',
    '$track Koffing Weezing atk0 maxatk0 def14 maxdef14 sta14 maxsta14 maxlevel25',
    '$track Rhyhorn atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel40',
    '$track Rhyhorn Rhydon atk2 maxatk2 def15 maxdef15 sta14 maxsta14 maxlevel17',
    '$track Tangela atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel25',
    '$track Kangaskhan atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel22',
    '$track Horsea Seadra atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel27',
    '$track Goldeen Seaking atk0 maxatk0 def14 maxdef14 sta14 maxsta14 maxlevel26',
    '$track Staryu Starmie atk0 maxatk0 def15 maxdef15 sta11 maxsta11 maxlevel22',
    '$track Mr-Mime atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel25',
    '$track Scyther atk0 maxatk0 def14 maxdef14 sta11 maxsta11 maxlevel21',
    '$track Jynx atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel22',
    '$track Electabuzz atk0 maxatk0 def14 maxdef14 sta11 maxsta11 maxlevel24',
    '$track Magmar atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel23',
    '$track Pinsir atk0 maxatk0 def13 maxdef13 sta14 maxsta14 maxlevel19',
    '$track Tauros atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel21',
    '$track Magikarp Gyarados atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel16',
    '$track Lapras atk0 maxatk0 def10 maxdef10 sta14 maxsta14 maxlevel22',
    '$track Eevee Vaporeon atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel18',
    '$track Eevee Jolteon atk0 maxatk0 def12 maxdef12 sta15 maxsta15 maxlevel19',
    '$track Eevee Flareon atk0 maxatk0 def15 maxdef15 sta13 maxsta13 maxlevel18',
    '$track Porygon atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel37',
    '$track Omanyte Omastar atk0 maxatk0 def9 maxdef9 sta15 maxsta15 maxlevel20',
    '$track Kabuto Kabutops atk0 maxatk0 def14 maxdef14 sta10 maxsta10 maxlevel21',
    '$track Aerodactyl atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel20',
    '$track Snorlax atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel17',
    '$track Articuno atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel18',
    '$track Zapdos atk0 maxatk0 def12 maxdef12 sta12 maxsta12 maxlevel16',
    '$track Moltres atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel16',
    '$track Dratini Dragonair atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel34',
    '$track Dratini Dragonair Dragonite atk3 maxatk3 def15 maxdef15 sta14 maxsta14 maxlevel14',
    '$track Mewtwo atk4 maxatk4 def15 maxdef15 sta15 maxsta15 maxlevel13',
    '$track Mew atk0 maxatk0 def10 maxdef10 sta13 maxsta13 maxlevel17',
    '$track Chikorita Bayleef Meganium atk0 maxatk0 def10 maxdef10 sta15 maxsta15 maxlevel24',
    '$track Cyndaquil Quilava Typhlosion atk0 maxatk0 def15 maxdef15 sta13 maxsta13 maxlevel19',
    '$track Totodile Croconaw Feraligatr atk0 maxatk0 def11 maxdef11 sta13 maxsta13 maxlevel20',
    '$track Sentret Furret atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel35',
    '$track Hoothoot Noctowl atk1 maxatk1 def14 maxdef14 sta15 maxsta15 maxlevel28',
    '$track Spinarak Ariados atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel35',
    '$track Zubat Golbat Crobat atk0 maxatk0 def15 maxdef15 sta12 maxsta12 maxlevel21',
    '$track Chinchou Lanturn atk0 maxatk0 def13 maxdef13 sta14 maxsta14 maxlevel28',
    '$track Togetic atk0 maxatk0 def14 maxdef14 sta14 maxsta14 maxlevel38',
    '$track Natu Xatu atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel26',
    '$track Mareep Flaaffy atk12 maxatk12 def15 maxdef15 sta15 maxsta15 maxlevel40',
    '$track Mareep Flaaffy Ampharos atk0 maxatk0 def13 maxdef13 sta11 maxsta11 maxlevel20',
    '$track Oddish Gloom Bellossom atk1 maxatk1 def14 maxdef14 sta14 maxsta14 maxlevel25',
    '$track Marill Azumarill atk8 maxatk8 def15 maxdef15 sta15 maxsta15 maxlevel40',
    '$track Sudowoodo atk0 maxatk0 def14 maxdef14 sta11 maxsta11 maxlevel27',
    '$track Poliwag Poliwhirl Politoed atk0 maxatk0 def15 maxdef15 sta11 maxsta11 maxlevel23',
    '$track Hoppip Skiploom Jumpluff atk4 maxatk4 def15 maxdef15 sta14 maxsta14 maxlevel40',
    '$track Sunkern Sunflora atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel26',
    '$track Wooper Quagsire atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel29',
    '$track Eevee Espeon atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel17',
    '$track Eevee Umbreon atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel27',
    '$track Murkrow atk7 maxatk7 def15 maxdef15 sta15 maxsta15 maxlevel40',
    '$track Slowpoke Slowking atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel22',
    '$track Misdreavus atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel29',
    '$track Girafarig atk0 maxatk0 def15 maxdef15 sta12 maxsta12 maxlevel28',
    '$track Pineco Forretress atk0 maxatk0 def9 maxdef9 sta15 maxsta15 maxlevel25',
    '$track Dunsparce atk0 maxatk0 def14 maxdef14 sta12 maxsta12 maxlevel40',
    '$track Gligar atk0 maxatk0 def15 maxdef15 sta12 maxsta12 maxlevel33',
    '$track Onix Steelix atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel24',
    '$track Snubbull Granbull atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel22',
    '$track Qwilfish atk0 maxatk0 def12 maxdef12 sta14 maxsta14 maxlevel28',
    '$track Scyther Scizor atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel18',
    '$track Heracross atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel18',
    '$track Sneasel atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel27',
    '$track Teddiursa Ursaring atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel19',
    '$track Slugma Magcargo atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel38',
    '$track Swinub Piloswine atk0 maxatk0 def15 maxdef15 sta10 maxsta10 maxlevel24',
    '$track Remoraid Octillery atk0 maxatk0 def15 maxdef15 sta13 maxsta13 maxlevel24',
    '$track Mantine atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel27',
    '$track Skarmory atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel27',
    '$track Houndour Houndoom atk0 maxatk0 def13 maxdef13 sta13 maxsta13 maxlevel21',
    '$track Horsea Seadra Kingdra atk0 maxatk0 def15 maxdef15 sta13 maxsta13 maxlevel21',
    '$track Phanpy Donphan atk0 maxatk0 def14 maxdef14 sta8 maxsta8 maxlevel19',
    '$track Porygon Porygon2 atk0 maxatk0 def12 maxdef12 sta15 maxsta15 maxlevel21',
    '$track Stantler atk0 maxatk0 def11 maxdef11 sta15 maxsta15 maxlevel26',
    '$track Hitmontop atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel26',
    '$track Miltank atk0 maxatk0 def14 maxdef14 sta14 maxsta14 maxlevel24',
    '$track Chansey Blissey atk0 maxatk0 def15 maxdef15 sta3 maxsta3 maxlevel21',
    '$track Raikou atk3 maxatk3 def15 maxdef15 sta14 maxsta14 maxlevel16',
    '$track Entei atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel16',
    '$track Suicune atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel19',
    '$track Larvitar Pupitar atk0 maxatk0 def14 maxdef14 sta14 maxsta14 maxlevel35',
    '$track Larvitar Pupitar Tyranitar atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel14',
    '$track Lugia atk0 maxatk0 def11 maxdef11 sta11 maxsta11 maxlevel15',
    '$track Ho-Oh atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel14',
    '$track Celebi atk0 maxatk0 def10 maxdef10 sta13 maxsta13 maxlevel17',
    '$track Treecko Grovyle atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel38',
    '$track Treecko Grovyle Sceptile atk0 maxatk0 def12 maxdef12 sta15 maxsta15 maxlevel20',
    '$track Torchic Combusken atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel39',
    '$track Torchic Combusken Blaziken atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel19',
    '$track Mudkip Marshtomp atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel35',
    '$track Mudkip Marshtomp Swampert atk0 maxatk0 def14 maxdef14 sta14 maxsta14 maxlevel19',
    '$track Poochyena Mightyena atk0 maxatk0 def12 maxdef12 sta14 maxsta14 maxlevel30',
    '$track Zigzagoon Linoone atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel40',
    '$track Wurmple Silcoon Beautifly atk0 maxatk0 def15 maxdef15 sta13 maxsta13 maxlevel34',
    '$track Lotad Lombre Ludicolo atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel24',
    '$track Seedot Nuzleaf Shiftry atk0 maxatk0 def14 maxdef14 sta11 maxsta11 maxlevel24',
    '$track Taillow Swellow atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel29',
    '$track Wingull Pelipper atk0 maxatk0 def12 maxdef12 sta15 maxsta15 maxlevel27',
    '$track Ralts Kirlia Gardevoir atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel18',
    '$track Surskit Masquerain atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel25',
    '$track Shroomish Breloom atk2 maxatk2 def15 maxdef15 sta15 maxsta15 maxlevel21',
    '$track Slakoth Vigoroth atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel29',
    '$track Slakoth Vigoroth Slaking atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel12',
    '$track Nincada Ninjask atk0 maxatk0 def12 maxdef12 sta15 maxsta15 maxlevel29',
    '$track Whismur Loudred Exploud atk0 maxatk0 def15 maxdef15 sta10 maxsta10 maxlevel24',
    '$track Makuhita Hariyama atk0 maxatk0 def14 maxdef14 sta14 maxsta14 maxlevel20',
    '$track Mawile atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel40',
    '$track Aron Lairon atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel28',
    '$track Aron Lairon Aggron atk0 maxatk0 def14 maxdef14 sta12 maxsta12 maxlevel19',
    '$track Electrike Manectric atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel24',
    '$track Plusle atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel34',
    '$track Minun atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel38',
    '$track Volbeat atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel35',
    '$track Illumise atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel35',
    '$track Roselia atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel31',
    '$track Gulpin Swalot atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel29',
    '$track Carvanha Sharpedo atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel25',
    '$track Wailmer Wailord atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel25',
    '$track Numel Camerupt atk0 maxatk0 def14 maxdef14 sta13 maxsta13 maxlevel26',
    '$track Torkoal atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel27',
    '$track Spoink Grumpig atk1 maxatk1 def14 maxdef14 sta15 maxsta15 maxlevel24',
    '$track Trapinch Vibrava Flygon atk0 maxatk0 def15 maxdef15 sta9 maxsta9 maxlevel21',
    '$track Cacnea Cacturne atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel24',
    '$track Swablu Altaria atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel29',
    '$track Zangoose atk0 maxatk0 def15 maxdef15 sta10 maxsta10 maxlevel23',
    '$track Seviper atk0 maxatk0 def14 maxdef14 sta14 maxsta14 maxlevel27',
    '$track Lunatone atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel24',
    '$track Solrock atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel24',
    '$track Barboach Whiscash atk0 maxatk0 def14 maxdef14 sta13 maxsta13 maxlevel28',
    '$track Corphish Crawdaunt atk2 maxatk2 def15 maxdef15 sta14 maxsta14 maxlevel22',
    '$track Baltoy Claydol atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel29',
    '$track Lileep Cradily atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel26',
    '$track Anorith atk11 maxatk11 def15 maxdef15 sta15 maxsta15 maxlevel40',
    '$track Anorith Armaldo atk0 maxatk0 def9 maxdef9 sta15 maxsta15 maxlevel20',
    '$track Feebas Milotic atk0 maxatk0 def15 maxdef15 sta11 maxsta11 maxlevel19',
    '$track Castform atk3 maxatk3 def14 maxdef14 sta15 maxsta15 maxlevel40',
    '$track Kecleon atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel28',
    '$track Shuppet Banette atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel24',
    '$track Duskull Dusclops atk8 maxatk8 def15 maxdef15 sta15 maxsta15 maxlevel39',
    '$track Tropius atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel30',
    '$track Chimecho atk0 maxatk0 def14 maxdef14 sta12 maxsta12 maxlevel25',
    '$track Absol atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel22',
    '$track Snorunt Glalie atk0 maxatk0 def13 maxdef13 sta13 maxsta13 maxlevel27',
    '$track Spheal Sealeo atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel38',
    '$track Spheal Sealeo Walrein atk0 maxatk0 def12 maxdef12 sta15 maxsta15 maxlevel21',
    '$track Clamperl Huntail atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel24',
    '$track Clamperl Gorebyss atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel22',
    '$track Relicanth atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel22',
    '$track Bagon Shelgon atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel28',
    '$track Bagon Shelgon Salamence atk0 maxatk0 def10 maxdef10 sta14 maxsta14 maxlevel15',
    '$track Beldum Metang atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel38',
    '$track Beldum Metang Metagross atk2 maxatk2 def15 maxdef15 sta15 maxsta15 maxlevel14',
    '$track Regirock atk0 maxatk0 def10 maxdef10 sta12 maxsta12 maxlevel18',
    '$track Regice atk0 maxatk0 def10 maxdef10 sta12 maxsta12 maxlevel18',
    '$track Registeel atk0 maxatk0 def8 maxdef8 sta15 maxsta15 maxlevel24',
    '$track Latias atk0 maxatk0 def14 maxdef14 sta14 maxsta14 maxlevel16',
    '$track Latios atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel14',
    '$track Kyogre atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel13',
    '$track Groudon atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel13',
    '$track Rayquaza atk0 maxatk0 def15 maxdef15 sta12 maxsta12 maxlevel14',
    '$track Jirachi atk0 maxatk0 def10 maxdef10 sta13 maxsta13 maxlevel17',
    '$track Turtwig Grotle atk0 maxatk0 def15 maxdef15 sta11 maxsta11 maxlevel31',
    '$track Turtwig Grotle Torterra atk0 maxatk0 def11 maxdef11 sta13 maxsta13 maxlevel19',
    '$track Chimchar Monferno atk7 maxatk7 def15 maxdef15 sta14 maxsta14 maxlevel40',
    '$track Infernape Monferno Infernape atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel21',
    '$track Piplup Prinplup atk0 maxatk0 def15 maxdef15 sta12 maxsta12 maxlevel38',
    '$track Piplup Prinplup Empoleon atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel19',
    '$track Starly Staravia Staraptor atk0 maxatk0 def13 maxdef13 sta13 maxsta13 maxlevel20',
    '$track Bidoof Bibarel atk0 maxatk0 def14 maxdef14 sta13 maxsta13 maxlevel33',
    '$track Kricketot Kricketune atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel39',
    '$track Shinx Luxio Luxray atk0 maxatk0 def15 maxdef15 sta12 maxsta12 maxlevel19',
    '$track Roselia Roserade atk0 maxatk0 def11 maxdef11 sta14 maxsta14 maxlevel19',
    '$track Cranidos atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel31',
    '$track Cranidos Rampardos atk1 maxatk1 def14 maxdef14 sta8 maxsta8 maxlevel17',
    '$track Shieldon Bastiodon atk12 maxatk12 def15 maxdef15 sta15 maxsta15 maxlevel40',
    '$track Burmy formplant atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel35',
    '$track Burmy formsandy atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel35',
    '$track Burmy formtrash atk7 maxatk7 def14 maxdef14 sta15 maxsta15 maxlevel40',
    '$track Burmy male Mothim atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel32',
    '$track Combee female Vespiquen atk0 maxatk0 def14 maxdef14 sta13 maxsta13 maxlevel29',
    '$track Buizel Floatzel atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel23',
    '$track Cherubi Cherrim atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel28',
    '$track Shellos Gastrodon atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel24',
    '$track Aipom Ambipom atk0 maxatk0 def13 maxdef13 sta14 maxsta14 maxlevel23',
    '$track Drifloon Drifblim atk0 maxatk0 def15 maxdef15 sta12 maxsta12 maxlevel24',
    '$track Buneary Lopunny atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel28',
    '$track Misdreavius Mismagius atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel21',
    '$track Murkrow Honchkrow atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel20',
    '$track Glameow Purugly atk0 maxatk0 def12 maxdef12 sta15 maxsta15 maxlevel29',
    '$track Stunky Skuntank atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel24',
    '$track Bronzor Bronzong atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel25',
    '$track Chatot atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel33',
    '$track Spiritomb atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel27',
    '$track Gible Gabite atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel31',
    '$track Gible Gabite Garchomp atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel14',
    '$track Munchlax atk0 maxatk0 def14 maxdef14 sta13 maxsta13 maxlevel32',
    '$track Lucario atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel20',
    '$track Hippopotas Hippowdon atk0 maxatk0 def14 maxdef14 sta10 maxsta10 maxlevel18',
    '$track Skorupi Drapion atk2 maxatk2 def15 maxdef15 sta14 maxsta14 maxlevel23',
    '$track Croagunk Toxicroak atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel22',
    '$track Carnivine atk0 maxatk0 def14 maxdef14 sta13 maxsta13 maxlevel26',
    '$track Finneon Lumineon atk0 maxatk0 def15 maxdef15 sta12 maxsta12 maxlevel34',
    '$track Snover Abomasnow atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel24',
    '$track Sneasel Weavile atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel18',
    '$track Magnemite Magneton Magnezone atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel17',
    '$track Lickitung Lickilicky atk0 maxatk0 def15 maxdef15 sta10 maxsta10 maxlevel23',
    '$track Rhyhorn Rhydon Rhyperior atk0 maxatk0 def14 maxdef14 sta14 maxsta14 maxlevel15',
    '$track Tangela Tangrowth atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel18',
    '$track Electabuzz Electivire atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel18',
    '$track Magmar Magmortar atk0 maxatk0 def10 maxdef10 sta15 maxsta15 maxlevel18',
    '$track Togetic Togekiss atk0 maxatk0 def14 maxdef14 sta11 maxsta11 maxlevel17',
    '$track Yanma Yanmega atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel19',
    '$track Eevee Leafeon atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel19',
    '$track Eevee Glaceon atk0 maxatk0 def15 maxdef15 sta12 maxsta12 maxlevel18',
    '$track Gligar Gliscor atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel21',
    '$track Swinub Pilowsine Mamoswine atk0 maxatk0 def15 maxdef15 sta7 maxsta7 maxlevel17',
    '$track Porygon Porygon-2 Porygon-Z atk1 maxatk1 def15 maxdef15 sta13 maxsta13 maxlevel17',
    '$track Ralts Male Kirlia Gallade atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel18',
    '$track Nosepass Probopass atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel28',
    '$track Duskull Dusclops Dusknoir atk0 maxatk0 def14 maxdef14 sta13 maxsta13 maxlevel24',
    '$track Snorunt female Froslass atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel28',
    '$track Rotom atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel28',
    '$track Uxie atk0 maxatk0 def13 maxdef13 sta13 maxsta13 maxlevel23',
    '$track Mesprit atk0 maxatk0 def15 maxdef15 sta12 maxsta12 maxlevel18',
    '$track Azelf atk0 maxatk0 def14 maxdef14 sta11 maxsta11 maxlevel17',
    '$track Dialga atk0 maxatk0 def13 maxdef13 sta8 maxsta8 maxlevel14',
    '$track Palkia atk0 maxatk0 def14 maxdef14 sta12 maxsta12 maxlevel14',
    '$track Heatran atk0 maxatk0 def14 maxdef14 sta10 maxsta10 maxlevel15',
    '$track Regigigas atk0 maxatk0 def8 maxdef8 sta13 maxsta13 maxlevel13',
    '$track Cresselia atk2 maxatk2 def15 maxdef15 sta13 maxsta13 maxlevel20',
    '$track Phione atk0 maxatk0 def13 maxdef13 sta13 maxsta13 maxlevel27',
    '$track Manaphy atk0 maxatk0 def10 maxdef10 sta13 maxsta13 maxlevel17',
    '$track Darkrai atk0 maxatk0 def10 maxdef10 sta14 maxsta14 maxlevel15',
    '$track Arceus atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel14',
    '$track Victini atk0 maxatk0 def10 maxdef10 sta13 maxsta13 maxlevel17',
    '$track Snivy Servine Serperior atk0 maxatk0 def10 maxdef10 sta15 maxsta15 maxlevel25',
    '$track Tepig Pignite atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel29',
    '$track Tepig Pignite Emboar atk0 maxatk0 def14 maxdef14 sta9 maxsta9 maxlevel19',
    '$track Oshawott Dewott atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel36',
    '$track Oshawott Dewott Samurott atk0 maxatk0 def14 maxdef14 sta14 maxsta14 maxlevel20',
    '$track Patrat Watchog atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel33',
    '$track Lillipup Herdier atk6 maxatk6 def15 maxdef15 sta15 maxsta15 maxlevel40',
    '$track Lillipup Herdier Stoutland atk0 maxatk0 def15 maxdef15 sta13 maxsta13 maxlevel20',
    '$track Purrloin Liepard atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel31',
    '$track Pansage Simisage atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel24',
    '$track Pansear Simisear atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel24',
    '$track Panpour Simipour atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel24',
    '$track Munna Musharna atk0 maxatk0 def12 maxdef12 sta15 maxsta15 maxlevel21',
    '$track Pidove Tranquill Unfezant atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel20',
    '$track Blitzle Zebstrika atk0 maxatk0 def15 maxdef15 sta9 maxsta9 maxlevel23',
    '$track Roggenrola Boldore atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel28',
    '$track Roggenrola Boldore Gigalith atk0 maxatk0 def11 maxdef11 sta15 maxsta15 maxlevel17',
    '$track Woobat Swoobat atk0 maxatk0 def15 maxdef15 sta9 maxsta9 maxlevel38',
    '$track Dilbur Excadrill atk2 maxatk2 def15 maxdef15 sta15 maxsta15 maxlevel17',
    '$track Audino atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel40',
    '$track Timburr Gurdurr atk0 maxatk0 def13 maxdef13 sta13 maxsta13 maxlevel26',
    '$track Timburr Gurddurr Conkeldurr atk3 maxatk3 def15 maxdef15 sta15 maxsta15 maxlevel16',
    '$track Palpitoad Seismitoad atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel22',
    '$track Throh atk2 maxatk2 def15 maxdef15 sta15 maxsta15 maxlevel22',
    '$track Sawk atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel20',
    '$track Sewaddle Swadloon Leavanny atk0 maxatk0 def13 maxdef13 sta14 maxsta14 maxlevel22',
    '$track Venipede Whirlipede Scolipede atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel23',
    '$track Cottonee Whimsicott atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel28',
    '$track Petilil Lilligant atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel22',
    '$track Basculin atk0 maxatk0 def11 maxdef11 sta15 maxsta15 maxlevel27',
    '$track Sandile Krokorok Krookodile atk0 maxatk0 def13 maxdef13 sta14 maxsta14 maxlevel18',
    '$track Darumaka atk0 maxatk0 def15 maxdef15 sta11 maxsta11 maxlevel18',
    '$track Darumaka atk0 maxatk0 def14 maxdef14 sta13 maxsta13 maxlevel15',
    '$track Maractus atk0 maxatk0 def13 maxdef13 sta14 maxsta14 maxlevel25',
    '$track Dwebble Crustle atk0 maxatk0 def13 maxdef13 sta13 maxsta13 maxlevel22',
    '$track Scraggy Scrafty atk0 maxatk0 def8 maxdef8 sta15 maxsta15 maxlevel25',
    '$track Sigilyph atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel22',
    '$track Yamask Cofagrigus atk0 maxatk0 def11 maxdef11 sta14 maxsta14 maxlevel25',
    '$track Tirtuouga Carracosta atk1 maxatk1 def14 maxdef14 sta15 maxsta15 maxlevel21',
    '$track Archen atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel31',
    '$track Archen Archeops atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel16',
    '$track Trubbish Garbodor atk0 maxatk0 def13 maxdef13 sta13 maxsta13 maxlevel24',
    '$track Zorua Zoroark atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel21',
    '$track Minccino Cinccino atk2 maxatk2 def15 maxdef15 sta14 maxsta14 maxlevel25',
    '$track Gothita Gothorita atk5 maxatk5 def15 maxdef15 sta15 maxsta15 maxlevel40',
    '$track Gothita Gothorita Gothitelle atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel23',
    '$track Solosis Duosion atk0 maxatk0 def15 maxdef15 sta13 maxsta13 maxlevel28',
    '$track Solosis Duosion Reuniclus atk2 maxatk2 def15 maxdef15 sta15 maxsta15 maxlevel19',
    '$track Ducklett Swanna atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel27',
    '$track Vanillite Vanillish atk5 maxatk5 def15 maxdef15 sta15 maxsta15 maxlevel40',
    '$track Vanillite Vanillish Vanilluxe atk0 maxatk0 def15 maxdef15 sta13 maxsta13 maxlevel20',
    '$track Deerling Sawsbuck atk0 maxatk0 def14 maxdef14 sta14 maxsta14 maxlevel23',
    '$track Emolga atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel40',
    '$track Karrablast Escavalier atk0 maxatk0 def15 maxdef15 sta13 maxsta13 maxlevel19',
    '$track Foongus Amoonguss atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel27',
    '$track Frillish Jellicent atk1 maxatk1 def14 maxdef14 sta14 maxsta14 maxlevel24',
    '$track Alomomola atk0 maxatk0 def15 maxdef15 sta11 maxsta11 maxlevel27',
    '$track Joltik Galvantula atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel25',
    '$track Ferroseed Ferrothorn atk0 maxatk0 def13 maxdef13 sta13 maxsta13 maxlevel25',
    '$track Klink Klang atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel32',
    '$track Klink Klang Klinklang atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel21',
    '$track Tynamo Eelektrik atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel37',
    '$track Tynamo Eelektrik Eelektross atk1 maxatk1 def15 maxdef15 sta14 maxsta14 maxlevel20',
    '$track Elgyem Beheeyem atk0 maxatk0 def14 maxdef14 sta13 maxsta13 maxlevel20',
    '$track Litwick Lampent atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel37',
    '$track Litwick Lampent Chandelure atk0 maxatk0 def15 maxdef15 sta14 maxsta14 maxlevel17',
    '$track Axew Fraxure atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel25',
    '$track Axew Fraxure Haxorus atk0 maxatk0 def14 maxdef14 sta13 maxsta13 maxlevel15',
    '$track Cubchoo Beartic atk0 maxatk0 def15 maxdef15 sta12 maxsta12 maxlevel18',
    '$track Cryogonal atk0 maxatk0 def14 maxdef14 sta11 maxsta11 maxlevel20',
    '$track Shelmet Accelgor atk0 maxatk0 def14 maxdef14 sta15 maxsta15 maxlevel23',
    '$track Stunfisk atk0 maxatk0 def12 maxdef12 sta15 maxsta15 maxlevel27',
    '$track Mienfoo Mienshao atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel20',
    '$track Druddigon atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel20',
    '$track Golett Golurk atk2 maxatk2 def15 maxdef15 sta14 maxsta14 maxlevel19',
    '$track Pawniard Bisharp atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel19',
    '$track Bouffalant atk0 maxatk0 def13 maxdef13 sta11 maxsta11 maxlevel20',
    '$track Rufflet Braviary atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel18',
    '$track Vullaby Mandibuzz atk0 maxatk0 def13 maxdef13 sta15 maxsta15 maxlevel27',
    '$track Heatmor atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel23',
    '$track Durant atk1 maxatk1 def15 maxdef15 sta15 maxsta15 maxlevel21',
    '$track Deino Zweilous atk0 maxatk0 def15 maxdef15 sta15 maxsta15 maxlevel32',
    '$track Deino Zweilous Hydreigon atk0 maxatk0 def15 maxdef15 sta10 maxsta10 maxlevel15',
    '$track Larvesta Volcarona atk0 maxatk0 def9 maxdef9 sta15 maxsta15 maxlevel15'
);

let i = 0;
setTimeout( function () {
    rotomPVPGreatChannel.send( great[i] );
    i++;
}, 5000);
