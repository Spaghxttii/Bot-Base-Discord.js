/** 
 * discord.js Bot Command & Event Handler
 * ------------------------------------------
 * Developed by: Spaghxttii (2025)
 * GitHub: [https://github.com/Spaghxttii]
 * ------------------------------------------
 * 
 * 
 * Project Name Here
 * Developed by: [YOUR NAME]
 * Version: 1.0.0
 * Last Updated: [YYYY-MM-DD]
 * 
 * 
**/

require('dotenv').config();
const { IntentsBitField, Client, Collection} = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registerHandlers');
const path = require('path');

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages, 
        // Add or Remove Intents as needed
    ]
});

client.commands = new Collection();
registerCommands(client, path.join(__dirname, 'commands'));
registerEvents(client,path.join(__dirname, 'events'));


client.login(process.env.TOKEN);