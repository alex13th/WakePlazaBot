const ENTRY_SHEET_NAME = 'Telegram';
const LIST_SHEET_NAME = 'TelegramView';

let helpText = '<b>Список команд</b>';
helpText += '\n/wake - забронировать катание на Вейкборде;';
helpText += '\n/sup - забронировать Сапборд;';
helpText += '\n/help - справка по командам бота.'

let helloText = '<b>Привет!</b>';
helloText += '\nЭто наш новый сервис для бронирования времени на вейк-станции.';
helloText += 'Сейчас он находится в процессе тестирования, но вполне работоспособен.';
helloText += '\n\n' + helpText;

let wakeHelloText  = '<b>Вейкборд - великолепный выбор!</b>';
wakeHelloText += '\nРекомендуем перед бронированием посмотреть список активных бронирований.';

let supHelloText   = '<b>Сапборд - современно и душевно!</b>';
supHelloText += '\nРекомендуем перед бронированием посмотреть список активных бронирований.';

//const scriptProperties = PropertiesService.getScriptProperties();

// Date presentation parameters
const datetimeOptions = {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'};
const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric'};
const timeOptions = {hour: '2-digit', minute: '2-digit'};
const dateLocale = "ru";
// Date presentation parameters

// Icons
const hourIcon = '\u23f0';
const setIcon = '\u23f1';
const minuteIcon = '\u23f3';
const supIcon = '\ud83d\udef6';
const boardIcon = '\ud83c\udfc4\u200d\u2642\ufe0f';
const hydroIcon = '\ud83d\udc59';
const applyIcon = '\ud83d\udc4c';
const beginIcon = '\ud83d\udc49';
const stopIcon = '\u26d4\ufe0f'
const cancelIcon = '\u274c';
// Icons

// Locale string definitions
const strSelect = 'Выбрать';

const strWake = 'Вейкборд';
const strWakeHeader = 'Бронирование вейкборда';
const strWakeButton = boardIcon + ' ' + strWake;
const strSup = 'Сапборд';
const strSupButton = supIcon + ' ' + strSup;

const strSet = 'Сет';
const strHalfHour = '30 минут';
const strHour = 'Час';
const strMinutes = 'Минуты';

const strDateButton = 'Выбрать дату';
const strTimeButton = 'Выбрать время';
const strBackButton = 'Назад';

const strBoardButton = boardIcon + ' ' + strWake;
const strHydro = 'Гидрокостюм';
const strHydroButton = hydroIcon + ' ' + strHydro;

const strAddBoard = 'Аренда вейка';
const strRemoveBoard = 'Отмена аренды вейка';

const strAddHydro = 'Аренда гидрокостюма';
const strRemoveHydro = 'Отмена аренды гидрокостюма';

const strApply = 'Забронировать';
const strReserveComfirmed = 'Бронь внесена!';
const strReserveComfirmedHeader = '<b>' + strReserveComfirmed + '</b>\n';

const strMainMenu = 'Гланое меню';

const strBeginReserve = 'Начать бронирование';
const strBeginReserveButton = 'Начать бронирование';

const strReserve = 'Бронирование';
const strReserveStateHeader = '<b>' + strReserve + ': </b>';

const strNoBooks = 'Нет активных бронирований';
const strNoBooksCaption = '<b>' + strNoBooks + '</b>\n';

const strAttention = 'Внимание!';
const strReserveConflict = '<b>' + strAttention.toUpperCase() + '</b>\nПересекается с бронированием:';

const strName = 'Имя';
const strNameLabel = '<b>' + strName + ': </b>';

const strType = 'Вид';
const strTypeLabel = '<b>' + strType + ': </b>';

const strCount = 'Количество';
const strCountButton = strCount;
const strCountLabel = '<b>' + strCount + ': </b>';

const strDay = 'Дата';
const strDayLabel = '<b>' + strDay + ': </b>';

const strTime = 'Время';
const strTimeLabel = '<b>' + strTime + ': </b>';

const strStartTime = 'Начало';
const strStartTimeLabel = '<b>' + strStartTime + ': </b>';

const strEndTime = 'Окончание';
const strEndTimeLabel = '<b>' + strEndTime + ': </b>';

const strOptions = 'Опции';
const strOptionsLabel = '<b>' + strOptions + ': </b>';

const strRecord = 'Запись';

const strReserveList = 'Список активных бронирований';
const strReserveListHeader = '<b>' + strReserveList + ': </b>';

const strMyReserveList = 'Список Ваших бронирований';
const strMyReserveListHeader = '<b>' + strMyReserveList + ': </b>';

const strDeleteList = 'Выберите бронирование для удаления:';
const strDeleteListHeader = '<b>' + strReserveList + '</b>'
const strDeleted = 'Запись удалена';

const strCancel = 'Отменить';
const strCancelButton = cancelIcon + ' ' + strCancel;
// Locale string definitions

// Set type button definitions
const strHourButton = strHour;
const strSetButton = strSet;
const typeHourButton = {text: strHourButton, data: 'hour'};
const typeSetButton = {text: strSetButton, data: 'set'};

const typeButtons = [typeHourButton, typeSetButton];
// Set type button definitions

// Count button definitions
const countButtons = [
  {text: '1\ufe0f\u20e3', data: '1'}, 
  {text: '2\ufe0f\u20e3', data: '2'}, 
  {text: '3\ufe0f\u20e3', data: '3'}, 
  {text: '4\ufe0f\u20e3', data: '4'}, 
  {text: '5\ufe0f\u20e3', data: '5'}];
// Count button definition

// Book option button definitions 
const boardButton = {text: strBoardButton, data: 'board'};
const hydroButton = {text: strHydroButton, data: 'hydro'};

const optionButtons = [boardButton, hydroButton];
// Book option button definitions 

// Confirm book button defenitions
const applyButton = {text: applyIcon + ' ' + strApply, data: 'apply'};

const confirmButtons = [applyButton];
// Confirm book button defenitions

// Main menu button definitions
const beginButton = beginIcon + ' ' + strBeginReserve; 
const mainMenuButtons = [beginButton];
