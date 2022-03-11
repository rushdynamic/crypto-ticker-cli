import ora from 'ora';

const priceMap = new Map();
const spinner = ora({
	color: 'yellow',
	spinner: 'line'
});
const spinnerOptions = {
	start: (text) => {
		spinner.text = text;
		spinner.start();
	},
	stop: () => spinner.stop()
};

const clearDisplay = () => {
	console.clear();
};

const clearPriceValues = (count) => {
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
			printStr += `\n${key.replace('USDT', '')}\t --- \t${parseFloat(value)}`;
		}
		clearPriceValues(priceMap.size + 1);
		process.stdout.cursorTo(0);
		process.stdout.write(printStr);
	}
};

const updatePrice = (coin, price) => {
	if (coin && price) priceMap.set(coin, price);
	displayPrice();
};

export { updatePrice, clearDisplay, spinnerOptions };
