const Discord = require('discord.js');
const client = new Discord.Client({ ws: { intents: Discord.Intents.ALL } });
const config = require('./config.json');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const btoa = require('btoa');

app.use(bodyParser.json());

app.get('/test', function (req, res, next) {
    res.send({
        hey: "UwU hiiiii hehe",
        question: "How did you get here??? very interesting...",
        cya: "Hope you have a great day! <333"
    });
});

app.post('/', async function (req, res, next) {
    if (req.body.action != 'opened') {
        res.status(304);
        res.send({ status: 200, info: 'Action is not "opened"; nothing changed' });
        return;
    }
    else if (req.body.repository.full_name != config.repo) {
        res.status(400);
        res.send({ status: 400, error: 'Invalid repo' });
        return;
    }
    const pr = req.body.pull_request;
    const commits = await fetch(pr.commits_url, {
        method: 'GET',
        headers: { Authorization: 'Basic ' + btoa(`${config.ghUser}:${config.ghAuth}`) },
    }).then((data) => data.json());
    const embed = new Discord.MessageEmbed()
        .setColor('#00CD2D')
        .setTitle(`${pr.number}: ${pr.title}`)
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
