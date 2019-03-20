export default () => {
  return (leForm) => {
    return {
      settings: {},
      form: {
        inline: false,
        layout: {
          label: 'w120',
          columns: 3,
        },
      },
      items: [
        {
          label: '仅查看差异产品',
          name: 'differStatus',
          component: 'Checkbox',
          props: {
            onChange: (value) => {
              leForm.operationCore.setValue('differStatus', value);
              leForm.filterCore.setValue('differStatus', value ? 1 : 0);
              leForm.fetch();
            }
          }
        },
      ],
      buttons: []
    }
  }
}
