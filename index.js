const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Bot online sebagai ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.content === '!join') {
    const channel = message.member.voice.channel;

    if (!channel) {
      return message.reply('Masuk VC dulu!');
    }

    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    message.reply('Masuk VC!');
  }
});

client.login(process.env.TOKEN);
