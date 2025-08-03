import type { SwapData, SwapResult } from '../types'

export class ApiService {
  static async executeSwap(swapData: SwapData): Promise<SwapResult> {
    await new Promise((resolve) => setTimeout(resolve, 2500))

    return {
      success: true,
      transactionId: `tx_${Date.now()}`,
      fromAmount: swapData.fromAmount,
      toAmount: swapData.toAmount,
      fromToken: swapData.fromToken,
      toToken: swapData.toToken,
      timestamp: new Date().toISOString(),
    }
  }
}
