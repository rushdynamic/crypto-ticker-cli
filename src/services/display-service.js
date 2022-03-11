const priceMap = new Map();
const updatePrice = (coin, price) => {
  priceMap.set(coin, price);
};

const displayPrice = () => {
  console.clear();
  console.table(priceMap);
};

export { updatePrice, displayPrice };
