import { HTML, nSelect } from '../libs/@brtmvdl/frontend/src/index.js'

export class PriceHTML extends HTML {
  state = {
    symbol: 'BTCBRL',
    price: 0,
  }

  children = {
    symbol: new nSelect(),
    price: new HTML(),
  }

  onCreate() {
    this.append(this.getSelectHTML())
    this.append(this.getPriceHTML())
    //
    this.children.symbol.dispatchEvent('change')
  }

  getSelectHTML() {
    this.state.pairs.map((pair) => this.children.symbol.addOption(pair.join(''), pair.join(''),))

    this.children.symbol.on('change', () => this.state.symbol = this.children.symbol.getValue())

    return this.children.symbol
  }

  getPriceHTML() {
    this.children.price.setStyle('padding', '1rem 0rem')
    this.children.price.setStyle('text-align', 'center')
    this.children.price.setStyle('font-size', '2rem')

    return this.children.price
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
