class WakeReserveState extends ReserveState {
    constructor(reserve, state = null) {
        if(!state) {
            state = {};
            state.type = 'wake';
            state.menu = 'main';
        }

        let wakeReserve = reserve ? reserve : new WakeReserve();
        super(wakeReserve, state);
    }

    fromJSON(json) {
        super.fromJSON(json);
        let state = JSON.parse(json);
        
        this.reserve.setType = state.set_type;
        this.reserve.board = state.board;
        this.reserve.hydro = state.hydro;
    }

    toJSON() {
        let state = JSON.parse(super.toJSON());

        state.set_type = this.reserve.setType;
        state.board = this.reserve.board;
        state.hydro = this.reserve.hydro;
        
        return JSON.stringify(state);
    }
}