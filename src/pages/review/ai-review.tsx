import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Table,
  Space,
  Tag,
  Pagination,
  message,
} from 'antd';
import { SearchOutlined, ReloadOutlined, EyeOutlined, CheckOutlined, FlagOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { AIReviewRecord, AIReviewQuery, ReviewStatus } from '../../types/review';
// import dayjs from 'dayjs';

// const { RangePicker } = DatePicker;
const { Option } = Select;

// 模拟数据
const mockData: AIReviewRecord[] = [
  {
    sourceId: '68be73ac3544af183a31a0c0',
    userId: '78496',
    reviewId: '49391',
    status: 'approved',
    reason: '内容符合规范,无敏感信息',
    reviewTime: '2024-01-15 14:30:25',
    createdAt: '2024-01-15 14:20:15',
    updatedAt: '2024-01-15 14:30:25',
  },
  {
    sourceId: '89cf21b04655bf294b42b7d1',
    userId: '47467',
    reviewId: '49392',
    status: 'rejected',
    reason: '包含不当色情内容',
    reviewTime: '2024-01-15 13:45:12',
    createdAt: '2024-01-15 13:22:08',
    updatedAt: '2024-01-15 13:45:12',
  },
  {
    sourceId: '72ac38cf5766cg385c53c2e2',
    userId: '10489',
    reviewId: '49393',
    status: 'ignored',
    reason: '内容无实质性问题',
    reviewTime: '2024-01-15 12:30:45',
    createdAt: '2024-01-15 12:15:30',
    updatedAt: '2024-01-15 12:30:45',
  },
  {
    sourceId: '93bd49de6877dh496d64d3f3',
    userId: '32658',
    reviewId: '49394',
    status: 'pending',
    reason: '-',
    reviewTime: '-',
    createdAt: '2024-01-15 11:08:20',
    updatedAt: '2024-01-15 11:08:20',
  },
  {
    sourceId: '54ce5aef7988ei5a7e75e4g4',
    userId: '59123',
    reviewId: '49395',
    status: 'rejected',
    reason: '传播不实信息,涉嫌虚假谣言',
    reviewTime: '2024-01-15 10:45:30',
    createdAt: '2024-01-15 10:30:15',
    updatedAt: '2024-01-15 10:45:30',
  },
  {
    sourceId: '65df6bfg8a99fj6b8f86f5h5',
    userId: '78234',
    reviewId: '49396',
    status: 'approved',
    reason: '内容健康,符合规范',
    reviewTime: '2024-01-15 09:50:18',
    createdAt: '2024-01-15 09:30:10',
    updatedAt: '2024-01-15 09:50:18',
  },
  {
    sourceId: '76eg7cgh9b00gk7c9g971616',
    userId: '47561',
    reviewId: '49397',
    status: 'pending',
    reason: '-',
    reviewTime: '-',
    createdAt: '2024-01-15 08:20:05',
    updatedAt: '2024-01-15 08:20:05',
  },
];

const statusOptions = [
  { label: '全部', value: 'all' },
  { label: '待处理', value: 'pending' },
  { label: '已通过', value: 'approved' },
  { label: '已拒绝', value: 'rejected' },
  { label: '忽略', value: 'ignored' },
];

const getStatusColor = (status: ReviewStatus) => {
  switch (status) {
    case 'approved':
      return 'green';
    case 'rejected':
      return 'red';
    case 'ignored':
      return 'default';
    case 'pending':
      return 'orange';
    default:
      return 'default';
  }
};

const getStatusText = (status: ReviewStatus) => {
  switch (status) {
    case 'approved':
      return '已通过';
    case 'rejected':
      return '已拒绝';
    case 'ignored':
      return '忽略';
    case 'pending':
      return '待处理';
    default:
      return status;
  }
};

const AIReviewPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AIReviewRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 加载数据
  const loadData = async (query: AIReviewQuery = {}) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredData = [...mockData];
      
      // 应用筛选条件
      if (query.sourceId) {
        filteredData = filteredData.filter(item => 
          item.sourceId.includes(query.sourceId!)
        );
      }
      if (query.userId) {
        filteredData = filteredData.filter(item => 
          item.userId.includes(query.userId!)
        );
      }
      if (query.reviewId) {
        filteredData = filteredData.filter(item => 
          item.reviewId.includes(query.reviewId!)
        );
      }
      if (query.status && query.status !== 'all') {
        filteredData = filteredData.filter(item => 
          item.status === query.status
        );
      }
      
      setTotal(filteredData.length);
      setData(filteredData);
    } catch (error) {
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 搜索
  const handleSearch = () => {
    const values = form.getFieldsValue();
    const query: AIReviewQuery = {
      ...values,
      page: 1,
      pageSize,
    };
    setCurrentPage(1);
    loadData(query);
  };

  // 重置
  const handleReset = () => {
    form.resetFields();
    setCurrentPage(1);
    loadData();
  };

  // 分页变化
  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) {
      setPageSize(size);
    }
    const values = form.getFieldsValue();
    loadData({
      ...values,
      page,
      pageSize: size || pageSize,
    });
  };

  // 操作处理
  const handleView = (record: AIReviewRecord) => {
    message.info(`查看记录: ${record.reviewId}`);
  };

  const handleReview = (record: AIReviewRecord) => {
    message.info(`审核记录: ${record.reviewId}`);
  };

  const handleMark = (record: AIReviewRecord) => {
    message.info(`标记记录: ${record.reviewId}`);
  };

  const columns: ColumnsType<AIReviewRecord> = [
    {
      title: '溯源ID',
      dataIndex: 'sourceId',
      key: 'sourceId',
      width: 200,
      ellipsis: true,
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 100,
    },
    {
      title: '审核ID',
      dataIndex: 'reviewId',
      key: 'reviewId',
      width: 100,
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: ReviewStatus) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: '审核原因',
      dataIndex: 'reason',
      key: 'reason',
      width: 200,
      ellipsis: true,
    },
    {
      title: '审核时间',
      dataIndex: 'reviewTime',
      key: 'reviewTime',
      width: 150,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="link" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            查看
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={<CheckOutlined />}
            onClick={() => handleReview(record)}
          >
            审核
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={<FlagOutlined />}
            onClick={() => handleMark(record)}
          >
            标记
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card title="AI对话审核" style={{ marginBottom: 16 }}>
        <Form
          form={form}
          layout="inline"
          style={{ marginBottom: 16 }}
        >
          <Form.Item label="溯源ID" name="sourceId">
            <Input placeholder="输入溯源ID" style={{ width: 200 }} />
          </Form.Item>
          
          <Form.Item label="用户ID" name="userId">
            <Input placeholder="输入用户ID" style={{ width: 200 }} />
          </Form.Item>
          
          <Form.Item label="审核ID" name="reviewId">
            <Input placeholder="输入审核ID" style={{ width: 200 }} />
          </Form.Item>
          
          <Form.Item label="审核状态" name="status" initialValue="all">
            <Select style={{ width: 120 }}>
              {statusOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item label="开始时间" name="startTime">
            <DatePicker 
              placeholder="年/月/日" 
              style={{ width: 150 }}
              format="YYYY/MM/DD"
            />
          </Form.Item>
          
          <Form.Item label="结束时间" name="endTime">
            <DatePicker 
              placeholder="年/月/日" 
              style={{ width: 150 }}
              format="YYYY/MM/DD"
            />
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                icon={<SearchOutlined />}
                onClick={handleSearch}
              >
                搜索
              </Button>
              <Button 
                icon={<ReloadOutlined />}
                onClick={handleReset}
              >
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="reviewId"
          pagination={false}
          scroll={{ x: 1200 }}
        />

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Pagination
            current={currentPage}
            total={total}
            pageSize={pageSize}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) => 
              `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
            }
            onChange={handlePageChange}
            onShowSizeChange={handlePageChange}
          />
        </div>
      </Card>
    </div>
  );
};

export default AIReviewPage;
