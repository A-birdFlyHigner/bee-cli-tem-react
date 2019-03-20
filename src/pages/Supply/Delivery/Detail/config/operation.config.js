export default {
  settings: {},
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
          onChange: (value) => {
            console.log('leForm', leForm)
            leForm.setValue('differStatus', value);
            leForm.$instance.$leList.setParams({
              differStatus: value ? 1 : 0
            });
            leForm.$instance.$leList.fetch();
          }
        }
      }
    },
  ],
  buttons: []
}
