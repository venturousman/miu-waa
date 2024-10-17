import {createStore} from "redux";
import pizzaReducer from "./pizza-reducer";

const store = createStore(pizzaReducer);

export default store;