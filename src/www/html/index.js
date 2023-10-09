import { HTML, nButton } from '@brtmvdl/frontend'
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
  coin = null
  pair = null
  datetime = null

  constructor(buy, coin = new Coin(), pair = new Pair()) {
    this.buy = buy
    this.coin = coin
    this.pair = pair
    this.datetime = Date.now()
  }
}

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
    pair: new Pair(0, 'BTCBRL')
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

  calcCoinPrice(value = 0, old_price = 0, current_price = 0) {
    return (value * current_price / old_price).toFixed(2)
  }

  buy(coin = new Coin()) {
    Local.add(['move'], { buy: new Buy(coin, this.state.pair), sell: null, })
  }

  sell(buy = new Buy()) {
    const moves = Array.from(Local.get(['move'], []))

    const move_index = moves.findIndex((move) => move.buy.datetime === buy.datetime)

    if (moves[move_index]) {
      const price = this.calcCoinPrice(buy.coin.price, this.state.pair.price, buy.pair.price)

      const coin = new Coin(price, buy.coin.symbol)

      moves[move_index].sell = new Sell(buy, coin, this.state.pair,)
    }

    Local.set(['move'], moves)

    this.updateHistory()
  }

  updateHistory() {
    this.children.history.clear()

    const buy_group = new HTML()

    const moves = Local.get(['move'], [])

    if (!moves) return

    Array.from(moves).map((move) => {
      console.log({ move })

      const card = new HTML()
      card.setStyle('margin', '1rem')
      card.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 4) #000000')

      // card.setText(JSON.stringify(buy_item, null, 4))

      const buy_title = new HTML()
      buy_title.setText('Buy')
      buy_title.setStyle('background-color', '#000000')
      buy_title.setStyle('padding', 'calc(1rem / 2)')
      buy_title.setStyle('color', '#ffffff')
      card.append(buy_title)

      const buy_coin = new HTML()
      buy_coin.setText(`${move.buy.coin.symbol} ${move.buy.coin.price}`)
      buy_coin.setStyle('padding', 'calc(1rem / 2)')
      card.append(buy_coin)

      const buy_pair = new HTML()
      buy_pair.setText(`${move.buy.pair.symbol} ${move.buy.pair.price}`)
      buy_pair.setStyle('padding', 'calc(1rem / 2)')
      card.append(buy_pair)

      const buy_datetime = new HTML()
      buy_datetime.setText(`${this.parseDatetime(move.buy.datetime)}`)
      buy_datetime.setStyle('padding', 'calc(1rem / 2)')
      card.append(buy_datetime)

      if (move.sell) {
        const sell_title = new HTML()
        sell_title.setText('Sell')
        sell_title.setStyle('background-color', '#000000')
        sell_title.setStyle('padding', 'calc(1rem / 2)')
        sell_title.setStyle('color', '#ffffff')
        card.append(sell_title)

        const sell_coin = new HTML()
        sell_coin.setText(`${move.sell.coin.symbol} ${move.sell.coin.price}`)
        sell_coin.setStyle('padding', 'calc(1rem / 2)')
        card.append(sell_coin)

        const sell_pair = new HTML()
        sell_pair.setText(`${move.sell.pair.symbol} ${move.sell.pair.price}`)
        sell_pair.setStyle('padding', 'calc(1rem / 2)')
        card.append(sell_pair)

        const sel_datetime = new HTML()
        sel_datetime.setText(`${this.parseDatetime(move.sell.datetime)}`)
        sel_datetime.setStyle('padding', 'calc(1rem / 2)')
        card.append(sel_datetime)
      } else {
        const sell_button = new nButton()
        sell_button.setText('Sell')
        sell_button.setStyle('box-shadow', '0rem 0rem 0rem calc(1rem / 4) #000000')
        sell_button.setStyle('background-color', '#000000')
        sell_button.setStyle('color', '#ffffff')
        sell_button.setStyle('padding', 'calc(1rem / 2) calc(1rem / 1)')
        sell_button.setStyle('margin', '0rem 1rem 1rem 1rem')
        sell_button.setStyle('border', 'none')
        sell_button.on('click', () => this.sell(move.buy))
        card.append(sell_button)
      }

      buy_group.append(card)
    })

    this.children.history.append(buy_group)
  }

  getBuyButton() {
    const button = new nButton()

    button.setText('Buy (BRL 100.00)')
    button.on('click', () => {
      this.buy(new Coin(100, 'BRL'))
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

  getCoinPriceValue() {
    return (this.state.pair.price).toFixed(2).replace('.', ',')
  }

  getCoinPriceText() {
    return `${this.state.pair.symbol} ${this.getCoinPriceValue()}`
  }

  updateDatetime() {
    this.children.coin_datetime.setText((new Date()).toString())
  }

  observePrices() {
    this.children.coin_datetime.setText(this.parseDatetime())

    fetch(`https://api4.binance.com/api/v3/ticker/price?symbol=${this.state.pair.symbol}`)
      .then((res) => res.json())
      .then(({ price }) => this.state.pair.price = +price)
      .then(() => this.children.coin_price.setText(this.getCoinPriceText()))
      .then(() => this.updateDatetime())
      .then(() => this.updateHistory())
      .then(() => this.observePrices())
      .catch((error) => this.children.error_message.setText(error.message))
  }
}
