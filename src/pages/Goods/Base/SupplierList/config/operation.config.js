import router from 'umi/router';

export default {
  items: [
    {
      component: 'Button',
      props: {
        type: 'primary',
        children: '新建商品',
        onClick: () => {
          router.push('/goods/create')
        },
      },
    },
  ]
};
