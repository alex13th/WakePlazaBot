class SupReserveState extends ReserveState  {
  constructor(reserve, state = null) {
    if(!state) {
      state = {};
      state.type = 'sup';
      state.menu = 'main';
    }

    let supReserve = reserve ? reserve : new SupReserve();
    super(supReserve, state);
  }

  fromJSON(json) {
    super.fromJSON(json);
    let state = JSON.parse(json);
    
    this.reserve.setType = state.set_type;
    this.reserve.bookCount = state.book_count;
  }

  toJSON() {
    let state = JSON.parse(super.toJSON());

    state.set_type = this.reserve.setType;
    state.book_count = this.reserve.bookCount;
    
    return JSON.stringify(state);
  }
}