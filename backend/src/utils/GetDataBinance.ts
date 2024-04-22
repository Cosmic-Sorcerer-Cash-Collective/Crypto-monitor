import axios from 'axios'
import { type dataBinance } from './types'

export class GetDataBinance {
  async getInfoPair (pair: string, interval: string, limit: number): Promise<dataBinance[]> {
    const klinesResponse = await axios.get('https://api.binance.com/api/v3/klines', {
      params: {
        symbol: pair,
        interval,
        limit
      }
    })
    return klinesResponse.data.map((kline: any): dataBinance => ({
      open_time: kline[0],
      open: kline[1],
      high: kline[2],
      low: kline[3],
      close: kline[4],
      volume: kline[5],
      close_time: kline[6],
      quote_volume: kline[7],
      count: kline[8],
      taker_buy_volume: kline[9],
      taker_buy_quote_volume: kline[10],
      ignore: kline[11]
    }))
  }

  async GetMarketExchangeInfo (asset: string): Promise<any> {
    const exchangeInfoResponse = await axios.get('https://api.binance.com/api/v3/exchangeInfo')
    const filteredSymbols = exchangeInfoResponse.data.symbols.filter(
      (symbol: any) => symbol.quoteAsset === asset
    )
    return filteredSymbols.map((symbol: any) => symbol.symbol)
  }
}
