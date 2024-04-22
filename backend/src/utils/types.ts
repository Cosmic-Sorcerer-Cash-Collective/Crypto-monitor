export interface configDatabase {
  host: string
  port: number
  user: string
  password: string
  database: string
}

export interface dataBinance {
  open_time: number
  open: string
  high: string
  low: string
  close: string
  volume: string
  close_time: number
  quote_volume: string
  count: number
  taker_buy_volume: string
  taker_buy_quote_volume: string
  ignore: string
}

export interface typeFibonacci {
  upper: number[]
  lower: number[]
}
