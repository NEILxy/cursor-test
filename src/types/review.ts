export type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'ignored';

export interface ReviewTask {
  id: string;
  title: string;
  content: string;
  source: 'web' | 'app' | 'api' | 'other';
  createdAt: number; // timestamp
  status: ReviewStatus;
  riskTags?: string[];
  reviewer?: string; // username
}

// AI对话审核相关类型
export interface AIReviewRecord {
  sourceId: string; // 溯源ID
  userId: string; // 用户ID
  reviewId: string; // 审核ID
  status: ReviewStatus; // 审核状态
  reason?: string; // 审核原因
  reviewTime?: string; // 审核时间
  createdAt: string; // 创建时间
  updatedAt: string; // 更新时间
}

export interface AIReviewQuery {
  sourceId?: string;
  userId?: string;
  reviewId?: string;
  status?: ReviewStatus | 'all';
  startTime?: string;
  endTime?: string;
  page?: number;
  pageSize?: number;
}

export interface ReviewListQuery {
  status?: ReviewStatus;
  start?: number;
  end?: number;
  source?: ReviewTask['source'];
  page?: number;
  pageSize?: number;
}

export interface ReviewListResponse {
  total: number;
  list: ReviewTask[];
}

export interface ReviewResult {
  id: string;
  result: 'approved' | 'rejected';
  reason?: string;
  reviewer: string;
  reviewedAt: number;
}


