module.exports = {
    name: 'ready',
    once: true,
    execute: async (client) => {
        console.log(`${client.user.tag} is ready! `);
    }
}