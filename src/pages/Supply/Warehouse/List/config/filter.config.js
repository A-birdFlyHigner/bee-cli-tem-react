import SearchSelect from '@/components/Rules/SearchSelect'
import {getSupplierEmunList} from '@/services/supply'

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
      label: '仓库名称',
      name: 'warehouseCode',
      component: 'Select',
      props: {
        allowClear: true,
        placeholder: '请选择仓库名称',
      },
    },
    SearchSelect({
      label: '供应商名称',
      name: 'supplierCode',
      paramName: 'supplierName',
      placeholder: '请输入供应商名称',
      requestService: getSupplierEmunList
    },),
    {
      label: '商品ID',
      name: 'itemCode',
      component: 'Input',
      props: {
        placeholder: '请输入商品ID',
      },
    },
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
        onClick(err, values, formCore, listCore) {},
      },
      options: {
        type: 'submit',
        validate: true, // default true
      },
    },
    {
      props: {
        children: '重置',
        onClick(err, values, formCore, listCore) {},
      },
      options: {
        type: 'reset',
      },
    },
  ],
};
