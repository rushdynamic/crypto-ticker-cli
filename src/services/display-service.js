const priceMap = new Map();
const updatePrice = (coin, price) => {
	if (coin && price) priceMap.set(coin, price);
};

const displayPrice = () => {
	console.clear();
	if (priceMap.size > 0) {
		console.table(priceMap);
	} else {
		console.log('Connecting to Binance...');
	}
};

export { updatePrice, displayPrice };
