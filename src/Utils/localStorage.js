const getItemHistories = () => {
  let itemHistories = window.localStorage.getItem("itemHistories");
  if (itemHistories) {
    try {
      itemHistories = JSON.parse(itemHistories);
    } catch (err) {
      itemHistories = [];
    }
  } else {
    itemHistories = [];
  }
  return itemHistories;
};

const setItemHistories = (itemHistories) => {
  window.localStorage.setItem("itemHistories", JSON.stringify(itemHistories));
};

export { getItemHistories, setItemHistories };
