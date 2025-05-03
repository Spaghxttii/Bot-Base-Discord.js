/** 
 * Ping Command
 * ------------------------------------------
 * Written by: Spaghxttii (2025)
 * GitHub: [https://github.com/Spaghxttii]
 * Usage:
 * /ping command to test command handler
 * ------------------------------------------
**/
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
    execute: async(interaction) => {
        await interaction.reply('Pong! ');
    }
};