import React from 'react'
import { LeDialog, LeForm } from '@lib/lepage'
import { message } from 'antd'
import * as Sty from '../index.less'

const dialogFormConfig = (count) => {

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
        render: () => {
          return(
            <div>
              <div className={Sty.dialogMb}>已批量选中{count}个商品，确定对商品进行以下操作？</div>
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
          placeholder: '请输入拒绝原因，不超过20字',
          maxLength: 20,
        },
        // when true false 控制隐藏显示此组件
        when: (val) => {
          return val.chooseType === 1
        }
      }
    ],
  }
}

const setBranchList = (err, values, formCore, listCore) => {
  const productIds = listCore.getSelectedRowKeys()
  const count = productIds.length

  if (!count) {
    message.warning('请至少勾选一项！')
    return
  }

  LeDialog.show(
    {
      title: '批量操作',
      width: '600px',
      content () {
        return <LeForm {...dialogFormConfig(count)} />
      },
      onOk: (suc) => {
        suc()
      }
    }
  )
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
