import cliCursor from 'cli-cursor';
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
	const key = `${coin}_prev`;
	if (priceMap.has(key)) {
		const percentage = ((value - priceMap.get(key)) / priceMap.get(key)) * 100;
		if (Math.abs(percentage) > 0.01) {
			if (percentage > 0) return ['\x1b[32m', '\x1b[0m'];
			return ['\x1b[31m', '\x1b[0m'];
		}
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
		let printStr = '\x1b[33mCoin\t\tPrice (USDT)\x1b[0m';
		let rowColor = ['\x1b[37m', '\x1b[0m'];
		// eslint-disable-next-line no-restricted-syntax
		for (const [key, value] of priceMap) {
			if (!key.includes('prev')) {
				rowColor = getColor(key, parseFloat(value));
				printStr += `\n${key.replace('USDT', '')}\t --- \t${rowColor[0]}${parseFloat(value)}${rowColor[1]}`;
			}
		}
		clearPriceValues(priceMap.size + 1);
		process.stdout.cursorTo(0);
		process.stdout.write(`${printStr}\n`);
		cliCursor.hide();
	}
};

const updatePrevPrice = (coin, price) => {
	if (priceMap.has(coin)) {
		priceMap.set(`${coin}_prev`, price);
	}
};

const updatePrice = (coin, price) => {
	if (coin && price) {
		priceMap.set(coin, price);
	}
	displayPrice();
};

export { updatePrice, updatePrevPrice, clearDisplay, spinnerOptions };
