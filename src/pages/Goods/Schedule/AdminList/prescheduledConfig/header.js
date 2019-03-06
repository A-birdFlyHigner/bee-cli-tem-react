import React from 'react'
import { LeDialog } from '@lib/lepage'
import * as Sty from '../index.less'

const setBranchList = (err, values, formCore, listCore) => {
  LeDialog.show(
    dialogFormConfig(), 
    {
      title: '批量操作',
      width: '600px',
      onOk: (values, suc, core) => {
        suc()
      }
    }
  )
}

const dialogFormConfig =  () => {

  return {
    form: {
      layout: { // 表单布局 左侧和右侧比例
        label: 0,
        control: 24
      }
    },
    items: [
      {
        label: '',
        name: 'text',
        render: (values, core) => {
          return(
            <div>
              <div className={Sty.dialogMb}>已批量选中88个商品，确定对商品进行以下操作？</div>
            </div>
          )
        },
      },
      {
        label: '',
        name: 'chooseType',
        component: 'RadioGroup',
        follow: true,
        props:{
          options:[
            {
              label:'通过',
              value:0,
            },
            {
              label:'拒绝',
              value:1,
            }
          ]
        }
      },
      {
        label:'',
        name: 'reason',
        component: 'Input',
        className: Sty.rejectReason,
        props:{
          placeholder: '请输入拒绝原因，不超过20字'
        },
        // when true false 控制隐藏显示此组件
        when: (val, core) => {
          return val.chooseType == 1
        }
      }
    ],
  }
}

export default {
  form: {
    inline: true,
  },
  buttons: [
    {
      inline: true,
      props: {
        type: 'primary',
        children: '批量操作',
        onClick: setBranchList
      }
    }
  ]
}
