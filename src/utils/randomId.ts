export function randomId(listOfIds: number[]) {
  const newId = Math.floor(Math.random() * 10000);
  if (listOfIds.includes(newId)) {
    return randomId(listOfIds);
  }
  return newId;
}
