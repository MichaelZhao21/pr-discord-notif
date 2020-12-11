const Discord = require('discord.js');
const client = new Discord.Client({ ws: { intents: Discord.Intents.ALL } });
const config = require('./config.json');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const btoa = require('btoa');

app.use(bodyParser.json());

app.post('/', async function (req, res, next) {
    if (req.body.action != 'opened') {
        res.status(400);
        res.send({ status: 400, error: 'Invalid action' });
        return;
    }
    const pr = req.body.pull_request;
    const commits = await fetch(pr.commits_url, {
        method: 'GET',
        headers: { Authorization: 'Basic ' + btoa(`${config.ghUser}:${config.ghAuth}`) },
    }).then((data) => data.json());
    const embed = new Discord.MessageEmbed()
        .setColor('#00CD2D')
        .setTitle(`**${pr.title}** *#${pr.number}*`)
        .setURL(pr.html_url)
        .setAuthor(pr.user.login, null, pr.user.html_url)
        .setThumbnail(pr.user.avatar_url)
        .setDescription(
            `Merge ${pr.commits} commits into \`${pr.base.ref}\` from \`${pr.head.ref}\``
        );
    commits.forEach(c => {
        embed.addField(c.sha.substring(0, 7), c.commit.message);
    });
    client.channels.cache.get(config.channelId).send(embed);
    res.sendStatus(200);
});

app.listen(config.port || 3000, () => {
    console.log(`Listening on port ${config.port || 3000}`);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.login(config.token);
