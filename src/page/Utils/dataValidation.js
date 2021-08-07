const isDataEqual = (obj1 = {}, obj2 = {}) => {
  return (
    obj1.title === obj1.title &&
    obj1.brand === obj2.brand &&
    obj1.price === obj2.price
  );
};
export { isDataEqual };
