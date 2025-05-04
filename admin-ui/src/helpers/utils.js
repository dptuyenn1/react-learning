function isEmpty(object) {
  return Object.values(object).every(
    (property) => property === null || property === ""
  );
}

export { isEmpty };
