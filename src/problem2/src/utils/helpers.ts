export const getTokenSymbolUrl = (symbol: string) => {
  const customWrongSymbols: { [key: string]: string } = {
    RATOM: 'ATOM',
    STATOM: 'ATOM',
    STEVMOS: 'EVMOS',
    STLUNA: 'LUNA',
    STOSMO: 'OSMO',
  }
  const iconCurrency = customWrongSymbols[symbol] || symbol
  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${iconCurrency}.svg`
}

export const formatCurrency = (amount: number): string => {
  if (!amount) return '$0'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
