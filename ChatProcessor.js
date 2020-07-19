class ChatProcessor {
  constructor() {
    this.commandProcessors = {};
    this.callbackProcessors = {};
  }

  get chatId() {
    return this._chatId;
  }

  get hasCommand() {
    return this._hasCommand;
  }

  get hasCallback() {
    return this._hasCallback;
  }

  get command() {
    if(!this._command && this._hasCommand)
      this._command = tgGetCommand(this._message);

    return this._command;
  }

  get state() {
    return this._state;
  }

  registerCommandProcessor(commandName, processorClass, dataAdapter) {
    let processorInfo = {};
    processorInfo.processorClass = processorClass;
    processorInfo.dataAdapter = dataAdapter;

    this.commandProcessors[commandName] = processorInfo;
  }

  registerCallbackProcessor(stateType, processorClass, dataAdapter) {
    let processorInfo = {};
    processorInfo.processorClass = processorClass;
    processorInfo.dataAdapter = dataAdapter;

    this.callbackProcessors[stateType] = processorInfo;
  }

  proceed(strUpdate, properies, cache) {
    let result = null;
    this._update = this.parseUpdate(strUpdate);
    this._cache = cache;
    this._properies = properies;

    if(this._hasCommand) {
      result = this.proceedCommand();
    };

    if(this._hasCallback) {
      result = this.proceedCallback();
    }

    this.saveState();

    return result;
  }

  proceedCommand() {
    let result;
    let strResult;
    let cmd = this.command;
    let processorInfo = this.commandProcessors[cmd.name]

    if(processorInfo) {
      let processor = new processorInfo.processorClass(processorInfo.dataAdapter);
  
      this._state = processor.proceedCommand(cmd, this._message.from);
  
      let chatId = processor.message.chatId || this._chatId;
      strResult = tgPostMessage(chatId, processor.message.text, processor.message.keyboard);
      result = this.parseUpdate(strResult);
  
      if(this._state) {
        this._state.id = chatId + '-' + result.result.message_id;
      }
    }
    return result;
  }

  proceedCallback() {
    let strResult;
    let jsonState = this.loadState();

    if(!jsonState) {
      strResult = tgEditMessage(this._message, noMessageStateError, null);
      tgPostMessage(this._chatId, helpText);
      return;
    }

    let stateObject = JSON.parse(jsonState);
    let processorInfo = this.callbackProcessors[stateObject.type];
    let processor = new processorInfo.processorClass(processorInfo.dataAdapter);

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
      tgPostMessage(processor.notice.chatId || this._chatId, processor.notice.text, processor.notice.keyboard);
    }

    tgCallbackToQuery(this._callbackQuery.id, processor.callbackText);

    return this.parseUpdate(strResult);
  }

  parseUpdate(strUpdate) {
    let result = null;
    
    if(strUpdate){
      result = JSON.parse(strUpdate);
      
      if ( result.hasOwnProperty('message') ) {
        this._message = result.message;
        this._hasCommand = tgIsCommand(this._message);
      } else if ( result.hasOwnProperty('callback_query') ) {
        this._hasCallback = true;
        this._callbackQuery = result.callback_query;
        this._message = result.callback_query.message;
      }

      this._chatId = this._message.chat.id;
    }

    return result;
  }

  loadState() {
    let jsonState = this._properies.getProperty(this._chatId + '-' + this._message.message_id);
    return jsonState;
  }
  
  saveState() {
    if(this._state)
      this._properies.setProperty(this._state.id, this._state.toJSON());
  }
}