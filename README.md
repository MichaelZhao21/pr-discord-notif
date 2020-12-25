# Discord Pull Request Notifications

Listens to changes from a github repo and sends a message to a discord channel when a pull request is created. This is done through the Github API and Github Actions.

## Config

Create a `.env` file (or add environmental variables) with the following information:

```.env
TOKEN="[Discord bot token]"
GH_USER="[Github Username]"
GH_AUTH="[Github personal access token]"
REPO="[Repository name (ie. MichaelZhao21/michaelzhao)]"
CHANNEL_ID="[ID of text channel to send messages to]"
PORT="[Port to use (optional)]"
```

Go to your repo `Settings` and click on `Webhooks`. Press `Add Webhook` to add a new webhook.

Under `Payload URL`, type in the address of where you are hosting this program. The POST request is listening on the root path. Change `Content type` to `application/json`. Under `Which events would you like to trigger this webhook?`, select `Let me select individual events` and **ONLY** check `Pull requests`. Then press save!

## Running

Simply type `yarn start`
