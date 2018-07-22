import uuid from "uuid/v4";
import { combineReducers } from "redux";

export const types = {
  CREATE: "CHARACTERS_CREATE",
  UPDATE: "CHARACTERS_UPDATE",
  DELETE: "CHARACTERS_DELETE"
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.CREATE:
    case types.UPDATE:
      const characterData = action.payload;
      return { ...state, [characterData.id]: characterData };
    case types.DELETE:
      const deleteId = action.payload;
      const { [`${deleteId}`]: deleted, ...newState } = state;
      return newState;
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case types.CREATE:
      const { id } = action.payload;
      return [...state, id];
    case types.DELETE:
      const deleteId = action.payload;
      return state.filter(id => id !== deleteId);
    default:
      return state;
  }
};

export const reducer = combineReducers({ byId, allIds });

const createAction = newCharacter => {
  const id = newCharacter.id || uuid();
  return {
    type: types.CREATE,
    payload: { ...newCharacter, id }
  };
};

const updateAction = updateCharacter => ({
  type: types.UPDATE,
  payload: updateCharacter
});

const deleteAction = id => ({ type: types.DELETE, payload: id });

export const actions = {
  create: createAction,
  update: updateAction,
  delete: deleteAction
};
