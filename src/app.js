import { program } from 'commander';
import { argv } from 'process';
import WebSocket from 'ws';

program.version('1.0.0').description('Realtime Cryptocurrency Price Tracker');

const startMonitoring = (coin) => {
  console.log('Creating WS connection to Binance');
  const ws = new WebSocket('wss://stream.binance.com:9443/ws');
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
      const respPayload = JSON.parse(event.data);
      console.log(counter, '\t', respPayload.p, '\n');
    };
  });
};

program
  .command('watch <coinname>')
  .alias('w')
  .description('Watch the price of a coin.\nEg: BTC')
  .action((coinname) => {
    startMonitoring(coinname);
  });

program.parse(argv);
