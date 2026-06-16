const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {
  polling: true
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    'Bienvenido al sistema de exámenes.'
  );
});

bot.onText(/\/dudas/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    'La calificación mínima aprobatoria es 80%.'
  );
});

console.log('Bot iniciado');
