import { HTML, nButton, nSpan } from '@brtmvdl/frontend'
import * as UTILS from './utils.js'
import * as Local from './local.js'

class Coin {
  price = 0
  symbol = ''

  constructor(price = 0, symbol = '') {
    this.price = price
    this.symbol = symbol
  }
}

class Pair {
  price = 0
  symbol = ''

  constructor(price = 0, symbol = '') {
    this.price = price
    this.symbol = symbol
  }
}

class Buy {
  coin = null
  pair = null
  datetime = null

  constructor(coin = new Coin(), pair = new Pair()) {
    this.coin = coin
    this.pair = pair
    this.datetime = Date.now()
  }
}

class Sell {
  buy = null
  // coin = null
  pair = null
  datetime = null

  constructor(buy, pair = new Pair()) {
    this.buy = buy
    // this.coin = coin
    this.pair = pair
    this.datetime = Date.now()
  }
}

class TopHTML extends HTML {
  onCreate() {
    this.setText('Coins')

    this.setStyle('background-color', '#000000')
    this.setStyle('text-align', 'center')
    this.setStyle('font-size', '2rem')
    this.setStyle('color', '#ffffff')
    this.setStyle('padding', '1rem')
  }
}

class PriceHTML extends HTML {
  state = {
    symbol: 'BTCBRL',
    price: 0,
  }

  children = {
    price: new HTML(),
  }

  constructor() {
    super()
    this.setPrice()
  }

  onCreate() {
    this.append(this.getPriceHTML())
  }

  getPriceHTML() {
    this.children.price.setStyle('padding', '1rem 0rem')
    this.children.price.setStyle('text-align', 'center')
    this.children.price.setStyle('font-size', '2rem')

    return this.children.price
  }

  setSymbol(symbol = 0) {
    this.state.symbol = symbol
    this.updateprice()
    return this
  }

  setPrice(price = 0) {
    this.state.price = price
    this.updateprice()
    return this
  }

  getPriceText(price = this.state.price, symbol = this.state.symbol) {
    return [
      symbol,
      price.toFixed(2).replace('.', ','),
    ].join(' ')
  }

  updateprice(price = this.state.price, symbol = this.state.symbol) {
    this.children.price.setText(this.getPriceText(price, symbol))
  }
}

class DatetimeHTML extends HTML {
  state = {
    datetime: 0,
  }

  children = {
    datetime: new HTML(),
  }

  onCreate() {
    this.append(this.getDatetimeHTML())
  }

  getDatetimeHTML() {
    this.children.datetime.setStyle('padding', '1rem 0rem')
    this.children.datetime.setStyle('text-align', 'center')

    return this.children.datetime
  }

  getDatetimeText(now = Date.now()) {
    const datetime = new Date(now)

    const date = [
      datetime.getFullYear(),
      datetime.getMonth() + 1,
      datetime.getDay(),
    ].map((num) => UTILS.padLeft(num, 2, '0')).join('-')

    const time = [
      datetime.getHours(),
      datetime.getMinutes(),
      datetime.getSeconds(),
    ].map((num) => UTILS.padLeft(num, 2, '0')).join(':')

    return [date, time].join(' ')
  }

  updateDatetime() {
    this.children.datetime.setText(this.getDatetimeText())
  }
}

export class Page extends HTML {
  children = {
    price: new PriceHTML(),
    datetime: new DatetimeHTML(),
    buy_button: new nButton(),
    history: new HTML(),
  }

  state = {
    pair: new Pair(0, 'BTCBRL'),
    moves: []
  }

  onCreate() {
    this.setStyles()
    this.append(new TopHTML())
    this.append(this.getPriceHTML())
    this.append(this.getDatetimeHTML())
    this.append(this.getBuyButtonHTML())
    this.append(this.getHistoryHTML())
    //
    this.updatePrice()
  }

  parseDatetime(now = Date.now()) {
    const datetime = new Date(now)

    const date = [
      datetime.getFullYear(),
      datetime.getMonth() + 1,
      datetime.getDate(),
    ].map((text) => UTILS.padLeft(text, 2, '0')).join('-')

    const time = [
      datetime.getHours(),
      datetime.getMinutes(),
      datetime.getSeconds(),
    ].map((text) => UTILS.padLeft(text, 2, '0')).join(':')

    return `${date} ${time}`
  }

  buy(coin = new Coin(), pair = new Pair()) {
    Local.add(['move'], { buy: new Buy(coin, pair), sell: null, })
  }

  sell(buy = new Buy()) {
    const moves = Array.from(Local.get(['move'], []))

    const move_index = moves.findIndex((move) => move.buy.datetime === buy.datetime)

    if (moves[move_index]) {
      moves[move_index].sell = new Sell(buy, this.state.pair)
    }

    Local.set(['move'], moves)
  }

  setStyles() {
    this.setStyle('font-family', 'sans-serif')
  }

  getPriceHTML() {
    return this.children.price
  }

  getDatetimeHTML() {
    return this.children.datetime
  }

  getBuyButtonHTML() {
    this.children.buy_button.setText('Buy (BRL 100)')

    this.children.buy_button.setContainerStyle('text-align', 'center')

    this.children.buy_button.setStyle('background-color', '#000000')
    this.children.buy_button.setStyle('text-align', 'center')
    this.children.buy_button.setStyle('color', '#ffffff')
    this.children.buy_button.setStyle('padding', '1rem')
    this.children.buy_button.setStyle('border', 'none')

    this.children.buy_button.on('click', () => this.buy(new Coin(100, 'BRL'), this.state.pair))

    return this.children.buy_button
  }

  getHistoryHTML() {
    return this.children.history
  }

  getPriceValue(price = 0) {
    return (+price).toFixed(2).replace('.', ',')
  }

  getPriceText(price = 0, symbol = '') {
    return `${symbol} ${this.getPriceValue(+price)}`
  }

  parseDiffPrice(value = 1, latest = 1, now = 0) {
    return ((value * now / latest) - value).toFixed(2).replace('.', ',')
  }

  updateDatetime() {
    this.children.datetime.updateDatetime()
  }

  updateHistory() {
    this.children.history.clear()

    const moves = Local.get(['move'], [])

    if (moves) {
      const history_title = new HTML()
      history_title.setText('History')
      history_title.setStyle('font-size', '2rem')
      history_title.setStyle('padding', '1rem')
      this.children.history.append(history_title)

      moves.map(({ buy = new Buy(), sell = null }) => {
        const html = new HTML()
        html.setStyle('margin', '1rem')
        html.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 4) #000000')

        const buy_title = new HTML()
        buy_title.setText('Buy')
        buy_title.setStyle('background-color', '#000000')
        buy_title.setStyle('color', '#ffffff')
        buy_title.setStyle('padding', 'calc(1rem / 2)')
        html.append(buy_title)

        const buy_pair_text = new HTML()
        buy_pair_text.setText(`${buy.pair.symbol} ${this.getPriceValue(buy.pair.price)}`)
        buy_pair_text.setStyle('padding', 'calc(1rem / 2)')
        html.append(buy_pair_text)

        const buy_coin_text = new HTML()
        buy_coin_text.setText(`${buy.coin.symbol} ${this.getPriceValue(buy.coin.price)}`)
        buy_coin_text.setStyle('padding', 'calc(1rem / 2)')
        html.append(buy_coin_text)

        const buy_datetime = new HTML()
        buy_datetime.setText(`${this.parseDatetime(buy.datetime)}`)
        buy_datetime.setStyle('padding', 'calc(1rem / 2)')
        html.append(buy_datetime)

        if (sell) {
          console.log({ sell })

          const sell_title = new HTML()
          sell_title.setText('Sell')
          sell_title.setStyle('background-color', '#000000')
          sell_title.setStyle('color', '#ffffff')
          sell_title.setStyle('padding', 'calc(1rem / 2)')
          html.append(sell_title)

          const sell_pair_text = new HTML()
          sell_pair_text.setText(`${sell.pair.symbol} ${this.getPriceValue(sell.pair.price)}`)
          sell_pair_text.setStyle('padding', 'calc(1rem / 2)')
          html.append(sell_pair_text)

          const sell_coin_text = new HTML()
          sell_coin_text.setText(`${sell.buy.coin.symbol} ${this.getPriceValue(buy.coin.price * sell.pair.price / buy.pair.price)}`)
          sell_coin_text.setStyle('padding', 'calc(1rem / 2)')
          html.append(sell_coin_text)

          const sell_datetime = new HTML()
          sell_datetime.setText(`${this.parseDatetime(sell.datetime)}`)
          sell_datetime.setStyle('padding', 'calc(1rem / 2)')
          html.append(sell_datetime)

          const diff_title = new HTML()
          diff_title.setText('Diff')
          diff_title.setStyle('background-color', '#000000')
          diff_title.setStyle('color', '#ffffff')
          diff_title.setStyle('padding', 'calc(1rem / 2)')
          html.append(diff_title)

          const diff_pair_text = new HTML()
          diff_pair_text.setText(`${buy.pair.symbol} ${this.getPriceValue(sell.pair.price - buy.pair.price)}`)
          diff_pair_text.setStyle('padding', 'calc(1rem / 2)')
          html.append(diff_pair_text)

          const diff_coin_text = new HTML()
          diff_coin_text.setText(`${buy.coin.symbol} ${this.parseDiffPrice(buy.coin.price, buy.pair.price, sell.pair.price)}`)
          diff_coin_text.setStyle('padding', 'calc(1rem / 2)')
          html.append(diff_coin_text)

        } else {
          const diff_title = new HTML()
          diff_title.setText('Diff')
          diff_title.setStyle('background-color', '#000000')
          diff_title.setStyle('color', '#ffffff')
          diff_title.setStyle('padding', 'calc(1rem / 2)')
          html.append(diff_title)

          const diff_pair_text = new HTML()
          diff_pair_text.setText(`${buy.pair.symbol} ${this.getPriceValue(this.state.pair.price - buy.pair.price)}`)
          diff_pair_text.setStyle('padding', 'calc(1rem / 2)')
          html.append(diff_pair_text)

          const diff_coin_text = new HTML()
          diff_coin_text.setText(`${buy.coin.symbol} ${this.parseDiffPrice(buy.coin.price, buy.pair.price, this.state.pair.price)}`)
          diff_coin_text.setStyle('padding', 'calc(1rem / 2)')
          html.append(diff_coin_text)

          const sell_button = new nButton()
          sell_button.setText('Sell')
          sell_button.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 4) #000000')
          sell_button.setStyle('background-color', '#000000')
          sell_button.setStyle('padding', 'calc(1rem / 2)')
          sell_button.setStyle('color', '#ffffff')
          sell_button.setStyle('outline', 'none')
          sell_button.setStyle('border', 'none')
          sell_button.setStyle('margin', '1rem')
          sell_button.on('click', () => this.sell(buy))
          html.append(sell_button)
        }

        this.children.history.append(html)
      })
    }
  }

  updatePrice() {
    fetch(`https://api4.binance.com/api/v3/ticker/price?symbol=${this.state.pair.symbol}`)
      .then((res) => res.json())
      .then(({ price }) => this.state.pair.price = +price)
      .then(() => this.children.price.updateprice(this.state.pair.price, this.state.pair.symbol))
      .then(() => this.updatePrice())
      .then(() => this.updateDatetime())
      .then(() => this.updateHistory())
  }

}
