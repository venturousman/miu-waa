import {PIZZA_ORDER, PIZZA_RESTOCK} from "./constants";

export const createOrderPizzaAction = () => ({
    type: PIZZA_ORDER
});

export const createRestockPizzaAction = (quantity: number) => ({
    type: PIZZA_RESTOCK,
    // payload: {
    //     numOfPizza: 5,
    // }
    payload: quantity,
});
