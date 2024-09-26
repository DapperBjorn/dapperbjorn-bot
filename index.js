// Require necessary libraries and modules
const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const googleIt = require('google-it');
require('dotenv').config();  // Load environment variables from .env file

// Create the Discord client
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates]
});

// Bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Basic command handler
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Ping command
    if (message.content === '!ping') {
        message.channel.send('Pong!');
    }
});

// Log in to Discord with token from .env
client.login(process.env.DISCORD_TOKEN);
