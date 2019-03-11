import React from 'react'
import { message } from 'antd'
import { LeDialog, LeForm } from '@lib/lepage'
import * as Sty from '../index.less'
import { dialogFormJoinGroupConfig } from '../../../common/commonConfig'

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
        render: () => {
          return(
            <div className={Sty.dialogMb}>已批量选中{count}个商品，确定批量回退？</div>
          )
        },
      },
    ],
  }
}

// 批量回退
const setBranchList = (err, values, formCore, listCore) => {
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
      onOk: ( suc ) => {
        suc()
      }
    }
  )
}

// 加入分组
const joinGroup = (err, values, formCore, listCore) => {
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
        return <LeForm {...dialogFormJoinGroupConfig(count,'加入分组')} />
      },
      onOk: (suc ) => {
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
    },
    {
      inline: true,
      props: {
        type: 'primary',
        children: '加入分组',
        onClick: joinGroup
      }
    }
  ]
}