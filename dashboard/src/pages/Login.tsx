import { Form, Input, Button, Card, message } from 'antd'
import { useAuthStore } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {
  const [messageApi, contextHolder] = message.useMessage()
  const login = useAuthStore((s) => s.login)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    navigate('/')
  }

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true)
    try {
      await login(values)
      messageApi.success('登录成功')
      navigate('/')
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || '登录失败，请检查用户名和密码'
      messageApi.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {contextHolder}
      <Card title="登录" style={{ width: 360 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="admin" />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder="123456" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}


