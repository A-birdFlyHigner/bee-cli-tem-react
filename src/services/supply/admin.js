import request from '@/utils/request';

const domain = '/api';

// 获取本地配送小区列表
export async function getLocalDeliveryList (params) {
  return request(`${domain}/localDelivery/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}