/**
 * Interaction Create Event
 * ------------------------------------------
 * Written by: Spaghxttii (2025)
 * GitHub: [https://github.com/Spaghxttii]
 * Usage:
 * Handles all slash command interactions
 * ------------------------------------------
 **/
module.exports = {
    name: 'interactionCreate',
    execute: async(interaction) => {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if(!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                contnet: 'There was an error executing this command! ',
                ephemeral: true
            });
        }
    }
};