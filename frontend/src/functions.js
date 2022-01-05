export const isNotEmptyObject = (obj) => {
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      return true;
    }
  }
  return false;
}