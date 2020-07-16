class ChatProcessor {
  constructor(strUpdate, properies, cache) {
    let update = this.parseUpdate(strUpdate);
    this._update = update;
    this._cache = cache;
    this._properies = properies;
    
    this.commandProcessors = {};
    this.callbackProcessors = {};
    this.messageProcessors = {};

    this._command = null;
    this._callbackQuery = null;

    if ( update.hasOwnProperty('message') ) {
      this._message = update.message;
    } else if ( update.hasOwnProperty('callback_query') ) {
      this._callbackQuery = update.callback_query;
      this._message = update.callback_query.message;
    }
  }

  get chatId() {
    return this._message.chat.id;
  }

  get hasCommand() {
    return tgIsCommand(this._message);
  }

  get hasCallback() {
    return (this._callbackQuery);
  }

  get command() {
    if(!this._command && this.hasCommand)
      this._command = tgGetCommand(this._message);

    return this._command;
  }

  get state() {
    return this._state;
  }

  registerCommandProcessor(commandName, processor) {
    this.commandProcessors[commandName] = processor;
  }

  registerCallbackProcessor(stateType, processor) {
    this.callbackProcessors[stateType] = processor;
  }

  registerMessageProcessor(stateType, processor) {
    this.messageProcessors[stateType] = processor;
  }

  proceed() {
    let result = null;

    if(this.hasCommand) {
      result = this.proceedCommand();
    };

    if(this.hasCallback) {
      result = this.proceedCallback();
    }

    this.saveState();

    return result;
  }

  proceedCommand() {
    let result;
    let strResult;
    let cmd = this.command;
    let processor = this.commandProcessors[cmd.name];

    this._properies.deleteProperty(this.chatId);

    this._state = processor.proceedCommand(cmd, this._message.from);

    let chatId = processor.message.chatId || this.chatId;
    strResult = tgPostMessage(chatId, processor.message.text, processor.message.keyboard);
    result = this.parseUpdate(strResult);

    if(this._state) {
      this._state.id = chatId + '-' + result.result.message_id;
    }
    return result;
  }

  proceedCallback() {
    let strResult;
    let jsonState = this.loadState();

    if(!jsonState) {
      return;
    }

    let stateObject = JSON.parse(jsonState);

    let processor = this.callbackProcessors[stateObject.type];
    processor.state.fromJSON(jsonState);
    processor.message.text = this._message.text;

    processor.proceedCallback(this._callbackQuery.data, this._callbackQuery.from);
    this._state = processor.state;

    if(processor.message.chatId) {
      tgPostMessage(chatId, processor.message.text, processor.message.keyboard);
    } else {
      strResult = tgEditMessage(this._message, processor.message.text, processor.message.keyboard);
    }

    if(processor.notice.text) {
      tgPostMessage(processor.notice.chatId || this.chatId, processor.notice.text, processor.notice.keyboard);
    }

    tgCallbackToQuery(this._callbackQuery.id, processor.callbackText);

    return this.parseUpdate(strResult);
  }

  parseUpdate(strUpdate) {
    let result = null;
    if(strUpdate)
      result = JSON.parse(strUpdate);;
    return result;
  }

  loadState() {
    let jsonState = this._properies.getProperty(this.chatId + '-' + this._message.message_id);
    return jsonState;
  }
  
  saveState() {
    if(this._state)
      this._properies.setProperty(this._state.id, this._state.toJSON());
  }
}