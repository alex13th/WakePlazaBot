// Class WakeProcessor implement CommandProcessor and CallbackProcessor interfaces
// CommandProcessor - method proceedCommand()
// CallbackProcessor - method proceedCallback() is inherited from ReserveCallbackProcessor.

class WakeProcessor extends ReserveCallbackProcessor {
  constructor(dataAdapter, state) {
    super(dataAdapter, state);

    if(state) {
        this.state = new WakeReserveState(state);
    } else {
        this.state = new WakeReserveState();
    }
    
    if(dataAdapter) {
      let reserveRows = dataAdapter.getActiveReserveRows();
      let reserveArray = this.state.reserve.createReserveArray(reserveRows);
      this.state.reserve.reserveArray = reserveArray;
    }

    this.commandHandlers = {};
    this.commandHandlers['wake'] = this.cmdWake;


    this.menuHandlers['set'] = this.callSetMenu;
    this.menuHandlers['hour'] = this.callHourMenu;

    this.bookHandlers['set'] = this.callSetButton;
    this.bookHandlers['hour'] = this.callHourButton;
    this.bookHandlers['board'] = this.callBoardButton;
    this.bookHandlers['hydro'] = this.callHydroButton;
  }

  proceedCommand(cmd, user) {
    this._cmd = cmd;
    this._user = user;
    return this.commandHandlers[cmd.name].apply(this);
}

  cmdWake() {
    this.state.reserve.telegramId = this._user.id;
    this.state.reserve.telegramName = tgParseUserName(this._user);
    this.state.menu = 'main';

    let result = this.state;
    
    let message = {};
    message.text = wakeHelloText;
    message.keyboard = {inline_keyboard: 
        [[{text: strBeginReserve, callback_data: 'book'}], 
        [{text: strReserveList, callback_data: 'list'}]]};
    this.message = message;

    return result;
  }

  callApplyButton() {
    let row = this.state.reserve.toArray();
    this.dataAdapter.appendReserveRow(row);

    this.state.menu = 'main';
    this.message.text = strReserveComfirmedHeader;
    this.message.text += this.state.reserve.getStateMessageText();
    this.message.keyboard = null;
    this.callbackText = strReserveComfirmed;

    this.state = new WakeReserveState();
  }

  callMainButton() {
    this.state.menu = 'main';
    this.message.text = wakeHelloText;
    this.message.keyboard = {inline_keyboard: 
      [[{text: strBeginReserve, callback_data: 'book'}], 
      [{text: strReserveList, callback_data: 'list'}]]};
    this.callbackText = strMainMenu;
  }

  callSetMenu(data) {
    if(data === 'back') {
      this.callBookButton();
    } else {
      this.state.reserve.count = +data;
      this.state.reserve.setType = 'set';
      this.callBookButton();
      this.callbackText = strSet + ': ' + this.state.reserve.count;
    }
  }

  callSetButton() {
    let buttons = this.createCountButtons();
    buttons.push([{text: strBackButton, callback_data: 'back'}]);

    this.state.menu = 'set';
    this.message.keyboard = {inline_keyboard: buttons};
    this.callbackText = strSet;
  }

  callHourMenu(data) {
    if(data === 'back') {
      this.callBookButton();
    } else {
      this.state.reserve.count = +data;
      this.state.reserve.setType = 'hour';
      this.callBookButton();
      this.callbackText = strHour + ': ' + this.state.reserve.count;
    }
  }

  callHourButton() {
    let buttons = this.createCountButtons();
    buttons.push([{text: strBackButton, callback_data: 'back'}]);

    this.state.menu = 'hour';
    this.message.keyboard = {inline_keyboard: buttons};
    this.callbackText = strHour;
  }

  callBoardButton() {
    this.state.reserve.board = this.state.reserve.board ? 0 : 1;
    this.callBookButton();
    this.callbackText = this.state.reserve.board ? strAddBoard : strRemoveBoard
  }

  callHydroButton() {
    this.state.reserve.hydro = this.state.reserve.hydro ? 0 : 1;
    this.callBookButton();
    this.callbackText = this.state.reserve.hydro ? strAddHydro : strRemoveHydro
  }

  createBookMenuKeyboard() {
    let buttons = [];
    let buttonRow = [];

    buttonRow = [{text: strDateButton, callback_data: "date"}];
    buttons.push(buttonRow);

    buttonRow = [{text: strTimeButton, callback_data: "time"}];
    buttons.push(buttonRow); 

    buttonRow = [];
    buttonRow.push({text: strSetButton, callback_data: "set"});
    buttonRow.push({text: strHourButton, callback_data: "hour"});
    buttons.push(buttonRow);

    buttonRow = [];
    buttonRow.push({text: strBoardButton, callback_data: "board"});
    buttonRow.push({text: strHydroButton, callback_data: "hydro"});
    buttons.push(buttonRow);

    if(this.state.reserve.isCompleted) {
      buttonRow = [];
      buttonRow.push({text: applyIcon + ' ' + strApply, callback_data: "apply"});
      buttons.push(buttonRow);
    }

    buttons.push([{text: strBackButton, callback_data: 'back'}]);

    return {inline_keyboard: buttons};
  }

  getReserveListMessage() {
    let result = strReserveListHeader;
    let reserveRows = this.dataAdapter.getActiveReserveRows()

    if(reserveRows.length <= 0) {
      result += noBooksCaption + '\n';
      result += noBooksFooter;
      return result;
    }
    
    let listDate;
    let bookNum;
    let reserve = new WakeReserve();
  
    for(let i = 0; i < reserveRows.length; i++){
      let row = '';
      reserve.fromArray(reserveRows[i]);
      if((i === 0) || (reserve.start.getDate() != listDate.getDate() )) {
        listDate = reserve.start;
        bookNum = 0;
        result += '\n<b>' + listDate.toLocaleDateString(dateLocale, dateOptions) + '</b>\n';
      }
      
      bookNum++;
      row += (i + 1) + '. ';
      row += reserve.toRowString();
  
      result += row + '\n';
    }
    return result;
  }
}