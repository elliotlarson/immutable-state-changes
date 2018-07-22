import { combineReducers, createStore } from "redux";
import {
  reducer as charactersReducer,
  actions as characterActions
} from "./characters";

const rootReducer = combineReducers({
  characters: charactersReducer
});
export default createStore(rootReducer);

export const actions = {
  characters: characterActions
};
