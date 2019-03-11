import React from 'react'
import { LeDialog, LeForm } from '@lib/lepage'
import { message } from 'antd'
import { dialogFormSetTimeConfig } from '../../../common/commonConfig'
import { addOrUpdate } from '@/services/goods'

// 批量排期
const setBranchList = (err, values, formCore, listCore) => {
  const productIdList = listCore.getSelectedRowKeys()
  const count = productIdList.length

  if (!count) {
    message.warning('请至少勾选一项！')
    return
  }

  LeDialog.show(
    {
      title: '批量排期',
      width: '500px',
      content () {
        return <LeForm {...dialogFormSetTimeConfig(count)} />
      },
      onOk: (value, suc) => {
        const { startTime, endTime } = value.scheduleTime

        addOrUpdate({ startTime, endTime, productIdList }).then(res => {
          if (!res) return
          // 关闭弹窗
          suc()
        })

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
