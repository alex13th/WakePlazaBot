const scriptProperties = PropertiesService.getScriptProperties();

function doPost(e) {
  
  let strUpdate;
  strUpdate = e.postData.contents;
  
  if ( strUpdate ) {
    let chatProcessor = new ChatProcessor();

    chatProcessor.registerCommandProcessor('start', DefaultCommandProcessor);
    chatProcessor.registerCommandProcessor('help', DefaultCommandProcessor);
    
    let wakeDataAdapter = new GoogleSheetDataAdapter(SPREAD_SHEET, WAKE_SHEET_NAME, WAKE_ACTIVE_SHEET_NAME);
    chatProcessor.registerCommandProcessor('wake', WakeProcessor, wakeDataAdapter);
    chatProcessor.registerCallbackProcessor('wake', WakeProcessor, wakeDataAdapter);

    let supDataAdapter = new GoogleSheetDataAdapter(SPREAD_SHEET, SUP_SHEET_NAME, SUP_ACTIVE_SHEET_NAME);
    chatProcessor.registerCommandProcessor('sup', SupProcessor, supDataAdapter);
    chatProcessor.registerCallbackProcessor('sup', SupProcessor, supDataAdapter);

    let userDataAdapter = new GoogleSheetDataAdapter(SPREAD_SHEET, USERS_SHEET_NAME, USERS_SHEET_NAME);
    chatProcessor.registerCommandProcessor('contact', ContactProcessor);
    chatProcessor.registerContactProcessor(ContactProcessor, userDataAdapter);


    chatProcessor.proceed(strUpdate, scriptProperties);
  }
}

function delStates() {
  let props = PropertiesService.getScriptProperties();
  let stateProps = props.getProperties();
  let delDate = new Date();
  let delCount = 0;
  delDate.setDate(delDate.getDate() - 7);
  
  Logger.log('********************************************************************************');
  Logger.log('Start time: ' + (new Date()).toLocaleDateString(dateLocale, datetimeSecOptions) );
  Logger.log('Start States count: ' + Object.keys(stateProps).length );

  for(let stateProp in stateProps) {
    let state = JSON.parse(stateProps[stateProp]);
    if(!state.start || state.start < delDate.getTime()) {
      props.deleteProperty(stateProp);
      delCount++;
    }
  }

  stateProps = props.getProperties();
  Logger.log('Deleted States count: ' + delCount );
  Logger.log('Finish States count: ' + Object.keys(stateProps).length );
  Logger.log('Finish time: ' + (new Date()).toLocaleDateString(dateLocale, datetimeSecOptions) );
  Logger.log('********************************************************************************');
}