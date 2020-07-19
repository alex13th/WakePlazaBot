describe("class WakeProcessor", function() {
  describe("Свойства объекта по умолчанию", function() {
      let callbackProccessor = new WakeProcessor();

      it("Создание экземпляра", function() {
        callbackProccessor = new WakeProcessor();
      });

      it("Проверка типа состояния", function() {
          assert.equal(callbackProccessor.state.type, 'wake');
      });

      it("Проверка меню состояния", function() {
          assert.equal(callbackProccessor.state.menu, 'main');
      });
  });
  
  describe("Обработка главного меню", function() {
    it("Проверка обработки кнопки Начать бронирование ", function() {
      let callbackProcessor = new WakeProcessor();

      let keyboard = callbackProcessor.createBookMenuKeyboard();
      let msgText = strReserveStateHeader + callbackProcessor.state.reserve.getStateMessageText();
        
      callbackProcessor.proceedCallback("book");

      assert.equal(callbackProcessor.state.type, "wake");
      assert.equal(callbackProcessor.state.menu, "book");
      assert.equal(callbackProcessor.message.text, msgText);
      assert.deepEqual(callbackProcessor.message.keyboard, keyboard);
    });
  });

  describe("Обработка пунктов меню", function() {
    let callbackProcessor = new WakeProcessor(new GoogleSheetDataAdapter(null, 
      "wake", "wake"));
    callbackProcessor.state.menu = "book";

    it("Обработка кнопки Сет", function() {
      let buttons = callbackProcessor.createCountButtons();
      buttons.push([{text: strBackButton, callback_data: 'back'}]);
      let keyboard = {inline_keyboard: buttons};
      let msgText = callbackProcessor.message.text;

      callbackProcessor.proceedCallback("set");

      assert.equal(callbackProcessor.state.menu, "set");
      assert.equal(callbackProcessor.message.text, msgText);
      assert.deepEqual(callbackProcessor.message.keyboard, keyboard);
      assert.equal(callbackProcessor.callbackText, strSet);
    });

    it("Обработка кнопки Час", function() {
      let buttons = callbackProcessor.createCountButtons();
      buttons.push([{text: strBackButton, callback_data: 'back'}]);

      let keyboard = {inline_keyboard: buttons};
      let msgText = callbackProcessor.message.text;

      callbackProcessor.state.menu = "book";

      callbackProcessor.proceedCallback("hour");

      assert.equal(callbackProcessor.state.menu, "hour");
      assert.equal(callbackProcessor.message.text, msgText);
      assert.deepEqual(callbackProcessor.message.keyboard, keyboard);
      assert.equal(callbackProcessor.callbackText, strHour);
    });

    it("Обработка кнопки Забронировать", function() {
      let reserveRow = callbackProcessor.state.reserve.toArray();
      reserveRow.push('=IFERROR(VLOOKUP(B:B;Users!A:C;3;FALSE))');
      callbackProcessor.state.menu = "book";

      let buttons = callbackProcessor.createCountButtons();
      buttons.push([{text: strBackButton, callback_data: 'back'}]);

      let keyboard = null;

      let msgText = strReserveComfirmedHeader;
      msgText += callbackProcessor.state.reserve.getStateMessageText();
      msgText += strReserveComfirmedFooter;

      callbackProcessor.proceedCallback("apply");
      reserveRows = callbackProcessor.dataAdapter.getActiveReserveRows();

      assert.equal(callbackProcessor.state.menu, "main");
      assert.equal(callbackProcessor.message.text, msgText);
      assert.deepEqual(callbackProcessor.message.keyboard, keyboard);
      assert.equal(callbackProcessor.callbackText, strReserveComfirmed);
      assert.deepEqual(reserveRows[reserveRows.length - 1], reserveRow);
    });
  });

  describe("Проверка изменения данных", function() {
      let callbackProccessor = new WakeProcessor();

      it("Проверка изменения Сет", function() {
          let keyboard = callbackProccessor.createBookMenuKeyboard();
          callbackProccessor.state.menu = "set";

          callbackProccessor.proceedCallback(4);

          assert.equal(callbackProccessor.state.menu, "book");
          assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
          assert.equal(callbackProccessor.state.reserve.count, 4);
          assert.equal(callbackProccessor.state.reserve.setType, "set");
          assert.equal(callbackProccessor.callbackText, strSet + ": 4");
      });

      it("Проверка изменения Час", function() {
          let keyboard = callbackProccessor.createBookMenuKeyboard();
          callbackProccessor.state.menu = "hour";

          callbackProccessor.proceedCallback(2);

          assert.equal(callbackProccessor.state.menu, "book");
          assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
          assert.equal(callbackProccessor.state.reserve.count, 2);
          assert.equal(callbackProccessor.state.reserve.setType, "hour");
          assert.equal(callbackProccessor.callbackText, strHour + ": 2");
      });

      it("Проверка изменения Вейкборд", function() {
          let keyboard = callbackProccessor.createBookMenuKeyboard();
          callbackProccessor.state.menu = "book";

          callbackProccessor.proceedCallback("board");

          assert.equal(callbackProccessor.state.menu, "book");
          assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
          assert.equal(callbackProccessor.state.reserve.board, 1);
          assert.equal(callbackProccessor.callbackText, strAddBoard);

          callbackProccessor.proceedCallback("board");

          assert.equal(callbackProccessor.state.reserve.board, 0);
          assert.equal(callbackProccessor.callbackText, strRemoveBoard);

      });

      it("Проверка изменения Гидрокостюм", function() {
          let keyboard = callbackProccessor.createBookMenuKeyboard();
          callbackProccessor.state.menu = "book";

          callbackProccessor.proceedCallback("hydro");

          assert.equal(callbackProccessor.state.menu, "book");
          assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
          assert.equal(callbackProccessor.state.reserve.hydro, 1);
          assert.equal(callbackProccessor.callbackText, strAddHydro);

          callbackProccessor.proceedCallback("hydro");

          assert.equal(callbackProccessor.state.reserve.hydro, 0);
          assert.equal(callbackProccessor.callbackText, strRemoveHydro);
      });
  });
});
