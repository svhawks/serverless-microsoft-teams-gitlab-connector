'use strict';

var request = require('request');
var services = require('./services/index')


// POST: /events or
// POST: /events?url=your_team_connector_url
module.exports.hello = (event, context, callback) => {
  const body = JSON.parse(event.body);
  let payload = services(body)

  let preTeamUrl = null
  if (event['queryStringParameters'] != null)
    preTeamUrl = event['queryStringParameters']['url']

  let teamConnectorURL = preTeamUrl || process.env.TEAMS_CONNECTOR_URL

  if (payload){
    request.post(teamConnectorURL, { json: payload },
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
