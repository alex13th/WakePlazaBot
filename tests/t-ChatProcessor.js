describe("class ChatProcessor", function() {
  describe("Проверка наличия функций регистрации обработчиков", function(){
    let strUpdate, chatProcessor, cmdProccessor, dataAdapter;

    before(function(){
      strUpdate = '{"message": {"chat": {"id": 586350636}, "entities": [{"type": "bot_command"}]}}';
      chatProcessor = new ChatProcessor();
      cmdProccessor = {};
      dataAdapter = null;
    });

    it("Проверка регистрация обработчика команд", function() {
      assert.isFunction(chatProcessor.registerCommandProcessor);
      chatProcessor.registerCommandProcessor("start", cmdProccessor);
      assert.deepEqual(chatProcessor.commandProcessors["start"].processorClass, cmdProccessor);
    });

    it("Проверка регистрация обработчика callback", function() {
      assert.isFunction(chatProcessor.registerCallbackProcessor);
      chatProcessor.registerCallbackProcessor("wake", cmdProccessor, dataAdapter);
      assert.deepEqual(chatProcessor.callbackProcessors["wake"].processorClass, cmdProccessor);
    });

    it("Проверка регистрация обработчика contact", function() {
      assert.isFunction(chatProcessor.registerContactProcessor);
      chatProcessor.registerContactProcessor(cmdProccessor, dataAdapter);
      assert.deepEqual(chatProcessor.callbackProcessors["wake"].processorClass, cmdProccessor);
    });
  });

  describe("Тестирование парсинга команд", function(){
    let strUpdate, chatProcessor

    before(function(){
      strUpdate = '{"message": {';
      strUpdate += '"text": "/start 18:30 26.06.2020",';
      strUpdate += '"chat": {"id": 586350636},';
      strUpdate += '"entities": [{"type": "bot_command"}]}}';
    });

    it("Создание объекта", function() {
      chatProcessor = new ChatProcessor();
      chatProcessor.proceed(strUpdate, props, cache);
    });

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
    let strUpdate, chatProcessor;

    beforeEach(function() {
      chatProcessor = new ChatProcessor();

      chatProcessor.registerCommandProcessor('start', DefaultCommandProcessor);
      chatProcessor.registerCommandProcessor('help', DefaultCommandProcessor);
      chatProcessor.registerCommandProcessor('wake', WakeProcessor);
      chatProcessor.registerCommandProcessor('contact', ContactProcessor);
    });

    it("Проверка выполнения /start", function() {
      strUpdate = '{"update_id":354673862, "message":{"message_id":399,"from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1593763022,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}}';
      chatProcessor.proceed(strUpdate, props, cache);
    });

    it("Проверка выполнения /help", function() {
      let strUpdate = '{"update_id":354673863,"message":{"message_id":403,"from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1593765384,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}}';
      chatProcessor.proceed(strUpdate, props, cache);
    });

    it("Проверка выполнения /wake", function() {
      let strUpdate = '{"update_id":354673864,"message":{"message_id":407,"from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1593765485,"text":"/wake","entities":[{"offset":0,"length":5,"type":"bot_command"}]}}';
      chatProcessor.proceed(strUpdate, props, cache);
    });

    it("Проверка выполнения /contact", function() {
      let strUpdate = '{"update_id":354675882,"message":{"message_id":1829,"from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1595136069,"text":"/contact","entities":[{"offset":0,"length":8,"type":"bot_command"}]}}';
      chatProcessor.proceed(strUpdate, props, cache);
    });
  });

  describe("Тестирование обработки контакта", function() {
    let strUpdate, chatProcessor, dataAdapter;

    beforeEach(function() {
      dataAdapter = new GoogleSheetDataAdapter(null, "users", "users");
      chatProcessor = new ChatProcessor();

      chatProcessor.registerContactProcessor(ContactProcessor, dataAdapter);
    });

    it("Проверка выполнения", function() {
      strUpdate = '{"update_id":354675889,"message":{"message_id":1842,"from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1595136928,"reply_to_message":{"message_id":1841,"from":{"id":1273795086,"is_bot":true,"first_name":"DevWakeBot","username":"DevWakeBot"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1595136924,"text":"Message","entities":[{"offset":0,"length":47,"type":"bold"}]},"contact":{"phone_number":"+79149523870","first_name":"Alexey","last_name":"Sukharev","user_id":586350636}}}';
      chatProcessor.proceed(strUpdate, props, cache);

      let rows = dataAdapter.getActiveReserveRows();
      assert.deepEqual(rows[rows.length - 1], [586350636,	"Alexey",	"+79149523870", "=IFERROR(VLOOKUP(B:B;Users!A:C;3;FALSE))"]);
    });
  });

  describe("Сториз-тест Бронирование вейка", function() {
    let scriptProperties, dataAdapter, stateId;

    before(function() {
      scriptProperties = new GoogleProperties();
      dataAdapter = new GoogleSheetDataAdapter(null, "wake", "wake");
      stateId = "586350636-1484";
    });

    describe("Обработка команд", function() {
      let chatProcessor;

      beforeEach(function() {
        chatProcessor = new ChatProcessor();
        chatProcessor.registerCommandProcessor('start', DefaultCommandProcessor);
        chatProcessor.registerCommandProcessor('help', DefaultCommandProcessor);
        chatProcessor.registerCommandProcessor('wake', WakeProcessor, dataAdapter);
      });

      it("Обработка команды  /start", function() {
        strUpdate = '{"update_id":354675408,"message":{"message_id":1479,"from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1594810435,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}}';
        chatProcessor.proceed(strUpdate, scriptProperties);
      });

      it("Обработка команды  /wake", function() {
        strUpdate = '{"update_id":354675409,"message":{"message_id":1482,"from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1594810938,"text":"/wake","entities":[{"offset":0,"length":5,"type":"bot_command"}]}}';
        chatProcessor.proceed(strUpdate, scriptProperties);
      });
    });

    describe("Обработка кнопок меню бронирования Вейкборда", function() {
      let chatProcessor;

      beforeEach(function() {
        chatProcessor = new ChatProcessor();
        chatProcessor.registerCallbackProcessor('wake', WakeProcessor, dataAdapter);
      });

      it("Обработка кнопки Начать бронирование", function() {
        let strUpdate = '{"update_id":354675410,';
        strUpdate += '"callback_query":{"id":"2518356806594869324",';
        strUpdate += '"from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},';
        strUpdate += '"message":{"message_id":1484,';
        strUpdate += '"from":{"id":1273795086,"is_bot":true,"first_name":"DevWakeBot","username":"DevWakeBot"},';
        strUpdate += '"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},';
        strUpdate += '"date":1594810939,"text":"Message text",';
        strUpdate += '"entities":[{"offset":0,"length":30,"type":"bold"}],';
        strUpdate += '"reply_markup":{"inline_keyboard":[[{"text":"\u041d\u0430\u0447\u0430\u0442\u044c \u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435","callback_data":"book"}],';
        strUpdate += '[{"text":"\u0421\u043f\u0438\u0441\u043e\u043a \u0412\u0430\u0448\u0438\u0445 \u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0439","callback_data":"myList"}],';
        strUpdate += '[{"text":"\u0421\u043f\u0438\u0441\u043e\u043a \u0430\u043a\u0442\u0438\u0432\u043d\u044b\u0445 \u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0439","callback_data":"list"}]]}},'
        strUpdate += '"chat_instance":"-1517723406088083073","data":"book"}}';

        chatProcessor.proceed(strUpdate, scriptProperties);

        let state = JSON.parse(scriptProperties.getProperty(stateId));

        assert.equal(state.type, "wake");
        assert.equal(state.menu, "book");
        assert.equal(state.start, today.getTime());
        assert.equal(state.set_type, "set");
        assert.equal(state.count, 1);
        assert.equal(state.board, 0);
        assert.equal(state.hydro, 0);
      });

      it("Обработка кнопки Выбрать дату", function() {
        let strUpdate = '{"update_id":354675411,"callback_query":{"id":"2518356806111092066","from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"message":{"message_id":1484,"from":{"id":1273795086,"is_bot":true,"first_name":"DevWakeBot","username":"DevWakeBot"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1594810939,"edit_date":1594811831,"text":"Message text","entities":[{"offset":0,"length":14,"type":"bold"},{"offset":15,"length":5,"type":"bold"},{"offset":36,"length":6,"type":"bold"},{"offset":53,"length":5,"type":"bold"},{"offset":62,"length":12,"type":"bold"}],"reply_markup":{"inline_keyboard":[[{"text":"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0434\u0430\u0442\u0443","callback_data":"date"}],[{"text":"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0432\u0440\u0435\u043c\u044f","callback_data":"time"}],[{"text":"\u0421\u0435\u0442","callback_data":"set"},{"text":"\u0427\u0430\u0441","callback_data":"hour"}],[{"text":"\ud83c\udfc4\u200d\u2642\ufe0f \u0412\u0435\u0439\u043a\u0431\u043e\u0440\u0434","callback_data":"board"},{"text":"\ud83d\udc59 \u0413\u0438\u0434\u0440\u043e\u043a\u043e\u0441\u0442\u044e\u043c","callback_data":"hydro"}],[{"text":"\u041d\u0430\u0437\u0430\u0434","callback_data":"back"}]]}},"chat_instance":"-1517723406088083073","data":"date"}}';
        
        chatProcessor.proceed(strUpdate, scriptProperties);
        
        let state = JSON.parse(scriptProperties.getProperty(stateId));

        assert.equal(state.type, "wake");
        assert.equal(state.menu, "date");
        assert.equal(state.start, today.getTime());
        assert.equal(state.set_type, "set");
        assert.equal(state.count, 1);
        assert.equal(state.board, 0);
        assert.equal(state.hydro, 0);
      });

      it("Обработка кнопки c завтрашней датой", function() {
        let strUpdate = '{"update_id":354675412,"callback_query":{"id":"2518356809717642496","from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"message":{"message_id":1484,"from":{"id":1273795086,"is_bot":true,"first_name":"DevWakeBot","username":"DevWakeBot"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1594810939,"edit_date":1594817902,"text":"Message text","reply_markup":{"inline_keyboard":[[{"text":"15.07.2020","callback_data":"0"},{"text":"16.07.2020","callback_data":"1"},{"text":"17.07.2020","callback_data":"2"}],[{"text":"18.07.2020","callback_data":"3"},{"text":"19.07.2020","callback_data":"4"},{"text":"20.07.2020","callback_data":"5"}],[{"text":"\u041d\u0430\u0437\u0430\u0434","callback_data":"back"}]]}},"chat_instance":"-1517723406088083073","data":"1"}}';
        let startDateTime = new Date(today);
        startDateTime.setDate(today.getDate() + 1);

        chatProcessor.proceed(strUpdate, scriptProperties);

        let state = JSON.parse(scriptProperties.getProperty(stateId));

        assert.equal(state.type, "wake");
        assert.equal(state.menu, "book");
        assert.equal(state.start, startDateTime.getTime());
        assert.equal(state.set_type, "set");
        assert.equal(state.count, 1);
        assert.equal(state.board, 0);
        assert.equal(state.hydro, 0);
      });

      it("Обработка кнопки Выбрать время", function() {
        let strUpdate = '{"update_id":354675413,"callback_query":{"id":"2518356806555504824","from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"message":{"message_id":1484,"from":{"id":1273795086,"is_bot":true,"first_name":"DevWakeBot","username":"DevWakeBot"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1594810939,"edit_date":1594818280,"text":"Message text","entities":[{"offset":0,"length":14,"type":"bold"},{"offset":15,"length":5,"type":"bold"},{"offset":36,"length":6,"type":"bold"},{"offset":53,"length":5,"type":"bold"},{"offset":62,"length":12,"type":"bold"}],"reply_markup":{"inline_keyboard":[[{"text":"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0434\u0430\u0442\u0443","callback_data":"date"}],[{"text":"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0432\u0440\u0435\u043c\u044f","callback_data":"time"}],[{"text":"\u0421\u0435\u0442","callback_data":"set"},{"text":"\u0427\u0430\u0441","callback_data":"hour"}],[{"text":"\ud83c\udfc4\u200d\u2642\ufe0f \u0412\u0435\u0439\u043a\u0431\u043e\u0440\u0434","callback_data":"board"},{"text":"\ud83d\udc59 \u0413\u0438\u0434\u0440\u043e\u043a\u043e\u0441\u0442\u044e\u043c","callback_data":"hydro"}],[{"text":"\u041d\u0430\u0437\u0430\u0434","callback_data":"back"}]]}},"chat_instance":"-1517723406088083073","data":"time"}}';
        let startDateTime = new Date(today);
        startDateTime.setDate(today.getDate() + 1);

        chatProcessor.proceed(strUpdate, scriptProperties);

        let state = JSON.parse(scriptProperties.getProperty(stateId));

        assert.equal(state.type, "wake");
        assert.equal(state.menu, "time");
        assert.equal(state.start, startDateTime.getTime());
        assert.equal(state.set_type, "set");
        assert.equal(state.count, 1);
        assert.equal(state.board, 0);
        assert.equal(state.hydro, 0);
      });

      it("Обработка кнопки 18:", function() {
        let strUpdate = '{"update_id":354675414,"callback_query":{"id":"2518356808158795798","from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"message":{"message_id":1484,"from":{"id":1273795086,"is_bot":true,"first_name":"DevWakeBot","username":"DevWakeBot"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1594810939,"edit_date":1594818528,"text":"Message text","reply_markup":{"inline_keyboard":[[{"text":"9:","callback_data":"9"},{"text":"10:","callback_data":"10"},{"text":"11:","callback_data":"11"},{"text":"12:","callback_data":"12"},{"text":"13:","callback_data":"13"}],[{"text":"14:","callback_data":"14"},{"text":"15:","callback_data":"15"},{"text":"16:","callback_data":"16"},{"text":"17:","callback_data":"17"},{"text":"18:","callback_data":"18"}],[{"text":"19:","callback_data":"19"},{"text":"20:","callback_data":"20"},{"text":"21:","callback_data":"21"},{"text":"22:","callback_data":"22"}],[{"text":"\u041d\u0430\u0437\u0430\u0434","callback_data":"back"}]]}},"chat_instance":"-1517723406088083073","data":"18"}}';
        let startDateTime = new Date(today);
        startDateTime.setDate(today.getDate() + 1);

        chatProcessor.proceed(strUpdate, scriptProperties);

        let state = JSON.parse(scriptProperties.getProperty(stateId));

        assert.equal(state.type, "wake");
        assert.equal(state.menu, "minutes");
        assert.equal(state.start, startDateTime.getTime());
        assert.equal(state.new_hours, 18);
        assert.equal(state.set_type, "set");
        assert.equal(state.count, 1);
        assert.equal(state.board, 0);
        assert.equal(state.hydro, 0);
      });

      it("Обработка кнопки 30", function() {
        let strUpdate = '{"update_id":354675415,"callback_query":{"id":"2518356806534149491","from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"message":{"message_id":1484,"from":{"id":1273795086,"is_bot":true,"first_name":"DevWakeBot","username":"DevWakeBot"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1594810939,"edit_date":1594818734,"text":"Message text","reply_markup":{"inline_keyboard":[[{"text":"0","callback_data":"0"},{"text":"5","callback_data":"5"},{"text":"10","callback_data":"10"},{"text":"15","callback_data":"15"},{"text":"20","callback_data":"20"},{"text":"25","callback_data":"25"}],[{"text":"30","callback_data":"30"},{"text":"35","callback_data":"35"},{"text":"40","callback_data":"40"},{"text":"45","callback_data":"45"},{"text":"50","callback_data":"50"},{"text":"55","callback_data":"55"}],[{"text":"\u041d\u0430\u0437\u0430\u0434","callback_data":"back"}]]}},"chat_instance":"-1517723406088083073","data":"30"}}';
        let startDateTime = new Date(today);
        startDateTime.setDate(today.getDate() + 1);
        startDateTime.setHours(18);
        startDateTime.setMinutes(30);

        chatProcessor.proceed(strUpdate, scriptProperties);

        let state = JSON.parse(scriptProperties.getProperty(stateId));

        assert.equal(state.type, "wake");
        assert.equal(state.menu, "book");
        assert.equal(state.start, startDateTime.getTime());
        assert.equal(state.set_type, "set");
        assert.equal(state.count, 1);
        assert.equal(state.board, 0);
        assert.equal(state.hydro, 0);
      });

      it("Обработка кнопки Забронировать", function() {
        let strUpdate = '{"update_id":354675660,"callback_query":{"id":"2518356809810986925","from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"message":{"message_id":1484,"from":{"id":1273795086,"is_bot":true,"first_name":"DevWakeBot","username":"DevWakeBot"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1595044266,"edit_date":1595044285,"text":"Message Text","entities":[{"offset":0,"length":14,"type":"bold"},{"offset":15,"length":5,"type":"bold"},{"offset":36,"length":6,"type":"bold"},{"offset":53,"length":8,"type":"bold"},{"offset":67,"length":11,"type":"bold"},{"offset":84,"length":5,"type":"bold"},{"offset":93,"length":12,"type":"bold"}],"reply_markup":{"inline_keyboard":[[{"text":"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0434\u0430\u0442\u0443","callback_data":"date"}],[{"text":"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0432\u0440\u0435\u043c\u044f","callback_data":"time"}],[{"text":"\u0421\u0435\u0442","callback_data":"set"},{"text":"\u0427\u0430\u0441","callback_data":"hour"}],[{"text":"\ud83c\udfc4\u200d\u2642\ufe0f \u0412\u0435\u0439\u043a\u0431\u043e\u0440\u0434","callback_data":"board"},{"text":"\ud83d\udc59 \u0413\u0438\u0434\u0440\u043e\u043a\u043e\u0441\u0442\u044e\u043c","callback_data":"hydro"}],[{"text":"\ud83d\udc4c \u0417\u0430\u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c","callback_data":"apply"}],[{"text":"\u041d\u0430\u0437\u0430\u0434","callback_data":"back"}]]}},"chat_instance":"-1517723406088083073","data":"apply"}}';

        chatProcessor.proceed(strUpdate, scriptProperties);

        let state = JSON.parse(scriptProperties.getProperty(stateId));

        assert.equal(state.type, "wake");
        assert.equal(state.menu, "main");
      });
    });
  });
});
