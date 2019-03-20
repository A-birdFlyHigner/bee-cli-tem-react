export default {
  settings: {
    // globalStatus: 'preview',
    initValues: {
      differStatus: 0,
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
    (leForm) => {
      return {
        label: '仅查看差异产品',
        name: 'differStatus',
        component: 'Checkbox',
        props: {
          placeholder: '请输入仓库名称',
          onChange: (value) => {
            console.log('leForm', leForm)
            leForm.setValue('differStatus', value);
            leForm.$instance.$leList.setParams({
              differStatus: value ? 1 : 0
            });
            leForm.$instance.$leList.fetch();
          }
        },
      }
    },
  ],
  buttons: [],
};
