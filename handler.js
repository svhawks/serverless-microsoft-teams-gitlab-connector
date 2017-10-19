'use strict';

var request = require('request');
var services = require('./services/index')


// POST: /events or
// POST: /events?url=your_team_connector_url
module.exports.hello = (event, context, callback) => {
  const body = JSON.parse(event.body);
  let payload = services(body)

  let paramsIncomingURL = null
  if (event['queryStringParameters'] != null)
    paramsIncomingURL = event['queryStringParameters']['url']

  let channelWebhookURL = paramsIncomingURL || process.env.channel_incoming_webhook_url

  if (payload){
    request.post(channelWebhookURL, { json: payload },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('Success!: ', body)
        } else {
          console.log(error, body)
        }
      }
    );
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Your function executed successfully!'
    }),
  };

  callback(null, response);
};
