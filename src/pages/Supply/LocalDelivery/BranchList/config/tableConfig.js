import React from 'react';
import { message } from 'antd';
import { LeDialog } from '@lib/lepage';
import { localDeliveryOnOff } from '@/services/supply/branch';

const updateItem = (record, leList) => {
  const { enableLocalDelivery, id } = record
  const label = enableLocalDelivery === 1 ? '停用' : '启用'
  LeDialog.show({
    title: label,
    width: 400,
    maskClosable: true,
    content: `是否确认${label}该小区？`,
    onOk: (val, suc) => {
      localDeliveryOnOff({
        communityIdList: [id],
        enableLocalDelivery: enableLocalDelivery === 1 ? 0 : 1
      }).then(res => {
        if (!res) return
        message.success(`小区${label}本地配送成功`)
        leList.refresh()
        suc()
      })
    }
  })
}

export default {
  rowKey: 'id',
  scroll: { x: 1300 },
  rowSelection: {
    selections: true,
    getCheckboxProps() {
      return {};
    },
  },
  columns: [
    {
      title: '小区Id',
      dataIndex: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: '小区名称',
      dataIndex: 'name',
      width: 240,
    },
    {
      title: '城市',
      dataIndex: 'cityName',
      width: 420,
      render(value, record) {
        const { provinceName, cityName, districtName } = record
        return `${provinceName}-${cityName}-${districtName}`
      }
    },
    {
      title: '提货点地址',
      dataIndex: 'receiveAddress',
      width: 230,
    },
    {
      title: '小区长捕手Id',
      dataIndex: 'managerGsId',
      width: 100,
      align: 'center',
    },
    {
      title: '小区长姓名',
      dataIndex: 'managerName',
      width: 200
    },
    {
      title: '小区长手机号',
      dataIndex: 'managerPhoneNumber',
      width: 200,
      align: 'center',
    },
    {
      title: '本地配送',
      dataIndex: 'enableLocalDelivery',
      width: 320,
      align: 'center',
      render: (value) => {
        return value === 1 ? '启用' : '停用'
      }
    },
    {
      title: '操作',
      width: 100,
      align: 'center',
      fixed: 'right',
      render: (text, record, index, { leList }) => {
        const { enableLocalDelivery } = record
        return (
          <div className="operateBtn-container-inline">
            <a onClick={() => updateItem(record, leList)}>{enableLocalDelivery === 1 ? '停用' : '启用'}</a>
          </div>
        );
      },
    },
  ]
};
