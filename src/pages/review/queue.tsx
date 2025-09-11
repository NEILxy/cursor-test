import { useEffect, useState } from 'react';
import { Button, Card, DatePicker, Select, Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { listTasks, approveTask, rejectTask } from '../../api/review';
import type { ReviewTask, ReviewStatus } from '../../types/review';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

const { RangePicker } = DatePicker;

export default function ReviewQueuePage() {
  const statusText: Record<ReviewStatus, string> = { pending: '待审', approved: '通过', rejected: '拒绝' };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ReviewTask[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filters, setFilters] = useState<{ status?: ReviewStatus; source?: ReviewTask['source']; range?: [dayjs.Dayjs, dayjs.Dayjs] }>(() => ({}));
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { username } = useAuthStore();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await listTasks({
        status: filters.status,
        source: filters.source,
        start: filters.range?.[0]?.valueOf(),
        end: filters.range?.[1]?.valueOf(),
        page,
        pageSize,
      });
      setData(res.list);
      setTotal(res.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [filters, page, pageSize]);

  const columns: ColumnsType<ReviewTask> = [
    { title: 'ID', dataIndex: 'id', width: 80 },
    { title: '标题', dataIndex: 'title' },
    { title: '来源', dataIndex: 'source', width: 100 },
    { title: '创建时间', dataIndex: 'createdAt', width: 180, render: (v) => dayjs(v).format('YYYY-MM-DD HH:mm') },
    { title: '风险标签', dataIndex: 'riskTags', render: (tags?: string[]) => tags?.map((t) => <Tag key={t}>{t}</Tag>) },
    { title: '状态', dataIndex: 'status', width: 100, render: (s) => statusText[s as ReviewStatus] },
    {
      title: '操作',
      width: 220,
      render: (_, row) => (
        <Space>
          <Button size="small" onClick={() => navigate(`/review/detail/${row.id}`)}>详情</Button>
          <Button size="small" type="primary" onClick={async () => { await approveTask(row.id, username || ''); message.success('已通过'); fetchData(); }}>通过</Button>
          <Button size="small" danger onClick={async () => { await rejectTask(row.id, username || '', '批量/单条操作'); message.success('已拒绝'); fetchData(); }}>拒绝</Button>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  const batchApprove = async () => {
    await Promise.all(selectedRowKeys.map((id) => approveTask(String(id), username || '')));
    message.success('批量通过完成');
    setSelectedRowKeys([]);
    fetchData();
  };
  const batchReject = async () => {
    await Promise.all(selectedRowKeys.map((id) => rejectTask(String(id), username || '', '批量拒绝')));
    message.success('批量拒绝完成');
    setSelectedRowKeys([]);
    fetchData();
  };

  return (
    <Card
      title="审核队列"
      extra={
        <Space>
          <Select
            placeholder="状态"
            allowClear
            style={{ width: 120 }}
            options={[{ value: 'pending', label: '待审' }, { value: 'approved', label: '通过' }, { value: 'rejected', label: '拒绝' }]}
            value={filters.status}
            onChange={(v) => { setPage(1); setFilters((f) => ({ ...f, status: v as ReviewStatus | undefined })); }}
          />
          <Select
            placeholder="来源"
            allowClear
            style={{ width: 120 }}
            options={[{ value: 'web', label: 'web' }, { value: 'app', label: 'app' }]}
            value={filters.source}
            onChange={(v) => { setPage(1); setFilters((f) => ({ ...f, source: v as any })); }}
          />
          <RangePicker
            value={filters.range as any}
            onChange={(v) => { setPage(1); setFilters((f) => ({ ...f, range: v as any })); }}
            showTime
          />
          <Button onClick={fetchData}>刷新</Button>
          <Button type="primary" disabled={!selectedRowKeys.length} onClick={batchApprove}>批量通过</Button>
          <Button danger disabled={!selectedRowKeys.length} onClick={batchReject}>批量拒绝</Button>
        </Space>
      }
    >
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        pagination={{ current: page, pageSize, total, showSizeChanger: true, onChange: (p, ps) => { setPage(p); setPageSize(ps); } }}
      />
    </Card>
  );
}


