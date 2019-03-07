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
        purchasing: moment()
          .subtract(10, 'days')
          .calendar(),
        warehouse: '@ctitle(5,10)仓',
        supplier: '@cname(5)供应',
        status: '未入库',
        origin: '系统生成',
        confirm: '已确认',
      },
    ],
  });

  return {
    dataList: data.dataList,
    total: 400,
    totalPage: 400 / pageSize,
    pageSize,
    currentPage
  }
}
