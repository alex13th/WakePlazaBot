const scriptProperties = PropertiesService.getScriptProperties();

function doPost(e) {
  
  strUpdate = e.postData.contents;
  let update = JSON.parse(strUpdate);
  if ( update ) {
    let chatProcessor = new ChatProcessor(update, scriptProperties);
    let defaultProcessor = new DefaultCommandProcessor();
    chatProcessor.registerCommandProcessor('start', defaultProcessor);
    chatProcessor.registerCommandProcessor('help', defaultProcessor);
    
    let wakeProcessor = new WakeProcessor(new GoogleSheetDataAdapter(GOOGLE_SPREAD_SHEET, 
      ENTRY_SHEET_NAME, LIST_SHEET_NAME));
    chatProcessor.registerCommandProcessor('wake', wakeProcessor);
    chatProcessor.registerCallbackProcessor('wake', wakeProcessor);
    
    chatProcessor.proceed();
  }
}
