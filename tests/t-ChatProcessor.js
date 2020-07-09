describe("class ChatProcessor", function() {
  describe("Проверка наличия функций регистрации обработчиков", function(){
    let strUpdate = '{"message": {"chat": {"id": 586350636}, "entities": [{"type": "bot_command"}]}}';
    // update.message = {};
    // update.message.chat = {id: 586350636};
    // update.message.entities = [{type: "bot_command"}];

    let chatProcessor = new ChatProcessor(strUpdate, props, cache);

    it("Проверка регистрация обработчика команд", function() {
      let cmdProccessor = {};
      assert.isFunction(chatProcessor.registerCommandProcessor);
      chatProcessor.registerCommandProcessor("start", cmdProccessor);
      assert.deepEqual(chatProcessor.commandProcessors["start"], cmdProccessor);
    });

    it("Проверка регистрация обработчика callback", function() {
      let cmdProccessor = {};
      assert.isFunction(chatProcessor.registerCallbackProcessor);
      chatProcessor.registerCallbackProcessor("wake", cmdProccessor);
      assert.deepEqual(chatProcessor.callbackProcessors["wake"], cmdProccessor);
    });

    it("Проверка регистрация обработчика message", function() {
      let cmdProccessor = {};
      assert.isFunction(chatProcessor.registerMessageProcessor);
      chatProcessor.registerMessageProcessor("wake", cmdProccessor);
      assert.deepEqual(chatProcessor.messageProcessors["wake"], cmdProccessor);
    });
  });

  describe("Тестирование парсинга команд", function(){
    let strUpdate = '{"message": {';
    strUpdate += '"text": "/start 18:30 26.06.2020",';
    strUpdate += '"chat": {"id": 586350636},';
    strUpdate += '"entities": [{"type": "bot_command"}]}}';

    let chatProcessor = new ChatProcessor(strUpdate, props, cache);

    it("Проверка chatId", function() {
      assert.equal(chatProcessor.chatId, 586350636);
    });

    it("Проверка названия команды", function() {
      assert.equal(chatProcessor.command.name, "start");
    });

    it("Проверка наличия команды", function() {
      assert.equal(chatProcessor.hasCommand, true);
    });

    it("Проверка параметров команды команды", function() {
      assert.equal(chatProcessor.command.params.length, 2);
      assert.equal(chatProcessor.command.params[0], "18:30");
      assert.equal(chatProcessor.command.params[1], "26.06.2020");
    });
  })
  
  describe("Тестирование выполнения команд", function() {
    
    it("Проверка выполнения /start", function() {
      let strUpdate = '{"update_id":354673862, "message":{"message_id":399,"from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1593763022,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}}';

      let chatProcessor = new ChatProcessor(strUpdate, props, cache);
      let wakeProcessor = new WakeProcessor();
      let defaultProcessor = new DefaultCommandProcessor();

      chatProcessor.registerCommandProcessor('start', defaultProcessor);
      chatProcessor.registerCommandProcessor('help', defaultProcessor);
      chatProcessor.registerCommandProcessor('wake', wakeProcessor);
      chatProcessor.proceed(true);

      assert.isUndefined(props.getProperty(586350636));
    });

    it("Проверка выполнения /help", function() {
      let strUpdate = '{"update_id":354673863,"message":{"message_id":403,"from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1593765384,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}}';

      let chatProcessor = new ChatProcessor(strUpdate, props, cache);
      let wakeProcessor = new WakeProcessor();
      let defaultProcessor = new DefaultCommandProcessor();

      chatProcessor.registerCommandProcessor('start', defaultProcessor);
      chatProcessor.registerCommandProcessor('help', defaultProcessor);
      chatProcessor.registerCommandProcessor('wake', wakeProcessor);
      chatProcessor.proceed();

      assert.isUndefined(props.getProperty(586350636));
    });

    it("Проверка выполнения /wake", function() {
      let strUpdate = '{"update_id":354673864,"message":{"message_id":407,"from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1593765485,"text":"/wake","entities":[{"offset":0,"length":5,"type":"bot_command"}]}}';

      let chatProcessor = new ChatProcessor(strUpdate, props, cache);
      let wakeProcessor = new WakeProcessor();
      let defaultProcessor = new DefaultCommandProcessor();

      chatProcessor.registerCommandProcessor('start', defaultProcessor);
      chatProcessor.registerCommandProcessor('help', defaultProcessor);
      chatProcessor.registerCommandProcessor('wake', wakeProcessor);
      chatProcessor.proceed(true);

      assert.equal(props.getProperty('586350636-1241'), wakeProcessor.state.toJSON());
    });
  });

  describe("Тестирование обработки callback", function() {
    describe("Проверка обработки меню Wake", function() {
      it("Проверка кнопки Начать бронирование", function() {
        let strUpdate = '{"update_id":354673865,';
        strUpdate += '"callback_query":{"id":"2518356807915706815",';
        strUpdate += '"from":{"id":586350636,"is_bot":false,"first_name":"Alexey",';
        strUpdate += '"last_name":"Sukharev","language_code":"en"},';
        strUpdate += '"message":{"message_id":1241,';
        strUpdate += '"from":{"id":1273795086,"is_bot":true,"first_name":';
        strUpdate += '"DevWakeBot","username":"DevWakeBot"},';
        strUpdate += '"chat":{"id":586350636,"first_name":"Alexey",';
        strUpdate += '"last_name":"Sukharev","type":"private"},';
        strUpdate += '"date":1593765995,"text":"Message Text",';
        strUpdate += '"entities":[{"offset":0,"length":30,"type":"bold"}],';
        strUpdate += '"reply_markup":{"inline_keyboard":';
        strUpdate += '[[{"text":"\u041d\u0430\u0447\u0430\u0442\u044c \u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435","callback_data":"book"}],[{"text":"\u0421\u043f\u0438\u0441\u043e\u043a \u0430\u043a\u0442\u0438\u0432\u043d\u044b\u0445 \u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0439","callback_data":"list"}]]}},';
        strUpdate += '"chat_instance":"-1517723406088083073","data":"book"}}';
        let update = JSON.parse(strUpdate);
        let stateJSON = '{"id":"586350636-1241","type":"wake","menu":"main","start":1593705600000,"count":1,"set_type":"set"}';
        let chatProcessor = new ChatProcessor(strUpdate, props, cache);

        props.setProperty(update.callback_query.message.chat.id, stateJSON);

        let wakeCallbackProcessor = new WakeProcessor();

        chatProcessor.registerCallbackProcessor('wake', wakeCallbackProcessor);
        chatProcessor.proceed();

        assert.equal(props.getProperty('586350636-1241'), wakeCallbackProcessor.state.toJSON());
      });

      it("Проверка кнопки Выбрать дату", function() {
        let strUpdate = '{"update_id":354673870,';
        strUpdate += '"callback_query":{"id":"2518356807773773505",';
        strUpdate += '"from":{"id":586350636,"is_bot":false,"first_name":"Alexey",';
        strUpdate += '"last_name":"Sukharev","language_code":"en"},';
        strUpdate += '"message":{"message_id":1241,';
        strUpdate += '"from":{"id":1273795086,"is_bot":true,"first_name":';
        strUpdate += '"DevWakeBot","username":"DevWakeBot"},';
        strUpdate += '"chat":{"id":586350636,"first_name":"Alexey",';
        strUpdate += '"last_name":"Sukharev","type":"private"},';
        strUpdate += '"date":1593767429,"edit_date":1593767473,';
        strUpdate += '"text":"Message text",';
        strUpdate += '"entities":[{"offset":0,"length":23,"type":"bold"},{"offset":24,"length":6,"type":"bold"},{"offset":43,"length":5,"type":"bold"},{"offset":52,"length":12,"type":"bold"}],"reply_markup":{"inline_keyboard":[[{"text":"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0434\u0430\u0442\u0443","callback_data":"date"}],[{"text":"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0432\u0440\u0435\u043c\u044f","callback_data":"time"}],[{"text":"\u0421\u0435\u0442","callback_data":"set"},{"text":"\u0427\u0430\u0441","callback_data":"hour"}],[{"text":"\ud83c\udfc4\u200d\u2642\ufe0f \u0412\u0435\u0439\u043a\u0431\u043e\u0440\u0434","callback_data":"board"},{"text":"\ud83d\udc59 \u0413\u0438\u0434\u0440\u043e\u043a\u043e\u0441\u0442\u044e\u043c","callback_data":"hydro"}]]}},';
        strUpdate += '"chat_instance":"-1517723406088083073","data":"date"}}';
        let update = JSON.parse(strUpdate);
        let stateJSON = '{"type":"wake","menu":"book","start":1593705600000,"count":1,"set_type":"set"}';
        props.setProperty(update.callback_query.message.chat.id, stateJSON);

        let chatProcessor = new ChatProcessor(strUpdate, props, cache);
        let wakeCallbackProcessor = new WakeProcessor();

        chatProcessor.registerCallbackProcessor('wake', wakeCallbackProcessor);
        chatProcessor.proceed(true);

        assert.equal(props.getProperty('586350636-1241'), wakeCallbackProcessor.state.toJSON());
      });
    });
  });
});
