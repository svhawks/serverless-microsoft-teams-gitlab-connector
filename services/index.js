'use strict'
var _ = require('lodash')
var humanize = require('string-humanize')

var cardActivityTitle = function (kind, user, action) {
  let pron = "d a "
  if (action === 'open')
    pron = "ed a "

  return user + " " + humanize(action) + pron + humanize(kind)
}

var cardTitle = function (kind, name, action) {
  if (action == 'open') {
    return "[New] " + humanize(kind) + ": " + name
  } else if (action == 'merge') {
    return "[Merged] " + humanize(kind) + ": " + name
  } else if (action == 'close') {
    return "[Closed] " + humanize(kind) + ": " + name
  }
}

const services = (body) => {
  let assignees = ''

  // Allow Only MR and Issues
  if (!(body.object_kind === 'merge_request' || body.object_kind === 'issue'))
    return false

  // Allow only open, merge, close actions
  if (!["open", "merge", "close"].includes(body.object_attributes.action))
    return false

  if (body.object_kind === 'merge_request') {
    assignees = body.assignee.name

  } else if (body.object_kind === 'issue') {
    if (body.assignees){
      let assignees_users = _.map(body.assignees, 'name')
      assignees = _.join(assignees_users, ',')
    }
  }

  let payload = {
    "@context": "http://schema.org/extensions",
    "@type": "MessageCard",
    "themeColor": "F4F4F4",
    "title": cardTitle(body.object_kind, body.object_attributes.title, body.object_attributes.action),
    "summary": "Click to action button to see datails.",
    "sections": [
      {
        "activityTitle": cardActivityTitle(body.object_kind, body.user.name, body.object_attributes.action),
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
          { "os": "default", "uri": body.object_attributes.url }
        ]
      }
    ]
  }

  return payload
}

module.exports = services
