import request from '@/utils/request';
import { stringify } from 'qs'

const domain = '/api';

// 城市管理查询列表
export async function queryCityManager(params) {
  return request(`${domain}/city/manager/query`, {
    method: 'POST',
    body: params,
  });
}

// 获取分公司名称
export async function queryBranchName(params) {

  const data = {
    companyName: params.partnerCompanyId,
    companyType: 1
  }

  return request(`${domain}/common/companyListByName`, {
    method: 'POST',
    body: data,
  });
}
