export type CardColor = 'cyan' | 'red' | 'purple'

export interface CardsAPI {
  id: string
  number: string
  balance: string
  color: CardColor
}
