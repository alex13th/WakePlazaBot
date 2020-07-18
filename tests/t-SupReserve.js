describe("class SupReserve", function() {
  describe("Проверка инициализации свойств", function() {
    let startDateTime = new Date();
    startDateTime.setHours(12, 50, 0, 0);
    let reserve = new SupReserve(329454218, "Misha V", startDateTime, 2, "set");

    it("Проверка свойства count", function() {
      assert.equal(reserve.count, 2, "равен 2");
    });

    it("Проверка свойства setType", function() {
      assert.equal(reserve.setType, "set");
    });

    it("Проверка свойства minutes", function() {
      assert.equal(reserve.minutes, 60);
    });

  it("Проверка установки свойства setType", function() {
      reserve.setType = "hour";
      assert.equal(reserve.setType, "hour");
    });

    it("Проверка свойства startDate", function() {
      assert.equal(reserve.start, startDateTime);
    });

    it("Проверка свойства endDate", function() {
      let endDateTime = new Date();
      endDateTime.setHours(14, 50, 0, 0);
      assert.deepEqual(reserve.end, endDateTime);
    });
  });
  describe("Проверка строковых методов", function() {
    let startDateTime = new Date();
    startDateTime.setHours(12, 50, 0, 0);
    let reserve = new SupReserve(329454218, "Misha V", startDateTime, 2, "set");
    
    it("Проверка свойства toString", function() {
      let dateStr = reserve.start.toLocaleDateString(dateLocale, dateOptions);
      let str = '<b>' + dateStr + ':</b>';
      str += ' ' + setIcon;
      str += ' ' + reserve.start.toLocaleTimeString(dateLocale, timeOptions);
      str += ' - ' + reserve.end.toLocaleTimeString(dateLocale, timeOptions);
      str += ' :: <b>' + reserve.bookCount + '</b>';
      str += '\n';

      assert.equal(reserve.toString(), str);
    });

    it("Проверка свойства getStateMessageText", function() {
      let str = "";
      str += "\n" + strNameLabel + "Misha V";
      str += "\n" + strDayLabel + today.toLocaleDateString(dateLocale, dateOptions);
      str += "\n" + strStartTimeLabel + "12:50";
      str += "\n" + strEndTimeLabel + "13:50";
      str += "\n" + strTypeLabel + strHalfHour + ' (2)';
      str += '\n' + strCountLabel + 1;

      assert.equal(reserve.getStateMessageText(), str);
    });
  });

  describe("Проверка свойств по умолчанию", function() {
    let reserve = new SupReserve();

    it("Свойство count", function() {
      assert.equal(reserve.count, 1);
    });

    it("Свойство setType", function() {
      assert.equal(reserve.setType, "set");
    });

    it("Свойство startDate", function() {
      assert.deepEqual(reserve.start, today);
    });

    it("Свойство minutes", function() {
      assert.equal(reserve.minutes, 30);
    });

    it("Свойство minutes", function() {
      assert.isNull(reserve.startTime);
    });

    it("Свойство endDate", function() {
      let endDateTime = new Date();
      endDateTime.setHours(0, 30, 0, 0);
      assert.deepEqual(reserve.end, endDateTime);
    });

    it("Метод toString()", function() {
      let dateStr = today.toLocaleDateString(dateLocale, dateOptions);
      let str = '<b>' + dateStr + ':</b> \n';

      assert.equal(reserve.toString(), str);
    });
    
    it("Метод getStateMessageText()", function() {
      let str = "\n<b>Дата: </b>";
      str += today.toLocaleDateString(dateLocale, dateOptions);
      str += "\n<b>Вид: </b>" + strHalfHour + " (1)";
      str += '\n' + strCountLabel + 1;

      assert.equal(reserve.getStateMessageText(), str);
    });
    
    it("Метод createReserveArray()", function() {
      let reserve = new SupReserve();
      startDateTime = new Date(2020, 06, 04);
      startDateTime.setHours(13, 50, 0, 0);

      reserve.start = startDateTime;
      reserve.count = 2;

      let dataAdapter = new GoogleSheetDataAdapter(null, "reserve", "reserve");
      let reserveRows = dataAdapter.getActiveReserveRows();
      let reserveArray = reserve.createReserveArray(reserveRows);
      reserve.reserveArray = reserveArray;
    });
  });

  describe("Проверка экспорта свойств в массив", function() {
    let reserve;
    let reserveRow;
    let exportRow;

    it("Создание экземпляра", function() {
      reserve = new SupReserve();
    });

    it("Заполнение свойств из массива", function() {
      reserveRow = [new Date(),329454218,"Misha V",new Date("07.06.2020 10:00:00"),new Date("07.06.2020 12:00:00"),"hour",2];
      reserve.fromArray(reserveRow);
    });

    it("Экспорт свойств в массив", function() {
      exportRow = reserve.toArray(reserveRow);
    });

    it("Сверка массивов", function() {
      assert.deepEqual(exportRow[0], reserveRow[0]);
      assert.equal(exportRow[1], reserveRow[1]);
      assert.equal(exportRow[2], reserveRow[2]);
      assert.deepEqual(exportRow[3], reserveRow[3]);
      assert.deepEqual(exportRow[4], reserveRow[4]);
      assert.equal(exportRow[5], reserveRow[5]);
      assert.equal(exportRow[6], reserveRow[6]);
    });
  });

  describe("Сверка с текущим расписанием", function() {
    // По умолчаною размер сета 5 минут
    let reserve;
    let reserveArray;
    let reserveRows = [];
    let startDateTime = new Date(2020, 06, 04);
    reserveRows.push([new Date("07.02.2020 10:00:12"),480666793,"topskiipavel",
        new Date("07.04.2020 14:00:00"), new Date("07.04.2020 15:00:00"),12,1,2]);

    it("Создание экземпляра", function() {
      startDateTime = new Date(2020, 06, 04);
      startDateTime.setHours(14, 00, 0, 0);
      reserve = new SupReserve(329454218, "Misha V", startDateTime, 1, 'hour', 1);
      reserveArray = reserve.createReserveArray(reserveRows);
      reserve.reserveArray = reserveArray;
    });

    it("Количество конфликтов меньше максимума", function() {
      reserve.findConflict();
      assert.equal(reserve.conflictCount, 3);
      assert.equal(reserve.isCompleted, true);
    });

    it("Количество конфликтов больше максимума", function() {
      reserve.bookCount = 4;
      reserve.findConflict();
      assert.equal(reserve.conflictCount, 6);
      assert.equal(reserve.isCompleted, false);
    });
  });
})
