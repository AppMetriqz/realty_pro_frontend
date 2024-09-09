export type NestedBooleanObject = {
  [key: string]: boolean | NestedBooleanObject;
};

// Helper function to update a specific property
function setProperty<T extends NestedBooleanObject>(
  obj: T,
  path: string,
  value: boolean
): T {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  let current: NestedBooleanObject = obj;

  for (const key of keys) {
    if (!(key in current)) {
      current[key] = {} as NestedBooleanObject; // Create an empty object if it doesn't exist
    }
    current = current[key] as NestedBooleanObject;
  }

  if (typeof current === 'object' && current !== null) {
    current[lastKey] = value;
  }

  return obj;
}

// Generic function to set all boolean values in a nested object to true or false
export function setPermissionValue<T extends NestedBooleanObject>(
  obj: T,
  value: boolean,
  path?: string
): T {
  const updateObject = (o: NestedBooleanObject, v: boolean): void => {
    for (const key in o) {
      if (o.hasOwnProperty(key)) {
        const currentValue = o[key];
        if (typeof currentValue === 'object' && currentValue !== null) {
          updateObject(currentValue, v);
        } else if (typeof currentValue === 'boolean') {
          o[key] = v;
        }
      }
    }
  };

  if (path) {
    // If a path is provided, set the specific property
    setProperty(obj, path, value);
  } else {
    // Otherwise, set all boolean values
    updateObject(obj, value);
  }

  return obj;
}
