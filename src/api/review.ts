import dayjs from 'dayjs';
import type { ReviewListQuery, ReviewListResponse, ReviewResult, ReviewTask } from '../types/review';

// 本地 mock 数据
let MOCK_TASKS: ReviewTask[] = Array.from({ length: 57 }).map((_, idx) => {
  const statusPool: ReviewTask['status'][] = ['pending', 'approved', 'rejected'];
  const status = idx % 3 === 0 ? 'pending' : statusPool[(idx % statusPool.length)] as ReviewTask['status'];
  return {
    id: String(idx + 1),
    title: `内容标题 #${idx + 1}`,
    content: `这是一段需要人工审核的文本内容，编号 ${idx + 1}`,
    source: idx % 2 === 0 ? 'web' : 'app',
    createdAt: dayjs().subtract(idx, 'hour').valueOf(),
    status,
    riskTags: idx % 4 === 0 ? ['广告'] : idx % 5 === 0 ? ['涉政'] : ['正常'],
    reviewer: status === 'pending' ? undefined : idx % 2 === 0 ? 'alice' : 'bob',
  } as ReviewTask;
});

function delay<T>(data: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function listTasks(query: ReviewListQuery): Promise<ReviewListResponse> {
  const { status, start, end, source, page = 1, pageSize = 10 } = query;
  let filtered = [...MOCK_TASKS];
  if (status) filtered = filtered.filter((t) => t.status === status);
  if (source) filtered = filtered.filter((t) => t.source === source);
  if (start) filtered = filtered.filter((t) => t.createdAt >= start);
  if (end) filtered = filtered.filter((t) => t.createdAt <= end);
  const total = filtered.length;
  const startIdx = (page - 1) * pageSize;
  const list = filtered.slice(startIdx, startIdx + pageSize);
  return delay({ total, list });
}

export async function getTask(id: string): Promise<ReviewTask | undefined> {
  const task = MOCK_TASKS.find((t) => t.id === id);
  return delay(task);
}

export async function approveTask(id: string, reviewer: string, reason?: string): Promise<ReviewResult> {
  const task = MOCK_TASKS.find((t) => t.id === id);
  if (task) {
    task.status = 'approved';
    task.reviewer = reviewer;
  }
  return delay({ id, result: 'approved', reviewer, reviewedAt: Date.now(), reason });
}

export async function rejectTask(id: string, reviewer: string, reason?: string): Promise<ReviewResult> {
  const task = MOCK_TASKS.find((t) => t.id === id);
  if (task) {
    task.status = 'rejected';
    task.reviewer = reviewer;
  }
  return delay({ id, result: 'rejected', reviewer, reviewedAt: Date.now(), reason });
}


