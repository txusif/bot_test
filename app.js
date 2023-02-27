const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.API_KEY;

const bot = new TelegramBot(token, { polling: true });

const cmd = ['/start', '/help', '/syllabus', '/zoro', '/anime'];

const commands = [
    {
      command: 'syllabus',
      description: 'Sends the syllabus PDF file'
    },
    {
      command: 'zoro',
      description: 'Sends the link of anime website'
    },
    {
      command: 'anime',
      description: 'Sends a anime image'
    },
    {
      command: 'help',
      description: 'Lists all available commands'
    }
  ];

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Hello!!! use /help');
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    let message = 'Available commands:\n\n';
    commands.forEach((cmd) => {
      message += `/${cmd.command}: ${cmd.description}\n`;
    });
    bot.sendMessage(chatId, message, {
      reply_to_message_id: msg.message_id
    });
});

bot.onText(/\/syllabus/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendDocument(chatId, 'Sem-IV_Syllabus.pdf', {}, {
      reply_to_message_id: msg.message_id
    });
});

bot.onText(/\/zoro/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'https://zoro.to/home', {
      reply_to_message_id: msg.message_id
    });
});

bot.onText(/\/anime/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendPhoto(chatId, 'tokyo.jpg', {
      reply_to_message_id: msg.message_id
    });
});
  

bot.on('message', (msg) => {
  if (!cmd.includes(msg.text)) {
    bot.sendMessage(msg.chat.id, msg.text);
  }
});