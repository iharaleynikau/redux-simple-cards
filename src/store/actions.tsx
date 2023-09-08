import { ADD_CARD, DELETE_CARD, UPDATE_CARD, SET_CARDS } from './types'
import { CardsAPI } from '../types'

export const addCard = (card: CardsAPI) => ({ type: ADD_CARD, payload: card })

export const updateCard = (id: CardsAPI['id'], newCard: CardsAPI) => ({
  type: UPDATE_CARD,
  payload: {
    id,
    newCard,
  },
})

export const deleteCard = (id: CardsAPI['id']) => ({
  type: DELETE_CARD,
  payload: id,
})

export const setCards = (cards: CardsAPI[]) => ({
  type: SET_CARDS,
  payload: cards,
})
