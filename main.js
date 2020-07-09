const scriptProperties = PropertiesService.getScriptProperties();

function doPost(e) {
  
  strUpdate = e.postData.contents;

  if ( strUpdate ) {
    let chatProcessor = new ChatProcessor(strUpdate, scriptProperties);
    let defaultProcessor = new DefaultCommandProcessor();
    chatProcessor.registerCommandProcessor('start', defaultProcessor);
    chatProcessor.registerCommandProcessor('help', defaultProcessor);
    
    let wakeProcessor = new WakeProcessor(new GoogleSheetDataAdapter(WAKE_SPREAD_SHEET, 
      ENTRY_SHEET_NAME, LIST_SHEET_NAME));
    chatProcessor.registerCommandProcessor('wake', wakeProcessor);
    chatProcessor.registerCallbackProcessor('wake', wakeProcessor);

    let supProcessor = new SupProcessor(new GoogleSheetDataAdapter(SUP_SPREAD_SHEET, 
      ENTRY_SHEET_NAME, LIST_SHEET_NAME));
    chatProcessor.registerCommandProcessor('sup', supProcessor);
    chatProcessor.registerCallbackProcessor('sup', supProcessor);
    
    chatProcessor.proceed();
  }
}
