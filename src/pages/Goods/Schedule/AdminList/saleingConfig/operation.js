import React from 'react'
import { LeDialog, LeForm } from '@lib/lepage'
import { message } from 'antd'

import * as Sty from '../index.less'

const setBranchList = (err, values, formCore, listCore ) => {
  const productIds = listCore.getSelectedRowKeys()
  const count = productIds.length

  if (!count) {
    message.warning('请至少勾选一项！')
    return
  }

  LeDialog.show(
    {
      title: '批量回退',
      width: '400px',
      content () {
        return <LeForm {...dialogFormConfig(count)} />
      },
      onOk: (values, suc, core) => {
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
        children: '批量回退',
        onClick: setBranchList
      }
    }
  ]
}

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
        name: 'tags',
        render: (values, core) => {
          return(
            <div className={Sty.dialogMb}>已批量选中{count}个商品，确定批量回退？</div>
          )
        },
      },
    ],
  }
}