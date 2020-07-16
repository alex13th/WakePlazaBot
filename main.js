const scriptProperties = PropertiesService.getScriptProperties();

function doPost(e) {
  
  let strUpdate
  strUpdate = e.postData.contents;
  
  if ( strUpdate ) {
    let chatProcessor = new ChatProcessor(strUpdate, scriptProperties);
    let defaultProcessor = new DefaultCommandProcessor();
    chatProcessor.registerCommandProcessor('start', defaultProcessor);
    chatProcessor.registerCommandProcessor('help', defaultProcessor);
    
    let wakeProcessor = new WakeProcessor(new GoogleSheetDataAdapter(SPREAD_SHEET, 
      WAKE_SHEET_NAME, WAKE_ACTIVE_SHEET_NAME));
    chatProcessor.registerCommandProcessor('wake', wakeProcessor);
    chatProcessor.registerCallbackProcessor('wake', wakeProcessor);

    let supProcessor = new SupProcessor(new GoogleSheetDataAdapter(SPREAD_SHEET, 
      SUP_SHEET_NAME, SUP_ACTIVE_SHEET_NAME));
    chatProcessor.registerCommandProcessor('sup', supProcessor);
    chatProcessor.registerCallbackProcessor('sup', supProcessor);
    
    chatProcessor.proceed();
  }
}
