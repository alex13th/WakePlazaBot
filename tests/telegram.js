function tgPostMessage(chatId, text, keyboard = null, mode = 'HTML') {
  let replyMessage = '{"ok":true,"result":{"message_id":1484,';
  replyMessage += '"from":{"id":1273795086,"is_bot":true,';
  replyMessage += '"first_name":"DevWakeBot","username":"DevWakeBot"},';
  replyMessage += '"chat":{"id":586350636,"first_name":"Alexey",';
  replyMessage += '"last_name":"Sukharev","type":"private"},';
  replyMessage += '"date":1594189990,"text":"Тестовое сообщение"}}';
  return replyMessage;
}

function tgEditMessage(msg, text, keyboard, mode = 'HTML') {
  let replyMessage = '{"ok":true,"result":{"message_id":1484,';
  replyMessage += '"from":{"id":1273795086,"is_bot":true,';
  replyMessage += '"first_name":"DevWakeBot","username":"DevWakeBot"},';
  replyMessage += '"chat":{"id":586350636,"first_name":"Alexey",';
  replyMessage += '"last_name":"Sukharev","type":"private"},';
  replyMessage += '"date":1594189990,"text":"Тестовое сообщение"}}';
  return replyMessage;
}

function tgCallbackToQuery(callbackId, callbackText) {
  return true;
}

function tgIsCommand(msg) {
  return msg.hasOwnProperty('entities') && msg.entities[0].type == 'bot_command';
}

function tgGetCommand(msg) {
  var result = {name: null, params: []};
  var splittedText = msg.text.split(' ');
  var splittedCmd = splittedText[0].split('@');
  
  result.name = splittedCmd[0].substring(1);

  if(splittedCmd.length > 1)
    result.botName = splittedCmd[1];
  
  for(var i = 1; i < splittedText.length; i++) {
    result.params.push(splittedText[i]);
  }
  
  return result;
}

function tgParseUserName(user) {
  var result = user.first_name;
  
  if(user.hasOwnProperty('last_name')) {
     result = result + ' ' + user.last_name;
  }
  
  return result;
}
