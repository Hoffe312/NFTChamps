const express = require('express');
const axios = require('axios');
const { Telegraf } = require('telegraf');
const main = require('./javascript.js');

const app = express();
const port = 3000;

app.get('/api/data', async (req, res) => {
    try {
        const url = 'https://pure-fortress-24810.herokuapp.com/'; // Ersetzen Sie dies durch die URL, die Sie abfragen möchten
        const data = await main();
        res.json({ result: data });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at Heroku`);
});

const botToken = '5963822653:AAGrHiIoFzIyvFZmgAN696Fy5336yVmODoI'; // Ersetzen Sie dies durch Ihren erhaltenen Bot-Token
const bot = new Telegraf(botToken);

bot.start((ctx) => ctx.reply('Willkommen beim NFT Champ Tool Bot!'));
bot.help((ctx) => ctx.reply('Gib /data ein, um die neuesten Daten abzurufen.'));

bot.command('data', async (ctx) => {
    try {
        const response = await axios.get('https://pure-fortress-24810.herokuapp.com/api/data');
        ctx.reply(JSON.stringify(response.data.result, null, 2));
    } catch (error) {
        ctx.reply('Fehler beim Abrufen der Daten. Bitte versuchen Sie es später erneut.');
    }
});

bot.launch();