describe("class DefaultCommandProcessor", function() {
  describe("Проверка списка поддерживаемых команд", function(){
      let cmdProccessor = new DefaultCommandProcessor();
      it("Проверка наличие команды /start", function() {
          assert.isFunction(cmdProccessor.commandHandlers["start"]);
      });
      it("Проверка наличие команды /help", function() {
          assert.isFunction(cmdProccessor.commandHandlers["help"]);
      });
  });

  describe("Проверка команд", function(){
      let cmdProccessor = new DefaultCommandProcessor();
      it("Проверка результата команды /start", function() {
          let resultMessage = {text: helloText, keyboard: null};
          cmdProccessor.proceedCommand({name: "start", params: null});
          assert.deepEqual(cmdProccessor.message, resultMessage);
      });
      it("Проверка команды /help", function() {
          let resultMessage = {text: helpText, keyboard: null};
          cmdProccessor.proceedCommand({name: "help", params: null})
          assert.deepEqual(cmdProccessor.message, resultMessage);
      });
  });
});

