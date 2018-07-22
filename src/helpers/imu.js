// A tiny libary for making immutable changes to arrays and objects

export const add = (target, ...args) => {
  if (Array.isArray(target)) {
    return aAdd(target, ...args);
  } else {
    return oAdd(target, ...args);
  }
};

const aAdd = (array, newValue) => {
  return [...array, newValue];
};

const oAdd = (obj, newKey, newValue) => {
  return { ...obj, [newKey]: newValue };
};

export const set = (target, ...args) => {
  if (Array.isArray(target)) {
    return aSet(target, ...args);
  } else {
    return oSet(target, ...args);
  }
};

const aSet = (array, oldValue, newValue) => {
  return array.map(ai => (ai === oldValue ? newValue : ai));
};

const oSet = (object, updateKey, updateValue) => {
  return {
    ...object,
    [`${updateKey}`]: updateValue
  };
};

export const del = (target, ...args) => {
  if (Array.isArray(target)) {
    return aDel(target, ...args);
  } else {
    return oDel(target, ...args);
  }
};

const aDel = (array, deleteValue) => {
  return array.filter(ai => ai !== deleteValue);
};

const oDel = (obj, deleteKey) => {
  const { [`${deleteKey}`]: deleted, ...result } = obj;
  return result;
};
