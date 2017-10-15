'use strict'

const services = (body) => {
  let mrUrl = ''
  if (body.object_kind === 'merge_request') {
    mrUrl = body.project.web_url + '/merge_requests/' + body.object_attributes.iid
  }

  let payload = {
    "@context": "http://schema.org/extensions",
    "@type": "MessageCard",
    "themeColor": "F4F4F4",
    "title": 'Merge Request for ' + body.project.namespace + '/' + body.project.name,
    "sections": [
      {
        "activityTitle": "**"+ body.user.username +"**",
        "activityImage": body.user.avatar_url,
        "activityText": "Author"
      },
      {
        "activityTitle": "**"+ body.assignee.username +"**",
        "activityImage": body.assignee.avatar_url,
        "activityText": "Assigned User"
      }
    ],
    "text": "Click **Go To MR** to see details!",
    "potentialAction": [
      {
        "@type": "OpenUri",
        "name": "Go To MR",
        "targets": [
          { "os": "default", "uri": mrUrl }
        ]
      }
    ]
  }

  return payload
}

module.exports = services
