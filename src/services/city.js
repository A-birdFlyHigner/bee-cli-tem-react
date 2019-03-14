import request from '@/utils/request';
import { stringify } from 'qs'

const domain = '/api';

// 总部城市列表
export async function queryAdminCityManager(params) {
  return request(`${domain}/city/manager/query?${stringify(params)}`);
}

// 分公司城市列表 暂时用的总部后续接口出来更改掉
export async function queryBranchCityManager(params) {
  return request(`${domain}/city/manager/query?${stringify(params)}`);
}
