import { HTML } from '../libs/@brtmvdl/frontend/src/index.js'

export class PriceHTML extends HTML {
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
