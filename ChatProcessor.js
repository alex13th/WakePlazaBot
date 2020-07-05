class ChatProcessor {
  constructor(update, properties) {
    this.commandProcessors = {};
    this.callbackProcessors = {};
    this._command = null;
    this._callbackQuery = null;
    this._update = update;
    this._properties = properties;
    
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

  proceed(dev = null) {
    let result = null;

    if(this.hasCommand) {
      result = this.proceedCommand(dev);
    };

    if(this.hasCallback) {
      result = this.proceedCallback(dev);
    }

    this.saveState();

    return result;
  }

  proceedCommand(dev) {
    let cmd = this.command;
    let processor = this.commandProcessors[cmd.name];
    this._properties.deleteProperty(this.chatId);

    this._state = processor.proceedCommand(cmd, this._message.from);

    if(!dev) {
      let chatId = processor.message.chatId || this.chatId;
      tgPostMessage(chatId, processor.message.text, processor.message.keyboard);
    }

    return processor.message;
  }

  proceedCallback(dev) {
    let jsonState = this.loadState();

    if(!jsonState) {
      return;
    }

    let stateObject = JSON.parse(jsonState);

    let processor = this.callbackProcessors[stateObject.type];
    processor.state.fromJSON(jsonState);
    processor.message.text = this._message.text;

    processor.proceedCallback(this._callbackQuery.data);
    this._state = processor.state;

    if(!dev) {
      if(processor.message.chatId) {
        tgPostMessage(chatId, processor.message.text, processor.message.keyboard);
      } else {
        tgEditMessage(this._message, processor.message.text, processor.message.keyboard);
      }

      tgCallbackToQuery(this._callbackQuery.id, processor.callbackText);
    }

    return processor.message;
  }

  loadState() {
    let jsonState = this._properties.getProperty(this.chatId);
    return jsonState;
  }
  
  saveState() {
    if(this._state)
      this._properties.setProperty(this.chatId, this._state.toJSON());
}
}