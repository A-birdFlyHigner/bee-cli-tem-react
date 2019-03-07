import React from 'react'
import { LeDialog, LeForm } from '@lib/lepage'
import * as Sty from '../index.less'

const setBranchList = (err, values, formCore, listCore) => {
  LeDialog.show(
    {
      title: '批量排期',
      width: '500px',
      content () {
        return <LeForm {...dialogFormConfig()} />
      },
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
              <div className={Sty.dialogMb}>已批量选中88个商品，确定批量排期？</div>
            </div>
          )
        },
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
        children: '批量排期',
        onClick: setBranchList
      }
    }
  ]
}
