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

// 停启用小区本地配送
export async function localDeliveryOnOff (params) {
  return request(`${domain}/localDelivery/onOff`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}