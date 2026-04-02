import { Card, Typography, Space, Divider } from 'antd';
import { 
  DashboardOutlined, 
  UnorderedListOutlined, 
  RobotOutlined, 
  HistoryOutlined,
  CheckCircleOutlined,
  TeamOutlined 
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Card title="系统介绍">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={4}>欢迎使用人工审核管理后台</Title>
            <Paragraph>
              本系统是一个功能完善的内容审核管理平台，旨在帮助审核团队高效地管理和处理各类审核任务。
              系统采用现代化的技术架构，提供友好的用户界面和流畅的操作体验。
            </Paragraph>
          </div>

          <Divider />

          <div>
            <Title level={4}>核心功能</Title>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <DashboardOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                <div>
                  <strong>仪表盘</strong>
                  <Paragraph style={{ marginBottom: 0 }}>
                    展示审核任务的实时数据统计，包括待审核数量、已完成数量、通过率等关键指标，
                    帮助管理员快速了解整体审核情况。
                  </Paragraph>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <UnorderedListOutlined style={{ fontSize: 24, color: '#52c41a' }} />
                <div>
                  <strong>审核队列</strong>
                  <Paragraph style={{ marginBottom: 0 }}>
                    集中管理所有待审核的内容，支持列表展示、筛选排序等功能。
                    审核员可以按优先级处理任务，确保重要内容得到及时处理。
                  </Paragraph>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <RobotOutlined style={{ fontSize: 24, color: '#722ed1' }} />
                <div>
                  <strong>AI 对话审核</strong>
                  <Paragraph style={{ marginBottom: 0 }}>
                    结合 AI 技术辅助人工审核，提供智能分析和建议。
                    AI 会对内容进行初步评估，标记可能违规的内容，提高审核效率。
                  </Paragraph>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <HistoryOutlined style={{ fontSize: 24, color: '#faad14' }} />
                <div>
                  <strong>历史记录</strong>
                  <Paragraph style={{ marginBottom: 0 }}>
                    完整记录所有审核操作的历史数据，支持按时间、审核员、状态等条件查询。
                    便于后续追溯和数据分析。
                  </Paragraph>
                </div>
              </div>
            </Space>
          </div>

          <Divider />

          <div>
            <Title level={4}>用户角色</Title>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <CheckCircleOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />
                <div>
                  <strong>管理员 (admin)</strong>
                  <Paragraph style={{ marginBottom: 0 }}>
                    拥有系统的完整权限，包括审核管理、用户管理、系统配置等功能。
                    可以查看和管理所有审核任务，分配工作任务给其他审核员。
                  </Paragraph>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <TeamOutlined style={{ fontSize: 24, color: '#13c2c2' }} />
                <div>
                  <strong>审核员 (reviewer)</strong>
                  <Paragraph style={{ marginBottom: 0 }}>
                    主要负责处理具体的审核任务，查看和审核分配给自己的内容。
                    可以查看个人审核历史和统计数据。
                  </Paragraph>
                </div>
              </div>
            </Space>
          </div>

          <Divider />

          <div>
            <Title level={4}>技术栈</Title>
            <Paragraph>
              本系统采用现代化的前端技术栈构建，包括 React 19、TypeScript、Vite、
              Ant Design、Zustand 和 React Router 等主流框架和库，
              确保了系统的稳定性、可维护性和良好的用户体验。
            </Paragraph>
          </div>
        </Space>
      </Card>
    </div>
  );
}
