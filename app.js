import express from "express";
import axios from "axios";
import { Telegraf } from "telegraf";
import main from "./javascript.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/data", async (req, res) => {
  try {
    const data = await main();
    res.json({ result: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const botToken = "5963822653:AAGrHiIoFzIyvFZmgAN696Fy5336yVmODoI"; // Ersetzen Sie dies durch Ihren erhaltenen Bot-Token
const bot = new Telegraf(botToken);

bot.start((ctx) => ctx.reply("Willkommen beim NFT Champ Tool Bot!"));
bot.help((ctx) => ctx.reply("Gib /data ein, um die neuesten Daten abzurufen."));

bot.command("data", async (ctx) => {
  try {
    const response = await axios.get("https://pure-fortress-24810.herokuapp.com/api/data");
    ctx.reply(JSON.stringify(response.data.result, null, 2));
  } catch (error) {
    ctx.reply("Fehler beim Abrufen der Daten. Bitte versuchen Sie es später erneut.");
  }
});

bot.launch();
