import Mock from 'mockjs';
import moment from 'moment';

export default queryParams => {
  const { pageSize, currentPage } = queryParams;
  const index = pageSize * (currentPage - 1);

  // 使用 Mock
  const data = Mock.mock({
    'dataList|20': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'key|+1': index,
        goodsId: '@name(5)',
        goodsInfo: '@cname(5)',
        SKU_No: '@natural(5)',
        supplierName: '@cname(5)',
        totalInventory: '@natural(1,10)',
        goodAbleInventory: '@natural(1,10)',
        goodLockedInventory: '@natural(1,10)',
        badAbleInventory: '@natural(1,10)',
        badLockedInventory: '@natural(1,10)',
        outputTime: moment()
          .subtract(10, 'days')
          .calendar(),
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
