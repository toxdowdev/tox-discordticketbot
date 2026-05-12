const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');

const commands = [
  new SlashCommandBuilder()
    .setName('ticketpanel')
    .setDescription('Kurumsal destek panelini oluşturur.')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    console.log('Tox Studio: Slash komutları başarıyla tanımlandı.');
  } catch (error) {
    console.error(error);
  }
})();