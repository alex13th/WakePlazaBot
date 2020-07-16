describe("class SupProcessor", function() {
  describe("Свойства объекта по умолчанию", function() {
    let callbackProccessor;

    it("Создание экземпляра", function() {
      callbackProccessor = new SupProcessor();
    });

    it("Проверка типа состояния", function() {
      assert.equal(callbackProccessor.state.type, 'sup');
    });

    it("Проверка меню состояния", function() {
      assert.equal(callbackProccessor.state.menu, 'main');
    });
  });
  
  describe("Обработка главного меню", function() {
    it("Проверка обработки кнопки Начать бронирование ", function() {
      let callbackProcessor = new SupProcessor();

      let keyboard = callbackProcessor.createBookMenuKeyboard();
      let msgText = strReserveStateHeader + callbackProcessor.state.reserve.getStateMessageText();
        
      callbackProcessor.proceedCallback("book");

      assert.equal(callbackProcessor.state.type, "sup");
      assert.equal(callbackProcessor.state.menu, "book");
      assert.equal(callbackProcessor.message.text, msgText);
      assert.deepEqual(callbackProcessor.message.keyboard, keyboard);
    });
  });

  describe("Обработка пунктов меню", function() {
    let callbackProcessor;

    it("Создание экземпляра", function() {
      callbackProcessor = new SupProcessor(new GoogleSheetDataAdapter(null, 
        null, null));
        callbackProcessor.state.menu = "book";
      });

    it("Кнопка Сет", function() {
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

    it("Кнопка Час", function() {
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
      callbackProcessor.state.menu = "book";

      let buttons = callbackProcessor.createCountButtons();
      buttons.push([{text: strBackButton, callback_data: 'back'}]);

      let keyboard = null;

      let msgText = strReserveComfirmedHeader;
      msgText += callbackProcessor.state.reserve.getStateMessageText();

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
      let callbackProccessor = new SupProcessor();

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
      it("Проверка изменения Количество", function() {
        let keyboard = callbackProccessor.createBookMenuKeyboard();
        callbackProccessor.state.menu = "book";

        callbackProccessor.proceedCallback("2");

        assert.equal(callbackProccessor.state.menu, "book");
        assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
        assert.equal(callbackProccessor.state.reserve.bookCount, 2);
        assert.equal(callbackProccessor.callbackText, 2);

        callbackProccessor.proceedCallback("3");

        assert.equal(callbackProccessor.state.reserve.bookCount, 3);
        assert.equal(callbackProccessor.callbackText, 3);
    });
});
});
