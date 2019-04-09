export default {
  rowKey: 'id',
  scroll: { x: 1200 },
  columns: [
    {
      title: '小区Id',
      dataIndex: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: '小区名称',
      dataIndex: 'name',
      width: 240,
    },
    {
      title: '城市',
      dataIndex: 'cityName',
      width: 420,
      render(value, record) {
        const { provinceName, cityName, districtName } = record
        return `${provinceName}-${cityName}-${districtName}`
      }
    },
    {
      title: '提货点地址',
      dataIndex: 'receiveAddress',
      width: 230,
    },
    {
      title: '小区长捕手Id',
      dataIndex: 'managerGsId',
      width: 100,
      align: 'center',
    },
    {
      title: '小区长姓名',
      dataIndex: 'managerName',
      width: 200
    },
    {
      title: '小区长手机号',
      dataIndex: 'managerPhoneNumber',
      width: 200,
      align: 'center',
    },
    {
      title: '本地配送',
      dataIndex: 'enableLocalDelivery',
      width: 200,
      align: 'center',
      render: (value) => {
        return value === 1 ? '启用' : '停用'
      }
    },
  ]
};
