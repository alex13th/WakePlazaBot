const wakeReserveTypeSizes = {'set': 10, 'hour': 60};
const wakeReserveTypeNames = {'set': strSet, 'hour': strHour};

class WakeReserve extends Reserve {

  constructor(telegramId, telegramName, start = null, count = 1, setType = 'set') {
    super(telegramId, telegramName, start, count);
    this.setType = setType;
    this.board = 0;
    this.hydro = 0;

    // Array's field positions
    this.fieldPositions['createdAt'] = 0;
    this.fieldPositions['telegramId'] = 1;
    this.fieldPositions['telegramName'] = 2;
    this.fieldPositions['start'] = 3;
    this.fieldPositions['end'] = 4;
    this.fieldPositions['setType'] = 5;
    this.fieldPositions['count'] = 6;
    this.fieldPositions['board'] = 7;
    this.fieldPositions['hydro'] = 8;
    // Array's field positions
  }

  get minutes() {
    return wakeReserveTypeSizes[this.setType] * this.count;
  }

  toRowString() {
    let result = '';

    if(this.startTime) {
      result += (this.setType === 'set') ? setIcon : hourIcon;
      result += ' ' + this.startTime;
      result += ' - ' + this.endTime;
    }

    if(this.board || this.hydro) {
      result += this.board ? ' ' + boardIcon : '';
      result += this.hydro ? ' ' + hydroIcon : '';
    }

    return result;
  }
  
  getStateMessageText() {
    let result = '';
    let confictReserve = this.findConflict();

    if(confictReserve) {
      result += '\n' + strReserveConflict;
      result += '\n' + stopIcon + confictReserve.toString() + '\n';
    }

    if(this.telegramName)
      result += '\n' + strNameLabel + this.telegramName;
    result += '\n' + strDayLabel + this.start.toLocaleDateString(dateLocale, dateOptions);

    if(this.startTime) {
      result += '\n' + strTimeLabel + this.startTime;
    }

    result += '\n' + strTypeLabel + wakeReserveTypeNames[this.setType];
    result += '\n' + strCountLabel + this.count;

    if(this.board || this.hydro) {
      result += '\n' + strOptionsLabel;
      result += this.board ? boardIcon : '';
      result += this.hydro ? hydroIcon : '';
    }

    return result;
  }

  fromArray(reserveRow) {
    super.fromArray(reserveRow);

    this.setType = reserveRow[this.fieldPositions['setType']];
    this.board = reserveRow[this.fieldPositions['board']];
    this.hydro = reserveRow[this.fieldPositions['hydro']];
  }

  toArray() {
    let result = [];

    result[this.fieldPositions['createdAt']] = this.createdAt;
    result[this.fieldPositions['telegramId']] = this.telegramId;
    result[this.fieldPositions['telegramName']] = this.telegramName;
    result[this.fieldPositions['start']] = this.start;
    result[this.fieldPositions['end']] = this.end;
    result[this.fieldPositions['count']] = this.count;
    result[this.fieldPositions['setType']] = this.setType;
    result[this.fieldPositions['board']] = this.board;
    result[this.fieldPositions['hydro']] = this.hydro;

    return result;
  }

  createReserveArray(reserveRowArray) {
    let result = [];

    for(let i = 0; i < reserveRowArray.length; i++){
      let reserve = new WakeReserve();
      reserve.fromArray(reserveRowArray[i]);
      result.push(reserve);
    }

    return result;
  }
}