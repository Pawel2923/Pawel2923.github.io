const filterPrice = (data, filterVal) => {
  let updatedData = data;

  if (filterVal.minValue === 0) {
    updatedData = [
      ...data.filter((value) => value.price <= filterVal.maxValue),
    ];
  } else if (filterVal.maxValue === 0) {
    updatedData = [
      ...data.filter((value) => value.price >= filterVal.minValue),
    ];
  } else {
    updatedData = [
      ...data.filter(
        (value) =>
          value.price >= filterVal.minValue && value.price <= filterVal.maxValue
      ),
    ];
  }

  return updatedData;
};

const filterProducts = (data, filter) => {
  let updatedData = data;
  const { filterBy, filterVal } = filter;

  if (filterBy !== "none") {
    if (filterBy === "price") {
      updatedData = filterPrice(updatedData, filterVal);
    }

    if (filterBy === "categories") {
      let filteredArr = [];
      for (let checkbox of filterVal) {
        const items = updatedData.filter(
          (value) => value.category === checkbox.value
        );
        for (let item of items) {
          filteredArr.push(item);
        }
      }
      updatedData = filteredArr;
    }

    if (filterBy === "combined") {
      let filteredArr = [];
      for (let checkbox of filterVal.checkboxes) {
        const items = updatedData.filter(
          (value) => value.category === checkbox.value
        );
        for (let item of items) {
          filteredArr.push(item);
        }
      }
      updatedData = filteredArr;

      updatedData = filterPrice(updatedData, filterVal);
    }
  }

  return updatedData;
};

export default filterProducts;
