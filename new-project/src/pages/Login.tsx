import { Form, Input, Button, Card, message } from 'antd'
import { useAuthStore } from '../store/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const login = useAuthStore((s) => s.login)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate('/')
  }

  const onFinish = (values: { username: string; password: string }) => {
    if (values.username && values.password) {
      login('mock-token')
      message.success('登录成功')
      navigate('/')
    } else {
      message.error('请输入用户名和密码')
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card title="登录" style={{ width: 360 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="admin" />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder="123456" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}


