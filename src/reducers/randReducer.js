export default function valueReducer(state = {rand: 0}, action){
    switch(action.type) {
        case "GENERATE_VALUE":
            return {...state, rand: action.payload.rand}
        default:
            return state
    }
}