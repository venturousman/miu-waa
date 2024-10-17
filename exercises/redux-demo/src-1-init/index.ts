import {createStore} from "redux";

const PIZZA_ORDER = 'PIZZA_ORDER';

const createOrderPizzaAction = () => ({
    type: PIZZA_ORDER
});

const initialState = {
    numOfPizza: 10
}

type ActionType = {
    type: string;
}

const pizzaReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case PIZZA_ORDER:
            return {...state, numOfPizza: state.numOfPizza-1};
        default:
            return state;

    }
}

const store = createStore(pizzaReducer);
console.log('initial state:', store.getState());
const unsubscribe = store.subscribe(() => {
    console.log('updated state: ', store.getState());
});

store.dispatch(createOrderPizzaAction());

store.dispatch(createOrderPizzaAction());


unsubscribe();
