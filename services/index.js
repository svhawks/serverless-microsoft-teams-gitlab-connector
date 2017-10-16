'use strict'
var _ = require('lodash')
var humanize = require('string-humanize')

const services = (body) => {
  let actionUrl, assignees, card_title = ''

  if (body.object_kind === 'merge_request') {
    actionUrl = body.project.web_url + '/merge_requests/' + body.object_attributes.iid
    assignees = body.assignee.name
    card_title = body.user.name + " opened a merge request"

  } else if (body.object_kind === 'issue') {
    actionUrl = body.project.web_url + '/issues/' + body.object_attributes.iid
    card_title = body.user.name + " opened an issue"
    if (body.assignees){
      let assignees_users = _.map(body.assignees, 'name')
      assignees = _.join(assignees_users, ',')
    }

  }

  let payload = {
    "@context": "http://schema.org/extensions",
    "@type": "MessageCard",
    "themeColor": "F4F4F4",
    "title": "New " + humanize(body.object_kind) + ": " + body.object_attributes.title,
    "summary": "Click to action button to see datails.",
    "sections": [
      {
        "activityTitle": card_title,
        "activitySubtitle": body.object_attributes.created_at,
        "activityImage": body.user.avatar_url,
        "facts": [
          {
            "name": "Assigned To:",
            "value": assignees
          },
          {
            "name": "Repository :",
            "value": body.project.namespace + "/" + body.project.name
          }
        ]
      }
    ],
    "potentialAction": [
      {
        "@type": "OpenUri",
        "name": "Go To " + humanize(body.object_kind),
        "targets": [
          { "os": "default", "uri": actionUrl }
        ]
      }
    ]
  }

  return payload
}

module.exports = services
