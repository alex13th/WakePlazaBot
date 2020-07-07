const supReserveTypeSizes = {'set': 30, 'hour': 60};
const supReserveTypeNames = {'set': strSet, 'hour': strHour};

class SupReserve  extends Reserve {
  constructor(telegramId, telegramName, start = null, count = 1, setType = 'set') {
    super(telegramId, telegramName, start, count);
    this.setType = setType;

    // Array's field positions
    this.fieldPositions['createdAt'] = 0;
    this.fieldPositions['telegramId'] = 1;
    this.fieldPositions['telegramName'] = 2;
    this.fieldPositions['start'] = 3;
    this.fieldPositions['end'] = 4;
    this.fieldPositions['setType'] = 5;
    this.fieldPositions['count'] = 6;
    // Array's field positions
  }

  get minutes() {
    return supReserveTypeSizes[this.setType] * this.count;
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

    return result;
  }

  fromArray(reserveRow) {
    super.fromArray(reserveRow);

    this.setType = reserveRow[this.fieldPositions['setType']];
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

    return result;
  }

  createReserveArray(reserveRowArray) {
    let result = [];

    for(let i = 0; i < reserveRowArray.length; i++){
      let reserve = new SupReserve();
      reserve.fromArray(reserveRowArray[i]);
      result.push(reserve);
    }

    return result;
  }
}