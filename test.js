let reserveValues = [];

reserveValues.push(["created_at","telegam_id","telegram_name","book_start","book_end","book_type","book_count","rent_board","rent_hydro"]);
reserveValues.push([new Date("07.03.2020 13:14:36"),329454218,"Misha V",new Date("07.04.2020 10:00:00"),new Date("07.04.2020 11:00:00"),1,1,1]);
reserveValues.push([new Date("07.03.2020 13:32:20"),143929127,"sizhek",new Date("07.04.2020 11:30:00"),new Date("07.04.2020 11:50:00"),2,1,1]);
reserveValues.push([new Date("07.03.2020 10:15:37"),143929127,"sizhek",new Date("07.04.2020 12:00:00"),new Date("07.04.2020 12:20:00"),2,1,1]);
reserveValues.push([new Date("07.03.2020 11:16:40"),329454218,"Misha V",new Date("07.04.2020 12:00:00"),new Date("07.04.2020 13:00:00"),1,0,0]);
reserveValues.push([new Date("07.03.2020 10:17:19"),143929127,"sizhek",new Date("07.04.2020 13:00:00"),new Date("07.04.2020 13:10:00"),1,1,0]);
reserveValues.push([new Date("07.03.2020 11:18:32"),329454218,"Misha V",new Date("07.04.2020 13:00:00"),new Date("07.04.2020 13:30:00"),3,0,1]);
reserveValues.push([new Date("07.02.2020 21:05:12"),480666793,"topskiipavel",new Date("07.04.2020 14:00:00"),new Date("07.04.2020 15:00:00"),1,0,0]);
reserveValues.push([new Date("07.02.2020 21:16:10"),329454218,"Misha V",new Date("07.04.2020 15:00:00"),new Date("07.04.2020 16:00:00"),1,1,1]);
reserveValues.push([new Date("07.03.2020 13:33:15"),143929127,"sizhek",new Date("07.04.2020 16:00:00"),new Date("07.04.2020 17:00:00"),1,1,1]);
reserveValues.push([new Date("07.03.2020 19:58:48"),143929127,"sizhek",new Date("07.04.2020 17:00:00"),new Date("07.04.2020 19:00:00"),2,1,1]);
reserveValues.push([new Date("07.03.2020 10:18:33"),143929127,"sizhek",new Date("07.06.2020 15:00:00"),new Date("07.06.2020 15:10:00"),1,1,1]);
reserveValues.push([new Date("07.03.2020 10:19:08"),143929127,"sizhek",new Date("07.07.2020 10:00:00"),new Date("07.07.2020 11:00:00"),1,1,1]);

class GoogleProperties {
    constructor(){
        this._properties = {};
    }

    getProperty(key) {
        return this._properties[key];
    }

    setProperty(key, value) {
        this._properties[key] = value;
    }

    deleteProperty(key) {
        delete this._properties[key];
    }
}

class GoogleRange {
    constructor() {
        this.values = [];

        this.values.push(["created_at","telegam_id","telegram_name","book_start","book_end","book_type","book_count","rent_board","rent_hydro"]);
        this.values.push([new Date("07.03.2020 13:14:36"),329454218,"Misha V",new Date("07.04.2020 10:00:00"),new Date("07.04.2020 11:00:00"), "hour",1,1,1]);
        this.values.push([new Date("07.03.2020 13:32:20"),143929127,"sizhek",new Date("07.04.2020 11:30:00"),new Date("07.04.2020 11:50:00"),"set",2,1,1]);
        this.values.push([new Date("07.03.2020 10:15:37"),143929127,"sizhek",new Date("07.04.2020 12:00:00"),new Date("07.04.2020 12:20:00"),"set",2,1,1]);
        this.values.push([new Date("07.03.2020 11:16:40"),329454218,"Misha V",new Date("07.04.2020 12:00:00"),new Date("07.04.2020 13:00:00"),"hour",1,0,0]);
        this.values.push([new Date("07.03.2020 10:17:19"),143929127,"sizhek",new Date("07.04.2020 13:00:00"),new Date("07.04.2020 13:10:00"),"set",1,1,0]);
        this.values.push([new Date("07.03.2020 11:18:32"),329454218,"Misha V",new Date("07.04.2020 13:00:00"),new Date("07.04.2020 13:30:00"),"set",3,0,1]);
        this.values.push([new Date("07.02.2020 21:05:12"),480666793,"topskiipavel",new Date("07.04.2020 14:00:00"),new Date("07.04.2020 15:00:00"),"hour",1,0,0]);
        this.values.push([new Date("07.02.2020 21:16:10"),329454218,"Misha V",new Date("07.04.2020 15:00:00"),new Date("07.04.2020 16:00:00"),"hour",1,1,1]);
        this.values.push([new Date("07.03.2020 13:33:15"),143929127,"sizhek",new Date("07.04.2020 16:00:00"),new Date("07.04.2020 17:00:00"),"hour",1,1,1]);
        this.values.push([new Date("07.03.2020 19:58:48"),143929127,"sizhek",new Date("07.04.2020 17:00:00"),new Date("07.04.2020 19:00:00"),"hour",2,1,1]);
        this.values.push([new Date("07.03.2020 10:18:33"),143929127,"sizhek",new Date("07.06.2020 15:00:00"),new Date("07.06.2020 15:10:00"),"set",1,1,1]);
        this.values.push([new Date("07.03.2020 10:19:08"),143929127,"sizhek",new Date("07.07.2020 10:00:00"),new Date("07.07.2020 11:00:00"),"hour",1,1,1]);
    }

    getValues() {
        return this.values;
    }

}

class GoogleSheet {
    constructor() {
      this.range = new GoogleRange();

    }

    getDataRange() {
        return this.range;
    }

    appendRow(row) {
      this.range.values.push(row);
    }

    deleteRow(pos) {
      return this.range.values.splice(pos, 1);
    }
}

class GoogleSpreadsheet {
    constructor() {
      this.sheet = new GoogleSheet();
    }

    getSheetByName(name) {
        return this.sheet;
    }
}

class GoogleSpreadsheetApp {
  constructor() {
    this.spreadSheet = new GoogleSpreadsheet();
  }

  openById(sheetId) {
    this.spreadSheet = new GoogleSpreadsheet(sheetId);
    return this.spreadSheet;
  }
}

var SpreadsheetApp = new GoogleSpreadsheetApp();

let today = new Date();
today.setHours(0, 0, 0, 0);

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
      let str = '<b>' + dateStr + ':</b> ';

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
        str += ' - ' + reserve.end.toLocaleTimeString(dateLocale, timeOptions);

        assert.equal(reserve.toString(), str, str);
    });

    it("Метод getStateMessageText()", function() {
      let str = "";
      str += "\n" + strNameLabel + "Misha V";
      str += "\n" + strDayLabel + startDateTime.toLocaleDateString(dateLocale, dateOptions);
      str += "\n" + strTimeLabel + "13:50";
      str += "\n" + strCountLabel + "5";

      assert.equal(reserve.getStateMessageText(), str, str);
    });

    it("Метод findConflict()", function() {
      startDateTime = new Date(2020, 06, 04);
      startDateTime.setHours(13, 50, 0, 0);

      reserve.start = startDateTime;

      let dataAdapter = new GoogleSheetDataAdapter("reserve", ENTRY_SHEET_NAME, LIST_SHEET_NAME);
      let reserveRows = dataAdapter.getActiveReserveRows();
      let reserveArray = reserve.createReserveArray(reserveRows);
      reserve.reserveArray = reserveArray;
      assert.equal(reserve.findConflict(), reserveArray[6]);
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
      assert.isNull(reserve.findConflict());
    });

    it("Начало меньше начала, окончание равно началу (null)", function() {
      startDateTime.setHours(13, 30, 0, 0);
      reserve.start = startDateTime;
      reserve.count = 6;
      assert.isNull(reserve.findConflict());
    });

    it("Начало равно окончания (null)", function() {
      startDateTime.setHours(15, 0, 0, 0);
      reserve.start = startDateTime;
      reserve.count = 6;
      assert.isNull(reserve.findConflict());
    });

    it("Начало больше окончания (null)", function() {
      startDateTime.setHours(15, 30, 0, 0);
      reserve.start = startDateTime;
      reserve.count = 6;
      assert.isNull(reserve.findConflict(), );
    });

    it("Метод getStateMessageText() без ошибки", function() {
      let str = "\n<b>Имя: </b>Misha V\n<b>Дата: </b>04.07.2020\n<b>Время: </b>15:30\n<b>Количество: </b>6";

      assert.equal(reserve.getStateMessageText(), str);
    });

    it("Начало меньше начала, окончание больше начала (Reserve)", function() {
      startDateTime.setHours(13, 50, 0, 0);
      reserve.start = startDateTime;
      reserve.count = 6;
      assert.equal(reserve.findConflict(), reserveArray[0]);
    });

    it("Начало больше начала, начало меньше окончания (Reserve)", function() {
      startDateTime.setHours(14, 50, 0, 0);
      reserve.start = startDateTime;
      reserve.count = 30;
      assert.equal(reserve.findConflict(), reserveArray[0]);
    });

    it("Начало равно началу (Reserve)", function() {
      startDateTime.setHours(14, 00, 0, 0);
      reserve.start = startDateTime;
      reserve.count = 6;
      assert.equal(reserve.findConflict(), reserveArray[0]);
    });

    it("Окончание равно окончанию (Reserve)", function() {
      startDateTime.setHours(13, 30, 0, 0);
      reserve.start = startDateTime;
      reserve.count = 18;
      assert.equal(reserve.findConflict(), reserveArray[0]);
    });

    it("Метод getStateMessageText() с ошибкой", function() {
      let str = "\n<b>ВНИМАНИЕ!</b>\nПересекается с бронированием:\n⛔️<b>04.07.2020:</b>  14:00 - 15:00\n\n<b>Имя: </b>Misha V\n<b>Дата: </b>04.07.2020\n<b>Время: </b>13:30\n<b>Количество: </b>18";

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
      
      it("Проверка свойства toString", function() {
          let dateStr = wakeReserve.start.toLocaleDateString(dateLocale, dateOptions);
          let str = '<b>' + dateStr + ':</b>';
          str += ' ' + setIcon;
          str += ' ' + wakeReserve.start.toLocaleTimeString(dateLocale, timeOptions);
          str += ' - ' + wakeReserve.end.toLocaleTimeString(dateLocale, timeOptions);
          str += ' ' + boardIcon;
          str += ' ' + hydroIcon;
          assert.equal(wakeReserve.toString(), str);
      });

      it("Проверка свойства getStateMessageText", function() {
          let str = "";
          str += "\n" + strNameLabel + "Misha V";
          str += "\n" + strDayLabel + today.toLocaleDateString(dateLocale, dateOptions);
          str += "\n" + strTimeLabel + "12:50";
          str += "\n" + strTypeLabel + strSet;
          str += "\n" + strCountLabel + "2";
          str += "\n" + strOptionsLabel + boardIcon + hydroIcon;

          assert.equal(wakeReserve.getStateMessageText(), str, str);
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
      let str = '<b>' + dateStr + ':</b> ';

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

      let dataAdapter = new GoogleSheetDataAdapter("wake", ENTRY_SHEET_NAME, LIST_SHEET_NAME);
      let reserveRows = dataAdapter.getActiveReserveRows();
      let reserveArray = reserve.createReserveArray(reserveRows);
      reserve.reserveArray = reserveArray;
      let conflictReserve = reserve.findConflict();
      assert.equal(conflictReserve, reserveArray[6]);
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

describe("class ReserveCallbackProcessor", function() {
  describe("Сервисные методы", function() {
      let callbackProccessor = new ReserveCallbackProcessor();
      it("Проверка функции генерации кнопок времени", function() {
          let buttons = [];
          let buttonRow = [];
          buttonRow.push({text: 0, callback_data: 0});
          buttonRow.push({text: 5, callback_data: 5});
          buttonRow.push({text: 10, callback_data: 10});
          buttonRow.push({text: 15, callback_data: 15});
          buttonRow.push({text: 20, callback_data: 20});
          buttonRow.push({text: 25, callback_data: 25});
          buttons.push(buttonRow);
          
          buttonRow = [];
          buttonRow.push({text: 30, callback_data: 30});
          buttonRow.push({text: 35, callback_data: 35});
          buttonRow.push({text: 40, callback_data: 40});
          buttonRow.push({text: 45, callback_data: 45});
          buttonRow.push({text: 50, callback_data: 50});
          buttonRow.push({text: 55, callback_data: 55});
          buttons.push(buttonRow);

          assert.deepEqual(callbackProccessor.createMinuteButtons(), buttons);
      });

  });

  describe("Обработка пунктов меню", function() {
    let callbackProccessor = new ReserveCallbackProcessor();

    it("Кнопка Начать бронирование", function() {
      let keyboard = callbackProccessor.createBookMenuKeyboard();
      let msgText = strReserveStateHeader + callbackProccessor.state.reserve.getStateMessageText();

      callbackProccessor.proceedCallback("book");

      assert.equal(callbackProccessor.state.menu, "book");
      assert.equal(callbackProccessor.message.text, msgText);
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.equal(callbackProccessor.callbackText, strReserve);
    });

    it("Кнопка Назад", function() {
      let msgText = strMainMenu;
      let keyboard = {inline_keyboard: 
        [[{text: strBeginReserve, callback_data: 'book'}], 
        [{text: strReserveList, callback_data: 'list'}]]};

      callbackProccessor.state.menu = "book";
      callbackProccessor.proceedCallback("back");

      assert.equal(callbackProccessor.state.menu, "main");
      assert.equal(callbackProccessor.message.text, msgText);
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.equal(callbackProccessor.callbackText, strMainMenu);
    });

    it("Кнопка Выбрать дату", function() {
      let buttons = callbackProccessor.createDateButtons();
      buttons.push([{text: strBackButton, callback_data: 'back'}]);
      let keyboard = {inline_keyboard: buttons};
      let msgText = callbackProccessor.message.text;

      callbackProccessor.state.menu = "book";
      callbackProccessor.proceedCallback("date");

      assert.equal(callbackProccessor.state.menu, "date");
      assert.equal(callbackProccessor.message.text, msgText);
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.equal(callbackProccessor.callbackText, strDateButton);
    });
    
    it("Кнопка Выбрать время", function() {
      let buttons = callbackProccessor.createTimeButtons();
      buttons.push([{text: strBackButton, callback_data: 'back'}]);
      let keyboard = {inline_keyboard: buttons};
      let msgText = callbackProccessor.message.text;

      callbackProccessor.state.menu = "book";
      callbackProccessor.proceedCallback("time");

      assert.equal(callbackProccessor.state.menu, "time");
      assert.equal(callbackProccessor.message.text, msgText);
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.equal(callbackProccessor.callbackText, strSelect + " " + strHour);
    });

    it("Кнопка выбора минут", function() {
      let buttons = callbackProccessor.createMinuteButtons();
      buttons.push([{text: strBackButton, callback_data: 'back'}]);
      let keyboard = {inline_keyboard: buttons};
      let msgText = callbackProccessor.message.text;

      callbackProccessor.state.menu = "time";
      callbackProccessor.proceedCallback("minutes");

      assert.equal(callbackProccessor.state.menu, "minutes");
      assert.equal(callbackProccessor.message.text, msgText);
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.equal(callbackProccessor.callbackText, strSelect + " " + strMinutes);
    });
  });

  describe("Изменение данных", function() {
    let callbackProccessor = new ReserveCallbackProcessor();

    it("Проверка изменения даты", function() {
      let keyboard = callbackProccessor.createBookMenuKeyboard();
      let newDate = new Date(callbackProccessor.state.reserve.start);
      newDate.setDate(today.getDate() + 1);

      callbackProccessor.state.menu = "date";
      callbackProccessor.proceedCallback(1);

      assert.equal(callbackProccessor.state.menu, "book");
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.deepEqual(callbackProccessor.state.reserve.start, newDate);
      assert.equal(callbackProccessor.callbackText, 
          strDay + ": " + newDate.toLocaleDateString(dateLocale, dateOptions) );
    });

    it("Проверка изменения часов", function() {
      let buttons = callbackProccessor.createMinuteButtons();
      buttons.push([{text: strBackButton, callback_data: 'back'}]);
      let keyboard = {inline_keyboard: buttons};
      let newDate = new Date(callbackProccessor.state.reserve.start);
      newDate.setHours(18);

      callbackProccessor.state.menu = "time";
      callbackProccessor.proceedCallback(18);

      assert.equal(callbackProccessor.state.menu, "minutes");
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.deepEqual(callbackProccessor.state.reserve.start, newDate);
      assert.equal(callbackProccessor.callbackText, strSelect + " " + strMinutes);
    });

    it("Проверка изменения минут", function() {
      let keyboard = callbackProccessor.createBookMenuKeyboard();
      let newDate = new Date(callbackProccessor.state.reserve.start);
      newDate.setMinutes(40);

      callbackProccessor.state.menu = "minutes";
      callbackProccessor.proceedCallback(40);

      assert.equal(callbackProccessor.state.menu, "book");
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.deepEqual(callbackProccessor.state.reserve.start, newDate);
      assert.equal(callbackProccessor.callbackText, strTime + ": 18:40");
    });

    it("Проверка изменения количества", function() {
      let keyboard = callbackProccessor.createBookMenuKeyboard();

      callbackProccessor.state.menu = "count";
      callbackProccessor.proceedCallback(3);

      assert.equal(callbackProccessor.state.menu, "book");
      assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
      assert.equal(callbackProccessor.state.reserve.count, 3);
      assert.equal(callbackProccessor.callbackText, strCount + ": 3");
    });
  });
});

describe("class WakeProcessor", function() {
    describe("Свойства объекта по умолчанию", function() {
        let callbackProccessor = new WakeProcessor();

        it("Проверка типа состояния", function() {
            assert.equal(callbackProccessor.state.type, 'wake');
        });

        it("Проверка меню состояния", function() {
            assert.equal(callbackProccessor.state.menu, 'main');
        });
    });
    
    describe("Обработка главного меню", function() {
      it("Проверка обработки кнопки Начать бронирование ", function() {
        let callbackProcessor = new WakeProcessor();
        let keyboard = callbackProcessor.createBookMenuKeyboard();
        let msgText = strReserveStateHeader + callbackProcessor.state.reserve.getStateMessageText();
          
        callbackProcessor.proceedCallback("book");
        assert.equal(callbackProcessor.state.type, "wake");
        assert.equal(callbackProcessor.state.menu, "book");
        assert.equal(callbackProcessor.message.text, msgText);
        assert.deepEqual(callbackProcessor.message.keyboard, keyboard);
      });
      
      it("Проверка обработки кнопки Список активных бронирований ", function() {
        let callbackProcessor = new WakeProcessor(new GoogleSheetDataAdapter(GOOGLE_SPREAD_SHEET, 
          ENTRY_SHEET_NAME, LIST_SHEET_NAME));
        let buttons = [[{text: strBackButton, callback_data: "back"}]];
        let keyboard = {inline_keyboard: buttons};
        let msgText = "<b>Список активных бронирований: </b>\n<b>04.07.2020</b>\n1. ⏰ 10:00 - 11:00 🏄‍♂️ 👙\n2. ⏱ 11:30 - 11:50 🏄‍♂️ 👙\n3. ⏱ 12:00 - 12:20 🏄‍♂️ 👙\n4. ⏰ 12:00 - 13:00\n5. ⏱ 13:00 - 13:10 🏄‍♂️\n6. ⏱ 13:00 - 13:30 👙\n7. ⏰ 14:00 - 15:00\n8. ⏰ 15:00 - 16:00 🏄‍♂️ 👙\n9. ⏰ 16:00 - 17:00 🏄‍♂️ 👙\n10. ⏰ 17:00 - 19:00 🏄‍♂️ 👙\n\n<b>06.07.2020</b>\n11. ⏱ 15:00 - 15:10 🏄‍♂️ 👙\n\n<b>07.07.2020</b>\n12. ⏰ 10:00 - 11:00 🏄‍♂️ 👙\n"

        callbackProcessor.proceedCallback("list");
        assert.equal(callbackProcessor.state.type, 'wake');
        assert.equal(callbackProcessor.state.menu, 'list');
        assert.deepEqual(callbackProcessor.message.keyboard, keyboard);
        assert.equal(callbackProcessor.message.text, msgText);
        assert.equal(callbackProcessor.callbackText, strReserveList);
      });
    });

    describe("Обработка пунктов меню", function() {
      let callbackProcessor = new WakeProcessor(new GoogleSheetDataAdapter(GOOGLE_SPREAD_SHEET, 
        ENTRY_SHEET_NAME, LIST_SHEET_NAME));

      it("Обработка кнопки Сет", function() {
        let buttons = callbackProcessor.createCountButtons();
        buttons.push([{text: strBackButton, callback_data: 'back'}]);
        let keyboard = {inline_keyboard: buttons};
        let msgText = callbackProcessor.message.text;

        callbackProcessor.state.menu = "book";
        callbackProcessor.proceedCallback("set");

        assert.equal(callbackProcessor.state.menu, "set");
        assert.equal(callbackProcessor.message.text, msgText);
        assert.deepEqual(callbackProcessor.message.keyboard, keyboard);
        assert.equal(callbackProcessor.callbackText, strSet);
      });

      it("Обработка кнопки Час", function() {
        let buttons = callbackProcessor.createCountButtons();
        buttons.push([{text: strBackButton, callback_data: 'back'}]);
        let keyboard = {inline_keyboard: buttons};
        let msgText = callbackProcessor.message.text;

        callbackProcessor.state.menu = "book";
        callbackProcessor.proceedCallback("hour");

        assert.equal(callbackProcessor.state.menu, "hour");
        assert.equal(callbackProcessor.message.text, msgText);
        assert.deepEqual(callbackProcessor.message.keyboard, keyboard);
        assert.equal(callbackProcessor.callbackText, strHour);
      });

      it("Обработка кнопки Забронировать", function() {
        let reserveRow = callbackProcessor.state.reserve.toArray();
        let buttons = callbackProcessor.createCountButtons();
        buttons.push([{text: strBackButton, callback_data: 'back'}]);
        let keyboard = null;
        let msgText = strReserveComfirmedHeader;
        msgText += callbackProcessor.state.reserve.getStateMessageText();

        callbackProcessor.state.menu = "book";
        callbackProcessor.proceedCallback("apply");

        reserveRows = callbackProcessor.dataAdapter.getActiveReserveRows();

        assert.equal(callbackProcessor.state.menu, "main");
        assert.equal(callbackProcessor.message.text, msgText);
        assert.deepEqual(callbackProcessor.message.keyboard, keyboard);
        assert.equal(callbackProcessor.callbackText, strReserveComfirmed);
        assert.deepEqual(reserveRows[reserveRows.length - 1], reserveRow);
      });

    });

    describe("Проверка изменения данных", function() {
        let callbackProccessor = new WakeProcessor();

        it("Проверка изменения Сет", function() {
            let keyboard = callbackProccessor.createBookMenuKeyboard();

            callbackProccessor.state.menu = "set";
            callbackProccessor.proceedCallback(4);

            assert.equal(callbackProccessor.state.menu, "book");
            assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
            assert.equal(callbackProccessor.state.reserve.count, 4);
            assert.equal(callbackProccessor.state.reserve.setType, "set");
            assert.equal(callbackProccessor.callbackText, strSet + ": 4");
        });

        it("Проверка изменения Час", function() {
            let keyboard = callbackProccessor.createBookMenuKeyboard();

            callbackProccessor.state.menu = "hour";
            callbackProccessor.proceedCallback(2);

            assert.equal(callbackProccessor.state.menu, "book");
            assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
            assert.equal(callbackProccessor.state.reserve.count, 2);
            assert.equal(callbackProccessor.state.reserve.setType, "hour");
            assert.equal(callbackProccessor.callbackText, strHour + ": 2");
        });

        it("Проверка изменения Вейкборд", function() {
            let keyboard = callbackProccessor.createBookMenuKeyboard();

            callbackProccessor.state.menu = "book";
            callbackProccessor.proceedCallback("board");

            assert.equal(callbackProccessor.state.menu, "book");
            assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
            assert.equal(callbackProccessor.state.reserve.board, 1);
            assert.equal(callbackProccessor.callbackText, strAddBoard);

            callbackProccessor.proceedCallback("board");
            assert.equal(callbackProccessor.state.reserve.board, 0);
            assert.equal(callbackProccessor.callbackText, strRemoveBoard);

        });

        it("Проверка изменения Гидрокостюм", function() {
            let keyboard = callbackProccessor.createBookMenuKeyboard();

            callbackProccessor.state.menu = "book";
            callbackProccessor.proceedCallback("hydro");

            assert.equal(callbackProccessor.state.menu, "book");
            assert.deepEqual(callbackProccessor.message.keyboard, keyboard);
            assert.equal(callbackProccessor.state.reserve.hydro, 1);
            assert.equal(callbackProccessor.callbackText, strAddHydro);

            callbackProccessor.proceedCallback("hydro");
            assert.equal(callbackProccessor.state.reserve.hydro, 0);
            assert.equal(callbackProccessor.callbackText, strRemoveHydro);
        });

    });


});

describe("class ChatProcessor", function() {
  let props = new GoogleProperties();

  describe("Проверка наличия функций регистрации обработчиков", function(){
    let update = {};
    update.message = {};
    update.message.chat = {id: 586350636};
    update.message.entities = [{type: "bot_command"}];

    let chatProcessor = new ChatProcessor(update, props);

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
  });

  describe("Тестирование парсинга команд", function(){
    let update = {};
    update.message = {};
    update.message.chat = {id: 586350636};
    update.message.entities = [{type: "bot_command"}];
    update.message.text = "/start 18:30 26.06.2020";

    let chatProcessor = new ChatProcessor(update, props);

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
      let chatProcessor = new ChatProcessor(update, props);
      let wakeProcessor = new WakeProcessor();
      let defaultProcessor = new DefaultCommandProcessor();
      chatProcessor.registerCommandProcessor('start', defaultProcessor);
      chatProcessor.registerCommandProcessor('help', defaultProcessor);
      chatProcessor.registerCommandProcessor('wake', wakeProcessor);
      chatProcessor.proceed(true);

      assert.isUndefined(props.getProperty(update.message.chat.id));
    });

    it("Проверка выполнения /help", function() {
      let strUpdate = '{"update_id":354673863,"message":{"message_id":403,"from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1593765384,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}}';
      let update = JSON.parse(strUpdate);
      let chatProcessor = new ChatProcessor(update, props);
      let wakeProcessor = new WakeProcessor();
      let defaultProcessor = new DefaultCommandProcessor();
      chatProcessor.registerCommandProcessor('start', defaultProcessor);
      chatProcessor.registerCommandProcessor('help', defaultProcessor);
      chatProcessor.registerCommandProcessor('wake', wakeProcessor);
      chatProcessor.proceed(true);

      assert.isUndefined(props.getProperty(update.message.chat.id));
    });

    it("Проверка выполнения /wake", function() {
      let strUpdate = '{"update_id":354673864,"message":{"message_id":407,"from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1593765485,"text":"/wake","entities":[{"offset":0,"length":5,"type":"bot_command"}]}}';
      let update = JSON.parse(strUpdate);
      let chatProcessor = new ChatProcessor(update, props);
      let wakeProcessor = new WakeProcessor();
      let defaultProcessor = new DefaultCommandProcessor();
      chatProcessor.registerCommandProcessor('start', defaultProcessor);
      chatProcessor.registerCommandProcessor('help', defaultProcessor);
      chatProcessor.registerCommandProcessor('wake', wakeProcessor);
      chatProcessor.proceed(true);

      assert.equal(props.getProperty(update.message.chat.id), wakeProcessor.state.toJSON());
    });
  });

  describe("Тестирование обработки callback", function() {
    describe("Проверка обработки меню Wake", function() {
      it("Проверка кнопки Начать бронирование", function() {
        let strUpdate = '{"update_id":354673865,"callback_query":{"id":"2518356807915706815","from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"message":{"message_id":419,"from":{"id":1273795086,"is_bot":true,"first_name":"DevWakeBot","username":"DevWakeBot"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1593765995,"text":"Message Text","entities":[{"offset":0,"length":30,"type":"bold"}],"reply_markup":{"inline_keyboard":[[{"text":"\u041d\u0430\u0447\u0430\u0442\u044c \u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435","callback_data":"book"}],[{"text":"\u0421\u043f\u0438\u0441\u043e\u043a \u0430\u043a\u0442\u0438\u0432\u043d\u044b\u0445 \u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0439","callback_data":"list"}]]}},"chat_instance":"-1517723406088083073","data":"book"}}';
        let update = JSON.parse(strUpdate);
        let stateJSON = '{"type":"wake","menu":"main","start":1593705600000,"count":1,"set_type":"set"}';
        let chatProcessor = new ChatProcessor(update, props);
        props.setProperty(update.callback_query.message.chat.id, stateJSON);

        let wakeCallbackProcessor = new WakeProcessor();
        chatProcessor.registerCallbackProcessor('wake', wakeCallbackProcessor);

        chatProcessor.proceed(true);
        assert.equal(props.getProperty(update.callback_query.message.chat.id), wakeCallbackProcessor.state.toJSON());
      });

      it("Проверка кнопки Выбрать дату", function() {
        let strUpdate = '{"update_id":354673870,"callback_query":{"id":"2518356807773773505","from":{"id":586350636,"is_bot":false,"first_name":"Alexey","last_name":"Sukharev","language_code":"en"},"message":{"message_id":433,"from":{"id":1273795086,"is_bot":true,"first_name":"DevWakeBot","username":"DevWakeBot"},"chat":{"id":586350636,"first_name":"Alexey","last_name":"Sukharev","type":"private"},"date":1593767429,"edit_date":1593767473,"text":"Message text","entities":[{"offset":0,"length":23,"type":"bold"},{"offset":24,"length":6,"type":"bold"},{"offset":43,"length":5,"type":"bold"},{"offset":52,"length":12,"type":"bold"}],"reply_markup":{"inline_keyboard":[[{"text":"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0434\u0430\u0442\u0443","callback_data":"date"}],[{"text":"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0432\u0440\u0435\u043c\u044f","callback_data":"time"}],[{"text":"\u0421\u0435\u0442","callback_data":"set"},{"text":"\u0427\u0430\u0441","callback_data":"hour"}],[{"text":"\ud83c\udfc4\u200d\u2642\ufe0f \u0412\u0435\u0439\u043a\u0431\u043e\u0440\u0434","callback_data":"board"},{"text":"\ud83d\udc59 \u0413\u0438\u0434\u0440\u043e\u043a\u043e\u0441\u0442\u044e\u043c","callback_data":"hydro"}]]}},"chat_instance":"-1517723406088083073","data":"date"}}';
        let update = JSON.parse(strUpdate);
        let stateJSON = '{"type":"wake","menu":"book","start":1593705600000,"count":1,"set_type":"set"}';
        let chatProcessor = new ChatProcessor(update, props);
        props.setProperty(update.callback_query.message.chat.id, stateJSON);

        let wakeCallbackProcessor = new WakeProcessor();
        chatProcessor.registerCallbackProcessor('wake', wakeCallbackProcessor);

        chatProcessor.proceed(true);
        assert.equal(props.getProperty(update.callback_query.message.chat.id), wakeCallbackProcessor.state.toJSON());
      });
    });
  });
});

describe("class GoogleSheetDataAdapter", function() {
  let dataAdapter;
  describe("Создание объекта доступа к данным", function() {
      
    it("Создание экземпляра", function() {
      dataAdapter = new GoogleSheetDataAdapter(GOOGLE_SPREAD_SHEET, ENTRY_SHEET_NAME, LIST_SHEET_NAME);

      assert.equal(dataAdapter.spreadSheetId, GOOGLE_SPREAD_SHEET);
      assert.equal(dataAdapter.entrySheetName, ENTRY_SHEET_NAME);
      assert.equal(dataAdapter.listSheetName, LIST_SHEET_NAME);
    });
  });

  describe("Проверка методов доступа к данным", function() {

    describe("Получение списка активных резервирований", function() {
      let reserveRows;

      it("Получение строк", function() {
        reserveRows = dataAdapter.getActiveReserveRows();
      });

      it("Проверка количеств строк", function() {
        assert.equal(reserveRows.length, 12);
      });

      it("Проверка количеств столбцов", function() {
        assert.equal(reserveRows[0].length, 9);
      });
    });

    describe("Проверка добавления строки", function() {
      let reserveRow;
      let reserveRows;

      it("Добавление строки", function() {
        reserveRow = [new Date(),329454218,"Misha V",new Date("06.07.2020 10:00:00"),	new Date("06.07.2020 11:00:00"), "hour",1,1,1];
        dataAdapter.appendReserveRow(reserveRow);
        reserveRows = dataAdapter.getActiveReserveRows();
      });

      it("Проверка количеств строк", function() {
        assert.equal(reserveRows.length, 13);
      });

      it("Проверка последней строки", function() {
        assert.deepEqual(reserveRows[12][0], reserveRow[0]);
        assert.equal(reserveRows[12][1], reserveRow[1]);
        assert.equal(reserveRows[12][2], reserveRow[2]);
        assert.deepEqual(reserveRows[12][3], reserveRow[3]);
        assert.deepEqual(reserveRows[12][4], reserveRow[4]);
        assert.equal(reserveRows[12][5], reserveRow[5]);
        assert.equal(reserveRows[12][6], reserveRow[6]);
        assert.equal(reserveRows[12][7], reserveRow[7]);
        assert.equal(reserveRows[12][8], reserveRow[8]);
      });
    });

    describe("Проверка удаления строки", function() {
      let reserveRow;
      let reserveRows;

      it("Удаление строки", function() {
        idColumnNumber = 0;
        idValue = new Date("07.02.2020 21:05:12");
        reserveRows = dataAdapter.getActiveReserveRows();
        reserveRow = reserveRows[12];

        dataAdapter.deleteReserveRow(idColumnNumber, idValue);
        reserveRows = dataAdapter.getActiveReserveRows();
      });

      it("Проверка количеств строк", function() {
        assert.equal(reserveRows.length, 12);
      });

      it("Проверка последней строки", function() {
        assert.deepEqual(reserveRows[11][0], reserveRow[0]);
        assert.equal(reserveRows[11][1], reserveRow[1]);
        assert.equal(reserveRows[11][2], reserveRow[2]);
        assert.deepEqual(reserveRows[11][3], reserveRow[3]);
        assert.deepEqual(reserveRows[11][4], reserveRow[4]);
        assert.equal(reserveRows[11][5], reserveRow[5]);
        assert.equal(reserveRows[11][6], reserveRow[6]);
        assert.equal(reserveRows[11][7], reserveRow[7]);
        assert.equal(reserveRows[11][8], reserveRow[8]);
      });
    });
  });
});