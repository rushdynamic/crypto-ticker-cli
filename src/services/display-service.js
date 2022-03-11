import ora from 'ora';
import * as term from '../utils/term.js';

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

const getColor = (coin, value) => {
	if (priceMap.has(`${coin}_prev`)) {
		if (value > priceMap.get(`${coin}_prev`)) return ['\x1b[32m', '\x1b[0m'];
		return ['\x1b[31m', '\x1b[0m'];
	}
	return ['\x1b[37m', '\x1b[0m'];
};

const clearPriceValues = (count) => {
	for (let i = 0; i < count; i += 1) {
		process.stdout.moveCursor(0, -2);
		process.stdout.clearLine();
	}
};

const displayPrice = () => {
	if (term.getSize().x !== term.getCurrentSize().x || term.getSize().y !== term.getCurrentSize().y) {
		clearDisplay();
		term.setSize();
	}
	if (priceMap.size > 0) {
		let printStr = '\x1b[33mCoin\t\tPrice\x1b[0m';
		// eslint-disable-next-line no-restricted-syntax
		for (const [key, value] of priceMap) {
			if (!key.includes('prev')) {
				const rowColor = getColor(key, value);
				printStr += `\n${key.replace('USDT', '')}\t --- \t${rowColor[0]}${parseFloat(value)}${rowColor[1]}`;
			}
		}
		clearPriceValues(priceMap.size + 1);
		process.stdout.cursorTo(0);
		process.stdout.write(`${printStr}\n`);
	}
};

const updatePrice = (coin, price) => {
	if (coin && price) {
		if (priceMap.has(coin)) {
			priceMap.set(`${coin}_prev`, priceMap.get(coin));
		}
		priceMap.set(coin, price);
	}
	displayPrice();
};

export { updatePrice, clearDisplay, spinnerOptions };
