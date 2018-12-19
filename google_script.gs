var webhook_url = 'https://hooks.slack.com/services/....{ID}';

function onSubmit(e) {
  var form = FormApp.getActiveForm();
  var allResponses = form.getResponses();

  var latestResponse = allResponses[allResponses.length - 1];
  var response = latestResponse.getItemResponses();
  var items = [];

  for (var i = 0; i < response.length; i++) {
    var question = response[i].getItem().getTitle();
    var answer = response[i].getResponse();

    if (answer == "") {
      continue;
    }

    items.push({
      "title": question,
      "value": answer,
      "short": false
    });
  }
  Logger.log(items); 

  
  
  var data = {
    "attachments": [
        {
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#36a64f",
            "text": "New form submission",
            'fields': items,
            "image_url": "http://my-website.com/path/to/image.jpg",
            "thumb_url": "http://example.com/path/to/thumb.png",
            "footer": "Slack API",
            "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
            "ts": 123456789
        }
    ]
};

  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data)
  };
 var response = UrlFetchApp.fetch(webhook_url, options);
 // Logger.log(response.getContentText()); 
}