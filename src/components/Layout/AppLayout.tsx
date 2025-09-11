import { Layout, Menu, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, DashboardOutlined, UnorderedListOutlined, HistoryOutlined, RobotOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../../store/settings';
import { useAuthStore } from '../../store/auth';

const { Header, Sider, Content } = Layout;

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { collapsed, setCollapsed } = useSettingsStore();
  const { role, username, logout } = useAuthStore();

  const items = [
    { key: '/', icon: <DashboardOutlined />, label: '仪表盘', onClick: () => navigate('/') },
    { key: '/review/queue', icon: <UnorderedListOutlined />, label: '审核队列', onClick: () => navigate('/review/queue') },
    { key: '/review/ai-review', icon: <RobotOutlined />, label: 'AI对话审核', onClick: () => navigate('/review/ai-review') },
    { key: '/review/history', icon: <HistoryOutlined />, label: '历史记录', onClick: () => navigate('/review/history') },
  ];

  const allowedKeys = role === 'admin' ? items.map((i) => i.key) : items.map((i) => i.key); // 这里可扩展按角色控制

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(v) => setCollapsed(v)}>
        <div style={{ height: 48, margin: 16, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          审核后台
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items.filter((i) => allowedKeys.includes(i.key))}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button type="text" onClick={() => setCollapsed(!collapsed)} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
          <div>
            <span style={{ marginRight: 12 }}>您好，{username}</span>
            <Button onClick={() => { logout(); navigate('/login'); }}>退出登录</Button>
          </div>
        </Header>
        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}


