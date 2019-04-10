import regUtils from '@/utils/reg'
import cityRule from '@/components/Rules/branchcitySel/index'

export default {
  settings: {
    initValues: {},
    autoValidate: true,
  },
  form: {
    inline: true,
    layout: {
      label: 'w120',
    },
  },

  items: [
    cityRule({
      label: '区域选择',
      value: [],
      deep: 1,
    }),
    {
      label: '小区名称',
      name: 'communityName',
      props: {
        placeholder: '请输入小区名称',
      },
    },
    {
      label: '小区Id',
      name: 'communityId',
      props: {
        placeholder: '请输入小区Id',
      },
      rules: {
        pattern: regUtils.Number,
        message: '小区Id,请输入数字'
      }
    },
    {
      label: '本地配送',
      name: 'enableLocalDelivery',
      component: 'Select',
      props: {
        placeholder: '请选择本地配送状态',
        options: [{
          label: '启用',
          value: 1
        }, {
          label: '停用',
          value: 0
        }]
      }
    }
  ],

  buttons: [
    {
      props: {
        type: 'primary',
        children: '查询',
      },
      options: {
        type: 'submit',
        validateAfter (err) {
          return err === null
        }
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
