export interface Token {
  currency: string
  price: number
  date: string
}

export interface SwapData {
  fromToken: Token
  toToken: Token
  fromAmount: string
  toAmount: string
}

export interface SwapResult {
  success: boolean
  transactionId: string
  fromAmount: string
  toAmount: string
  fromToken: Token
  toToken: Token
  timestamp: string
}

export interface ValidationErrors {
  amount?: string
  tokens?: string
}
