describe("class ContactProcessor", function() {
  describe("Проверка списка поддерживаемых команд", function(){
    let processor;
    
    before(function() {
      processor = new ContactProcessor();
    });

    it("Проверка наличие команды /start", function() {
      assert.isFunction(processor.commandHandlers["contact"]);
    });
  });
  
  describe("Проверка команд", function(){
    let processor;

    before(function() {
      processor = new ContactProcessor();
    });

    it("Проверка результата команды /contact", function() {
      let keyboard, resultMessage;
      let buttons = [];

      buttons.push([{text: strSendContactButton, request_contact: true}]);
      buttons.push([{text: strRefuseContactButton}]);
      keyboard = {keyboard: buttons, one_time_keyboard: true, resize_keyboard: true};
      resultMessage = {text: getContactText, keyboard: keyboard};

      processor.proceedCommand({name: "contact", params: null});
      assert.deepEqual(processor.message, resultMessage);
    });
  });

  describe("Проверка обработки контакта", function(){
    let processor, dataAdapter, contact;

    before(function() {
      let contactStr = '{"phone_number":"+79149523870","first_name":"Alexey","last_name":"Sukharev","user_id":586350636}';
      contact = JSON.parse(contactStr);

      dataAdapter = new GoogleSheetDataAdapter(null, "users", "users");
      processor = new ContactProcessor(dataAdapter);
    });

    it("Проверка обработка контакта", function() {
      processor.proceedContact(contact);
      let rows = dataAdapter.getActiveReserveRows();
      assert.deepEqual(rows[rows.length - 1], [586350636,	"Alexey",	"+79149523870",	"=IFERROR(VLOOKUP(B:B;Users!A:C;3;FALSE))"]);
    });
  });
});