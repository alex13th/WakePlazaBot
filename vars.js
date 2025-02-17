const USERS_SHEET_NAME = 'Users';

const WAKE_SHEET_NAME = 'Wakeboard';
const WAKE_ACTIVE_SHEET_NAME = 'WakeboardActive';

const SUP_SHEET_NAME = 'Supboard';
const SUP_ACTIVE_SHEET_NAME = 'SupboardActive';

// Date presentation parameters
const datetimeOptions = {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'};
const datetimeSecOptions = {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'};
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
const noEntryIcon  = '\u26d4\ufe0f';
const stopIcon = '\ud83d\uded1';
const cancelIcon = '\u274c';
const noticeIcon = '\u2139\ufe0f';
const reloadIcon = '\ud83d\udd04';
const pensiveIcon = '\ud83d\ude14';
const grinningIcon = '\ud83d\ude00';
const phoneIcon = '\ud83d\udcde';
// Icons

let helpText = '<b>Список команд</b>';
helpText += '\n/wake - забронировать катание на Вейкборде;';
helpText += '\n/sup - забронировать Сапборд;';
helpText += '\n/contact - предоставить/обновить контактные данные для возможности ';
helpText += 'оперативной обратной связи.'
helpText += '\n/help - справка по командам бота.'
helpText += '\n\nВ случае необходимости, Вы всегда можете связаться ';
helpText += 'с администратором <b>WAKEPLAZA</b> по телефону: <b>922-111</b>.'

let helloText = '<b>Привет!</b>';
helloText += '\nЭто наш новый сервис для бронирования времени на вейк-станции. ';
helloText += 'Сейчас он находится в процессе тестирования, но вполне работоспособен.';
helloText += '\n\n' + helpText;

let noticeText = 'Для подтверждения вашего бронирования просим вас ';
noticeText += 'связаться по телефону с администратором WAKEPLAZA <b>922-111</b>.';

let wakeHelloText  = '<b>Вейкборд - великолепный выбор!</b>';
wakeHelloText += '\nРекомендуем перед бронированием посмотреть список активных бронирований.';

let supHelloText   = '<b>Сапборд - современно и душевно!</b>';
supHelloText += '\nРекомендуем перед бронированием посмотреть список активных бронирований.';

let getContactText = noticeIcon + ' <b>Почему стоит предоставить контактную информацию:</b>';
getContactText += '\n\n<b>Во-первых</b>, Вам достаточно сделать это <b>один раз</b>, ';
getContactText += 'а в дальнейшем при желании можно будет ее просто обновить.';
getContactText += '\n\n<b>Во-вторых</b>, даже если Вы будете немного опаздывать, мы сможем оперативно ';
getContactText += 'связаться, не отменим бронь и не передадим время другими клиентам.';
getContactText += '\n\n<b>В-третьих</b>, в нашей жизни случаются разные непредвиденные ситуации, ';
getContactText += 'такие например как технические неполадки оборудования и т.п. Соответственно, ';
getContactText += 'быстрее всего мы сможем довести такую информацию до тех клиентов ';
getContactText += 'контактную информацию которых мы знаем.';
getContactText += '\n\nВ конечном счете, мы сохраняем только номер телефона, ';
getContactText += 'а доступ к нему имеют <b>только администраторы</b> бота.';

let regretMessageText = '<b>Очень жаль!</b> ' + pensiveIcon;
regretMessageText += ' \n\nЕсли передумаете Вы всегда можете воспользоваться командой /contact'


let thanksContactText = '<b>Это просто здорово!</b> ' + grinningIcon;
thanksContactText += '\nТеперь нам будет проще связаться с Вами! ' + phoneIcon;
//const scriptProperties = PropertiesService.getScriptProperties();

// Locale string definitions
const noMessageStateError = stopIcon + ' Срок работы с этим сообщение истёк!';

const strSendContact = 'Отправить контакт';
const strSendContactButton = applyIcon + ' ' + strSendContact;

const strRefuseContact = 'Пока не готов';
const strRefuseContactButton = stopIcon + ' ' + strRefuseContact;

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

const strReload = 'Обновить';
const strReloadButton = reloadIcon + ' ' + strReload;

const strReloaded = 'Обновлен';
const strReloadedLabel = '<b>' + strReloaded + ':</b> ';

const strPhone = 'Телефон';
const strPhoneLabel = '<b>' + strPhone + ':</b> ';

const strService = 'Услуга';
const strServiceLabel = '<b>' + strService + ':</b> ';

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
const strReserveComfirmedFooter = '\n\n' + noticeIcon + ' <b>ВНИМАНИЕ!</b>\nРекомендую выполнить команду /contact, чтобы отправить контактную информацию.';
const strReserveRefused = 'Ошибка бронирования!';
const strReserveRefusedHeader = stopIcon + ' <b>' + strReserveRefused + '</b>';
const strReserveRefusedFooter = '\n\n'  + noticeIcon + ' <b>ВНИМАНИЕ!</b>\nСожалем, но Вам придётся изменить параметры бронирования, т.к. кто-то уже успел занять это время.';

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

const strNotice = 'Оповещение об уточнении';
const strNoticeButton = noticeIcon + ' ' + strNotice;
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
