/**
 * Ready Event
 * ------------------------------------------
 * Written by: Spaghxttii (2025)
 * GitHub: [https://github.com/Spaghxttii]
 * Usage:
 * Executes when bot connects to Discord
 * ------------------------------------------
 **/
module.exports = {
    name: 'ready',
    once: true,
    execute: async (client) => {
        console.log(`${client.user.tag} is ready! `);
    }
}