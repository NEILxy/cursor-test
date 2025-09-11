import { Card, Statistic, Row, Col } from 'antd';
import { listTasks } from '../../api/review';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  useEffect(() => {
    (async () => {
      const all = await listTasks({ page: 1, pageSize: 1000 });
      const pending = all.list.filter((i) => i.status === 'pending').length;
      const approved = all.list.filter((i) => i.status === 'approved').length;
      const rejected = all.list.filter((i) => i.status === 'rejected').length;
      setStats({ total: all.total, pending, approved, rejected });
    })();
  }, []);

  return (
    <Row gutter={16}>
      <Col span={6}><Card><Statistic title="总任务" value={stats.total} /></Card></Col>
      <Col span={6}><Card><Statistic title="待审核" value={stats.pending} /></Card></Col>
      <Col span={6}><Card><Statistic title="已通过" value={stats.approved} /></Card></Col>
      <Col span={6}><Card><Statistic title="已拒绝" value={stats.rejected} /></Card></Col>
    </Row>
  );
}


