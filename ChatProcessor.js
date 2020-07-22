class ChatProcessor {
  constructor() {
    this.commandProcessors = {};
    this.callbackProcessors = {};
    this.contactProcessors = [];
  }

  get chatId() {
    return this._chatId;
  }

  get hasCallback() {
    return this._hasCallback;
  }

  get hasCommand() {
    return this._hasCommand;
  }

  get hasContact() {
    return this._hasContact;
  }

  get hasResult() {
    return this._hasResult;
  }

  get command() {
    if(!this._command && this._hasCommand)
      this._command = tgGetCommand(this._message);

    return this._command;
  }

  get result() {
    return this._result;
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

  registerContactProcessor(processorClass, dataAdapter) {
    let processorInfo = {};
    processorInfo.processorClass = processorClass;
    processorInfo.dataAdapter = dataAdapter;

    this.contactProcessors.push(processorInfo);
  }

  proceed(strUpdate, properies, cache) {
    let result;
    this._update = this.parseUpdate(strUpdate);
    this._cache = cache;
    this._properies = properies;

    if(this._hasCommand) {
      result = this.proceedCommand();
    };

    if(this._hasContact) {
      result = this.proceedContact();
    };

    if(this._hasCallback) {
      result = this.proceedCallback();
    }

    if(result) {
      this.saveState();
    } else if(!(this._hasCommand || this._hasContact || this._hasCallback)) {
      if(this._message.text === strRefuseContactButton) {
        let strResult = tgPostMessage(this._chatId, regretMessageText, {remove_keyboard: true});
        result = this.parseUpdate(strResult);
      }
    }

    return result;
  }

  proceedCommand() {
    let result;
    let cmd = this.command;
    let processorInfo = this.commandProcessors[cmd.name]

    if(processorInfo) {
      let processor = new processorInfo.processorClass(processorInfo.dataAdapter);
  
      this._state = processor.proceedCommand(cmd, this._message.from);
  
      let chatId = processor.message.chatId || this._chatId;
      let strResult = tgPostMessage(chatId, processor.message.text, processor.message.keyboard);
      result = this.parseUpdate(strResult);
  
      if(this._state && this._hasResult) {
        this._state.id = this._result.chat.id + '-' + this._result.message_id;
      }
    }

    return result;
  }

  proceedContact() {
    let strResult, result;

    for(let i = 0; i < this.contactProcessors.length; i++) {
      let processorInfo = this.contactProcessors[i]
      let processor = new processorInfo.processorClass(processorInfo.dataAdapter);
      processor.proceedContact(this._message.contact);
    }

    strResult = tgPostMessage(this._chatId, thanksContactText, {remove_keyboard: true});
    result = this.parseUpdate(strResult);

    return result;
  }

  proceedCallback() {
    let result, strResult;
    let jsonState = this.loadState();

    if(!jsonState) {
      strResult = tgEditMessage(this._message, noMessageStateError, null);
      tgPostMessage(this._chatId, helpText);
      return false;
    }

    let stateObject = JSON.parse(jsonState);
    let processorInfo = this.callbackProcessors[stateObject.type];
    let processor = new processorInfo.processorClass(processorInfo.dataAdapter);

    processor.state.fromJSON(jsonState);
    processor.message.text = this._message.text;

    processor.proceedCallback(this._callbackQuery.data, this._callbackQuery.from);
    this._state = processor.state;

    if(processor.message.chatId) {
      strResult = tgPostMessage(chatId, processor.message.text, processor.message.keyboard);
    } else {
      strResult = tgEditMessage(this._message, processor.message.text, processor.message.keyboard);
    }

    result = this.parseUpdate(strResult);

    for(let i = 0; i < processor.notices.length; i++) {
      let notice = processor.notices[i];
      tgPostMessage(notice.chatId || this._chatId, notice.text, notice.keyboard);
    }

    tgCallbackToQuery(this._callbackQuery.id, processor.callbackText);

    return result;
  }

  parseUpdate(strUpdate) {
    let result = null;
    
    if(strUpdate){
      result = JSON.parse(strUpdate);
      
      if ( result.hasOwnProperty('message') ) {
        this._message = result.message;
        this._hasCommand = tgIsCommand(this._message);
        this._hasContact = this._message.hasOwnProperty('contact');
      } else if ( result.hasOwnProperty('callback_query') ) {
        this._hasCallback = true;
        this._callbackQuery = result.callback_query;
        this._message = result.callback_query.message;
      } else if ( result.hasOwnProperty('result') ) {
        this._hasResult = true;
        this._result = result.result;
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