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
        outputNo: '@natural(5)',
        upperNo: '@natural(5)',
        outputTime: moment()
          .subtract(10, 'days')
          .calendar(),
        warehouseName: '@name(5)',
        receiver: '@cname(5)',
        outputSurvey: '@name(5)',
        operator: '@name(5)',
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
