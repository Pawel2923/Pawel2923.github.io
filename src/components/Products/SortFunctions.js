const SortFunctions = {
  titleA: (a, b) => {
    if (a.title.trim().toLowerCase() < b.title.trim().toLowerCase()) {
      return -1;
    }
    if (a.title.trim().toLowerCase() > b.title.trim().toLowerCase()) {
      return 1;
    }
    return 0;
  },
  titleZ: (a, b) => {
    if (b.title.trim().toLowerCase() < a.title.trim().toLowerCase()) {
      return -1;
    }
    if (b.title.trim().toLowerCase() > a.title.trim().toLowerCase()) {
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
