import { useEffect, useState } from 'react';
import { Card, DatePicker, Input, Select, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { listTasks } from '../../api/review';
import type { ReviewTask, ReviewStatus } from '../../types/review';

const { RangePicker } = DatePicker;

export default function ReviewHistoryPage() {
  const statusText: Record<ReviewStatus, string> = { pending: '待审', approved: '通过', rejected: '拒绝', ignored: '忽略' };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ReviewTask[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<{ reviewer?: string; status?: ReviewStatus; range?: [dayjs.Dayjs, dayjs.Dayjs] }>({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await listTasks({
        status: filters.status,
        start: filters.range?.[0]?.valueOf(),
        end: filters.range?.[1]?.valueOf(),
        page,
        pageSize,
      });
      const list = res.list.filter((i) => i.status !== 'pending').filter((i) => !filters.reviewer || i.reviewer?.includes(filters.reviewer!));
      setData(list);
      setTotal(res.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [filters, page, pageSize]);

  const columns: ColumnsType<ReviewTask> = [
    { title: 'ID', dataIndex: 'id', width: 80 },
    { title: '标题', dataIndex: 'title' },
    { title: '审核人', dataIndex: 'reviewer', width: 120 },
    { title: '结果', dataIndex: 'status', width: 100, render: (s) => statusText[s as ReviewStatus] },
    { title: '时间', dataIndex: 'createdAt', width: 180, render: (v) => dayjs(v).format('YYYY-MM-DD HH:mm') },
  ];

  return (
    <Card
      title="历史记录"
      extra={
        <Space>
          <Input placeholder="审核人" allowClear style={{ width: 140 }} value={filters.reviewer} onChange={(e) => setFilters((f) => ({ ...f, reviewer: e.target.value }))} />
          <Select
            placeholder="结果"
            allowClear
            style={{ width: 120 }}
            options={[{ value: 'approved', label: '通过' }, { value: 'rejected', label: '拒绝' }]}
            value={filters.status}
            onChange={(v) => { setPage(1); setFilters((f) => ({ ...f, status: v as ReviewStatus | undefined })); }}
          />
          <RangePicker value={filters.range as any} onChange={(v) => { setPage(1); setFilters((f) => ({ ...f, range: v as any })); }} showTime />
        </Space>
      }
    >
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={{ current: page, pageSize, total, onChange: (p, ps) => { setPage(p); setPageSize(ps); } }}
      />
    </Card>
  );
}


