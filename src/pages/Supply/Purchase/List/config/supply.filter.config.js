import { purchaseState, supplierState } from '@/pages/Supply/common/constants';

export default {
  settings: {
    initValues: {
      status: 99,
      source: 99,
      supplierConfirmStatus: 99,
    },
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
      label: '期望入库时间',
      name: 'expectInboundTime',
      component: 'DatePicker',
      props: {
        placeholder: '请选择采购时间',
      },
    },
    {
      label: '供应商确认状态',
      name: 'supplierConfirmStatus',
      component: 'Select',
      props: {
        allowClear: true,
        placeholder: '请选择供应商确认状态',
        options: supplierState,
      },
    },
    {
      label: '采购单状态',
      name: 'status',
      component: 'Select',
      props: {
        allowClear: true,
        placeholder: '请选择采购订单状态',
        options: [
          {
            label: '入库完成',
            value: 1,
          },
          {
            label: '未入库',
            value: 2,
          },
          {
            label: '部分入库',
            value: 3,
          },
          {
            label: '全部',
            value: 99,
          },
        ],
      },
    },
    {
      label: '是否关联销售订单',
      name: 'referSellOrderCount',
      component: 'Select',
      props: {
        allowClear: true,
        placeholder: '请选择是否关联销售订单',
        options: [
          {
            label: '不关联销售订单',
            value: 0,
          },
          {
            label: '关联销售订单',
            value: 1,
          },
          {
            label: '全部',
            value: 99,
          },
        ],
      },
    },
  ],

  buttons: [
    {
      props: {
        type: 'primary',
        children: '查询',
        onClick(err, values, formCore, listCore) {},
      },
      options: {
        type: 'submit',
        validate: true, // default true
      },
    },
    {
      props: {
        children: '重置',
        onClick(err, values, formCore, listCore) {},
      },
      options: {
        type: 'reset',
      },
    },
  ],
};
