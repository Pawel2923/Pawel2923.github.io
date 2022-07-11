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
  priceMin: (a, b) => {
    if (b.price > a.price) {
        return -1;
    }
    if (b.price < a.price) {
        return 1;
    }
    return 0;
  },
  reviews: (a, b) => {
    if (a.score > b.score) {
      return -1;
    }
    if (a.score < b.score) {
      return 1;
    }
    return 0;
  },
};

export default SortFunctions;
