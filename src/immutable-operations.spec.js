// This is a Jest spec that explores some of the different ways to alter
// arrays and objects without mutating state.  I'm trying different approaches
// available using:
//
// * Vanilla JS
// * Immutable.js
// * Lodash
// * Ramda
//
// The motivation for this is largely to work with a Redux store.

import R from "ramda";
import _ from "lodash";
import { Map, List } from "immutable";
import * as I from "./helpers/imu";

describe("immutable Array operations", () => {
  let characters;

  beforeEach(() => {
    characters = ["Walter", "Jeffrey", "Donald"];
  });

  describe("add item to an array", () => {
    let expectedResult, newCharacter;

    beforeEach(() => {
      newCharacter = "Maude";
      expectedResult = ["Walter", "Jeffrey", "Donald", "Maude"];
    });

    describe("with vanilla JS spread operator", () => {
      it("returns the expected result", () => {
        const result = [...characters, newCharacter];
        expect(result).toEqual(expectedResult);
      });
    });

    describe("with vanilla JS concat", () => {
      it("returns the expected result", () => {
        const result = characters.concat(newCharacter);
        expect(result).toEqual(expectedResult);
      });
    });

    describe("with lodash concat", () => {
      it("returns the expected result", () => {
        const result = _.concat(characters, newCharacter);
        expect(result).toEqual(expectedResult);
      });
    });

    describe("with Ramda append", () => {
      it("returns the expected result", () => {
        const result = R.append(newCharacter, characters);
        expect(result).toEqual(expectedResult);
      });
    });

    describe("with Immutable.js push", () => {
      it("returns the expected result", () => {
        const immutableCharacters = List(characters);
        const result = immutableCharacters.push(newCharacter);
        expect(result.toArray()).toEqual(expectedResult);
      });
    });

    describe("with Immutable.js set", () => {
      it("returns the expected result", () => {
        const immutableCharacters = List(characters);
        const result = immutableCharacters.set(
          immutableCharacters.size,
          newCharacter
        );
        expect(result.toArray()).toEqual(expectedResult);
      });
    });

    describe("with imu add", () => {
      it("returns the expected result", () => {
        const result = I.add(characters, newCharacter);
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe("update an item in an array", () => {
    let expectedResult, characterToUpdate, updatedName;

    beforeEach(() => {
      characterToUpdate = "Jeffrey";
      updatedName = "The Dude";
      expectedResult = ["Walter", "The Dude", "Donald"];
    });

    describe("with vanilla JS map", () => {
      it("returns the expected result", () => {
        const result = characters.map(c => {
          if (c === characterToUpdate) {
            return updatedName;
          }
          return c;
        });
        expect(result).toEqual(expectedResult);
      });
    });

    describe("with vanilla JS findIndex, spread operator, and slice", () => {
      it("returns the expected result", () => {
        const updateIndex = characters.findIndex(c => c === characterToUpdate);
        const result = [
          ...characters.slice(0, updateIndex),
          updatedName,
          ...characters.slice(updateIndex + 1)
        ];
        expect(result).toEqual(expectedResult);
      });
    });

    describe("with Ramda findIndex and update", () => {
      it("returns the expected result", () => {
        const updateIndex = R.findIndex(R.equals(characterToUpdate))(
          characters
        );
        const result = R.update(updateIndex, updatedName, characters);
        expect(result).toEqual(expectedResult);
      });
    });

    describe("with Immutable.js findIndex and splice", () => {
      it("returns the expected result", () => {
        const immutableCharacters = List(characters);
        const updateIndex = immutableCharacters.findIndex(
          c => c === characterToUpdate
        );
        const result = immutableCharacters.splice(updateIndex, 1, updatedName);
        expect(result.toArray()).toEqual(expectedResult);
      });
    });

    describe("with Immutable.js findIndex and set", () => {
      it("returns the expected result", () => {
        const immutableCharacters = List(characters);
        const updateIndex = immutableCharacters.findIndex(
          c => c === characterToUpdate
        );
        const result = immutableCharacters.set(updateIndex, updatedName);
        expect(result.toArray()).toEqual(expectedResult);
      });
    });

    describe("with imu set", () => {
      it("returns the expected result", () => {
        const result = I.set(characters, characterToUpdate, updatedName);
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe("remove an item from an array", () => {
    let expectedResult, characterToRemove;

    beforeEach(() => {
      characterToRemove = "Donald";
      expectedResult = ["Walter", "Jeffrey"];
    });

    describe("with vanillla JS filter", () => {
      it("returns the expected result", () => {
        const result = characters.filter(c => c !== characterToRemove);
        expect(result).toEqual(expectedResult);
      });
    });

    describe("with vanillla JS findIndex and slice", () => {
      it("returns the expected result", () => {
        const removeIndex = characters.findIndex(c => c === characterToRemove);
        const result = [
          ...characters.slice(0, removeIndex),
          ...characters.slice(removeIndex + 1)
        ];
        expect(result).toEqual(expectedResult);
      });
    });

    describe("with Rambda reject", () => {
      it("returns the expected result", () => {
        const result = R.reject(R.equals(characterToRemove), characters);
        expect(result).toEqual(expectedResult);
      });
    });

    describe("with Immutable.js remove", () => {
      it("returns the expected result", () => {
        const immutableCharacters = List(characters);
        const removeIndex = immutableCharacters.findIndex(
          c => c === characterToRemove
        );
        const result = immutableCharacters.remove(removeIndex);
        expect(result.toArray()).toEqual(expectedResult);
      });
    });

    describe("with imu del", () => {
      it("returns the expected result", () => {
        const result = I.del(characters, characterToRemove);
        expect(result).toEqual(expectedResult);
      });
    });
  });
});

describe("immutable Object operations", () => {
  let characters;

  beforeEach(() => {
    characters = {
      1: { firstName: "Jeffrey", lastName: "Lebowski" },
      2: { firstName: "Walter", lastName: "Sobchak" },
      3: { firstName: "Donald", lastName: "Kerabatsos" }
    };
  });

  describe("add a key to an object", () => {
    let expectedResult;

    beforeEach(() => {
      expectedResult = {
        1: { firstName: "Jeffrey", lastName: "Lebowski" },
        2: { firstName: "Walter", lastName: "Sobchak" },
        3: { firstName: "Donald", lastName: "Kerabatsos" },
        4: { firstName: "Maude", lastName: "Lebowski" }
      };
    });

    describe("with vanilla JS spread operator", () => {
      it("returns the expected results", () => {
        const newId = 4;
        const newCharacter = { firstName: "Maude", lastName: "Lebowski" };
        const result = { ...characters, [newId]: newCharacter };
        expect(result).toEqual(expectedResult);
      });
    });

    describe("with Immutable.js set", () => {
      it("returns the expected results", () => {
        const newId = 4;
        const newCharacter = { firstName: "Maude", lastName: "Lebowski" };
        const immutableCharacters = Map(characters);
        const result = immutableCharacters.set(newId, newCharacter);
        expect(result.toObject()).toEqual(expectedResult);
      });
    });

    describe("with imu add", () => {
      it("returns the expected results", () => {
        const newId = 4;
        const newCharacter = { firstName: "Maude", lastName: "Lebowski" };
        const result = I.add(characters, newId, newCharacter);
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe("update an object key's value", () => {
    let expectedResult;

    beforeEach(() => {
      expectedResult = {
        1: { firstName: "The Dude", lastName: "Lebowski" },
        2: { firstName: "Walter", lastName: "Sobchak" },
        3: { firstName: "Donald", lastName: "Kerabatsos" }
      };
    });

    describe("with vanilla JS spread operator", () => {
      it("returns the expected results", () => {
        const updateId = 1;
        const updatedcharacter = {
          firstName: "The Dude",
          lastName: "Lebowski"
        };
        const result = { ...characters, [updateId]: updatedcharacter };
        expect(result).toEqual(expectedResult);
      });
    });

    describe("with Immutable.js set", () => {
      it("returns the expected results", () => {
        const immutableCharacters = Map(characters);
        const updateId = 1;
        const updatedcharacter = {
          firstName: "The Dude",
          lastName: "Lebowski"
        };
        const result = immutableCharacters.set(`${updateId}`, updatedcharacter);
        expect(result.toObject()).toEqual(expectedResult);
      });
    });

    describe("with imu set", () => {
      it("returns the expected results", () => {
        const updateId = 1;
        const updatedCharacter = {
          firstName: "The Dude",
          lastName: "Lebowski"
        };
        const result = I.set(characters, updateId, updatedCharacter);
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe("delete an object's key", () => {
    let expectedResult, deleteId;

    beforeEach(() => {
      deleteId = 3;
      expectedResult = {
        1: { firstName: "Jeffrey", lastName: "Lebowski" },
        2: { firstName: "Walter", lastName: "Sobchak" }
      };
    });

    describe("with vanilla JS spread operator", () => {
      it("returns the expected results", () => {
        // if the key is a string we can skip type casting to string
        // const { [deleteId]: deleted, ...result } = characters;
        const { [`${deleteId}`]: deleted, ...result } = characters;
        expect(result).toEqual(expectedResult);
      });
    });

    describe("with vanilla JS reduce", () => {
      it("returns the expected results", () => {
        const result = Object.keys(characters).reduce((newObj, id) => {
          if (id !== `${deleteId}`) {
            return { ...newObj, [id]: characters[id] };
          }
          return newObj;
        }, {});
        expect(result).toEqual(expectedResult);
      });
    });

    describe("with lodash omit", () => {
      it("returns the expected results", () => {
        // note that we can pass in an integer key here and it handles it without needing to type cast
        const result = _.omit(characters, deleteId);
        expect(result).toEqual(expectedResult);
      });
    });

    describe("with Ramda omit", () => {
      it("returns the expected results", () => {
        // can't pass in an integer key here so we need to type cast it to a string
        const result = R.omit(`${deleteId}`, characters);
        expect(result).toEqual(expectedResult);
      });
    });

    describe("with Immutable.js", () => {
      it("returns the expected results", () => {
        const immutableCharacters = Map(characters);
        // can't pass in an integer key here so we need to type cast it to a string
        const result = immutableCharacters.delete(`${deleteId}`);
        expect(result.toObject()).toEqual(expectedResult);
      });
    });

    describe("with imu del", () => {
      it("returns the expected results", () => {
        const result = I.del(characters, deleteId);
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
