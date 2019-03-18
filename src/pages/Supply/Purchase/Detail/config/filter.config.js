export default (params) => {
  return {
    settings: {
      globalStatus: 'preview',
      values: {...params}
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
        label: '采购单号',
        name: 'purchaseNo',
        component: 'Input',
      },
      {
        label: '采购时间',
        name: 'createTime',
        component: 'Input',
      },
      {
        label: '期望入库时间',
        name: 'expectInboundTime',
        component: 'Input',
      },
      {
        label: '失效时间',
        name: 'loseEfficacyTime',
        component: 'Input',
      },
      {
        label: '仓库名称',
        name: 'warehouseName',
        component: 'Input',
      },
      {
        label: '供应商名称',
        name: 'supplierName',
        component: 'Input',
      },
      {
        label: '采购单来源',
        name: 'source',
        component: 'Input',
      },
      {
        label: '采购单状态',
        name: 'status',
        component: 'Input',
      },
    ],
    buttons: []
  };
}
