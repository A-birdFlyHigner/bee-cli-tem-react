import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(data) {
  return request('/api/user/user', {
    method: 'POST',
    body: data
  });
}