export const parseMonth = (monthNum) => {
  switch (padLeft(monthNum, 2, '0')) {
    case '01': return 'January'
    case '02': return 'February'
    case '03': return 'March'
    case '04': return 'April'
    case '05': return 'May'
    case '06': return 'June'
    case '07': return 'July'
    case '08': return 'August'
    case '09': return 'September'
    case '10': return 'October'
    case '11': return 'November'
    case '12': return 'December'
  }
  return null
}

export const getPairsList = () => Array.from([
  ['BTC', 'BRL'],
  ['USDT', 'BRL'],
  ['ETH', 'BRL'],
  ['XRP', 'BRL'],
  ['BNB', 'BRL'],
  ['MATIC', 'BRL'],
  ['SOL', 'BRL'],
  ['LINK', 'BRL'],
  ['LTC', 'BRL'],
  ['AVAX', 'BRL'],
  ['DOGE', 'BRL'],
  ['ADA', 'BRL'],
  ['SHIB', 'BRL'],
  ['DOT', 'BRL'],
  ['BUSD', 'BRL'],
  ['CHZ', 'BRL'],
  ['GALA', 'BRL'],
  ['WIN', 'BRL'],
])
