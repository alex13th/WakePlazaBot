describe("class ChatProcessor", function() {
  let cache = new GoogleCache();

  describe("Проверка наличия функций регистрации обработчиков", function(){
    let update = {};
    update.message = {};
    update.message.chat = {id: 586350636};
    update.message.entities = [{type: "bot_command"}];

    let chatProcessor = new ChatProcessor(update, cache);

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
    let update = {};
    update.message = {};
    update.message.chat = {id: 586350636};
    update.message.entities = [{type: "bot_command"}];
    update.message.text = "/start 18:30 26.06.2020";

    let chatProcessor = new ChatProcessor(update, cache);

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
      let update = JSON.parse(strUpdate);
      let chatProcessor = new ChatProcessor(update, cache);
      let wakeProcessor = new WakeProcessor();
      let defaultProcessor = new DefaultCommandProcessor();
      chatProcessor.registerCommandProcessor('start', defaultProcessor);
      chatProcessor.registerCommandProcessor('help', defaultProcessor);
      chatProcessor.registerCommandProcessor('wake', wakeProcessor);
      chatProcessor.proceed(true);

      assert.isUndefined(cache.get(update.message.chat.id));
    });

    it("Проверка выполнения /help", function() {
      let strUpdate = '{"update_id":354673863,"message":{"message_id":403,"from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1593765384,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}}';
      let update = JSON.parse(strUpdate);
      let chatProcessor = new ChatProcessor(update, cache);
      let wakeProcessor = new WakeProcessor();
      let defaultProcessor = new DefaultCommandProcessor();
      chatProcessor.registerCommandProcessor('start', defaultProcessor);
      chatProcessor.registerCommandProcessor('help', defaultProcessor);
      chatProcessor.registerCommandProcessor('wake', wakeProcessor);
      chatProcessor.proceed(true);

      assert.isUndefined(cache.get(update.message.chat.id));
    });

    it("Проверка выполнения /wake", function() {
      let strUpdate = '{"update_id":354673864,"message":{"message_id":407,"from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1593765485,"text":"/wake","entities":[{"offset":0,"length":5,"type":"bot_command"}]}}';
      let update = JSON.parse(strUpdate);
      let chatProcessor = new ChatProcessor(update, cache);
      let wakeProcessor = new WakeProcessor();
      let defaultProcessor = new DefaultCommandProcessor();
      chatProcessor.registerCommandProcessor('start', defaultProcessor);
      chatProcessor.registerCommandProcessor('help', defaultProcessor);
      chatProcessor.registerCommandProcessor('wake', wakeProcessor);
      chatProcessor.proceed(true);

      assert.equal(cache.get(update.message.chat.id), wakeProcessor.state.toJSON());
    });
  });

  describe("Тестирование обработки callback", function() {
    describe("Проверка обработки меню Wake", function() {
      it("Проверка кнопки Начать бронирование", function() {
        let strUpdate = '{"update_id":354673865,"callback_query":{"id":"2518356807915706815","from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"message":{"message_id":419,"from":{"id":1273795086,"is_bot":true,"first_name":"DevWakeBot","username":"DevWakeBot"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1593765995,"text":"Message Text","entities":[{"offset":0,"length":30,"type":"bold"}],"reply_markup":{"inline_keyboard":[[{"text":"\u041d\u0430\u0447\u0430\u0442\u044c \u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435","callback_data":"book"}],[{"text":"\u0421\u043f\u0438\u0441\u043e\u043a \u0430\u043a\u0442\u0438\u0432\u043d\u044b\u0445 \u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0439","callback_data":"list"}]]}},"chat_instance":"-1517723406088083073","data":"book"}}';
        let update = JSON.parse(strUpdate);
        let stateJSON = '{"type":"wake","menu":"main","start":1593705600000,"count":1,"set_type":"set"}';
        let chatProcessor = new ChatProcessor(update, cache);
        cache.put(update.callback_query.message.chat.id, stateJSON);

        let wakeCallbackProcessor = new WakeProcessor();
        chatProcessor.registerCallbackProcessor('wake', wakeCallbackProcessor);

        chatProcessor.proceed(true);
        assert.equal(cache.get(update.callback_query.message.chat.id), wakeCallbackProcessor.state.toJSON());
      });

      it("Проверка кнопки Выбрать дату", function() {
        let strUpdate = '{"update_id":354673870,"callback_query":{"id":"2518356807773773505","from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"message":{"message_id":433,"from":{"id":1273795086,"is_bot":true,"first_name":"DevWakeBot","username":"DevWakeBot"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1593767429,"edit_date":1593767473,"text":"Message text","entities":[{"offset":0,"length":23,"type":"bold"},{"offset":24,"length":6,"type":"bold"},{"offset":43,"length":5,"type":"bold"},{"offset":52,"length":12,"type":"bold"}],"reply_markup":{"inline_keyboard":[[{"text":"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0434\u0430\u0442\u0443","callback_data":"date"}],[{"text":"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0432\u0440\u0435\u043c\u044f","callback_data":"time"}],[{"text":"\u0421\u0435\u0442","callback_data":"set"},{"text":"\u0427\u0430\u0441","callback_data":"hour"}],[{"text":"\ud83c\udfc4\u200d\u2642\ufe0f \u0412\u0435\u0439\u043a\u0431\u043e\u0440\u0434","callback_data":"board"},{"text":"\ud83d\udc59 \u0413\u0438\u0434\u0440\u043e\u043a\u043e\u0441\u0442\u044e\u043c","callback_data":"hydro"}]]}},"chat_instance":"-1517723406088083073","data":"date"}}';
        let update = JSON.parse(strUpdate);
        let stateJSON = '{"type":"wake","menu":"book","start":1593705600000,"count":1,"set_type":"set"}';
        let chatProcessor = new ChatProcessor(update, cache);
        cache.put(update.callback_query.message.chat.id, stateJSON);

        let wakeCallbackProcessor = new WakeProcessor();
        chatProcessor.registerCallbackProcessor('wake', wakeCallbackProcessor);

        chatProcessor.proceed(true);
        assert.equal(cache.get(update.callback_query.message.chat.id), wakeCallbackProcessor.state.toJSON());
      });
    });
  });
});
