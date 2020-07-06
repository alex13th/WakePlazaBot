class ReserveCallbackProcessor {
  constructor(dataAdapter, state) {
    this.callbackText = '';
    this.message = {};
    this.dataAdapter = dataAdapter;

    if(state) {
        this.state = new ReserveState(state);
    } else {
        this.state = new ReserveState();
    }

    this.menuHandlers = {};
    this.menuHandlers['main'] = this.callMainMenu;
    this.menuHandlers['book'] = this.callBookMenu;
    this.menuHandlers['date'] = this.callDateMenu;
    this.menuHandlers['time'] = this.callTimeMenu;
    this.menuHandlers['minutes'] = this.callMinutesMenu;
    this.menuHandlers['count'] = this.callCountMenu;
    this.menuHandlers['list'] = this.callListMenu;

    this.mainHandlers = {};
    this.mainHandlers['book'] = this.callBookButton;
    this.mainHandlers['list'] = this.callListButton;

    this.bookHandlers = {};
    this.bookHandlers['date'] = this.callDateButton;
    this.bookHandlers['time'] = this.callTimeButton;
    this.bookHandlers['count'] = this.callCountButton;
    this.bookHandlers['apply'] = this.callApplyButton;

  }

  proceedCallback(data) {
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
    if(!(data === 'back')) {
      this.bookHandlers[data].apply(this, [data]);
    } else {
      this.callMainButton();
    }
  }

  callBookButton(check = true) {
    let msgText = strReserveStateHeader;
    let keyboard;
    this.state.menu = 'book';

    if(check) {

      if(!this.state.reserve.reserveArray && this.dataAdapter) {
        let reserveRows = this.dataAdapter.getActiveReserveRows();
        let reserveArray = this.state.reserve.createReserveArray(reserveRows);
        this.state.reserve.reserveArray = reserveArray;
      }

      this.state.reserve.findConflict();
    }

    msgText += this.state.reserve.getStateMessageText();

    keyboard = this.createBookMenuKeyboard();

    this.message.text = msgText;
    this.message.keyboard = keyboard;
    this.callbackText = strReserve;
  }
  
  callDateMenu(data) {
    if(!(data === 'back')) {
      let newDate = new Date();
      let startDate = this.state.reserve.start;
      newDate.setHours(startDate.getHours(), startDate.getMinutes(), 0, 0);
      newDate.setDate(newDate.getDate() + parseInt(data));
      this.state.reserve.start = newDate;
      this.callBookButton(true);
      this.callbackText = strDay + ": " + this.state.reserve.start.toLocaleDateString(dateLocale, dateOptions);
    } else {
      this.callBookButton(false);
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
    if(!(data === 'back')) {
      this.state.reserve.start.setHours(data);
      this.callMinutesButton();
    } else {
      this.callBookButton(true);
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
    if(!(data === 'back')) {
      this.state.reserve.start.setMinutes(data);
      this.callBookButton(true);
      this.callbackText = strTime + ": " + this.state.reserve.startTime;
    } else {
      this.callTimeButton();
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
    }
  }

  callListButton() {
    let buttons = [];
    buttons.push([{text: strBackButton, callback_data: 'back'}]);

    this.state.menu = 'list';
    this.message.text = this.getReserveListMessage();
    this.message.keyboard = {inline_keyboard: buttons};
    this.callbackText = strReserveList;
  }

  createBookMenuKeyboard() {
    let buttons = [];
    buttons.push([{text: strDateButton, callback_data: "date"}]);
    buttons.push([{text: strTimeButton, callback_data: "time"}]);
    buttons.push([{text: strCountButton, callback_data: "count"}]);
    buttons.push([{text: strBackButton, callback_data: "back"}]);

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
      buttonRow.push({text: i, callback_data: i});
  
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

  createCountButtons() {
    let buttons = [] 
    buttons.push([ {text: '1\ufe0f\u20e3', callback_data: '1'}, 
      {text: '2\ufe0f\u20e3', callback_data: '2'}, 
      {text: '3\ufe0f\u20e3', callback_data: '3'}, 
      {text: '4\ufe0f\u20e3', callback_data: '4'}, 
      {text: '5\ufe0f\u20e3', callback_data: '5'}]);

    return buttons;
  }
}