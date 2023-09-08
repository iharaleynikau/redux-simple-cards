import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'
import { CardsAPI } from './types'

export const initializeAPI = () => {
  initializeApp({
    apiKey: 'AIzaSyAXfpdSn7VkmFKXE6x6jkuPZcK66crgmOA',
    authDomain: 'simple-cards-ed144.firebaseapp.com',
    projectId: 'simple-cards-ed144',
    storageBucket: 'simple-cards-ed144.appspot.com',
    messagingSenderId: '868081075640',
    appId: '1:868081075640:web:14610e93c40b1496ecfb4d',
  })

  getFirestore()
}

const cardsCollection = 'cards'

export const apiGetCards = async () => {
  const dataBase = getFirestore()
  const querySnapshot = await getDocs(collection(dataBase, cardsCollection))
  const cards: CardsAPI[] = []

  querySnapshot.forEach((doc) => {
    return cards.push({
      id: doc.id,
      ...(doc.data() as Omit<CardsAPI, 'id'>),
    })
  })

  return cards
}

export const apiGetCard = async (id: CardsAPI['id']) => {
  const dataBase = getFirestore()

  try {
    const querySnapshot = await getDoc(doc(dataBase, cardsCollection, id))

    if (querySnapshot.exists()) {
      const data = querySnapshot.data()

      return {
        id: querySnapshot.id,
        ...data,
      }
    }
  } catch (error) {
    console.log(error)
  }

  return null
}

export const apiCreateCard = async (data: CardsAPI, id: CardsAPI['id']) => {
  const dataBase = getFirestore()
  const docRef = doc(dataBase, cardsCollection, id)

  try {
    await setDoc(docRef, data)
  } catch (error) {
    console.log(error)
  }
}

export const apiUpdateCard = async (id: CardsAPI['id'], data: CardsAPI) => {
  const dataBase = getFirestore()

  try {
    await updateDoc(doc(dataBase, cardsCollection, id), { ...data })
    const updatedDoc = apiGetCard(id)

    if (doc !== null) {
      return updatedDoc
    }
  } catch (error) {
    console.log(error)
  }

  return null
}

export const apiDeleteCard = async (id: CardsAPI['id']) => {
  const dataBase = getFirestore()

  try {
    await deleteDoc(doc(dataBase, cardsCollection, id))
  } catch (error) {
    console.log(error)
  }
}
