
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
        label: '配送单号',
        name: 'deliveryNo',
        component: 'Input',
      },
      {
        label: '配送日期',
        name: 'createTime',
        component: 'Input',
      },
      {
        label: '仓库名称',
        name: 'warehouseName',
        component: 'Input',
      },
      {
        label: '配送单类型',
        name: 'deliveryType',
        component: 'Input',
      },
      {
        label: '小区名称',
        name: 'communityName',
        component: 'Input',
      },
      {
        label: '小区长',
        name: 'consigneeName',
        component: 'Input',
      },
      {
        label: '小区长电话',
        name: 'consigneeMobile',
        component: 'Input',
      },
      {
        label: '小区长地址',
        name: 'communityAddress',
        component: 'Input',
      },
    ],
    buttons: []
  };
}
