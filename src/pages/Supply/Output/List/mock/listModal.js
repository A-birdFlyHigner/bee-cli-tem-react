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
        SKU_No: '@natural(5)',
        inputNumber: '@natural(5，200)',
        inputTime: moment()
          .subtract(10, 'days')
          .calendar(),
        goodsName: '@name(5)',
        SKU_Name: '@cname(5)',
        inputSurvey: '@name(5)',
        imgUrl: '@name(5)',
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
