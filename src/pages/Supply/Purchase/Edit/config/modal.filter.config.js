import categoryRule from '@/components/Rules/category'
import SearchSelect from '@/components/Rules/SearchSelect'
import {getGoodsEmunList} from '@/services/supply'

export default (params) => {
  return {
    settings: {
      values: params
    },

    form: {
      inline: false,
      layout: {
        label: 'w120',
        columns: 3,
      },
    },

    items: [
      categoryRule({
        label: '类目',
        name: 'categoryId',
        value: []
      }),
      SearchSelect({
        label: '商品名称',
        name: 'itemName',
        placeholder: '请输入供应商名称',
        requestService: getGoodsEmunList
      },),
      {
        label: 'SKU编码',
        name: 'skuCode',
        component: 'Input',
        props: {
          placeholder: '请输入SKU编码',
        },
      },
    ],

    buttons: [
      {
        props: {
          type: 'primary',
          children: '查询',
          onClick(err, values, formCore, listCore) {
          },
        },
        options: {
          type: 'submit',
          validate: true, // default true
        },
      },
      {
        props: {
          children: '重置',
          onClick(err, values, formCore, listCore) {
          },
        },
        options: {
          type: 'reset',
        },
      },
    ],
  };
}
