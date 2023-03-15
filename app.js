const express = require('express');
const axios = require('axios');
const { Telegraf } = require('telegraf');
const fetchData = require('./dataFetcher');

const app = express();
const port = 3000;

app.get('/api/data', async (req, res) => {
    try {
        const url = 'YOUR_URL'; // Ersetzen Sie dies durch die URL, die Sie abfragen möchten
        const data = await fetchData(url);
        res.json({ result: data });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

const botToken = 'YOUR_TELEGRAM_BOT_TOKEN'; // Ersetzen Sie dies durch Ihren erhaltenen Bot-Token
const bot = new Telegraf(botToken);

bot.start((ctx) => ctx.reply('Willkommen beim NFT Champ Tool Bot!'));
bot.help((ctx) => ctx.reply('Gib /data ein, um die neuesten Daten abzurufen.'));

bot.command('data', async (ctx) => {
    try {
        const response = await axios.get('http://localhost:3000/api/data');
        ctx.reply(JSON.stringify(response.data.result, null, 2));
    } catch (error) {
        ctx.reply('Fehler beim Abrufen der Daten. Bitte versuchen Sie es später erneut.');
    }
});

bot.launch();