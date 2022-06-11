#!/usr/bin/env node
import question from './utils/rl.js';
import monitor from './services/monitoring-service.js';
import * as term from './utils/term.js';
import minimist from 'minimist';

(() => {
	console.clear();
	term.setSize(); // set initial terminal size

	const argv = minimist(process.argv.slice(2));
	let coins = argv._;
	if (coins.length === 0) {
		question('Enter a list of Coin Ticker Symbols: ', (resp) => {
			if (!resp) {
				console.log('Invalid entry');
				return;
			}
			coins = resp.split(' ');
		});
	}
	monitor(coins);
})();
