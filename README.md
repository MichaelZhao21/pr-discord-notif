# Discord Pull Request Notifications

Listens to changes from a github repo and sends a message to a discord channel when a pull request is created. This is done through the Github API and Github Actions.

## Config

Create a config.json file with the following information:

```json
{
    "token": "[Discord bot token]",
    "ghUser": "[Github Username]",
    "ghAuth": "[Github personal access token]",
    "repo": "[Repository name (ie. MichaelZhao21/michaelzhao)]"
}
```

Add the `pr-notif.yml` to your repo (same one as the config.json thing) in the `.github/workflows` folder (or go to the **Actions** tab and copy and paste it into the Action editor)

** Make sure to change the `[address]` to the address of your web server **

## Running

Simply type `yarn start`
