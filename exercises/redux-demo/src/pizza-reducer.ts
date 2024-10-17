import {PIZZA_ORDER, PIZZA_RESTOCK} from "./constants";

const initialState = {
    numOfPizza: 10
}

type ActionType = {
    type: string;
    payload?: number;
    // payload: { numOfPizza?: number }
}

// class ActionType2 {
//     type: string;
//
//     constructor(type: string) {
//         this.type = type;
//     }
// }
//
// class ActionType3 extends ActionType2 {
//     payload: { numberOfPizza: number }
//
//     constructor(type: string, payload: { numberOfPizza: number }) {
//         super(type);
//         this.payload = payload;
//     }
// }

const pizzaReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case PIZZA_ORDER:
            return {...state, numOfPizza: state.numOfPizza - 1};
        case PIZZA_RESTOCK:
            return {...state, numOfPizza: state.numOfPizza + action.payload!}
            // return {
            //     ...state,
            //     numOfPizza: state.numOfPizza + (action.payload?.numOfPizza || 0)
            // };
        default:
            return state;
    }
}

export default pizzaReducer;