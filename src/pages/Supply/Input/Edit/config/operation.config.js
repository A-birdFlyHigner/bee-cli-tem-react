import moment from 'moment';

export default {
  settings: {
    initValues: {},
  },
  form: {
    inline: false,
    layout: {
      label: 'w120',
      columns: 3,
    },
  },
  items: [
    {
      label: '仓库名称',
      name: 'warehouseName',
      component: 'Input',
      props: {
        placeholder: '请输入仓库名称',
      },
    },
    {
      label: '供应商名称',
      name: 'supplierName',
      component: 'Input',
      props: {
        placeholder: '请输入供应商名称',
      },
    },
    {
      label: '期望入库时间',
      name: 'expectInputTime',
      component: 'DatePicker',
      value: moment('2019-01-30 12:00:00'),
      props: {
        placeholder: '请选择期望入库时间',
      },
    },
    {
      label: '失效时间',
      name: 'invalidTime',
      component: 'DatePicker',
      value: moment('2019-01-30 12:00:00'),
      props: {
        placeholder: '请选择失效时间',
      },
    },
  ],
  buttons: []
};
