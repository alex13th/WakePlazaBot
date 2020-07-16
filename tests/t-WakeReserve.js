describe("class WakeReserve", function() {
  describe("Проверка инициализации свойств", function() {
    let startDateTime = new Date();
    startDateTime.setHours(12, 50, 0, 0);
    let wakeReserve = new WakeReserve(329454218, "Misha V", startDateTime, 2, "set");

    it("Проверка свойства count", function() {
      assert.equal(wakeReserve.count, 2, "равен 2");
    });

    it("Проверка свойства setType", function() {
      assert.equal(wakeReserve.setType, "set");
    });

    it("Проверка установки свойства setType", function() {
      wakeReserve.setType = "hour";
      assert.equal(wakeReserve.setType, "hour");
    });

    it("Проверка свойства startDate", function() {
      assert.equal(wakeReserve.start, startDateTime);
    });

    it("Проверка свойства minutes", function() {
      assert.equal(wakeReserve.minutes, 120);
    });

    it("Проверка свойства endDate", function() {
      let endDateTime = new Date();
      endDateTime.setHours(14, 50, 0, 0);
      assert.deepEqual(wakeReserve.end, endDateTime);
    });
  });

  describe("Проверка строковых методов", function() {
    let startDateTime = new Date();
    startDateTime.setHours(12, 50, 0, 0);
    let wakeReserve = new WakeReserve(329454218, "Misha V", startDateTime, 2, "set");
    wakeReserve.board = 1;
    wakeReserve.hydro = 1;
    
    it("Метод toString", function() {
      let dateStr = wakeReserve.start.toLocaleDateString(dateLocale, dateOptions);
      let str = '<b>' + dateStr + ':</b>';
      str += ' ' + setIcon;
      str += ' ' + wakeReserve.start.toLocaleTimeString(dateLocale, timeOptions);
      str += ' - ' + wakeReserve.end.toLocaleTimeString(dateLocale, timeOptions);
      str += ' ' + boardIcon;
      str += ' ' + hydroIcon;
      str += '\n';
      assert.equal(wakeReserve.toString(), str);
    });

    it("Метод getStateMessageText", function() {
      let str = "";
      str += "\n" + strNameLabel + "Misha V";
      str += "\n" + strDayLabel + today.toLocaleDateString(dateLocale, dateOptions);
      str += "\n" + strStartTimeLabel + "12:50";
      str += "\n" + strEndTimeLabel + "13:10";
      str += "\n" + strTypeLabel + strSet;
      str += "\n" + strCountLabel + "2";
      str += "\n" + strOptionsLabel + boardIcon + hydroIcon;

      assert.equal(wakeReserve.getStateMessageText(), str);
    });
  });

  describe("Проверка свойств по умолчанию", function() {
    let wakeReserve = new WakeReserve();

    it("Свойство count", function() {
      assert.equal(wakeReserve.count, 1);
    });

    it("Свойство setType", function() {
      assert.equal(wakeReserve.setType, "set");
    });

    it("Свойство startDate", function() {
      assert.deepEqual(wakeReserve.start, today);
    });

    it("Свойство minutes", function() {
      assert.equal(wakeReserve.minutes, 10);
    });

    it("Свойство minutes", function() {
      assert.isNull(wakeReserve.startTime);
    });

    it("Свойство endDate", function() {
      let endDateTime = new Date();
      endDateTime.setHours(0, 10, 0, 0);
      assert.deepEqual(wakeReserve.end, endDateTime);
    });

    it("Метод toString()", function() {
      let dateStr = wakeReserve.start.toLocaleDateString(dateLocale, dateOptions);
      let str = '<b>' + dateStr + ':</b> \n';

      assert.equal(wakeReserve.toString(), str, str);
    });
    
    it("Метод getStateMessageText()", function() {
      let str = "";
      str += "\n" + strDayLabel + today.toLocaleDateString(dateLocale, dateOptions);
      str += "\n" + strTypeLabel + strSet;
      str += "\n" + strCountLabel + "1";

      assert.equal(wakeReserve.getStateMessageText(), str);
    });
    
    it("Метод createReserveArray()", function() {
      let reserve = new WakeReserve();
      startDateTime = new Date(2020, 06, 04);
      startDateTime.setHours(13, 50, 0, 0);

      reserve.start = startDateTime;
      reserve.count = 2;

      let dataAdapter = new GoogleSheetDataAdapter("wake", null, null);
      let reserveRows = dataAdapter.getActiveReserveRows();
      let reserveArray = reserve.createReserveArray(reserveRows);
      reserve.reserveArray = reserveArray;
      let conflictReserve = reserve.findConflict();
      assert.deepEqual(conflictReserve, [reserveArray[6]]);
    });
  });

  describe("Проверка экспорта свойств в массив", function() {
    let reserve;
    let reserveRow;
    let exportRow;

    it("Создание экземпляра", function() {
      reserve = new WakeReserve();
    });

    it("Заполнение свойств из массива", function() {
      reserveRow = [new Date(),329454218,"Misha V",new Date("07.06.2020 10:00:00"),new Date("07.06.2020 12:00:00"),"hour",2,1,0];
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
      assert.equal(exportRow[7], reserveRow[7]);
      assert.equal(exportRow[8], reserveRow[8]);
    });
  });
})

  