const priceMap = new Map();

const clearDisplay = (count) => {
	for (let i = 0; i < count; i += 1) {
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine();
	}
};

const displayPrice = () => {
	if (priceMap.size > 0) {
		let printStr = 'Coin\t\tPrice';
		// eslint-disable-next-line no-restricted-syntax
		for (const [key, value] of priceMap) {
			printStr += `\n${key}\t --- \t${value}`;
		}
		clearDisplay(priceMap.size + 1);
		process.stdout.cursorTo(0);
		process.stdout.write(printStr);
	} else {
		console.clear();
		console.log('Connecting to Binance...');
	}
};

const updatePrice = (coin, price) => {
	if (coin && price) priceMap.set(coin, price);
	displayPrice();
};

export { updatePrice, displayPrice };
