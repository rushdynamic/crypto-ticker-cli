import question from './utils/rl.js';
import monitor from './services/monitoring-service.js';

(() => {
	console.clear();
	question('Enter a list of Coin Ticker Symbols: ', (resp) => {
		monitor(resp.split(' '));
	});
})();
