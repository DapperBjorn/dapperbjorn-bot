const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const search = require('youtube-search');

// Set up YouTube Data API search options
const opts = {
    maxResults: 1,         // Fetch only one result
    key: process.env.YOUTUBE_API_KEY, // API key stored in .env file
    type: 'video'          // Only look for videos
};

module.exports = {
    name: 'play',
    description: 'Searches YouTube and streams audio',
    
    // Command execution logic
    async execute(message) {
        // Check if the user is in a voice channel
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel to play music!');
        }

        // Get the search query or YouTube URL from the message
        const args = message.content.split(' ').slice(1).join(' ');
        if (!args) return message.reply('Please provide a search term or YouTube URL!');

        // If the user provides a valid YouTube URL, play directly
        if (ytdl.validateURL(args)) {
            return playAudio(args, voiceChannel, message);
        }

        // Otherwise, perform a YouTube search using the provided search term
        search(args, opts, async (err, results) => {
            if (err || results.length === 0) {
                return message.reply('No results found.');
            }

            // Get the first result (most relevant)
            const url = results[0].link;
            message.channel.send(`Now playing: ${results[0].title}\n${url}`);

            // Play the audio from the YouTube URL
            playAudio(url, voiceChannel, message);
        });
    }
};

// Helper function to handle playing the audio
function playAudio(url, voiceChannel, message) {
    // Join the voice channel
    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
    });

    // Create an audio player
    const player = createAudioPlayer();

    // Stream the YouTube video (audio only)
    const stream = ytdl(url, { filter: 'audioonly' });
    const resource = createAudioResource(stream);
    
    // Play the audio resource and subscribe to the connection
    player.play(resource);
    connection.subscribe(player);
}
