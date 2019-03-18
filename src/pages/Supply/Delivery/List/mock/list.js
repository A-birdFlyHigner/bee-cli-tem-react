import Mock from 'mockjs';
import moment from 'moment';

export default queryParams => {
  const { pageSize, currentPage } = queryParams;
  const index = pageSize * (currentPage - 1) + 1;

  // 使用 Mock
  const data = Mock.mock({
    'dataList|20': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'key|+1': index,
        purchaseNo: 'CG@natural(100000,500000)',
        purchaseTime: moment()
          .subtract(10, 'days')
          .calendar(),
        inputExpectTime: moment()
          .subtract(10, 'days')
          .calendar(),
        invalidTime: moment()
          .subtract(10, 'days')
          .calendar(),
        warehouse: '@ctitle(5,10)仓',
        supplier: '@cname(5)供应',
        supplySource: '@cname(5,10)',
        supplySurvey: '@cname(5,10)',
        confirmState: '@cname(5,10)',
        supplyState: '@cname(5,10)',
        sellerOrder: '@natural(100,500)',
        inputNo: '@cname(5,10)',
      },
    ],
  });

  return {
    dataList: data.dataList,
    total: 400,
    totalPage: 400 / pageSize,
    pageSize,
    currentPage,
  };
};
