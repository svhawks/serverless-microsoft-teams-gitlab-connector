'use strict';

var request = require('request');
var services = require('./services/index')

module.exports.hello = (event, context, callback) => {
  const body = JSON.parse(event.body);
  let payload = services(body)

  let teamURL = "https://outlook.office.com/MICROSOFT_TEAMS_CONNECTOR_URL"

  request.post(teamURL, { json: payload },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log('Success!')
      }
    }
  );

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Your function executed successfully!'
    }),
  };

  callback(null, response);
};
