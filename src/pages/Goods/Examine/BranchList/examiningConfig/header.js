import React from 'react'
import { LeDialog } from '@lib/lepage'
import * as Sty from '../index.less'

const setBranchList = (err, values, formCore, listCore) => {
  LeDialog.show(
    dialogFormConfig(), 
    {
      title: '批量拒绝',
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
        label: '已选中88个商品,请输入拒绝原因',
        name: 'rejectReason',
        component: 'Input',
        follow: false,
        className: Sty.rejectReason,
        props:{
          placeholder: '请输入拒绝原因，不超过20字',
          maxLength: 20,
        }
      },
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
        children: '批量拒绝',
        onClick: setBranchList
      }
    }
  ]
}
