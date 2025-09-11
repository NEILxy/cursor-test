import { useEffect, useState } from 'react';
import { Card, Descriptions, Tag, Space, Button, Modal, Input, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, approveTask, rejectTask } from '../../api/review';
import type { ReviewTask } from '../../types/review';
import dayjs from 'dayjs';
import { useAuthStore } from '../../store/auth';

export default function ReviewDetailPage() {
  const { id = '' } = useParams();
  const [task, setTask] = useState<ReviewTask | undefined>();
  const [reason, setReason] = useState('');
  const [open, setOpen] = useState<false | 'approve' | 'reject'>(false);
  const navigate = useNavigate();
  const { username } = useAuthStore();

  useEffect(() => {
    (async () => setTask(await getTask(id)))();
  }, [id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'a') setOpen('approve');
      if (e.key.toLowerCase() === 'd') setOpen('reject');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const doApprove = async () => {
    await approveTask(id, username || '', reason || '同意');
    message.success('已通过');
    navigate(-1);
  };
  const doReject = async () => {
    await rejectTask(id, username || '', reason || '不合规');
    message.success('已拒绝');
    navigate(-1);
  };

  if (!task) return <Card loading />;

  return (
    <Card title={`任务详情 #${task.id}`} extra={<Space><span>快捷键：A 通过 / D 拒绝</span></Space>}>
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="标题">{task.title}</Descriptions.Item>
        <Descriptions.Item label="内容">{task.content}</Descriptions.Item>
        <Descriptions.Item label="来源">{task.source}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{dayjs(task.createdAt).format('YYYY-MM-DD HH:mm')}</Descriptions.Item>
        <Descriptions.Item label="风险标签">{task.riskTags?.map((t) => <Tag key={t}>{t}</Tag>)}</Descriptions.Item>
        <Descriptions.Item label="状态">{{ pending: '待审', approved: '通过', rejected: '拒绝', ignored: '忽略' }[task.status]}</Descriptions.Item>
      </Descriptions>
      <Space style={{ marginTop: 12 }}>
        <Button type="primary" onClick={() => setOpen('approve')}>通过</Button>
        <Button danger onClick={() => setOpen('reject')}>拒绝</Button>
        <Button onClick={() => navigate(-1)}>返回</Button>
      </Space>

      <Modal
        title={open === 'approve' ? '通过 - 备注' : '拒绝 - 理由'}
        open={!!open}
        onOk={open === 'approve' ? doApprove : doReject}
        onCancel={() => setOpen(false)}
      >
        <Input.TextArea rows={4} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="可填写理由或备注" />
      </Modal>
    </Card>
  );
}


