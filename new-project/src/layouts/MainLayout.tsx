import { Layout, Menu, theme } from 'antd'
import { BarChartOutlined, LineChartOutlined, PieChartOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

const { Header, Content, Sider } = Layout

const items = [
  { key: '/', icon: <HomeOutlined />, label: <Link to="/">首页</Link> },
  { key: '/charts/bar', icon: <BarChartOutlined />, label: <Link to="/charts/bar">柱状图</Link> },
  { key: '/charts/line', icon: <LineChartOutlined />, label: <Link to="/charts/line">折线图</Link> },
  { key: '/charts/pie', icon: <PieChartOutlined />, label: <Link to="/charts/pie">饼图</Link> },
]

export default function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ height: 32, margin: 16, color: '#fff' }}>数据大屏</div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={items} />
      </Sider>
      <Layout>
        <Header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', background: colorBgContainer }}>
          <span onClick={() => { logout(); navigate('/login') }} style={{ cursor: 'pointer', padding: '0 12px' }}>
            <LogoutOutlined /> 退出登录
          </span>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}


