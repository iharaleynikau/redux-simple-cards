import './App.css'
import { CardItem } from '../CardItem/CardItem'
import { CardsList } from '../CardsList/CardsList'
import type { MenuProps } from 'antd'
import { CreditCardOutlined } from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'

const { Header, Content, Sider } = Layout

const items: MenuProps['items'] = [
  {
    key: 1,
    icon: <CreditCardOutlined />,
    label: <p>Ваши карты</p>,
  },
]

export const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <span className="logo-text">
          <CreditCardOutlined /> SIMPLE_CARDS
        </span>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <CardsList />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
