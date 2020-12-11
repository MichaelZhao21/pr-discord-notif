const Discord = require('discord.js');
const client = new Discord.Client({ ws: { intents: Discord.Intents.ALL } });
const config = require('./config.json');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/', function(req, res, next) {
    console.log(req.body);
    res.sendStatus(200);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.login(config.token);
