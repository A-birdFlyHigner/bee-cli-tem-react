import Reg from '@/utils/reg'
import cityRule from '@/components/Rules/citySel/index.js'
import timeRule from '@/components/Rules/timeSel/index.js'

export default {
  form: {
    inline: true, // 表单布局是否为行内样式
  },
  items: [ 
    cityRule({
      label: '城市',
      value: [],
      deep: 2,
    }),
    
  ],
  buttons: [{
    props: {
      type: 'primary',
      children: '查询',
      onClick(err, values, formCore, listCore) {}
    },
    options: {
      type: 'submit',
      validate: true, // default true
    }
  }, {
    props: {
      children: '重置',
      onClick(err, values, formCore, listCore) {}
    },
    options: {
      type: 'reset',
    }
  }]
}