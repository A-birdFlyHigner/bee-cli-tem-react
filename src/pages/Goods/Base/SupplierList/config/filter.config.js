export default {
    core: {
        initValues: {},
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
            label: '类目',
            name: 'categoryId',
            component: 'Select',
            props: {
                placeholder: '请选择类目',
            },
        },
        {
            label: '商品名称',
            name: 'name',
            props: {
                placeholder: '请输入商品名称',
            },
        },
        {
            label: '商品Id',
            name: 'productId',
            props: {
                placeholder: '请输入商品Id',
            },
        },
        {
            label: 'skuId',
            name: 'skuId',
            props: {
                placeholder: '请输入skuId',
            },
        },
    ],
  
    buttons: [
        {
            props: {
                type: 'primary',
                children: '查询',
            },
            options: {
                type: 'submit',
            },
        },
        {
            props: {
                children: '重置',
            },
            options: {
                type: 'reset',
            },
        },
    ],
  };
  