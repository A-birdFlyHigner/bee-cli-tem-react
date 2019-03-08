import request from '@/utils/request';

const domain = '/adminApi';

// 分公司城市列表
export async function queryBranchCityManager(params) {
  return request(`${domain}/city/manager/query`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

