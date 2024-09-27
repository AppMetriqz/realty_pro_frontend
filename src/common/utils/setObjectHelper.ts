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

// Generic function to set all boolean values in a nested object to true or false
export function setPermissionValue<T extends NestedBooleanObject>(
  obj: T,
  value: boolean,
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
          continue; // Skip this property
        }

        if (typeof currentValue === 'object' && currentValue !== null) {
          // Recursively update nested objects
          updateObject(currentValue as NestedBooleanObject, currentPath);
        } else if (typeof currentValue === 'boolean') {
          o[key] = value; // Set boolean value
        }
      }
    }
  };

  if (path) {
    // If a path is provided, set the specific property
    setProperty(obj, path, value);
  } else {
    // Otherwise, set all boolean values
    updateObject(obj, '');
  }

  return obj;
}
