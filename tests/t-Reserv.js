describe("class Reserve", function() {

    describe("Проверка свойств по умолчанию", function() {
      let reserve = new Reserve();
  
      it("Свойство count", function() {
        assert.equal(reserve.count, 1, "равен 1");
      });
  
      it("Свойство startDate", function() {
        assert.deepEqual(reserve.start, today);
      });
  
      it("Свойство minutes", function() {
        assert.equal(reserve.minutes, 5);
      });
  
      it("Свойство endDate", function() {
        let endDateTime = new Date();
        endDateTime.setHours(0, 5, 0, 0);
        assert.deepEqual(reserve.end, endDateTime);
      });
  
      it("Свойство toString", function() {
        let dateStr = reserve.start.toLocaleDateString(dateLocale, dateOptions);
        let str = '<b>' + dateStr + ':</b> \n';
  
        assert.equal(reserve.toString(), str, str);
      });
  
      it("Свойство getStateMessageText", function() {
        let str = "";
        str += "\n" + strDayLabel + today.toLocaleDateString(dateLocale, dateOptions);
        str += "\n" + strCountLabel + "1";
  
        assert.equal(reserve.getStateMessageText(), str, str);
      });
    });
  
    describe("Проверка свойств", function() {
      let startDateTime;
      let reserve;
  
      it("Создание экземпляра", function() {
        startDateTime = new Date(2020, 06, 04);
        startDateTime.setHours(13, 50, 0, 0);
        reserve = new Reserve(329454218, "Misha V", startDateTime, 5);
      });
  
      it("Свойство createdAt", function() {
        assert.isDefined(reserve.createdAt);
      });
  
      it("Свойство telegramId", function() {
        assert.equal(reserve.telegramId, 329454218);
      });
  
      it("Свойство telegramName", function() {
        assert.equal(reserve.telegramName, "Misha V");
      });
  
      it("Свойство count", function() {
          assert.equal(reserve.count, 5, "равен 5");
      });
  
      it("Свойство startDate", function() {
          assert.equal(reserve.start, startDateTime);
      });
  
      it("Свойство minutes", function() {
          assert.equal(reserve.minutes, 25);
      });
  
      it("Свойство endDate", function() {
          let endDateTime = new Date(2020, 06, 04);
          endDateTime.setHours(14, 15, 0, 0);
          assert.deepEqual(reserve.end, endDateTime);
      });
  
      it("Метод toString()", function() {
          let dateStr = reserve.start.toLocaleDateString(dateLocale, dateOptions);
          let str = '<b>' + dateStr + ':</b> ';
          str += ' ' + reserve.start.toLocaleTimeString(dateLocale, timeOptions);
          str += ' - ' + reserve.end.toLocaleTimeString(dateLocale, timeOptions) + '\n';
  
          assert.equal(reserve.toString(), str, str);
      });
  
      it("Метод getStateMessageText()", function() {
        let str = "";
        str += "\n" + strNameLabel + "Misha V";
        str += "\n" + strDayLabel + startDateTime.toLocaleDateString(dateLocale, dateOptions);
        str += "\n<b>Начало: </b>13:50\n<b>Окончание: </b>14:15\n<b>Количество: </b>5";
  
        assert.equal(reserve.getStateMessageText(), str);
      });
  
      it("Метод findConflict()", function() {
        startDateTime = new Date(2020, 06, 04);
        startDateTime.setHours(13, 50, 0, 0);
  
        reserve.start = startDateTime;
  
        let dataAdapter = new GoogleSheetDataAdapter("reserve", null, null);
        let reserveRows = dataAdapter.getActiveReserveRows();
        let reserveArray = reserve.createReserveArray(reserveRows);
        reserve.reserveArray = reserveArray;
  
        let conflictArray = reserve.findConflict();
        assert.deepEqual(conflictArray, [reserveArray[6]]);
      });
    });
  
    describe("Сверка с текущим расписанием", function() {
      // По умолчаною размер сета 5 минут
      let reserve;
      let reserveArray;
      let reserveRows = [];
      let startDateTime = new Date(2020, 06, 04);
      reserveRows.push([new Date("07.02.2020 21:05:12"),480666793,"topskiipavel",
          new Date("07.04.2020 14:00:00"), new Date("07.04.2020 15:00:00"),12,0,0]);
  
      it("Создание экземпляра", function() {
        startDateTime = new Date(2020, 06, 04);
        startDateTime.setHours(13, 50, 0, 0);
        reserve = new Reserve(329454218, "Misha V");
        reserveArray = reserve.createReserveArray(reserveRows);
        reserve.reserveArray = reserveArray;
      });
  
      it("Начало и окончание меньше начала (null)", function() {
        startDateTime.setHours(13, 30, 0, 0);
        reserve.start = startDateTime;
        reserve.count = 2;
        assert.equal(reserve.findConflict().length, 0);
      });
  
      it("Начало меньше начала, окончание равно началу (null)", function() {
        startDateTime.setHours(13, 30, 0, 0);
        reserve.start = startDateTime;
        reserve.count = 6;
        assert.equal(reserve.findConflict().length, 0);
      });
  
      it("Начало равно окончания (null)", function() {
        startDateTime.setHours(15, 0, 0, 0);
        reserve.start = startDateTime;
        reserve.count = 6;
        assert.equal(reserve.findConflict().length, 0);
      });
  
      it("Начало больше окончания (null)", function() {
        startDateTime.setHours(15, 30, 0, 0);
        reserve.start = startDateTime;
        reserve.count = 6;
        assert.equal(reserve.findConflict().length, 0);
      });
  
      it("Метод getStateMessageText() без ошибки", function() {
        let str = "\n<b>Имя: </b>Misha V\n<b>Дата: </b>04.07.2020\n<b>Начало: </b>15:30\n<b>Окончание: </b>16:00\n<b>Количество: </b>6";
  
        assert.equal(reserve.getStateMessageText(), str);
      });
  
      it("Начало меньше начала, окончание больше начала (Reserve)", function() {
        startDateTime.setHours(13, 50, 0, 0);
        reserve.start = startDateTime;
        reserve.count = 6;
        assert.deepEqual(reserve.findConflict(), [reserveArray[0]]);
      });
  
      it("Начало больше начала, начало меньше окончания (Reserve)", function() {
        startDateTime.setHours(14, 50, 0, 0);
        reserve.start = startDateTime;
        reserve.count = 30;
        assert.deepEqual(reserve.findConflict(), [reserveArray[0]]);
      });
  
      it("Начало равно началу (Reserve)", function() {
        startDateTime.setHours(14, 00, 0, 0);
        reserve.start = startDateTime;
        reserve.count = 6;
        assert.deepEqual(reserve.findConflict(), [reserveArray[0]]);
      });
  
      it("Окончание равно окончанию (Reserve)", function() {
        startDateTime.setHours(13, 30, 0, 0);
        reserve.start = startDateTime;
        reserve.count = 18;
        assert.deepEqual(reserve.findConflict(), [reserveArray[0]]);
      });
  
      it("Метод getStateMessageText() с ошибкой", function() {
        let str = "\n<b>ВНИМАНИЕ!</b>\nПересекается с бронированием:\n⛔️<b>04.07.2020:</b>  14:00 - 15:00\n\n<b>Имя: </b>Misha V\n<b>Дата: </b>04.07.2020\n<b>Начало: </b>13:30\n<b>Окончание: </b>15:00\n<b>Количество: </b>18";
  
        assert.equal(reserve.getStateMessageText(), str);
      });
  
    });
  
    describe("Проверка заполнения свойств из массива", function() {
      let reserve;
      let reserveRow;
  
      it("Создание экземпляра", function() {
        reserve = new Reserve();
      });
  
      it("Заполнение свойств из массива", function() {
        reserveRow = [new Date(),329454218,"Misha V",new Date("06.07.2020 10:00:00"),new Date("04.07.2020 11:00:00"),2];
        reserve.fromArray(reserveRow);
      });
  
      it("Проверка свойства count", function() {
          assert.equal(reserve.count, 2);
      });
  
      it("Проверка свойства startDate", function() {
          assert.equal(reserve.start, reserveRow[3]);
      });
    });
  
    describe("Проверка экспорта свойств в массив", function() {
      let reserve;
      let reserveRow;
      let exportRow;
  
      it("Создание экземпляра", function() {
        reserve = new Reserve();
      });
  
      it("Заполнение свойств из массива", function() {
        reserveRow = [new Date(),329454218,"Misha V",new Date("07.06.2020 10:00:00"),new Date("07.06.2020 10:10:00"),2];
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
      });
    });
  });
  
  