import SearchSelect from '@/components/Rules/SearchSelect'
import {getVillageEmunList} from '@/services/supply'

export default {
  settings: {
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
      label: '送货时间',
      name: 'expectOutboundTime',
      component: 'DatePicker',
      props: {
        placeholder: '请选择送货时间',
      },
    },
    {
      label: '仓库名称',
      name: 'warehouseCode',
      component: 'Select',
      props: {
        allowClear: true,
        placeholder: '请选择采购订单状态',
        options: [],
      },
    },
    SearchSelect({
      label: '小区名称',
      name: 'communityId',
      paramName: 'communityName',
      placeholder: '请输入小区名称',
      requestService: getVillageEmunList
    },),
    {
      label: '小区长电话',
      name: 'consigneeMobile',
      component: 'Input',
      props: {
        placeholder: '请输入小区长电话',
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
