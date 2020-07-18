class GoogleSheetDataAdapter {
  constructor(spreadSheetId, entrySheetName, listSheetName) {
    this.spreadSheetId = spreadSheetId;
    this.entrySheetName = entrySheetName;
    this.listSheetName = listSheetName;
    this.values = null;
  }

  openSheet(sheetName) {
    if(this.spreadSheet) {
      return this.spreadSheet.getSheetByName(sheetName);
    } else {
      this.spreadSheet = SpreadsheetApp.openById(this.spreadSheetId);
      return this.spreadSheet.getSheetByName(sheetName);
    }
  }

  getActiveReserveRows(keyColumnNum = null, keyValue =null) {
    let result = [];

    let sheet = this.openSheet(this.listSheetName);

    if(!this.values) {
      this.values = sheet.getDataRange().getValues();
      this.values.splice(0, 1);
    }

    if(keyColumnNum === null) {
      result = this.values;
    } else {

      for(let i = 0; i < this.values.length; i++) {
        if(this.values[i][keyColumnNum] === keyValue) {
          result.push(this.values[i]);
        }
      }
    }
    
    return result;
  }

  appendReserveRow(row) {
    let sheet = this.openSheet(this.entrySheetName);
    sheet.appendRow(row);
    this.values = null;
  }

  deleteReserveRow(keyColumnNum, keyValue) {
    let sheet = this.openSheet(this.entrySheetName);
    let values = sheet.getDataRange().getValues();

    for(let i = 1; i < values.length; i++) {
      if(values[i][keyColumnNum].toString() === keyValue.toString()) {
        sheet.deleteRow(i + 1);
        break;
      }
    }    

    this.values = null;
  }
}