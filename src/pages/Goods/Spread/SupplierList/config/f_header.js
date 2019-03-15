import router from 'umi/router';

export default {
  form: {
    inline: true,
  },
  buttons: [
    {
      component: 'Button',
      props: {
        type: 'primary',
        children: '新增商品',
        onClick: () => {
          router.push('/goods/create')
        },
      },
    },
  ],
};
