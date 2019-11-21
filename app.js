const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
app.message('hello', ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say({
    blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Hey there 👋 I'm an intro to your app"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*1️⃣ Use the `/task` command*. Type `/task` followed by a short description of your tasks and I'll ask for a due date (if applicable). Try it out by using the `/task` command in this channel."
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*2️⃣ Use the _Create a Task_ action.* If you want to create a task from a message, select `Create a Task` in a message's context menu. Try it out by selecting the _Create a Task_ action for this message (shown below)."
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "➕ To start tracking your team's tasks, *add me to a channel* and I'll introduce myself. I'm usually added to a team or project channel. Type `/invite @TaskBot` from the channel or pick a channel on the right."
          },
          "accessory": {
            "type": "conversations_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Select a channel...",
              "emoji": true
            }
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `Hey there <@${message.user}>!`
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Click Me"
            },
            "action_id": "button_click"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": "👀 View all tasks with `/task list`\n❓Get help at any time with `/task help` or type *help* in a DM with me"
            }
          ]
        }
    ]
  });
});

app.action('button_click', ({ body, ack, say }) => {
  // Acknowledge the action
  ack();
  say(`<@${body.user.id}> clicked the button`);
});


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();