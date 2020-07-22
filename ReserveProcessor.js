class ReserveProcessor {
  constructor(dataAdapter, state) {
    this.callbackText = '';
    this.message = {};
    this.notices = [];
    this.dataAdapter = dataAdapter;
    
    if(state) {
        this.state = new ReserveState(state);
    } else {
        this.state = new ReserveState();
    }

    this.commandHandlers = {};

    this.menuHandlers = {};
    this.menuHandlers['main'] = this.callMainMenu;
    this.menuHandlers['book'] = this.callBookMenu;
    this.menuHandlers['date'] = this.callDateMenu;
    this.menuHandlers['time'] = this.callTimeMenu;
    this.menuHandlers['minutes'] = this.callMinutesMenu;
    this.menuHandlers['count'] = this.callCountMenu;
    this.menuHandlers['list'] = this.callListMenu;
    this.menuHandlers['details'] = this.callDetailsMenu;
    this.menuHandlers['myList'] = this.callMyListMenu;
    this.menuHandlers['myDetails'] = this.callMyDetailsMenu;

    this.mainHandlers = {};
    this.mainHandlers['book'] = this.callBookButton;
    this.mainHandlers['list'] = this.callListButton;
    this.mainHandlers['myList'] = this.callMyListButton;

    this.bookHandlers = {};
    this.bookHandlers['date'] = this.callDateButton;
    this.bookHandlers['time'] = this.callTimeButton;
    this.bookHandlers['count'] = this.callCountButton;
    this.bookHandlers['apply'] = this.callApplyButton;

    this.detailsHandlers = {};
    this.detailsHandlers['cancel'] = this.callCancelButton;
    this.detailsHandlers['notice'] = this.callNoticeButton;
  }

  proceedCommand(cmd, user) {
    this._cmd = cmd;
    this._user = user;
    if(user) {
      this.state.reserve.telegramId = user.id;
      this.state.reserve.telegramName = tgParseUserName(this._user);
    }

    if(cmd)
      return this.commandHandlers[cmd.name].apply(this);
  }

  proceedCallback(data, user) {
    this._user = user;

    this.menuHandlers[this.state.menu].apply(this, [data]);
  }

  callMainMenu(data) {
    this.mainHandlers[data].apply(this, [data]);
  }

  callMainButton() {
    this.state.menu = 'main';
    this.message.text = strMainMenu;
    this.message.keyboard = {inline_keyboard: 
      [[{text: strBeginReserve, callback_data: 'book'}], 
      [{text: strReserveList, callback_data: 'list'}]]};
    this.callbackText = strMainMenu;
  }

  callBookMenu(data) {
    if(data === 'back') {
      this.callMainButton();
    } else if(this.bookHandlers.hasOwnProperty(data)) {
      this.bookHandlers[data].apply(this, [data]);
    } else {
      this.state.reserve.bookCount = +data;
      this.callBookButton(true);
      this.callbackText = data;
    }
  }

  callBookButton(refresh = true) {
    let msgText = null;
    let keyboard;
    this.state.menu = 'book';

    if(refresh) {
      this.fillReserveArray();
      this.state.reserve.findConflict();
      msgText = strReserveStateHeader;
      msgText += this.state.reserve.getStateMessageText();
      this.message.text = msgText;
    }

    keyboard = this.createBookMenuKeyboard();

    this.message.keyboard = keyboard;
    this.callbackText = strReserve;
  }
  
  callDateMenu(data) {
    if(data === 'back') {
      this.callBookButton(false);
    } else {
      let newDate = new Date();
      let startDate = this.state.reserve.start;
      newDate.setHours(startDate.getHours(), startDate.getMinutes(), 0, 0);
      newDate.setDate(newDate.getDate() + parseInt(data));
      this.state.reserve.start = newDate;
      this.callBookButton(true);
      this.callbackText = strDay + ": " + this.state.reserve.start.toLocaleDateString(dateLocale, dateOptions);
    }
  }

  callDateButton() {
    let buttons = this.createDateButtons();
    buttons.push([{text: strBackButton, callback_data: 'back'}]);

    this.state.menu = 'date';
    this.message.keyboard = {inline_keyboard: buttons};
    this.callbackText = strDateButton;
  }

  callTimeMenu(data) {
    if(data === 'back') {
      this.callBookButton(false);
      this.state._newHours = null;
    } else {
      this.state._newHours = +data;
      this.callMinutesButton();
    }
  }

  callTimeButton() {
    let buttons = this.createTimeButtons();
    buttons.push([{text: strBackButton, callback_data: 'back'}]);

    this.state.menu = 'time';
    this.message.keyboard = {inline_keyboard: buttons};
    this.callbackText = strSelect + " " + strHour;
  }

  callMinutesMenu(data) {
    if(data === 'back') {
      this.callTimeButton();
    } else {
      this.state.reserve.start.setHours(this.state._newHours);
      this.state.reserve.start.setMinutes(data);
      this.state._newHours = null;
      this.callBookButton(true);
      this.callbackText = strTime + ": " + this.state.reserve.startTime;
    }
  }

  callMinutesButton() {
    let buttons = this.createMinuteButtons();
    buttons.push([{text: strBackButton, callback_data: 'back'}]);

    this.state.menu = 'minutes';
    this.message.keyboard = {inline_keyboard: buttons};
    this.callbackText = strSelect + " " + strMinutes;
  }

  callCountMenu(data) {
    this.state.reserve.count = +data;
    this.callBookButton(true);
    this.callbackText = strCount + ": " + data;
  }

  callCountButton(data) {
    this.state.reserve.count = +data;
    this.callMainMenu('book');
    this.callbackText = strCount + ": " + data;
  }

  callListMenu(data) {
    if(data === 'back') {
      this.callMainButton();
    } else if(data === 'reload') {
        this.callListButton();
        this.message.text += '\n' + strReloadedLabel;
        this.message.text += (new Date).toLocaleDateString(dateLocale, datetimeOptions);
    } else {
      let reserveArray = this.fillReserveArray();
      let reserve = reserveArray[data - 1];
      let msgText;

      let buttons = [];
      if(this._user && admins.includes(this._user.id) ) {
        let button = {};
        button.text = strCancelButton;
        button.callback_data = 'cancel-' + reserve.createdAt.getTime();
        buttons.push([button]);

        button = {};
        button.text = strNoticeButton;
        button.callback_data = 'notice-' + reserve.telegramId;
        buttons.push([button]);
        msgText = reserve.getStateMessageText(true);
      } else {
        msgText = reserve.getStateMessageText(false);
      }
      buttons.push([{text: strBackButton, callback_data: 'back'}]);

      let keyboard = {inline_keyboard: buttons};
  
      this.state.menu = 'details';
      this.message.text = msgText;
      this.message.keyboard = keyboard;
      this.callbackText = strReserve;      
    }
  }

  callListButton() {
    let buttons = [];
    let reserveArray = this.fillReserveArray();

    if(reserveArray) {
      buttons = this.createCountButtons(reserveArray.length, 5);
    }

    buttons.push([{text: strReloadButton, callback_data: "reload"}]);
    buttons.push([{text: strBackButton, callback_data: 'back'}]);

    this.state.menu = 'list';
    this.message.text = strReserveListHeader + this.getReserveListMessage();
    this.message.keyboard = {inline_keyboard: buttons};
    this.callbackText = strReserveList;
  }

  callMyListMenu(data) {
    if(data === 'back') {
      this.callMainButton();
    } else {
      let keyField = this.state.reserve.fieldPositions['telegramId'];
      let keyValue = this.state.reserve.telegramId;
      let reserveRows = this.dataAdapter.getActiveReserveRows(keyField, keyValue);
      let reserveArray = this.state.reserve.createReserveArray(reserveRows);
      let reserve = reserveArray[data - 1];

      let buttons = [];
      buttons.push([{text: strBackButton, callback_data: 'back'}]);

      let msgText = reserve.getStateMessageText();
      let keyboard = {inline_keyboard: buttons};
  
      this.state.menu = 'myDetails';
      this.message.text = msgText;
      this.message.keyboard = keyboard;
      this.callbackText = strReserve;      
    }
  }

  callMyListButton() {
    let buttons = [];
    let keyField = this.state.reserve.fieldPositions['telegramId'];
    let keyValue = this.state.reserve.telegramId;

    let reserveRows = this.dataAdapter.getActiveReserveRows(keyField, keyValue);
    let reserveArray = this.state.reserve.createReserveArray(reserveRows);

    if(reserveArray) {
      buttons = this.createCountButtons(reserveArray.length, 5);
    }

    buttons.push([{text: strBackButton, callback_data: 'back'}]);

    this.state.menu = 'myList';
    this.message.text = strMyReserveListHeader + this.getReserveListMessage(reserveArray);
    this.message.keyboard = {inline_keyboard: buttons};
    this.callbackText = strReserveList;
  }

  callDetailsMenu(data) {
    if(data === 'back') {
      this.callListButton();
    } else {
      let splittedData = data.split('-');
      this.detailsHandlers[splittedData[0]].apply(this, [splittedData[1]]);
    }
  }

  callMyDetailsMenu(data) {
    if(data === 'back') {
      this.callMyListButton();
    }
  }

  callCancelButton(data) {
    let cancelDate = new Date();
    cancelDate.setTime(+data);

    let keyField = this.state.reserve.fieldPositions['createdAt'];
    let keyValue = cancelDate;

    this.dataAdapter.deleteReserveRow(keyField, keyValue);

    this.callListButton();
    this.callbackText = strDeleted + ': ';
    this.callbackText += cancelDate.toLocaleDateString(dateLocale, dateOptions) + ' ';
    this.callbackText += cancelDate.toLocaleTimeString(dateLocale, timeOptions);
  }

  callNoticeButton(data) {
    this.callListButton();
    this.notices.push({text: noticeText, chatId: data});
    this.callbackText = strNotice + ': ' + data;
  }

  callApplyButton() {
    this.fillReserveArray();
    this.state.reserve.findConflict();

    if(this.state.reserve.isCompleted) {
      this.state.reserve.createdAt = new Date();
      let row = this.state.reserve.toArray();
      this.dataAdapter.appendReserveRow(row);

      this.state.menu = 'main';
      this.message.text = strReserveComfirmedHeader;
      this.message.text += this.state.reserve.getStateMessageText();
      this.message.text += strReserveComfirmedFooter;
      this.message.keyboard = null;
      this.callbackText = strReserveComfirmed;

      // Notice admins
      let adminMsgText = this.state.reserve.getStateMessageText();
      for(let i = 0; i < admins.length; i++) {
        if(admins[i] != this._user.id) {
          this.notices.push({text: adminMsgText, chatId: admins[i]});
        }
      }

    } else {
      this.callBookButton(false);
      this.message.text = strReserveRefusedHeader;
      this.message.text += this.state.reserve.getStateMessageText();
      this.message.text += strReserveRefusedFooter;
      this.callbackText = strReserveRefused;
    }
  }

  createBookMenuKeyboard() {
    let buttons = [];
    buttons.push([{text: strDateButton, callback_data: "date"}]);
    buttons.push([{text: strTimeButton, callback_data: "time"}]);
    buttons.push([{text: strCountButton, callback_data: "count"}]);

    if(this.state.reserve.isCompleted) {
      let buttonRow = [];
      buttonRow.push({text: applyIcon + ' ' + strApply, callback_data: "apply"});
      buttons.push(buttonRow);
    }

    buttons.push([{text: strBackButton, callback_data: 'back'}]);

    return {inline_keyboard: buttons};    
  }

  createDateButtons(count = 6, rowSize = 3) {
      let buttons = [];
      let buttonRow = [];
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      
      for(let i =0; i < count; i++) {
        let newDate = new Date(today);
        newDate.setDate(newDate.getDate() + i);
        let dateStr = newDate.toLocaleDateString(dateLocale, dateOptions);
        buttonRow.push({text: dateStr, callback_data: i});
    
        if((i + 1) % rowSize == 0) {
          buttons.push(buttonRow);
          buttonRow = [];
        }
      }
      if(buttonRow.length > 0) buttons.push(buttonRow);
      
      return buttons;        
  }

  createTimeButtons(startTime = 9, endTime = 22, rowSize = 5) {
    let buttons = [];
    let buttonRow = [];
    
    for(let i = startTime; i <= endTime; i++) {
      buttonRow.push({text: i + ':', callback_data: i});
  
      if((i - startTime + 1) % rowSize == 0) {
        buttons.push(buttonRow);
        buttonRow = [];
      }
    }
    if(buttonRow.length > 0) buttons.push(buttonRow);
    
    return buttons;        
  }

  createMinuteButtons(step = 5, rowSize = 6) {
    let buttons = [];
    let buttonRow = [];
    
    for(let i = 0; i < (60 / step); i++) {
      buttonRow.push({text: i * step, callback_data: i * step});
  
      if((i + 1) % rowSize == 0) {
        buttons.push(buttonRow);
        buttonRow = [];
      }
    }
    if(buttonRow.length > 0) buttons.push(buttonRow);
    
    return buttons;        
  }

  createCountButtons(count = 5, rowSize = 5) {
    let buttons = [] 
    let buttonRow = [];

    for(let i = 1; i <= count; i++) {
      if(count < 10) {
        buttonRow.push({text: i + '\ufe0f\u20e3', callback_data: i});
      } else {
        buttonRow.push({text: i, callback_data: i});
      }
  
      if(i % rowSize == 0) {
        buttons.push(buttonRow);
        buttonRow = [];
      }
    }
    if(buttonRow.length > 0) buttons.push(buttonRow);
  
    return buttons;
  }

  fillReserveArray() {
    let reserveArray = this.state.reserve.reserveArray;

    if(!reserveArray && this.dataAdapter) {
      let reserveRows = this.dataAdapter.getActiveReserveRows();
      reserveArray = this.state.reserve.createReserveArray(reserveRows);
      this.state.reserve.reserveArray = reserveArray;
    }

    return reserveArray
  }

  getReserveListMessage(reserveArray = null) {
    let result = '';

    if(!reserveArray)
      reserveArray = this.fillReserveArray();

    if(!reserveArray || reserveArray.length < 0) {
      result += strNoBooksCaption;
      return result;
    }
    
    let listDate;
    let bookNum;
  
    for(let i = 0; i < reserveArray.length; i++){
      let row = '';
      let reserve = reserveArray[i];
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