// LINE developersのメッセージ送受信設定に記載のアクセストークン
var ACCESS_TOKEN = '';

function doPost(e) {
  // WebHookで受信した応答用Token
  var replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  // ユーザーのメッセージを取得
  var userMessage = JSON.parse(e.postData.contents).events[0].message.text;
  // 応答メッセージ用のAPI URL
  var url = 'https://api.line.me/v2/bot/message/reply';

  var replyMessage = userMessage;
  switch(userMessage){
    case '玉ねぎ':
      replyMessage = 'ネギだね'
      break;
    case '青ネギ':
      replyMessage = 'それもネギだね'
      break;
    case 'ネギ':
      replyMessage = 'ネギ，好き？'
      break;
  }


  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        'type': 'text',
        'text': replyMessage
      }],
    }),
    });



  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}


var userId = 'U084e6c1f6a0400ada730b21f798d7e5f';
var pushUrl = 'https://api.line.me/v2/bot/message/push';

function push(){
  pushMessage('ネギ',userId);
}

//メッセージをプッシュ
function pushMessage(pushMessageContents, userID){
  var headers = {
    'Content-Type':'application/json; charset=UTF-8'
    ,'Authorization':'Bearer '+ ACCESS_TOKEN
  };

  var payload = JSON.stringify(
    {
      'to':userId
      ,'messages':[{
        'type':'text'
        ,'text':pushMessageContents
      }]
    }
   )

  var options = {
    'headers' : headers
    ,'method' : 'post'
    ,'payload' : payload
  };

 UrlFetchApp.fetch(pushUrl,options);
}
