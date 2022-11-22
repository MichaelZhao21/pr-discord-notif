# Discord Pull Request Notifications

Listens to new pull requests from a Github repository and sends a message to a Discord text channel when a pull request is created. This is done through Github Webhooks, the Github API, and the Discordjs Bot Library.

![image](https://user-images.githubusercontent.com/37679458/203248030-3ac0398f-4b79-4e0f-b0e1-bbe3e7c7ca25.png)

## Config

Create or use a [Discord bot](https://discord.com/developers/applications) with its own token and add it to your Discord server. To get the ID of a channel, you will need to enable [developer mode](https://www.discordia.me/en/developer-mode).

Additionally, you will need to create or use a [Github personal access token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token).

Create a `.env` file (or add environmental variables) with the following information:

```.env
TOKEN="[Discord bot token]"
GH_USER="[Github Username]"
GH_AUTH="[Github personal access token]"
REPO="[Repository name (ie. MichaelZhao21/michaelzhao)]"
CHANNEL_ID="[ID of text channel to send messages to]"
PORT="[Port to use (optional)]"
```

Go to your repo `Settings` and click on `Webhooks`. Press `Add Webhook` to add a new webhook:

- Under `Payload URL`, type in the URL of where you are hosting this program (The POST request is listening on the root path)
- Change `Content type` to `application/json`
- Under `Which events would you like to trigger this webhook?`, select `Let me select individual events` and **ONLY** check `Pull requests`
- Then press `save`!

## Running

Simply type `yarn start`
