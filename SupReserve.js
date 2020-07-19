const supReserveTypeSizes = {'set': 30, 'hour': 60};
const supReserveTypeNames = {'set': strHalfHour, 'hour': strHour};
const supCount = 4;

class SupReserve  extends Reserve {
  constructor(telegramId, telegramName, start = null, count = 1, setType = 'set', bookCount = 1) {
    super(telegramId, telegramName, start, count, bookCount = 1);
    this.setType = setType;
    this.maxConfictCount = supCount;
    this.bookCount = bookCount;

    // Array's field positions
    this.fieldPositions['createdAt'] = 0;
    this.fieldPositions['telegramId'] = 1;
    this.fieldPositions['telegramName'] = 2;
    this.fieldPositions['start'] = 3;
    this.fieldPositions['end'] = 4;
    this.fieldPositions['setType'] = 5;
    this.fieldPositions['count'] = 6;
    this.fieldPositions['bookCount'] = 7;
    this.fieldPositions['phone'] = 8;
    // Array's field positions
  }

  get minutes() {
    return supReserveTypeSizes[this.setType] * this.count;
  }

  toRowString() {
    let result = '';

    if(this.startTime) {
      result += (this.setType === 'set') ? setIcon : hourIcon;
      result += ' ' + this.startTime;
      result += ' - ' + this.endTime;
      result += ' :: <b>' + this.bookCount + '</b>';
    }

    return result;
  }

  getStateMessageText(showContact = false) {
    let result = '';
    let confictReserve = this.findConflict();

    if(this.conflictCount > this.maxConfictCount) {
      result += '\n' + strReserveConflict;
      result += '\n' + stopIcon + confictReserve.toString();
    }

    if(this.telegramName) {
      result += '\n' + strNameLabel + this.telegramName;
    }

    if(showContact && this.phone) {
        result += '\n' + strPhoneLabel + this.phone;
    }

    result += '\n' + strDayLabel + this.start.toLocaleDateString(dateLocale, dateOptions);

    if(this.startTime) {
      result += '\n' + strStartTimeLabel + this.startTime;
      result += '\n' + strEndTimeLabel + this.endTime;
    }

    result += '\n' + strTypeLabel + supReserveTypeNames[this.setType];
    result += ' ('  + this.count + ')';

    result += '\n' + strCountLabel + this.bookCount;

    return result;
  }

  fromArray(reserveRow) {
    super.fromArray(reserveRow);

    this.setType = reserveRow[this.fieldPositions['setType']];
    this.bookCount = reserveRow[this.fieldPositions['bookCount']];
    this.phone = reserveRow[this.fieldPositions['phone']];
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
    result[this.fieldPositions['bookCount']] = this.bookCount;

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