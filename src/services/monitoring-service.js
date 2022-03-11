import WebSocket from 'ws';
import { spinnerOptions, clearDisplay, updatePrice, updatePrevPrice } from './display-service.js';

const updatePrevPriceWrapper = (coin, price) => {
	setTimeout(() => updatePrevPrice(coin, price), 10000);
};

const monitor = (coinsList) => {
	clearDisplay();
	spinnerOptions.start('Establishing socket connection to Binance...');
	const ws = new WebSocket('wss://stream.binance.com:9443/ws');
	const params = [];
	coinsList.forEach((coin) => {
		params.push(`${coin}usdt@aggTrade`);
	});
	const payload = {
		method: 'SUBSCRIBE',
		params,
		id: 1
	};
	ws.on('open', () => {
		ws.send(JSON.stringify(payload));
		spinnerOptions.stop();
		clearDisplay();
		ws.onmessage = (event) => {
			const respPayload = JSON.parse(event.data);
			updatePrice(respPayload.s, respPayload.p);
			updatePrevPriceWrapper(respPayload.s, respPayload.p);
		};
	});
};

export default monitor;
