describe("class WakeReserveState", function() {
  describe("Проверка свойств по умолчанию", function() {
    let reserve = new WakeReserve(329454218, "Misha V");
    let reserveState = new WakeReserveState(reserve);

    it("Проверка свойства type", function() {
      assert.equal(reserveState.type, 'wake');
    });

    it("Проверка свойства menu", function() {
      assert.equal(reserveState.menu, 'main');
    });

    it("Проверка свойства reserve", function() {
      assert.instanceOf(reserveState.reserve, WakeReserve);
    });

    it("Проверка сериализации в JSON", function() {
      let jsonState = '{"type":"wake","menu":"main",';
      jsonState += '"createdAt":' + reserve.createdAt.getTime() + ',';
      jsonState += '"telegramId":329454218' + ',';
      jsonState += '"telegramName":"Misha V"' + ',';
      jsonState += '"start":' + today.getTime() + ',"count":1,';
      jsonState += '"set_type":"set","board":0,"hydro":0}';
      
      assert.equal(reserveState.toJSON(), jsonState);
    });
  });

  describe("Проверка создания из JSON", function() {
    let newDate =  new Date();
    let jsonState = '{"type":"wake","menu":"main",';
    jsonState += '"createdAt":' + newDate.getTime() + ',';
    jsonState += '"telegramId":329454218' + ',';
    jsonState += '"telegramName":"Misha V"' + ',';
    jsonState += '"start":' + today.getTime() + ',"count":2,';
    jsonState += '"set_type":"hour","board":1,"hydro":0}';

    let reserveState = new WakeReserveState();
    reserveState.fromJSON(jsonState);

    it("Проверка свойства type", function() {
      assert.equal(reserveState.type, 'wake');
    });

    it("Проверка свойства menu", function() {
      assert.equal(reserveState.menu, 'main');
    });

    it("Проверка свойства reserve", function() {
      let reserve = new WakeReserve(329454218, "Misha V", today, 2);
      reserve.createdAt = newDate;
      reserve.board = 1;
      reserve.setType = "hour";
      assert.deepEqual(reserveState.reserve, reserve);
    });
  });
});
