# 📈 crypto-ticker-cli
crypto-ticker-cli is a commandline application that displays cryptocurrency prices in realtime from Binance using WebSockets. 

## 🛠 Installation
#### Using *npm* package manager (recommended)
Install globally
```
npm i -g crypto-ticker-cli
```
Or run directly
```
npx crypto-ticker-cli
```
#### From source
```
  git clone -b main https://github.com/RushDynamic/crypto-ticker-cli
  cd crypto-ticker-cli
  chmod +x ./src/app.js
  ./src/app.js
```

## 👨‍💻 Usage
Simply run the application, and enter the desired coin symbols separated by spaces.

Example:
```
crypto-ticker-cli
Enter a list of Coin Ticker Symbols: btc eth ftm

Output:

Coin		Price (USDT)
BTC	 --- 	39191.14
ETH	 --- 	2589.99
FTM	 --- 	1.2051
```

### Run without question
```
crypto-ticker-cli btc eth ftm

Output:

Coin		Price (USDT)
BTC	 --- 	39191.14
ETH	 --- 	2589.99
FTM	 --- 	1.2051
```
