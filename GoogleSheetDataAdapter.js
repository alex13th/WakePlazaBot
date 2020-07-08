class GoogleSheetDataAdapter {
  constructor(spreadSheetId, entrySheetName, listSheetName) {
    this.spreadSheetId = spreadSheetId;
    this.entrySheetName = entrySheetName;
    this.listSheetName = listSheetName;
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
    let values = sheet.getDataRange().getValues();

    if(keyColumnNum) {
      for(let i = 0; i < values.length; i++) {
        if(values[i][keyColumnNum] === keyValue) {
          result.push(values[i]);
        }
      }
    } else {
      result = values.slice();
      result.splice(0, 1);
    }
    
    return result;
  }

  appendReserveRow(row) {
    let sheet = this.openSheet(this.entrySheetName);
    sheet.appendRow(row);    
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
  }
}