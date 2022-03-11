import question from './utils/rl.js';
import monitor from './services/monitoring-service.js';

let coinsList = [];

const getCoins = () => {
	console.clear();
	question('Enter a list of Coin Ticker Symbols: ', (resp) => {
		coinsList = resp.split(' ');
		monitor(coinsList);
	});
};

getCoins();
