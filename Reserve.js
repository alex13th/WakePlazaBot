class Reserve {
  constructor(telegramId, telegramName, start = null, count = 1, bookCount = 1) {
    if(!start) {
      start = new Date();
      start.setHours(0, 0, 0, 0);
    }

    this.conflictReserve = [];
    this.maxConfictCount = 1;
    this.fieldPositions = {};

    this.createdAt = new Date();
    this.telegramId = telegramId;
    this.telegramName = telegramName;
    this.start = start;
    this.count = count;
    this.bookCount = bookCount;
    this.conflictCount = this.bookCount;


    // Array's field positions
    this.fieldPositions['createdAt'] = 0;
    this.fieldPositions['telegramId'] = 1;
    this.fieldPositions['telegramName'] = 2;
    this.fieldPositions['start'] = 3;
    this.fieldPositions['end'] = 4;
    this.fieldPositions['count'] = 5;
    // Array's field positions
  }

  get minutes() {
    const setSize = 5;
    return this.count * setSize;
  }

  get end() {
    let endDate = new Date(this.start);
    endDate.setMinutes(endDate.getMinutes() + this.minutes);
    return endDate;
  }

  get startTime() {
    let result = null;
    
    if(this.start.getHours()) {
      result = this.start.toLocaleTimeString(dateLocale, timeOptions);
    }

    return result;
  }

  get endTime() {
    return this.end.toLocaleTimeString(dateLocale, timeOptions);
  }

  get isCompleted() {
    return this.count && this.startTime && (this.conflictCount <= this.maxConfictCount);
  }

  toString() {
    let result = '<b>' + this.start.toLocaleDateString(dateLocale, dateOptions) + ':</b> ';

    result += this.toRowString() + '\n';

    return result;
  }

  toRowString() {
    let result = '';

    if(this.startTime) {
      result += ' ' + this.startTime;
      result += ' - ' + this.endTime;
    }

    return result;
  }

  findConflict() {
    let result = [];
    let conflictCount = this.bookCount;

    if(this.reserveArray) {
      for(let i = 0; i < this.reserveArray.length; i++) {
        let reserve = this.reserveArray[i];

        if(this.start.getTime() === reserve.start.getTime() || 
          this.end.getTime() === reserve.end.getTime() ) {

          conflictCount += reserve.bookCount;
          result.push(reserve);

          if(conflictCount > this.maxConfictCount) {
            break;
          } else {
            continue;
          }
        }

        if(this.start > reserve.start && this.start < reserve.end) {
          conflictCount += reserve.bookCount;
          result.push(reserve);

          if(conflictCount > this.maxConfictCount) {
            break;
          } else {
            continue;
          }
        }

        if(this.end > reserve.start && this.end < reserve.end) {
          conflictCount += reserve.bookCount;
          result.push(reserve);

          if(conflictCount > this.maxConfictCount) {
            break;
          } else {
            continue;
          }
        }

        if(this.start < reserve.start && this.end > reserve.start) {
          conflictCount += reserve.bookCount;
          result.push(reserve);

          if(conflictCount > this.maxConfictCount) {
            break;
          } else {
            continue;
          }
        }
      }
    }

    this.conflictReserve = result;
    this.conflictCount = conflictCount;
    return result;
  }

  getStateMessageText() {
    let result = '';

    if(this.conflictCount > this.maxConfictCount) {
      result += '\n' + strReserveConflict;
      result += '\n' + stopIcon + this.conflictReserve.toString();
    }

    if(this.telegramName)
      result += '\n' + strNameLabel + this.telegramName;
    result += '\n' + strDayLabel + this.start.toLocaleDateString(dateLocale, dateOptions);
    if(this.startTime) {
      result += '\n' + strStartTimeLabel + this.startTime;
      result += '\n' + strEndTimeLabel + this.endTime;
    }
    
    result += '\n' + strCountLabel + this.count;

    return result;
  }

  fromArray(reserveRow) {
    this.createdAt = reserveRow[this.fieldPositions['createdAt']];
    this.telegramId = reserveRow[this.fieldPositions['telegramId']];
    this.telegramName = reserveRow[this.fieldPositions['telegramName']];
    this.start = reserveRow[this.fieldPositions['start']];
    this.count = reserveRow[this.fieldPositions['count']];
  }

  toArray() {
    let result = [];

    result[this.fieldPositions['createdAt']] = this.createdAt;
    result[this.fieldPositions['telegramId']] = this.telegramId;
    result[this.fieldPositions['telegramName']] = this.telegramName;
    result[this.fieldPositions['start']] = this.start;
    result[this.fieldPositions['end']] = this.end;
    result[this.fieldPositions['count']] = this.count;

    return result;
  }

  createReserveArray(reserveRowArray) {
    let result = [];

    for(let i = 0; i < reserveRowArray.length; i++){
      let reserve = new Reserve();
      reserve.fromArray(reserveRowArray[i]);
      result.push(reserve);
    }

    return result;
  }
}