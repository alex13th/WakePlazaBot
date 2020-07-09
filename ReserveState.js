class ReserveState {
  constructor(reserve, state = null) {
    if(state) {
      this.type = state.type;
      this.menu = state.menu;
    } else {
      this.type = 'reserve';
      this.menu = 'main';
    }
    
    this.reserve = reserve ? reserve : new Reserve();
  }

  fromJSON(json) {
    let state = JSON.parse(json);
    
    this.id = state.id;
    this.type = state.type;
    this.menu = state.menu;

    this.reserve.createdAt.setTime(state.createdAt);
    this.reserve.telegramId = state.telegramId;
    this.reserve.telegramName = state.telegramName;
    this.reserve.start.setTime(state.start);
    this.reserve.count = +state.count;
  }

  toJSON() {
    let state = {};

    state.id = this.id;
    state.type = this.type;
    state.menu = this.menu;
    state.createdAt = this.reserve.createdAt.getTime();
    state.telegramId = this.reserve.telegramId;
    state.telegramName = this.reserve.telegramName;
    state.start = this.reserve.start.getTime();
    state.count = this.reserve.count;
    
    return JSON.stringify(state);
  }
}