import { HTML, nLink, nButton } from '@brtmvdl/frontend'
import * as UTILS from './utils.js'
import * as Local from './local.js'

export class Page extends HTML {
  children = {
    top_bar: new HTML(),
    coins_tabs: new HTML(),
    coin_price: new HTML(),
    coin_datetime: new HTML(),
    buy_button: new HTML(),
    history: new HTML(),
  }

  state = {
    price: 0,
  }

  onCreate() {
    this.setStyles()
    this.append(this.getTopBar())
    this.append(this.getCoinPrice())
    this.append(this.getCoinDatetime())
    this.append(this.getBuyButton())
    this.append(this.getHistory())

    this.observePrices()
  }

  setStyles() {
    this.setStyle('font-family', 'sans-serif')
  }

  getTopBar() {
    this.children.top_bar.setText('Coins')

    this.children.top_bar.setStyle('background-color', '#000000')
    this.children.top_bar.setStyle('text-align', 'center')
    this.children.top_bar.setStyle('color', '#ffffff')
    this.children.top_bar.setStyle('padding', '1rem')

    return this.children.top_bar
  }

  getCoinPrice() {
    this.children.coin_price.setStyle('text-align', 'center')
    this.children.coin_price.setStyle('padding', '0rem 1rem')
    this.children.coin_price.setStyle('font-size', '2rem')
    this.children.coin_price.setStyle('margin', '1rem')

    return this.children.coin_price
  }

  getCoinDatetime() {
    this.children.coin_datetime.setStyle('margin-bottom', 'calc(1rem / 1)')
    this.children.coin_datetime.setStyle('padding', '0rem 1rem')
    this.children.coin_datetime.setStyle('text-align', 'center')

    return this.children.coin_datetime
  }

  buy(fromPrice = 0, fromCoin = 'BRL', toCoin = 'BTC') {
    Local.add(['buy'], { fromPrice, fromCoin, toPrice: this.state.price, toCoin, datetime: this.parseDatetime() })
  }

  sell(fromPrice = 0, fromCoin = 'BRL', toCoin = 'BTC') {
    Local.add(['sell'], { fromPrice, fromCoin, toPrice: this.state.price, toCoin, datetime: this.parseDatetime() })
  }

  calcCoinPrice(value = 0, old_price = 0, current_price = 0) {
    return (value * current_price / old_price).toFixed(2)
  }

  updateHistory() {
    this.children.history.clear()

    const buy_group = new HTML()

    const buy_list = Local.get(['buy'], [])

    if (!buy_list) return

    Array.from(buy_list).map((buy_item) => {
      const buy_card = new HTML()

      buy_card.setStyle('padding', 'calc(1rem / 2)')
      buy_card.setStyle('margin', '1rem')
      buy_card.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 8) #000000')

      const buy_info = new HTML()
      buy_info.setText(`${buy_item.fromCoin} ${buy_item.fromPrice} @ ${buy_item.toCoin}${buy_item.fromCoin} ${(+buy_item.toPrice).toFixed(2)}`)
      buy_card.append(buy_info)

      const buy_datetime = new HTML()
      buy_datetime.setText(buy_item.datetime)
      buy_card.append(buy_datetime)

      const buy_sell_price = new HTML()
      buy_sell_price.setText(`BRL ${this.calcCoinPrice(buy_item.fromPrice, buy_item.toPrice, this.state.price)}`)
      buy_card.append(buy_sell_price)

      const buy_link = new nLink()
      buy_link.setText('sell')
      buy_link.on('click', () => this.sell())
      buy_card.append(buy_link)

      buy_group.append(buy_card)
    })

    this.children.history.append(buy_group)
  }

  getBuyButton() {
    const button = new nButton()

    button.setText('Buy (BRL 100.00)')
    button.on('click', () => {
      this.buy(100.00, 'BRL', 'BTC')
      this.updateHistory()
    })

    button.setStyle('border', 'none')
    button.setStyle('padding', '1rem')
    button.setStyle('color', '#ffffff')
    button.setStyle('display', 'inline-block')
    button.setStyle('background-color', '#000000')
    button.setStyle('border-radius', 'calc(1rem / 4)')

    this.children.buy_button.setStyle('padding', '1rem')
    this.children.buy_button.setStyle('text-align', 'center')

    return this.children.buy_button.append(button)
  }

  getHistoryTitle() {
    const title = new HTML()
    title.setText('History')
    title.setStyle('padding', '1rem')
    title.setStyle('font-size', '2rem')
    return title
  }

  getHistory() {
    this.updateHistory()

    return this.children.history
  }

  getPair() {
    return ['BTC', 'BRL'].join('')
  }

  parseDatetime(datetime = new Date()) {
    const date = [
      datetime.getDate(),
      datetime.getMonth() + 1,
      datetime.getFullYear(),
    ].map((text) => UTILS.padLeft(text, 2, '0')).join('/')

    const time = [
      datetime.getHours(),
      datetime.getMinutes(),
      datetime.getSeconds(),
    ].map((text) => UTILS.padLeft(text, 2, '0')).join(':')

    return `${date} ${time}`
  }

  getCoinPriceText() {
    return `${this.getPair()} ${(+this.state.price).toFixed(2)}`
  }

  updateDatetime() {
    this.children.coin_datetime.setText((new Date()).toString())
  }

  observePrices() {
    this.children.coin_datetime.setText(this.parseDatetime())

    fetch(`https://api4.binance.com/api/v3/ticker/price?symbol=${this.getPair()}`)
      .then((res) => res.json())
      .then(({ price }) => this.state.price = price)
      .then(() => this.children.coin_price.setText(this.getCoinPriceText()))
      .then(() => this.updateDatetime())
      .then(() => this.updateHistory())
      .then(() => this.observePrices())
      .catch((error) => this.children.error_message.setText(error.message))
  }
}
