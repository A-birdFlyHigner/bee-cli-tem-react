import SearchSelect from '@/components/Rules/SearchSelect'
import {getSupplierEmunList} from '@/services/supply'

export default (params) => {
  return (leForm) => {
    return {
      settings: {
        initValues: {},
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
        {
          label: '仓库名称',
          name: 'warehouseCode',
          component: 'Select',
          props: {
            placeholder: '请选择仓库名称',
            options: [],
          },
        },
        SearchSelect({
          label: '供应商名称',
          name: 'supplierCode',
          placeholder: '请输入供应商名称',
          requestService: getSupplierEmunList
        },),
        {
          label: '期望入库时间',
          name: 'expectInboundTime',
          component: 'DatePicker',
          props: {
            placeholder: '请选择期望入库时间',
          },
        },
        {
          label: '失效时间',
          name: 'loseEfficacyTime',
          component: 'DatePicker',
          props: {
            placeholder: '请选择失效时间',
          },
        },
      ],
      buttons: []
    };
  }
}
