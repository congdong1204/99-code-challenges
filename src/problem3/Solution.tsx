import React, { useMemo, useCallback } from 'react'
// Assuming these are custom hooks and components
// import { BoxProps } from './types';
// import { WalletRow } from './components';
// import { useWalletBalances, usePrices } from './hooks';

interface WalletBalance {
  currency: string
  amount: number
  blockchain: string // Added missing blockchain property
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string
}

interface Props extends BoxProps {
  // Can add specific props if needed
}

// Type definition for prices object
interface Prices {
  [currency: string]: number
}

// Union type for supported blockchains
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo'

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props
  const balances = useWalletBalances()
  const prices: Prices = usePrices()

  // Memoized priority function to avoid recreation on every render
  const getPriority = useCallback((blockchain: string): number => {
    switch (blockchain as Blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      default:
        return -99
    }
  }, [])

  // Combined filter, sort, and format operations in a single useMemo for efficiency
  const processedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain)
        // Fixed logic: only keep balances with amount > 0 and valid priority
        return balancePriority > -99 && balance.amount > 0
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain)
        const rightPriority = getPriority(rhs.blockchain)

        // Sort by priority (higher priority first)
        if (leftPriority > rightPriority) {
          return -1
        } else if (rightPriority > leftPriority) {
          return 1
        }
        return 0 // Added missing equality case
      })
      .map(
        (balance: WalletBalance): FormattedWalletBalance => ({
          ...balance,
          formatted: balance.amount.toFixed(2), // Added decimal places for better formatting
        })
      )
  }, [balances, getPriority]) // Removed prices from dependencies as it's not used here

  // Memoized rows to prevent unnecessary re-renders
  const rows = useMemo(() => {
    return processedBalances.map((balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount
      return (
        <WalletRow
          className={classes.row}
          key={`${balance.currency}-${balance.blockchain}`} // Use unique key instead of index
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  }, [processedBalances, prices])

  return <div {...rest}>{rows}</div>
}

export default WalletPage
