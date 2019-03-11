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
              <div className={Sty.dialogMb}>已批量选中{count}个商品，确定批量排期？</div>
            </div>
          )
        },
      },
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
      title: '批量排期',
      width: '500px',
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
        children: '批量排期',
        onClick: setBranchList
      }
    }
  ]
}
