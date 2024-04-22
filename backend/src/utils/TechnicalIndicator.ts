import { type macdIndicator } from '../cryptoData/api/domain'
import { type typeFibonacci, type dataBinance } from './types'

export class technicalIndicator {
  public calculateSMA (data: dataBinance[], period: number): number {
    const sum = data.reduce((acc: any, curr: dataBinance) => acc + parseFloat(curr.close), 0)
    return sum / period
  }

  private calculateEMA (values: number[], period: number): number {
    const smoothing = 2 / (period + 1)

    let ema = values.slice(0, period).reduce((acc, val) => acc + val, 0) / period

    for (let i = period; i < values.length; i++) {
      ema = (values[i] - ema) * smoothing + ema
    }

    return ema
  }

  public calculateMACD (data: dataBinance[], shortPeriod: number = 12, longPeriod: number = 26, signalPeriod: number = 9): macdIndicator {
    const prices = data.map((entry) => parseFloat(entry.close))

    const shortEMA = this.calculateEMA(prices, shortPeriod)
    const longEMA = this.calculateEMA(prices, longPeriod)

    const macdLine = this.calculateMACDLine([shortEMA], [longEMA])
    const signalLine = this.calculateSignalLine(macdLine, signalPeriod)
    const histogram = this.calculateHistogram(macdLine, signalLine)

    return {
      macd: macdLine.slice(-1)[0],
      signal: signalLine.slice(-1)[0],
      histogram: histogram.slice(-1)[0]
    }
  }

  private calculateMACDLine (shortEMA: number[], longEMA: number[]): number[] {
    return shortEMA.map((short, index) => short - longEMA[index])
  }

  private calculateSignalLine (macdLine: number[], signalPeriod: number): number[] {
    return [this.calculateEMA(macdLine, signalPeriod)]
  }

  private calculateHistogram (macdLine: number[], signalLine: number[]): number[] {
    return macdLine.map((macd, index) => macd - signalLine[index])
  }

  calculateRSI (data: dataBinance[], period: number): number {
    const prices = data.map((entry) => parseFloat(entry.close))

    let avgGain = 0
    let avgLoss = 0

    for (let i = 1; i < prices.length; i++) {
      const priceDiff = prices[i] - prices[i - 1]
      if (priceDiff >= 0) {
        avgGain = (avgGain * (period - 1) + priceDiff) / period
        avgLoss = (avgLoss * (period - 1)) / period
      } else {
        avgGain = (avgGain * (period - 1)) / period
        avgLoss = (avgLoss * (period - 1) - priceDiff) / period
      }
    }

    const relativeStrength = avgGain / avgLoss
    const rsi: number = 100 - (100 / (1 + relativeStrength))

    return rsi
  }

  public calculateRetracement (data: dataBinance[], period: number = 20, ratio: number = 0.236): typeFibonacci {
    return this.calculateFibonacci(data, period, ratio)
  }

  public calculateFan (data: dataBinance[], period: number = 20, ratio: number = 0.382): typeFibonacci {
    return this.calculateFibonacci(data, period, ratio)
  }

  public calculateExtension (data: dataBinance[], period: number = 20, ratio: number = 1.618): typeFibonacci {
    return this.calculateFibonacci(data, period, ratio)
  }

  private calculateFibonacci (data: dataBinance[], period: number, ratio: number): typeFibonacci {
    const prices = data.map(entry => parseFloat(entry.close))
    const max = Math.max(...prices.slice(-period))
    const min = Math.min(...prices.slice(-period))
    const diff = max - min
    const upper = max + (diff * ratio)
    const lower = min - (diff * ratio)
    return { upper: [upper], lower: [lower] }
  }
}
