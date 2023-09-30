import { HTML, nFlex } from '@brtmvdl/frontend'
import * as BINANCE from './apis/binance.js'

export class Page extends HTML {
  children = {
    top_bar: new HTML(),
    coins_tabs: new HTML(),
    coin_price: new HTML(),
    buy_button: new HTML(),
    latest: new HTML(),
  }

  state = {
    coin: 'BTC',
    price: 0,
  }

  onCreate() {
    this.append(this.getTopBar())
    this.append(this.getCoinsTabs())
    this.append(this.getCoinPrice())
    this.append(this.getBuyButton())
    this.append(this.getLatest())
    //
    this.observePrices()
  }

  getTopBar() {
    this.children.top_bar.setText('Coins')

    return this.children.top_bar
  }

  getCoinsTabs() {
    this.children.coins_tabs.clear()

    const flex = new nFlex()

    Array.from(['BTC', 'LTC', 'XRP']).map((coin) => {
      const coinEl = new HTML()
      coinEl.setText(coin)
      coinEl.on('click', () => this.state.coin = coin)
      flex.append(coinEl)
    })

    return this.children.coins_tabs.append(flex)
  }

  getCoinPrice() {
    return this.children.coin_price
  }

  getBuyButton() {
    return this.children.buy_button
  }

  getLatest() {
    return this.children.latest
  }

  getPair() {
    return `${this.state.coin}BRL`
  }

  updatePrice() {
    console.log('updatePrice', Date.now())

    this.children.coin_price.setText(`${this.getPair()} ${this.state.price}`)
  }

  observePrices() {
    fetch(`https://api4.binance.com/api/v3/ticker/price?symbol=${this.getPair()}`)
      .then((res) => res.json())
      .then(({price}) => { this.state.price = +price })
      .then(() => this.updatePrice())
      .then(() => this.observePrices())
      .catch(err => console.error(err))
  }
}
