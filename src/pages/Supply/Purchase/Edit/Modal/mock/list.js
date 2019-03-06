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
        SKU_No: '@number(5)',
        // 'SKU_No': moment().subtract(10, 'days').calendar(),
        imgUrl: '@name(10)',
        goodsName: '@ctitle(5,10)',
        SKU_name: '@cname(5)',
        status: '@name(10)',
        costPrice: '@number(10)',
        PurchaseQuantity: '@name(10)',
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
