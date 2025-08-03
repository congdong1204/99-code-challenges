import { useEffect, useRef, useState } from 'react'
import type { Token } from '../types'
import Icons from './Icons'
import { formatCurrency, getTokenSymbolUrl } from '../utils/helpers'

interface TokenSelectorProps {
  value?: Token
  onChange: (token: Token) => void
  amount: string
  onAmountChange: (value: string) => void
  excludeToken?: Token | null
  disabled?: boolean
  tokens: Token[]
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  value,
  onChange,
  amount,
  onAmountChange,
  excludeToken,
  disabled = false,
  tokens,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const availableTokens = tokens.filter(
    (t) => t.currency !== excludeToken?.currency
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleTokenSelect = (token: Token): void => {
    onChange(token)
    setIsOpen(false)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onAmountChange(e.target.value)
  }

  return (
    <div className="bg-gray-900 bg-opacity-50 rounded-2xl p-6 border border-gray-700 border-opacity-50 hover:border-blue-500 hover:border-opacity-30 transition-all duration-300">
      <div className="flex gap-4">
        <div className="relative flex-shrink-0" ref={dropdownRef}>
          <button
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            className="flex items-center gap-3 bg-gray-800 bg-opacity-50 rounded-xl px-4 py-3 border border-gray-600 border-opacity-50 hover:border-blue-500 hover:border-opacity-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-[180px]"
            type="button"
          >
            {value && (
              <img
                className="w-8 h-8 rounded-full flex-shrink-0"
                src={getTokenSymbolUrl(value.currency)}
                alt={value.currency}
              />
            )}
            <div className="text-left flex-1 min-w-0">
              <div className="text-white font-medium truncate">
                {value?.currency || 'Select Token'}
              </div>
              <div className="text-gray-400 text-xs truncate">
                {value?.currency || 'Choose a token'}
              </div>
            </div>
            <Icons.ChevronDown
              className={`text-gray-400 transition-transform flex-shrink-0 ${
                isOpen ? 'rotate-180' : ''
              }`}
              size={16}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-2 bg-gray-800 bg-opacity-95 backdrop-blur-sm rounded-xl border border-gray-600 border-opacity-50 shadow-2xl z-50 min-w-[200px] max-h-60 overflow-y-auto">
              {availableTokens.map((token: Token) => (
                <button
                  key={token.currency}
                  onClick={() => handleTokenSelect(token)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 hover:bg-opacity-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                  type="button"
                >
                  <img
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                    src={getTokenSymbolUrl(token.currency)}
                    alt={token.currency}
                  />
                  <div className="text-left flex-1">
                    <div className="text-white text-sm font-medium">
                      {token.currency}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {token.currency}
                    </div>
                  </div>
                  {token.price && (
                    <div className="text-gray-400 text-xs">
                      {formatCurrency(token.price)}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="0.00"
          disabled={disabled}
          className="flex-1 bg-transparent text-white text-2xl font-medium placeholder-gray-500 outline-none disabled:opacity-50 min-w-0 w-full"
          step="any"
          min="0"
        />
      </div>
    </div>
  )
}

export default TokenSelector
