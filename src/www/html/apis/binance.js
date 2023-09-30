
export const tickerPrice = ({ symbol }) => get('https://api4.binance.com/api/v3/ticker/price', [], { symbol })

