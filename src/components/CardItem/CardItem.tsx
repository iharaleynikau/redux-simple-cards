import { FC, useState } from 'react'
import { CardsAPI } from '../../types'
import { useDispatch } from 'react-redux'
import { deleteCard } from '../../store/actions'
import { Statistic, Dropdown, Button, Modal, notification } from 'antd'
import { apiDeleteCard } from '../../api'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { CardModal } from '../CardModal/CardModal'
import './CardItem.css'

const getColor = (color: string): string => {
  switch (color) {
    case 'cyan':
      return '#34B9A3'

    case 'red':
      return '#ff4b4b'

    case 'purple':
      return '#7925C7'

    default:
      return '#34B9A3'
  }
}

export const CardItem: FC<CardsAPI> = ({ id, number, balance, color }) => {
  const [isModalShown, setIsModalShown] = useState(false)
  const dispatch = useDispatch()

  console.log(id)

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Удалить карту?',
      content: 'Отменить удаление будет невозможно',
      cancelText: 'Отменить',
      okText: 'Удалить',
      onOk() {
        apiDeleteCard(id).then(() => {
          dispatch(deleteCard(id))
        })
        notification.success({
          message: 'Карта успешно удалена',
        })
      },
    })
  }

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <Button onClick={() => setIsModalShown(true)}>
          <EditOutlined />
          Изменить
        </Button>
      ),
    },
    {
      key: 2,
      label: (
        <Button danger onClick={showDeleteConfirm}>
          <DeleteOutlined />
          Удалить
        </Button>
      ),
    },
  ]

  return (
    <>
      <div
        className="card-container"
        style={{ background: `${getColor(color)}` }}
      >
        <div className="card__header">
          <Statistic
            valueStyle={{ color: '#fff' }}
            value={balance}
            suffix="₽"
            groupSeparator=" "
          />
          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <Button shape="circle">
              <EditOutlined />
            </Button>
          </Dropdown>
        </div>
        <span style={{ fontSize: '16px' }}>{number}</span>
      </div>
      <CardModal
        isModalShown={isModalShown}
        closeModal={() => setIsModalShown(false)}
        id={id}
        number={number}
        balance={balance}
        color={color}
      />
    </>
  )
}
