describe("class ReserveState", function() {
    describe("Проверка свойств по умолчанию", function() {
      let reserveState;
      let reserve;
  
      it("Проверка создания объекта", function() {
        reserve = new Reserve(329454218, "Misha V");
        reserveState = new ReserveState(reserve);
        assert.equal(reserveState.type, 'reserve');
      });
  
      it("Проверка свойства type", function() {
        assert.equal(reserveState.type, 'reserve');
      });
  
      it("Проверка свойства menu", function() {
        assert.equal(reserveState.menu, 'main');
      });
  
      it("Проверка свойства reserve", function() {
        assert.deepEqual(reserveState.reserve, reserve);
      });
  
      it("Проверка сериализации в JSON", function() {
        let jsonState = '{"type":"reserve","menu":"main",';
        jsonState += '"createdAt":' + reserve.createdAt.getTime() + ',';
        jsonState += '"telegramId":329454218' + ',';
        jsonState += '"telegramName":"Misha V"' + ',';
        jsonState += '"start":' + today.getTime() + ',"count":1}';
  
        assert.equal(reserveState.toJSON(), jsonState);
      });
    });
  
    describe("Проверка создания из JSON", function() {
      newDate = new Date();
      reserveState = new ReserveState(new Reserve());
      let jsonState = '{"type":"reserve","menu":"main",';
      jsonState += '"createdAt":' + newDate.getTime() + ',';
      jsonState += '"telegramId":329454218' + ',';
      jsonState += '"telegramName":"Misha V"' + ',';
      jsonState += '"start":' + today.getTime() + ',"count":2}';
      
      it("Загрузка из JSON", function() {
        reserveState.fromJSON(jsonState);
      });
  
      it("Проверка свойства type", function() {
        assert.equal(reserveState.type, 'reserve');
      });
  
      it("Проверка свойства menu", function() {
        assert.equal(reserveState.menu, 'main');
      });
  
      it("Проверка свойства reserve", function() {
        let reserve = new Reserve(329454218, "Misha V");
        reserve.count = 2;
        reserve.createdAt = newDate;
        assert.deepEqual(reserveState.reserve, reserve);
      });
    });
  });
  
  