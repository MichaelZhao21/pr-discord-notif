const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const btoa = require('btoa');
require('dotenv').config();

// Detect for env vars
if (
    process.env.TOKEN == undefined ||
    process.env.GH_USER == undefined ||
    process.env.GH_AUTH == undefined ||
    process.env.REPO == undefined ||
    process.env.CHANNEL_ID == undefined ||
    process.env.PORT == undefined
) {
    console.error('ERROR: Invalid environmental variables');
    process.exit(1);
}

app.use(express.json());

app.get('/test', function (req, res, next) {
    res.send({
        hey: 'UwU hiiiii hehe',
        question: 'How did you get here??? very interesting...',
        cya: 'Hope you have a great day! <333',
    });
});

app.post('/', async function (req, res, next) {
    if (req.body.action != 'opened') {
        res.status(200);
        res.send({ status: 200, info: 'Action is not "opened"; nothing changed' });
        return;
    } else if (req.body.repository.full_name != process.env.REPO) {
        res.status(400);
        res.send({ status: 400, error: 'Invalid repo' });
        return;
    }
    const pr = req.body.pull_request;
    const commits = await fetch(pr.commits_url, {
        method: 'GET',
        headers: {
            Authorization: 'Basic ' + btoa(`${process.env.GH_USER}:${process.env.GH_AUTH}`),
        },
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
    try {
        commits.forEach((c) => {
            embed.addField(c.sha.substring(0, 7), c.commit.message);
        });
    } catch (error) {
        console.error(error);
        res.status(400);
        res.send({ status: 400, error: 'Could not get commits' });
        return;
    }
    client.channels.cache.get(process.env.CHANNEL_ID).send(embed);
    res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`);
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);
