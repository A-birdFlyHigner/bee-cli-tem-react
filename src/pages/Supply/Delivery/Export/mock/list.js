import Mock from 'mockjs';
import moment from 'moment';
// import moment from 'moment'

export default queryParams => {
  const { pageSize, currentPage } = queryParams;
  const index = pageSize * (currentPage - 1);

  // 使用 Mock
  const data = Mock.mock({
    'dataList|20': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'key|+1': index,
        deliveryNo: '@natural(5)',
        deliveryDate: moment()
          .subtract(10, 'days')
          .calendar(),
        warehouseName: '@name(5)',
        deliveryType: '@name(5)',
        villageCount: '@natural(1)',
        orderRange: '@cname(5)',
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
