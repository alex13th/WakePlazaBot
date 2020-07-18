const scriptProperties = PropertiesService.getScriptProperties();

function doPost(e) {
  
  let strUpdate
  strUpdate = e.postData.contents;
  
  if ( strUpdate ) {
    let chatProcessor = new ChatProcessor(strUpdate, scriptProperties);

    chatProcessor.registerCommandProcessor('start', DefaultCommandProcessor);
    chatProcessor.registerCommandProcessor('help', DefaultCommandProcessor);
    
    let wakeDataAdapter = new GoogleSheetDataAdapter(SPREAD_SHEET, WAKE_SHEET_NAME, WAKE_ACTIVE_SHEET_NAME);
    chatProcessor.registerCommandProcessor('wake', WakeProcessor, wakeDataAdapter);
    chatProcessor.registerCallbackProcessor('wake', WakeProcessor, wakeDataAdapter);

    let supDataAdapter = new GoogleSheetDataAdapter(SPREAD_SHEET, SUP_SHEET_NAME, SUP_ACTIVE_SHEET_NAME);
    chatProcessor.registerCommandProcessor('sup', SupProcessor, supDataAdapter);
    chatProcessor.registerCallbackProcessor('sup', SupProcessor, supDataAdapter);
    
    chatProcessor.proceed();
  }
}
