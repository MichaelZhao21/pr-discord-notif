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
PORT="[Port to use (optional)]
}
```

Add the `pr-notif.yml` to your repo (same one as the config.json thing) in the `.github/workflows` folder (or go to the **Actions** tab and copy and paste it into the Action editor)

** Make sure to change the `[address]` to the address of your web server **

## Running

Simply type `yarn start`
