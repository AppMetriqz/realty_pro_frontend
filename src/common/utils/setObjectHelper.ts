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
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {} as NestedBooleanObject; // Create an empty object if it doesn't exist
    }
    current = current[key] as NestedBooleanObject;
  }

  current[lastKey] = value; // Directly set the boolean value
  return obj;
}

// Generic function to set all boolean values in a nested object
export function setPermissionValue<T extends NestedBooleanObject>(
  obj: T,
  path?: string,
  excludePaths?: string[] // New parameter for paths to exclude
): T {
  const updateObject = (o: NestedBooleanObject, basePath: string): void => {
    for (const key in o) {
      if (o.hasOwnProperty(key)) {
        const currentValue = o[key];
        const currentPath = basePath ? `${basePath}.${key}` : key;

        // Check if the current path is in the excludePaths
        const isExcluded =
          excludePaths &&
          excludePaths.some(
            (excludePath) =>
              currentPath === excludePath ||
              currentPath.startsWith(`${excludePath}.`)
          );

        if (isExcluded) {
          // Set the excluded property to false
          o[key] = false;
        } else if (typeof currentValue === 'object' && currentValue !== null) {
          // Recursively update nested objects
          updateObject(currentValue as NestedBooleanObject, currentPath);
        } else if (typeof currentValue === 'boolean') {
          // Set boolean values to true for non-excluded properties
          o[key] = true;
        }
      }
    }
  };

  if (path && typeof path === 'string') {
    // If a path is provided and is a string, set the specific property to true
    setProperty(obj, path, true);
  } else {
    // Otherwise, update all boolean values
    updateObject(obj, '');
  }

  return obj; // Return the original object
}
