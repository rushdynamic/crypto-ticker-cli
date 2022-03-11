import WebSocket from 'ws';
import { program } from 'commander';
import { argv } from 'process';

program.version('1.0.0').description('Smart cryptocurrency trading bot for Binance');
program.parse(argv);

console.log('Creating WS connection to Binance');
const ws = new WebSocket('wss://stream.binance.com:9443/ws');
const startMonitoring = (coin: string) => {
  const samplePayload = {
    method: 'SUBSCRIBE',
    params: [`${coin}usdt@aggTrade`],
    id: 1
  };
  let counter = 0;
  ws.on('open', () => {
    ws.send(JSON.stringify(samplePayload), async (response) => console.log('Response from Binance:', response));
    ws.onmessage = (event) => {
      counter += 1;
      const respPayload = JSON.parse(event.data as string);
      console.log(counter, '\t', respPayload.p, '\n');
    };
  });
};
startMonitoring('ftm');
