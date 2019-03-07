export default {
  settings: {
    globalStatus: 'edit',
  },

  form: {
    layout: {
      label: 'w120',
    },
  },

  items: [
    // {
    //   label: '姓名',
    //   name: 'name',
    // },
    // {
    //   label: '手机号',
    //   name: 'phone',
    // },
    // {
    //   label: '证件类型',
    //   name: 'type',
    // },
    // {
    //   label: '证件号码',
    //   name: 'typeNumber',
    // },
    // {
    //   label: '城市',
    //   name: 'city',
    // },
    {
      label: '详细信息',
      name: 'detail',
      component: 'Item',
      render (values, leForm) {
        return `姓名:${values.name} - 城市:${values.city}`;
      },
    },
  ],
};
