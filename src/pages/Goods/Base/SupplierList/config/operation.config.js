import router from 'umi/router';

export default {
  items: [
    {
      component: 'Button',
      props: {
        type: 'primary',
        children: '新增商品',
        onClick: () => {
          router.push('/goods/publish')
        },
      },
    },
  ]
};
