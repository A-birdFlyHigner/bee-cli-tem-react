import { LeDialog } from '@lib/lepage';
import { message } from 'antd';
import { localDeliveryOnOff } from '@/services/supply/branch';

const fetchDialog = (idList, type, leList) => {
  const label = type === 1 ? '启用' : '停用'
  LeDialog.show({
    title: label,
    width: 400,
    content: `已选${idList.length}个小区，是否确认${label}`,
    onOk: (value, suc) => {
      localDeliveryOnOff({
        communityIdList: idList,
        enableLocalDelivery: type
      }).then(res => {
        if (!res) return
        leList.refresh()
        suc()
        message.success(`所选小区${label}本地配送成功`)
      })
    }
  })
}

const batchOnList = async (err, val, leForm, {leList}) => {
  const idList = leList.getSelectedRowKeys()
  if (!idList.length) {
    return message.warning('请选择已停用本地配送的小区')
  }
  const dataSource = leList.getDataSource()
  const disItem = dataSource.find(item => {
    return idList.indexOf(item.id) > -1 && item.enableLocalDelivery !== 0
  })
  if (disItem) {
    return message.warning('请选择已停用本地配送的小区')
  }
  fetchDialog(idList, 1, leList)
  return false
}

const batchOffList = async (err, val, leForm, {leList}) => {
  const idList = leList.getSelectedRowKeys()
  if (!idList.length) {
    return message.warning('请选择已启用本地配送的小区')
  }
  const dataSource = leList.getDataSource()
  const disItem = dataSource.find(item => {
    return idList.indexOf(item.id) > -1 && item.enableLocalDelivery !== 1
  })
  if (disItem) {
    return message.warning('请选择已启用本地配送的小区')
  }
  fetchDialog(idList, 0, leList)
  return false
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
        children: '启用本地配送',
        onClick: batchOnList
      }
    },
    {
      inline: true,
      props: {
        type: 'primary',
        children: '停用本地配送',
        onClick: batchOffList
      }
    }
  ]
}