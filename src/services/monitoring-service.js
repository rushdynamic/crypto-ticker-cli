import WebSocket from 'ws';
import { updatePrice } from './display-service.js';

const monitor = (coinsList) => {
	console.log('Creating WS connection to Binance');
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
		ws.onmessage = (event) => {
			const respPayload = JSON.parse(event.data);
			updatePrice(respPayload.s, respPayload.p);
		};
	});
};
// params: [`${coin}usdt@aggTrade`],

export default monitor;
