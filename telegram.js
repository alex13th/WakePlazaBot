function tgIsCommand(msg) {
  return msg.hasOwnProperty('entities') && msg.entities[0].type === 'bot_command';
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

function tgPostMessage(chatId, text, keyboard = null, mode = 'HTML') {
  var payload = {
    'method': 'sendMessage',
    'chat_id': String(chatId),
    'text': text,
    'parse_mode': mode
  }
  var data = {
    "method": "post",
    "payload": payload
  }
  
  if(keyboard) {
    payload.reply_markup = JSON.stringify(keyboard)
  }

  return UrlFetchApp.fetch('https://api.telegram.org/bot' + API_TOKEN + '/', data);
}

function tgEditMessage(msg, text, keyboard = null, mode = 'HTML') {
  let chatId = msg.chat.id;
  let msgId = msg.message_id;
  
  let payload = {
    method: 'editMessageText',
    chat_id: String(chatId),
    message_id: String(msgId),
    text: text,
    parse_mode: mode
  };
  
  if(keyboard) {
    payload.reply_markup = JSON.stringify(keyboard);
  }
  
  let data = {
    method: 'post',
    payload: payload
  };
  
  return UrlFetchApp.fetch('https://api.telegram.org/bot' + API_TOKEN + '/', data);
}

function tgEditMessageReplyMarkup(msg, text = null, keyboard = null, mode = 'HTML') {
  let chatId = msg.chat.id;
  let msgId = msg.message_id;
  
  let payload = {
    method: 'editMessageReplyMarkup',
    chat_id: String(chatId),
    message_id: String(msgId),
    parse_mode: mode
  };
  
  if(text) {
    payload.text = text;
  }

  if(keyboard) {
    payload.reply_markup = JSON.stringify(keyboard);
  }
  
  let data = {
    method: 'post',
    payload: payload
  };
  
  return UrlFetchApp.fetch('https://api.telegram.org/bot' + API_TOKEN + '/', data);
}

function tgCallbackToQuery(callbackId, callbackText) {
  var payload = {
    'method': 'answerCallbackQuery',
    'callback_query_id': callbackId,
    'text': callbackText
  }
  var data = {
    "method": "post",
    "payload": payload
  }
  
  return UrlFetchApp.fetch('https://api.telegram.org/bot' + API_TOKEN + '/', data);
}

function tgParseUserName(user) {
  var result = user.first_name;
  
  if(user.hasOwnProperty('last_name')) {
     result = result + ' ' + user.last_name;
  }
  
  return result;
}
