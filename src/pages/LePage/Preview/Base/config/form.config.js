export default {
  settings: {
    globalStatus: 'preview',
  },

  form: {
    layout: {
      label: 'w120',
    },
  },

  items: [
    {
      label: '姓名',
      name: 'name',
      value: '书航',
    },
    {
      label: '手机号',
      name: 'phone',
      value: '13858868899',
    },
    {
      label: '证件类型',
      name: 'type',
      value: '身份证',
    },
    {
      label: '证件号码',
      name: 'typeNumber',
      value: '330327199008669966',
    },
    {
      label: '城市',
      name: 'city',
      value: '杭州',
    },
    {
      label: '详细信息',
      name: 'detail',
      render(values, leForm) {
        return `姓名:${values.name} - 城市:${values.city}`;
      },
    },
  ],
};
