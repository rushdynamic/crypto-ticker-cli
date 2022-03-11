import WebSocket from 'ws';
import { updatePrice, displayPrice } from './display-service.js';

const monitor = (coinsList) => {
	console.log('Creating WS connection to Binance');
	const ws = new WebSocket('wss://stream.binance.com:9443/ws');
	const params = [];
	coinsList.forEach((coin) => {
		params.push(`${coin}usdt@aggTrade`);
	});
	setInterval(displayPrice, 2000);
	const payload = {
		method: 'SUBSCRIBE',
		params,
		id: 1
	};
	ws.on('open', () => {
		ws.send(JSON.stringify(payload), async (response) => console.log('Response from Binance:', response));
		ws.onmessage = (event) => {
			const respPayload = JSON.parse(event.data);
			updatePrice(respPayload.s, respPayload.p);
		};
	});
};
// params: [`${coin}usdt@aggTrade`],

export default monitor;
