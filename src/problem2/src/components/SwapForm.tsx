import { useEffect, useState, useMemo } from 'react'
import type { Token, ValidationErrors } from '../types'
import TokenSelector from './TokenSelector'
import NotificationToast from './NotificationToast'
import Icons from './Icons'
import { useTokenPrices } from '../hooks/useTokens'
import { ApiService } from '../services/api'

const SwapForm: React.FC = () => {
  const {
    tokens,
    loading: tokensLoading,
    error: tokensError,
  } = useTokenPrices()
  const [fromToken, setFromToken] = useState<Token>()
  const [toToken, setToToken] = useState<Token>()
  const [fromAmount, setFromAmount] = useState<string>('')
  const [toAmount, setToAmount] = useState<string>('')
  const [swapping, setSwapping] = useState<boolean>(false)
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info'
    message: string
  } | null>(null)
  const [errors, setErrors] = useState<ValidationErrors>({})

  useEffect(() => {
    if (tokens.length > 0) {
      setFromToken(tokens.find((t) => t.currency === 'ETH') || tokens[0])
      setToToken(tokens.find((t) => t.currency === 'USDC') || tokens[1])
    }
  }, [tokens])

  const exchangeRate = useMemo(() => {
    if (fromToken && toToken && fromToken.price && toToken.price) {
      return fromToken.price / toToken.price
    }
    return 0
  }, [fromToken, toToken])

  useEffect(() => {
    if (fromAmount && exchangeRate) {
      const amount = parseFloat(fromAmount) * exchangeRate
      setToAmount(amount.toFixed(5))
    } else {
      setToAmount('')
    }
  }, [fromAmount, exchangeRate])

  const handleFromAmountChange = (value: string): void => {
    setFromAmount(value)
    setErrors((prev) => ({ ...prev, amount: '' }))
  }

  const handleToAmountChange = (value: string): void => {
    setToAmount(value)
    setErrors((prev) => ({ ...prev, amount: '' }))

    if (value && exchangeRate) {
      const amount = parseFloat(value) / exchangeRate
      setFromAmount(amount.toFixed(5))
    } else {
      setFromAmount('')
    }
  }

  const handleSwapTokens = (): void => {
    setFromToken(toToken!)
    setToToken(fromToken!)
  }

  const handleSwap = async (): Promise<void> => {
    setSwapping(true)
    setErrors({})

    try {
      await ApiService.executeSwap({
        fromToken: fromToken!,
        toToken: toToken!,
        fromAmount,
        toAmount,
      })

      setNotification({
        type: 'success',
        message: `Successfully swapped ${fromAmount} ${
          fromToken!.currency
        } for ${toAmount} ${toToken!.currency}!`,
      })
      setFromAmount('')
      setToAmount('')
    } catch (error) {
      console.error('Swap failed:', error)
      setNotification({
        type: 'error',
        message: 'Swap failed. Please try again.',
      })
    } finally {
      setSwapping(false)
    }
  }

  if (tokensLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Icons.Loader size={48} className="animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600 text-lg">Loading tokens...</p>
      </div>
    )
  }

  if (tokensError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <div className="flex items-center mb-4">
            <Icons.AlertCircle size={24} className="text-red-600 mr-3" />
            <h3 className="text-lg font-medium text-red-800">
              Failed to load tokens
            </h3>
          </div>
          <p className="text-red-700 mb-4">{tokensError.message}</p>
        </div>
      </div>
    )
  }

  if (tokens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md w-full">
          <div className="flex items-center mb-4">
            <Icons.Info size={24} className="text-gray-600 mr-3" />
            <h3 className="text-lg font-medium text-gray-800">
              No tokens available
            </h3>
          </div>
          <p className="text-gray-700 mb-4">
            There are currently no tokens available for trading.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <TokenSelector
        value={fromToken}
        onChange={setFromToken}
        amount={fromAmount}
        onAmountChange={handleFromAmountChange}
        excludeToken={toToken}
        disabled={swapping}
        tokens={tokens}
      />

      <div className="flex justify-center my-6">
        <button
          onClick={handleSwapTokens}
          disabled={swapping || !fromToken || !toToken}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 p-4 rounded-full transition-all duration-200 hover:scale-110 disabled:scale-100 shadow-lg disabled:cursor-not-allowed"
          type="button"
          title="Swap tokens"
        >
          <Icons.ArrowUpDown className="text-white" size={24} />
        </button>
      </div>

      <TokenSelector
        value={toToken}
        onChange={setToToken}
        amount={toAmount}
        onAmountChange={handleToAmountChange}
        excludeToken={fromToken}
        disabled={swapping}
        tokens={tokens}
      />

      {(errors.amount || errors.tokens) && (
        <NotificationToast
          type="error"
          message={errors.amount || errors.tokens || ''}
          onClose={() => setErrors({})}
        />
      )}

      {notification && (
        <NotificationToast
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <button
        onClick={handleSwap}
        disabled={
          swapping || !fromAmount || !toAmount || !fromToken || !toToken
        }
        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-4 rounded-2xl transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg shadow-xl hover:shadow-2xl"
        type="button"
      >
        {swapping ? (
          <>
            <Icons.Loader size={24} className="animate-spin" />
            <span>Processing Swap...</span>
          </>
        ) : (
          <span>Swap Tokens</span>
        )}
      </button>
    </div>
  )
}

export default SwapForm
