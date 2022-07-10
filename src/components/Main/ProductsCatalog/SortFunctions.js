const SortFunctions = {
  nameA: (a, b) => {
    if (a.name.trim().toLowerCase() < b.name.trim().toLowerCase()) {
      return -1;
    }
    if (a.name.trim().toLowerCase() > b.name.trim().toLowerCase()) {
      return 1;
    }
    return 0;
  },
  nameZ: (a, b) => {
    if (b.name.trim().toLowerCase() < a.name.trim().toLowerCase()) {
      return -1;
    }
    if (b.name.trim().toLowerCase() > a.name.trim().toLowerCase()) {
      return 1;
    }
    return 0;
  },
  priceMax: (a, b) => {
    if (a.price > b.price) {
        return -1;
    }
    if (a.price < b.price) {
        return 1;
    }
    return 0;
  },
};

export default SortFunctions;
