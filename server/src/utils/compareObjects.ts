export function compareObjects<T extends Record<string, any>>(object1: T, object2: T): boolean {
  if (Object.keys(object1).length !== Object.keys(object2).length) {
    return false;
  }

  for (const key in object1) {
    if (Object.prototype.hasOwnProperty.call(object1, key)) {
      if (typeof object1[key] === 'object' && typeof object2[key] === 'object') {
        if (!compareObjects(object1[key], object2[key])) {
          return false;
        }
      } else if (object1[key] !== object2[key]) {
        return false;
      }
    }
  }

  return true;
}
