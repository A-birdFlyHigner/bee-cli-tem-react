import regUtils from '@/utils/reg'
import { getCompanyBranch } from '@/services/common'

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
    (leForm) => {
      getCompanyBranch().then(res => {
        if (!res || !res.length) return
        leForm.setProps('branchId', {
          options: res.map(item => {
            return {
              label: item.name,
              value: item.id
            }
          })
        })
      })
      return {
        label: '分公司',
        name: 'branchId',
        component: 'Select',
        props: {
          placeholder: '请选择分公司',
          showSearch: true,
          optionFilterProp: 'children',
          options: []
        }
      }
    },
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
