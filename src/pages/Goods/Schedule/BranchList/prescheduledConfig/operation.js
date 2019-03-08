import React from 'react'
import { LeDialog, LeForm } from '@lib/lepage'
import { Select } from 'antd'
import { dialogFormJoinGroupConfig } from '../../common/commonConfig.js'
import { message } from 'antd'
import * as Sty from '../index.less'

const Option = Select.Option

const batchBackList = (err, values, formCore, listCore) => {
  const productIds = listCore.getSelectedRowKeys()
  const count = productIds.length

  if (!count) {
    message.warning('请至少勾选一项！')
    return
  }

  LeDialog.show(
    {
      title: '批量回退',
      width: '500px',
      content () {
        return <LeForm {...dialogFormConfig(count,'批量回退')} />
      },
      onOk: (values, suc, core) => {
        suc()
      }
    }
  )
}

const batchScheduleList = (err, values, formCore, listCore) => {
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
        return <LeForm {...dialogFormConfig(count,'批量排期')} />
      },
      onOk: (values, suc, core) => {
        suc()
      }
    }
  )
}

const joinGroup = (err, values, formCore, listCore) => {
  const productIds = listCore.getSelectedRowKeys()
  const count = productIds.length

  if (!count) {
    message.warning('请至少勾选一项！')
    return
  }

  LeDialog.show(
    {
      title: '加入分组',
      width: '500px',
      content () {
        return <LeForm {...dialogFormJoinGroupConfig(count,'加入分组')} />
      },
      onOk: (values, suc, core) => {
        suc()
      }
    }
  )
}

const dialogFormConfig =  (number, text) => {
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
              <div className={Sty.dialogMb}>已批量选中{number}个商品，确定批量{text}？</div>                                  
            </div>
          )
        },
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
        children: '批量回退',
        onClick: batchBackList
      }
    },
    {
      inline: true,
      props: {
        type: 'primary',
        children: '批量排期',
        onClick: batchScheduleList
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

  ],
}
