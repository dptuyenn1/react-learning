function isEmpty(object) {
  return Object.values(object).some(function (value) {
    return value === null || value === "";
  });
}

export { isEmpty };
