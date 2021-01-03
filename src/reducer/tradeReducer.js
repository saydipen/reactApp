export const HIST = 'hist';
export const LIVE = 'LIVE';

export const dataReducer = (state, action) => {
    switch(action.type) {
        case HIST:
            return {
                ...state,
                histData: action.data
            };
        case LIVE:
            let liveData = state.liveData.map(record => Object.assign({}, record));
            liveData = liveData.concat(action.data);
            return {
                ...state,
                liveData
            };
        default:
            return state;
    }
};