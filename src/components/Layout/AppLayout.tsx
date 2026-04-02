import { Layout, Menu, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, DashboardOutlined, UnorderedListOutlined, HistoryOutlined, RobotOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../../store/settings';
import { useAuthStore } from '../../store/auth';

const { Header, Sider, Content } = Layout;

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { collapsed, setCollapsed } = useSettingsStore();
  const { username, isGuest, logout } = useAuthStore();

  // 根据用户角色定义菜单项
  const allItems = [
    { key: '/', icon: <DashboardOutlined />, label: '仪表盘' },
    { key: '/review/queue', icon: <UnorderedListOutlined />, label: '审核队列' },
    { key: '/review/ai-review', icon: <RobotOutlined />, label: 'AI 对话审核' },
    { key: '/review/history', icon: <HistoryOutlined />, label: '历史记录' },
    { key: '/about', icon: <InfoCircleOutlined />, label: '系统介绍' },
  ];

  // 游客只能看到系统介绍菜单
  const items = isGuest 
    ? allItems.filter(item => item.key === '/about')
    : allItems;

  // 添加点击事件
  const itemsWithClick = items.map(item => ({
    ...item,
    onClick: () => navigate(item.key),
  }));

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
          items={itemsWithClick}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button type="text" onClick={() => setCollapsed(!collapsed)} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
          <div>
            <span style={{ marginRight: 12 }}>
              {isGuest ? '游客模式' : `您好，${username}`}
            </span>
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
