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

  getActiveReserveRows() {
    let sheet = this.openSheet(this.listSheetName);
    let values = sheet.getDataRange().getValues();
    let result = values.slice();
    result.splice(0, 1);
    
    return result;
  }

  appendReserveRow(row) {
    let sheet = this.openSheet(this.entrySheetName);
    sheet.appendRow(row);    
  }

  deleteReserveRow(idColummn, idValue) {
    let sheet = this.openSheet(this.entrySheetName);
    let values = sheet.getDataRange().getValues();
  
    for(let i = 1; i < values.length; i++) {
      if(values[i][idColummn].toString() === idValue.toString()) {
        sheet.deleteRow(i + 1);
        break;
      }
    }    
  }

}