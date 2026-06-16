const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('BOT_TOKEN no configurado');
  process.exit(1);
}

const bot = new TelegramBot(token, {
  polling: true
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `¡Bienvenido!

Comandos disponibles:

/start - Iniciar bot
/dudas - Ayuda
/certificado - Solicitar certificado`
  );
});

bot.onText(/\/dudas/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `El examen contiene 120 reactivos.
La calificación mínima aprobatoria es 80%.`
  );
});

bot.onText(/\/certificado/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Para obtener tu certificado debes aprobar el examen con al menos 80%.`
  );
});

const PORT = process.env.PORT || 10000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot funcionando');
}).listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});

console.log('Bot de Telegram iniciado');
