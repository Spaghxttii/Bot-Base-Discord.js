/** 
 * Command & Event Handler
 * ------------------------------------------
 * Originally developed by: Spaghxttii (2025)
 * GitHub: [https://github.com/Spaghxttii]
 * 
 * Please retain credit header if using!
 * Always free to modify for your own projects
 * ------------------------------------------
 *
**/

const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    
    registerCommands: async function(client){
        const commands = [];
        const commandsPath = path.join(__dirname, '../commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for( const file of commandFiles){
            try {
                const command = require(path.join(commandsPath, file));
                if(!command.data || !command.execute){
                    console.warn(`Skipping ${file}: Missing "data" or "execute"! `);

                    continue;
                }
               commands.push(command.data.toJSON());
               client.commands.set(command.data.name, command);
               console.log(`Loaded: ${command.data.name}`); 
            } catch (error) {
               console.error(`Failed to load ${file}:`, error);
            }
        }
        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

        try {
           console.log(`Registering ${commands.length} commands...`);
           if(process.env.NODE_ENV === 'production'){
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: commands }
            );
            console.log(`Commands registered globally! `);
           }else{
            if(process.env.GUILD_ID){
                await rest.put(
                    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                    { body: commands }
                );
                console.log(`Commands updated in dev server(ID: ${process.env.GUILD_ID})`);
            }
           }
            await module.exports._pruneDeletedCommands(rest, commands);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    },

    _pruneDeletedCommands: async function(rest, currentCommands){
        try {
            const registeredCommands = await rest.get(
                Routes.applicationCommands(process.env.CLIENT_ID)
            );

            for (const cmd of registeredCommands){
                if(!currentCommands.some(c => c.name === cmd.name)){
                    await rest.delete(
                        Routes.applicationCommand(process.env.CLIENT_ID, cmd.id)
                    );
                    console.log(`Deleted missing command: ${cmd.name}`);
                }
            }
        } catch (error) {
            console.error(`Failed to prune a command: `, error);
        }
    },

    registerEvents: function(client){
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