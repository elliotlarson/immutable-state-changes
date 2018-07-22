// import { reducer, actions } from "./characters";
import { reducer, actions } from "./characters-refactored";

it("creates a character", () => {
  const newCharacter = { id: 42, firstName: "Jeffrey", lastName: "Lebowski" };
  const action = actions.create(newCharacter);
  const state = reducer(undefined, action);
  expect(state.byId[42]).toEqual(newCharacter);
  expect(state.allIds).toEqual([42]);
});

it("creates a new character and assigns a UUID", () => {
  const newCharacter = { firstName: "Jeffrey", lastName: "Lebowski" };
  const action = actions.create(newCharacter);
  const state = reducer(undefined, action);
  expect(state.allIds).toHaveLength(1);
  const newId = state.allIds[0];
  expect(newId).toMatch(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
  );
  expect(state.byId[newId]).toMatchObject({ ...newCharacter, id: newId });
});

it("updates a character", () => {
  const initState = {
    byId: {
      42: { id: 42, firstName: "Jeffrey", lastName: "Lebowski" }
    },
    allIds: [42]
  };
  const updatedCharacter = { id: 42, firstName: "The", lastName: "Dude" };
  const action = actions.update(updatedCharacter);
  const state = reducer(initState, action);
  expect(state.byId[42]).toEqual(updatedCharacter);
});

it("deletes a character", () => {
  const initState = {
    byId: {
      42: { id: 42, firstName: "Jeffrey", lastName: "Lebowski" }
    },
    allIds: [42]
  };
  const action = actions.delete(42);
  const state = reducer(initState, action);
  expect(state.byId[42]).toBeUndefined();
  expect(state.allIds).toEqual([]);
});
