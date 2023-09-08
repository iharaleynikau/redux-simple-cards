import { FC, useState } from 'react'
import type { CardColor } from '../../types'
import type { RadioChangeEvent } from 'antd'
import { Form, Modal, Input, notification, Radio } from 'antd'
import { apiCreateCard, apiUpdateCard } from '../../api'
import { useDispatch } from 'react-redux'
import { addCard, updateCard } from '../../store/actions'
import uniqueid from 'uniqid'

interface Props {
  closeModal: () => any
  isModalShown: boolean
  id?: string
  balance?: string
  number?: string
  color?: CardColor
}

interface CardFormData {
  number: string
  balance: number
  color: CardColor
}

export const CardModal: FC<Props> = ({
  closeModal,
  isModalShown,
  id,
  balance,
  number,
  color,
}) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [checkedRadio, setCheckedRadio] = useState(color ? color : 'cyan')

  const onFinish = () => {
    const formData = form.getFieldsValue() as CardFormData

    const uniqueId: string = uniqueid()

    const data = {
      number: formData.number,
      balance: `${formData.balance}`,
      color: checkedRadio,
      id: id ? id : uniqueId,
    }

    if (id) {
      apiUpdateCard(id, data).then(() => {
        dispatch(updateCard(data.id, data))
        notification.success({
          message: 'Карта успешно обновлена',
        })

        closeModal()
      })
    } else {
      apiCreateCard(data, uniqueId).then(() => {
        dispatch(addCard(data))
        notification.success({
          message: 'Карта успешно создана',
        })
        form.resetFields()
        setCheckedRadio('cyan')
        closeModal()
      })
    }
  }

  const onSubmit = () => {
    form.submit()
  }

  const onCancel = () => {
    form.resetFields()
    closeModal()
  }

  const plainOptions = ['cyan', 'red', 'purple']

  const handleRadioChange = ({ target: { value } }: RadioChangeEvent) => {
    setCheckedRadio(value)
  }

  return (
    <Modal
      title={id ? 'Редактирование карты' : 'Новая карта'}
      open={isModalShown}
      onCancel={onCancel}
      onOk={onSubmit}
      okText="Сохранить"
      cancelText="Отменить"
      closable
    >
      <Form
        form={form}
        name="basic"
        layout="vertical"
        style={{ maxWidth: 600, marginTop: 30 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Цвет карты:"
          rules={[{ required: true, message: 'Введите номер карты' }]}
        >
          <Radio.Group
            onChange={handleRadioChange}
            options={plainOptions}
            value={checkedRadio}
            optionType="button"
            buttonStyle="solid"
          ></Radio.Group>
        </Form.Item>
        <Form.Item
          label="Номер карты:"
          name="number"
          rules={[{ required: true, message: 'Введите номер карты' }]}
          initialValue={number}
        >
          <Input type="text" maxLength={19} placeholder="xxxx xxxx xxxx xxxx" />
        </Form.Item>
        <Form.Item
          label="Текущий баланс ₽:"
          name="balance"
          initialValue={balance}
          rules={[{ required: true, message: 'Введите текущий баланс' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
