import { ADD_CARD, DELETE_CARD, UPDATE_CARD, SET_CARDS } from './types'
import { AnyAction } from 'redux'

const initialState = {
  cards: [],
}

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case ADD_CARD: {
      return {
        ...state,
        cards: [payload, ...state.cards],
      }
    }
    case DELETE_CARD: {
      return {
        ...state,
        cards: state.cards.filter((item: any) => {
          return item.id !== payload
        }),
      }
    }
    case SET_CARDS: {
      return {
        ...state,
        cards: payload,
      }
    }
    case UPDATE_CARD: {
      const id = payload.id
      const newCard = payload.newCard

      return {
        ...state,
        cards: state.cards.map((item: any) => {
          if (item.id === id) {
            return newCard
          }

          return item
        }),
      }
    }
    default: {
      return state
    }
  }
}
