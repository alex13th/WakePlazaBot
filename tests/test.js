let reserveValues = [];

reserveValues.push(["created_at","telegam_id","telegram_name","book_start","book_end","book_type","book_count","rent_board","rent_hydro"]);
reserveValues.push([new Date("07.03.2020 13:14:36"),329454218,"Misha V",new Date("07.04.2020 10:00:00"),new Date("07.04.2020 11:00:00"),1,1,1]);
reserveValues.push([new Date("07.03.2020 13:32:20"),143929127,"sizhek",new Date("07.04.2020 11:30:00"),new Date("07.04.2020 11:50:00"),2,4,1]);
reserveValues.push([new Date("07.03.2020 10:15:37"),143929127,"sizhek",new Date("07.04.2020 12:00:00"),new Date("07.04.2020 12:20:00"),2,4,1]);
reserveValues.push([new Date("07.03.2020 11:16:40"),329454218,"Misha V",new Date("07.04.2020 12:00:00"),new Date("07.04.2020 13:00:00"),1,4,0]);
reserveValues.push([new Date("07.03.2020 10:17:19"),143929127,"sizhek",new Date("07.04.2020 13:00:00"),new Date("07.04.2020 13:10:00"),1,4,0]);
reserveValues.push([new Date("07.03.2020 11:18:32"),329454218,"Misha V",new Date("07.04.2020 13:00:00"),new Date("07.04.2020 13:30:00"),3,4,1]);
reserveValues.push([new Date("07.02.2020 21:05:12"),480666793,"topskiipavel",new Date("07.04.2020 14:00:00"),new Date("07.04.2020 15:00:00"),1,4,0]);
reserveValues.push([new Date("07.02.2020 21:16:10"),329454218,"Misha V",new Date("07.04.2020 15:00:00"),new Date("07.04.2020 16:00:00"),1,1,1]);
reserveValues.push([new Date("07.03.2020 13:33:15"),143929127,"sizhek",new Date("07.04.2020 16:00:00"),new Date("07.04.2020 17:00:00"),1,1,1]);
reserveValues.push([new Date("07.03.2020 19:58:48"),143929127,"sizhek",new Date("07.04.2020 17:00:00"),new Date("07.04.2020 19:00:00"),2,1,1]);
reserveValues.push([new Date("07.03.2020 10:18:33"),143929127,"sizhek",new Date("07.06.2020 15:00:00"),new Date("07.06.2020 15:10:00"),1,1,1]);
reserveValues.push([new Date("07.03.2020 10:19:08"),143929127,"sizhek",new Date("07.07.2020 10:00:00"),new Date("07.07.2020 11:00:00"),1,1,1]);


let wakeValues = [];
wakeValues.push(["created_at","telegam_id","telegram_name","book_start","book_end","book_type","book_count","rent_board","rent_hydro"]);
wakeValues.push([new Date("07.03.2020 13:14:36"),329454218,"Misha V",new Date("07.04.2020 10:00:00"),new Date("07.04.2020 11:00:00"), "hour",1,1,1]);
wakeValues.push([new Date("07.03.2020 13:32:20"),143929127,"sizhek",new Date("07.04.2020 11:30:00"),new Date("07.04.2020 11:50:00"),"set",2,1,1]);
wakeValues.push([new Date("07.03.2020 10:15:37"),143929127,"sizhek",new Date("07.04.2020 12:00:00"),new Date("07.04.2020 12:20:00"),"set",2,1,1]);
wakeValues.push([new Date("07.03.2020 11:16:40"),329454218,"Misha V",new Date("07.04.2020 12:00:00"),new Date("07.04.2020 13:00:00"),"hour",1,0,0]);
wakeValues.push([new Date("07.03.2020 10:17:19"),143929127,"sizhek",new Date("07.04.2020 13:00:00"),new Date("07.04.2020 13:10:00"),"set",1,1,0]);
wakeValues.push([new Date("07.03.2020 11:18:32"),329454218,"Misha V",new Date("07.04.2020 13:00:00"),new Date("07.04.2020 13:30:00"),"set",3,0,1]);
wakeValues.push([new Date("07.02.2020 21:05:12"),480666793,"topskiipavel",new Date("07.04.2020 14:00:00"),new Date("07.04.2020 15:00:00"),"hour",1,0,0]);
wakeValues.push([new Date("07.02.2020 21:16:10"),329454218,"Misha V",new Date("07.04.2020 15:00:00"),new Date("07.04.2020 16:00:00"),"hour",1,1,1]);
wakeValues.push([new Date("07.03.2020 13:33:15"),143929127,"sizhek",new Date("07.04.2020 16:00:00"),new Date("07.04.2020 17:00:00"),"hour",1,1,1]);
wakeValues.push([new Date("07.03.2020 19:58:48"),143929127,"sizhek",new Date("07.04.2020 17:00:00"),new Date("07.04.2020 19:00:00"),"hour",2,1,1]);
wakeValues.push([new Date("07.03.2020 10:18:33"),143929127,"sizhek",new Date("07.06.2020 15:00:00"),new Date("07.06.2020 15:10:00"),"set",1,1,1]);
wakeValues.push([new Date("07.03.2020 10:19:08"),143929127,"sizhek",new Date("07.07.2020 10:00:00"),new Date("07.07.2020 11:00:00"),"hour",1,1,1]);


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

class GoogleCache {
  constructor(){
    this._cache = {};
  }

  get(key) {
      return this._cache[key];
  }

  put(key, value) {
      this._cache[key] = value;
  }

  putAll(values) {
    this._cache = values;
  }

  remove(key) {
      delete this._cache[key];
  }
} 

class GoogleRange {
    constructor(values) {
        this.values = values;
    }

    getValues() {
        return this.values.slice();
    }

}

class GoogleSheet {
    constructor(name) {
      switch(name) {
        case 'wake':
          this.range = new GoogleRange(wakeValues.slice());
          break;
  
        case 'reserve':
          this.range = new GoogleRange(reserveValues.slice());
          break;
      }    
    }

    getDataRange() {
        return this.range;
    }

    appendRow(row) {
      this.range.values.push(row);
    }

    deleteRow(pos) {
      return this.range.values.splice(pos - 1, 1);
    }
}

class GoogleSpreadsheet {
  constructor() {
    this.sheets = {};
    this.sheets["reserve"] = new GoogleSheet("reserve");
    this.sheets["wake"] = new GoogleSheet("wake");
  }

  getSheetByName(name) {
    return this.sheets[name];
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

let cache = new GoogleCache();
let props = new GoogleProperties();

let procClass = DefaultCommandProcessor;
let proc = new procClass();