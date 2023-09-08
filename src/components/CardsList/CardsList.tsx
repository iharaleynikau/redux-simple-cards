import { useState, useEffect, FC } from 'react'
import { Button, Space, Spin } from 'antd'
import { getCards } from '../../store/selectors'
import { setCards } from '../../store/actions'
import { CardModal } from '../CardModal/CardModal'
import { useSelector, useDispatch } from 'react-redux'
import { apiGetCards } from '../../api'
import { PlusOutlined } from '@ant-design/icons'
import { CardItem } from '../CardItem/CardItem'
import { CardsAPI } from '../../types'

export const CardsList: FC = () => {
  const dispatch = useDispatch()
  const cards = useSelector(getCards)
  const [isModalShown, setIsModalShown] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    apiGetCards()
      .then((cardsList) => {
        dispatch(setCards(cardsList))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [dispatch])

  return (
    <>
      <Space size={[20, 16]} wrap>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          cards.map((card: CardsAPI) => {
            return (
              <CardItem
                key={card.id}
                id={card.id}
                number={card.number}
                balance={card.balance}
                color={card.color}
              />
            )
          })
        )}

        <Button
          type="primary"
          onClick={() => setIsModalShown(true)}
          shape="circle"
        >
          <PlusOutlined />
        </Button>
      </Space>
      <CardModal
        isModalShown={isModalShown}
        closeModal={() => setIsModalShown(false)}
      />
    </>
  )
}
