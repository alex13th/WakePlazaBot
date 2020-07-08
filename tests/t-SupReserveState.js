describe("class SupReserveState", function() {
  describe("Проверка свойств по умолчанию", function() {
    let reserve;
    let reserveState;

    it("Создание экземпляра", function() {
      reserve = new SupReserve(329454218, "Misha V");
      reserveState = new SupReserveState(reserve);
      });

    it("Проверка свойства type", function() {
      assert.equal(reserveState.type, 'sup');
    });

    it("Проверка свойства menu", function() {
      assert.equal(reserveState.menu, 'main');
    });

    it("Проверка свойства reserve", function() {
      assert.instanceOf(reserveState.reserve, SupReserve);
    });

    it("Проверка сериализации в JSON", function() {
      let jsonState = '{"type":"sup","menu":"main","createdAt":';
      jsonState += reserve.createdAt.getTime();
      jsonState += ',"telegramId":329454218,"telegramName":"Misha V","start":';
      jsonState += today.getTime();
      jsonState += ',"count":1,"set_type":"set"}';
      
      assert.equal(reserveState.toJSON(), jsonState);
    });
  });

  describe("Проверка создания из JSON", function() {
    let newDate =  new Date();
    let jsonState = '{"type":"sup","menu":"main",';
    jsonState += '"createdAt":' + newDate.getTime() + ',';
    jsonState += '"telegramId":329454218' + ',';
    jsonState += '"telegramName":"Misha V"' + ',';
    jsonState += '"start":' + today.getTime() + ',"count":2,';
    jsonState += '"set_type":"hour"}';

    let reserveState = new SupReserveState();
    reserveState.fromJSON(jsonState);

    it("Проверка свойства type", function() {
      assert.equal(reserveState.type, 'sup');
    });

    it("Проверка свойства menu", function() {
      assert.equal(reserveState.menu, 'main');
    });

    it("Проверка свойства reserve", function() {
      let reserve = new SupReserve(329454218, "Misha V", today, 2);
      reserve.createdAt = newDate;
      reserve.setType = "hour";
      assert.deepEqual(reserveState.reserve, reserve);
    });
  });
});

