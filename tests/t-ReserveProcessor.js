describe("class ReserveProcessor", function() {
  describe("Сервисные методы", function() {
      let callbackProccessor = new ReserveProcessor();
      it("Проверка функции генерации кнопок времени", function() {
          let buttons = [];
          let buttonRow = [];
          buttonRow.push({text: 0, callback_data: 0});
          buttonRow.push({text: 5, callback_data: 5});
          buttonRow.push({text: 10, callback_data: 10});
          buttonRow.push({text: 15, callback_data: 15});
          buttonRow.push({text: 20, callback_data: 20});
          buttonRow.push({text: 25, callback_data: 25});
          buttons.push(buttonRow);
          
          buttonRow = [];
          buttonRow.push({text: 30, callback_data: 30});
          buttonRow.push({text: 35, callback_data: 35});
          buttonRow.push({text: 40, callback_data: 40});
          buttonRow.push({text: 45, callback_data: 45});
          buttonRow.push({text: 50, callback_data: 50});
          buttonRow.push({text: 55, callback_data: 55});
          buttons.push(buttonRow);

          assert.deepEqual(callbackProccessor.createMinuteButtons(), buttons);
      });

  });

  describe("Обработка пунктов меню", function() {
    let callbackProccessor = new ReserveProcessor();

    it("Кнопка Начать бронирование", function() {
      let keyboard = callbackProccessor.createBookMenuKeyboard();
      let msgText = strReserveStateHeader + callbackProccessor.state.reserve.getStateMessageText();

      callbackProccessor.proceedCallback("book");

      assert.equal(callbackProccessor.state.menu, "book");
      assert.equal(callbackProccessor.message.text, msgText);
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.equal(callbackProccessor.callbackText, strReserve);
    });

    it("Кнопка Список активных бронирований ", function() {
      let dataAdapter = new GoogleSheetDataAdapter(WAKE_SPREAD_SHEET, ENTRY_SHEET_NAME, LIST_SHEET_NAME);
      dataAdapter.getActiveReserveRows();
      dataAdapter.spreadSheet.sheet.range.values = reserveValues;
      
      let callbackProcessor = new ReserveProcessor(dataAdapter);
      
      let buttons = callbackProcessor.createCountButtons(12, 5);
      buttons.push([{text: strBackButton, callback_data: "back"}]);
      
      let keyboard = {inline_keyboard: buttons};
      let msgText = "<b>Список активных бронирований: </b>\n<b>04.07.2020</b>\n1.  10:00 - 10:05\n2.  11:30 - 11:40\n3.  12:00 - 12:10\n4.  12:00 - 12:05\n5.  13:00 - 13:05\n6.  13:00 - 13:15\n7.  14:00 - 14:05\n8.  15:00 - 15:05\n9.  16:00 - 16:05\n10.  17:00 - 17:10\n\n<b>06.07.2020</b>\n11.  15:00 - 15:05\n\n<b>07.07.2020</b>\n12.  10:00 - 10:05\n";

      callbackProcessor.proceedCallback("list");

      assert.equal(callbackProcessor.state.menu, 'list');
      assert.deepEqual(callbackProcessor.message.keyboard, keyboard);
      assert.equal(callbackProcessor.message.text, msgText);
      assert.equal(callbackProcessor.callbackText, strReserveList);
    });

    it("Кнопка Мои бронирования ", function() {
      let dataAdapter = new GoogleSheetDataAdapter(WAKE_SPREAD_SHEET, ENTRY_SHEET_NAME, LIST_SHEET_NAME);
      dataAdapter.getActiveReserveRows();
      dataAdapter.spreadSheet.sheet.range.values = reserveValues;
      
      let callbackProcessor = new ReserveProcessor(dataAdapter);
      callbackProcessor.proceedCommand(null, {"id":143929127,"first_name":"Alexey","last_name":"Sukharev"});
      
      let buttons = callbackProcessor.createCountButtons(7, 5);
      buttons.push([{text: strBackButton, callback_data: "back"}]);
      
      let keyboard = {inline_keyboard: buttons};
      let msgText = "<b>Список Ваших бронирований: </b>\n<b>04.07.2020</b>\n1.  11:30 - 11:40\n2.  12:00 - 12:10\n3.  13:00 - 13:05\n4.  16:00 - 16:05\n5.  17:00 - 17:10\n\n<b>06.07.2020</b>\n6.  15:00 - 15:05\n\n<b>07.07.2020</b>\n7.  10:00 - 10:05\n";

      callbackProcessor.proceedCallback("myList");

      assert.equal(callbackProcessor.state.menu, 'myList');
      assert.deepEqual(callbackProcessor.message.keyboard, keyboard);
      assert.equal(callbackProcessor.message.text, msgText);
      assert.equal(callbackProcessor.callbackText, strReserveList);
    });

    it("Кнопка с номером бронирования", function() {
      let dataAdapter = new GoogleSheetDataAdapter(WAKE_SPREAD_SHEET, ENTRY_SHEET_NAME, LIST_SHEET_NAME);
      dataAdapter.getActiveReserveRows();
      dataAdapter.spreadSheet.sheet.range.values = reserveValues;
      
      let callbackProcessor = new ReserveProcessor(dataAdapter);
      callbackProcessor.state.menu = "list";

      let buttons = [];
      buttons.push([{text: strBackButton, callback_data: "back"}]);
      
      let keyboard = {inline_keyboard: buttons};

      callbackProcessor.proceedCallback("10");
      let msgText = callbackProcessor.state.reserve.reserveArray[9].getStateMessageText();

      assert.equal(callbackProcessor.state.menu, 'details');
      assert.deepEqual(callbackProcessor.message.keyboard, keyboard);
      assert.equal(callbackProcessor.message.text, msgText);
      assert.equal(callbackProcessor.callbackText, strReserve);
    });

    it("Кнопка Назад", function() {
      let msgText = strMainMenu;
      let keyboard = {inline_keyboard: 
        [[{text: strBeginReserve, callback_data: 'book'}], 
        [{text: strReserveList, callback_data: 'list'}]]};

      callbackProccessor.state.menu = "book";
      callbackProccessor.proceedCallback("back");

      assert.equal(callbackProccessor.state.menu, "main");
      assert.equal(callbackProccessor.message.text, msgText);
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.equal(callbackProccessor.callbackText, strMainMenu);
    });

    it("Кнопка Выбрать дату", function() {
      let buttons = callbackProccessor.createDateButtons();
      buttons.push([{text: strBackButton, callback_data: 'back'}]);
      let keyboard = {inline_keyboard: buttons};
      let msgText = callbackProccessor.message.text;

      callbackProccessor.state.menu = "book";
      callbackProccessor.proceedCallback("date");

      assert.equal(callbackProccessor.state.menu, "date");
      assert.equal(callbackProccessor.message.text, msgText);
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.equal(callbackProccessor.callbackText, strDateButton);
    });
    
    it("Кнопка Выбрать время", function() {
      let buttons = callbackProccessor.createTimeButtons();
      buttons.push([{text: strBackButton, callback_data: 'back'}]);
      let keyboard = {inline_keyboard: buttons};
      let msgText = callbackProccessor.message.text;

      callbackProccessor.state.menu = "book";
      callbackProccessor.proceedCallback("time");

      assert.equal(callbackProccessor.state.menu, "time");
      assert.equal(callbackProccessor.message.text, msgText);
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.equal(callbackProccessor.callbackText, strSelect + " " + strHour);
    });

    it("Кнопка выбора минут", function() {
      let buttons = callbackProccessor.createMinuteButtons();
      buttons.push([{text: strBackButton, callback_data: 'back'}]);
      let keyboard = {inline_keyboard: buttons};
      let msgText = callbackProccessor.message.text;

      callbackProccessor.state.menu = "time";
      callbackProccessor.proceedCallback("minutes");

      assert.equal(callbackProccessor.state.menu, "minutes");
      assert.equal(callbackProccessor.message.text, msgText);
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.equal(callbackProccessor.callbackText, strSelect + " " + strMinutes);
    });
  });

  describe("Изменение данных", function() {
    let callbackProccessor = new ReserveProcessor();

    it("Проверка изменения даты", function() {
      let keyboard = callbackProccessor.createBookMenuKeyboard();
      let newDate = new Date(callbackProccessor.state.reserve.start);
      newDate.setDate(today.getDate() + 1);

      callbackProccessor.state.menu = "date";
      callbackProccessor.proceedCallback(1);

      assert.equal(callbackProccessor.state.menu, "book");
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.deepEqual(callbackProccessor.state.reserve.start, newDate);
      assert.equal(callbackProccessor.callbackText, 
          strDay + ": " + newDate.toLocaleDateString(dateLocale, dateOptions) );
    });

    it("Проверка изменения часов", function() {
      let buttons = callbackProccessor.createMinuteButtons();
      buttons.push([{text: strBackButton, callback_data: 'back'}]);
      let keyboard = {inline_keyboard: buttons};
      let newDate = new Date(callbackProccessor.state.reserve.start);
      newDate.setHours(18);

      callbackProccessor.state.menu = "time";
      callbackProccessor.proceedCallback(18);

      assert.equal(callbackProccessor.state.menu, "minutes");
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.deepEqual(callbackProccessor.state.reserve.start, newDate);
      assert.equal(callbackProccessor.callbackText, strSelect + " " + strMinutes);
    });

    it("Проверка изменения минут", function() {
      let keyboard = callbackProccessor.createBookMenuKeyboard();
      let newDate = new Date(callbackProccessor.state.reserve.start);
      newDate.setMinutes(40);

      callbackProccessor.state.menu = "minutes";
      callbackProccessor.proceedCallback(40);

      assert.equal(callbackProccessor.state.menu, "book");
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.deepEqual(callbackProccessor.state.reserve.start, newDate);
      assert.equal(callbackProccessor.callbackText, strTime + ": 18:40");
    });

    it("Проверка изменения количества", function() {
      let keyboard = callbackProccessor.createBookMenuKeyboard();

      callbackProccessor.state.menu = "count";
      callbackProccessor.proceedCallback(3);

      assert.equal(callbackProccessor.state.menu, "book");
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.equal(callbackProccessor.state.reserve.count, 3);
      assert.equal(callbackProccessor.callbackText, strCount + ": 3");
    });
  });

  describe("Административные функции", function() {
    it("Админская кнопка с номером бронирования", function() {
      let dataAdapter = new GoogleSheetDataAdapter(WAKE_SPREAD_SHEET, ENTRY_SHEET_NAME, LIST_SHEET_NAME);
      dataAdapter.getActiveReserveRows();
      dataAdapter.spreadSheet.sheet.range.values = reserveValues;
      let user = {"id":586350636,"first_name":"Alexey","last_name":"Sukharev"};

      let callbackProcessor = new ReserveProcessor(dataAdapter);
      callbackProcessor.state.menu = "list";

      callbackProcessor.proceedCallback("10", user);
      let msgText = callbackProcessor.state.reserve.reserveArray[9].getStateMessageText();

      let buttons = [];
      let button = {};
      button.text = strCancelButton;
      button.callback_data = 'cancel-' + callbackProcessor.state.reserve.reserveArray[9].createdAt.getTime();
      buttons.push([button]);

      button = {};
      button.text = strNoticeButton;
      button.callback_data = 'notice-' + callbackProcessor.state.reserve.reserveArray[9].telegramId;
      buttons.push([button]);

      buttons.push([{text: strBackButton, callback_data: "back"}]);
      
      let keyboard = {inline_keyboard: buttons};

      assert.equal(callbackProcessor.state.menu, 'details');
      assert.deepEqual(callbackProcessor.message.keyboard, keyboard);
      assert.equal(callbackProcessor.message.text, msgText);
      assert.equal(callbackProcessor.callbackText, strReserve);
    });

    it("Админская кнопка Отмена бронирования", function() {
      let dataAdapter = new GoogleSheetDataAdapter(WAKE_SPREAD_SHEET, ENTRY_SHEET_NAME, LIST_SHEET_NAME);
      dataAdapter.getActiveReserveRows();
      dataAdapter.spreadSheet.sheet.range.values = reserveValues;
      let user = {"id":586350636,"first_name":"Alexey","last_name":"Sukharev"};
      let reserve = new Reserve();
      reserve.fromArray(reserveValues[9]);

      let callbackProcessor = new ReserveProcessor(dataAdapter);
      callbackProcessor.state.menu = "details";

      let callbackData = "cancel-";
      callbackData += reserve.createdAt.getTime();

      callbackProcessor.proceedCallback(callbackData, user);
      let msgText = "<b>Список активных бронирований: </b>\n<b>04.07.2020</b>\n1.  10:00 - 10:05\n2.  11:30 - 11:40\n3.  12:00 - 12:10\n4.  12:00 - 12:05\n5.  13:00 - 13:05\n6.  13:00 - 13:15\n7.  14:00 - 14:05\n8.  15:00 - 15:05\n9.  17:00 - 17:10\n\n<b>06.07.2020</b>\n10.  15:00 - 15:05\n\n<b>07.07.2020</b>\n11.  10:00 - 10:05\n";

      let callbackText = strDeleted + ': ';
      callbackText += reserve.createdAt.toLocaleDateString(dateLocale, dateOptions) + ' ';
      callbackText += reserve.createdAt.toLocaleTimeString(dateLocale, timeOptions);

      let buttons = callbackProcessor.createCountButtons(11, 5);
      buttons.push([{text: strBackButton, callback_data: "back"}]);
      
      let keyboard = {inline_keyboard: buttons};

      assert.equal(callbackProcessor.state.menu, 'list');
      assert.deepEqual(callbackProcessor.message.keyboard, keyboard);
      assert.equal(callbackProcessor.message.text, msgText);
      assert.equal(callbackProcessor.callbackText, callbackText);
    });

    it("Админская кнопка Оповещение об уточнении", function() {
      let dataAdapter = new GoogleSheetDataAdapter(WAKE_SPREAD_SHEET, ENTRY_SHEET_NAME, LIST_SHEET_NAME);
      dataAdapter.getActiveReserveRows();
      dataAdapter.spreadSheet.sheet.range.values = reserveValues;
      let user = {"id":480666793,"first_name":"Alexey","last_name":"Sukharev"};
      let reserve = new Reserve();
      reserve.fromArray(reserveValues[9]);

      let callbackProcessor = new ReserveProcessor(dataAdapter);
      callbackProcessor.state.menu = "details";

      let callbackData = "notice-";
      callbackData += 480666793;

      callbackProcessor.proceedCallback(callbackData, user);
      let msgText = "<b>Список активных бронирований: </b>\n<b>04.07.2020</b>\n1.  10:00 - 10:05\n2.  11:30 - 11:40\n3.  12:00 - 12:10\n4.  12:00 - 12:05\n5.  13:00 - 13:05\n6.  13:00 - 13:15\n7.  14:00 - 14:05\n8.  15:00 - 15:05\n9.  17:00 - 17:10\n\n<b>06.07.2020</b>\n10.  15:00 - 15:05\n\n<b>07.07.2020</b>\n11.  10:00 - 10:05\n";

      let callbackText = strNotice + ': ' + 480666793;

      let buttons = callbackProcessor.createCountButtons(11, 5);
      buttons.push([{text: strBackButton, callback_data: "back"}]);
      
      let keyboard = {inline_keyboard: buttons};

      assert.equal(callbackProcessor.state.menu, 'list');
      assert.deepEqual(callbackProcessor.message.keyboard, keyboard);
      assert.equal(callbackProcessor.notice.chatId, 480666793);
      assert.equal(callbackProcessor.notice.text, noticeText);
      assert.equal(callbackProcessor.message.text, msgText);
      assert.equal(callbackProcessor.callbackText, callbackText);
    });
  });
});

