function isEmpty(object) {
  return Object.values(object).every(function (property) {
    return property === null || property === "";
  });
}

export { isEmpty };
