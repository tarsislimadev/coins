import { HTML } from './libs/afrontend/index.js'
import { AmountInputComponent, CoinSelectComponent, PriceComponent, DatetimeComponent, BuyButtonComponent, HistoryComponent } from './components/index.js'
import { ButtonComponent } from './components/button.component.js'
import * as Local from './utils/local.js'

export class Page extends HTML {
  state = {
    coin: 'BTCBRL',
    price: 0,
  }

  amount = new AmountInputComponent()
  coin = new CoinSelectComponent()
  price = new PriceComponent()
  datetime = new DatetimeComponent()
  buy = new ButtonComponent({ text: 'Buy (BRL 100)', onclick: () => this.onBuyButtonClick() })
  history = new HistoryComponent()

  onCreate() {
    super.onCreate()
    this.append(this.getAmountInputComponent())
    this.append(this.getCoinSelectComponent())
    this.append(this.getPriceComponent())
    this.append(this.getDatetimeComponent())
    this.append(this.getBuyButtonComponent())
    this.append(this.getHistoryComponent())
    this.update()
  }

  getAmountInputComponent() {
    this.amount.setValue(100)
    this.amount.addEventListener('keyup', () => this.onAmountInputKeyUp())
    return this.amount
  }

  onAmountInputKeyUp() {
    this.buy.setText(`Buy (BRL ${this.getAmountValue()})`)
  }

  getAmountValue() {
    return this.amount.getValue()
  }

  getCoinSelectComponent() {
    this.coin.addEventListener('change', () => this.onCoinSelectChange())
    return this.coin
  }

  onCoinSelectChange() {
    this.state.coin = this.coin.getValue()
  }

  getPriceComponent() {
    return this.price
  }

  getDatetimeComponent() {
    return this.datetime
  }

  getBuyButtonComponent() {
    return this.buy
  }

  onBuyButtonClick() {
    Local.add(['moves'], {
      coin: this.state.coin,
      amount: this.getAmountValue(),
      buy_datetime: Date.now(),
      buy_price: this.state.price,
    })
  }

  getHistoryComponent() {
    return this.history
  }

  getApiPrice(symbol = '') {
    return fetch(`https://api4.binance.com/api/v3/ticker/price?symbol=${symbol}`).then(res => res.json())
  }

  update() {
    this.getApiPrice(this.state.coin)
      .then((res) => this.state.price = +res.price)
      .then(() => this.price.update(this.state.price))
      .then(() => this.history.update(this.state.price, this.state.coin))
      .then(() => this.datetime.update())
      .then(() => this.update())
      .catch((err) => console.error(err))
  }
}
