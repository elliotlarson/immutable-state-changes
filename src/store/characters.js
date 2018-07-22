import uuid from "uuid/v4";

export const types = {
  CREATE: "CHARACTERS_CREATE",
  UPDATE: "CHARACTERS_UPDATE",
  DELETE: "CHARACTERS_DELETE"
};

const DEFAULT_STATE = { byId: {}, allIds: [] };

export const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.CREATE:
      return createReducer(state, action);
    case types.UPDATE:
      return updateReducer(state, action);
    case types.DELETE:
      return deleteReducer(state, action);
    default:
      return state;
  }
};

const createReducer = (state, action) => {
  const characterData = action.payload;
  const id = characterData.id || uuid();
  return {
    ...state,
    byId: { ...state.byId, [id]: { ...characterData, id } },
    allIds: [...state.allIds, id]
  };
};

const updateReducer = (state, action) => {
  const characterData = action.payload;
  const id = characterData.id;
  return { ...state, byId: { ...state.byId, [id]: characterData } };
};

const deleteReducer = (state, action) => {
  const deleteId = action.payload;
  const { [`${deleteId}`]: deleted, ...byId } = state.byId;
  const allIds = state.allIds.filter(id => id !== deleteId);
  return { ...state, byId, allIds };
};

const createAction = newCharacter => ({
  type: types.CREATE,
  payload: newCharacter
});

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
