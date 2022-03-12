#!/usr/bin/env node
import question from './utils/rl.js';
import monitor from './services/monitoring-service.js';
import * as term from './utils/term.js';

(() => {
	console.clear();
	term.setSize(); // set initial terminal size
	question('Enter a list of Coin Ticker Symbols: ', (resp) => {
		monitor(resp.split(' '));
	});
})();
