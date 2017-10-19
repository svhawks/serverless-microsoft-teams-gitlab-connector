# Serverless Microsoft Teams Gitlab Connector

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

Easy integration to notify **GitLab** Merge Request and Issues to **Microsoft Teams**.

![](https://raw.githubusercontent.com/svtek/serverless-microsoft-teams-gitlab-connector/master/Screenshot%202017-10-19%2021.07.40.png)

<br/>
<br/>
<br/>

<h2 align="center">Usage</h2>


## Microsoft Teams Side

### Step 1
In Microsoft Teams, choose the **More options (⋯)** button next to the channel name in the list of channels and then choose **Connectors**.

![enter image description here](https://i-msdn.sec.s-msft.com/en-us/microsoft-teams/images/connectors/teams-context-menu.png)


### Step 2
In the list, click **Add** for the **Incoming Webhook**.
![enter image description here](https://www.evernote.com/shard/s672/sh/fe974184-71d0-4ffc-bc30-2a6669d3d328/c84cc7d488f833b54d0b8e7e43aed702/res/6ae668c0-3bd6-4cb0-ae45-b9faa0dca835/connector_list.png.jpg?resizeSmall&width=832)

### Step 3
Enter the connector name as **GitLab** and upload an icon. Save and copy your connector url (`channel_incoming_webhook_url`).

## GitLab Side

### Step 1
Go to your repo settings on GitLab and click `Integrations` section from left bar.
Copy this link:
https://0xjjw6j039.execute-api.us-east-1.amazonaws.com/prod/events?url=channel_incoming_webhook_url
and change `channel_incoming_webhook_url` part with your teams url.
Then paste it to url input area on GitLab.

### Step 2
Enable `Issues events`, `Merge Request events` and `SSL Verification` then save it.

![GitLab Webhook](https://www.evernote.com/shard/s672/sh/1778556c-c6ce-41af-bb4c-e526d25a3957/408dad22de893f8df13f7065a220be77/res/cd40ec98-62ac-4004-a3e0-8c3100612dad/integrations.jpg?resizeSmall&width=832 )

<br/>
<br/>
<br/>

<h2 align="center">Deploy to your aws acount</h2>


```bash
git clone git@github.com:svtek/serverless-microsoft-teams-gitlab-connector.git
cd serverless-microsoft-teams-gitlab-connector
npm install
```
If you don't want to add the `channel_incoming_webhook_url` as params to your function endpoint url: Follow Microsoft Teams steps, copy the url and add it to you env variables.
 `export channel_incoming_webhook_url=https://outlook.office.com/webhook/...`

**Deploy:**
` serverless deploy`

Then follow the GitLab steps and add `https://your-function-endpoint-url/events` to url input area on GitLab.

**Testing Locally:**
```bash
serverles offline start
./ngrok http 3000
# add `/events` path to output url and paste (https://123456.ngrok.io/events) to GitLab url input.
```

### Features

- [x] Merge Request
- [x] Issues
- [ ] Push
- [ ] Comments
- [ ] Jobs


## Authors
| [<img src="https://pbs.twimg.com/profile_images/508440350495485952/U1VH52UZ_200x200.jpeg" width="100px;"/>](https://twitter.com/sahinboydas)   | [Sahin Boydas](https://twitter.com/sahinboydas)<br/><br/><sub>Co-Founder @ [MojiLaLa](http://mojilala.com)</sub><br/> [![LinkedIn][1.1]][1]| [<img src="https://avatars1.githubusercontent.com/u/989759?s=460&v=4" width="100px;"/>](https://github.com/muhammet)   | [Muhammet](https://github.com/muhammet)<br/><br/><sub>Developer @ [MojiLaLa](http://mojilala.com)</sub><br/> [![Github][2.1]][2] | [<img src="https://avatars1.githubusercontent.com/u/8470005?s=460&v=4" width="100px;"/>](https://github.com/sadikay)   | [Sadik](https://github.com/sadikay)<br/><br/><sub>Backend Engineer @ [MojiLaLa](http://mojilala.com)</sub><br/> [![Github][3.1]][3]
| - | :- | - | :- | - | :- |

[1.1]: https://www.kingsfund.org.uk/themes/custom/kingsfund/dist/img/svg/sprite-icon-linkedin.svg (linkedin icon)
[1]: https://www.linkedin.com/in/sahinboydas
[2.1]: http://i.imgur.com/9I6NRUm.png (github.com/muhammet)
[2]: http://www.github.com/muhammet
[3.1]: http://i.imgur.com/9I6NRUm.png (github.com/sadikay)
[3]: http://www.github.com/sadikay
