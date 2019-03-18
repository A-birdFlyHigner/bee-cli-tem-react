import router from 'umi/router';

const onClickAdd = (err, values, LeForm, LeList) => {
  console.log('router', router)
  router.push('/supply/purchase/add');
};

export default {
  settings: {
    inline: true,
  },
  items: [
    {
      component: 'Button',
      props: {
        type: 'primary',
        children: '新增采购单',
        onClick: onClickAdd,
      },
    },
  ],
};
