const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    
    registerCommands: async (client) => {
        const commands = [];
        const commandsPath = path.join(__dirname, '../commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(path.join(commandsPath, file));
            if (command.data && command.execute) {
                commands.push(command.data.toJSON());
                client.commands.set(command.data.name, command);
            } else {
                console.warn(`[WARNING] Command ${file} is missing "data" or "execute" property.`);
            }
        }

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
        
        try {
            console.log(`Registering ${commands.length} global commands...`);
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: commands }
            );
            console.log('(/) commands registered successfully!');
        } catch (error) {
            console.error('Failed to register commands:', error);
        }
    },

    registerEvents: (client) => {
        const eventsPath = path.join(__dirname, '../events');
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const event = require(path.join(eventsPath, file));
            
            if (!event.name || !event.execute) {
                console.warn(`[WARNING] Event ${file} is missing "name" or "execute".`);
                continue;
            }

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
};