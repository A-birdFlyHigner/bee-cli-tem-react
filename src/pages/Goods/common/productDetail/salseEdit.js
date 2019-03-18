import React from 'react'
import { Input, Table } from 'antd'
import Sty from './index.less'
import Reg from '@/utils/reg'

const RegGross = /^-?(([1-9]\d*)|0)?(\.\d{0,2})?$/

const inputItems = [{
  title: '市场价（划掉价）',
  dataIndex: 'marketPrice',
}, {
  title: '非会员价',
  dataIndex: 'nonmemberPrice'
}, {
  title: '会员价',
  dataIndex: 'memberPrice'
}, {
  title: '成本价',
  dataIndex: 'costPrice',
  disabled: true,
}, {
  title: '毛利',
  dataIndex: 'grossProfit'
}]

const tabelColumns = (core, preview) => {

  const onInputChange = (val, index, name) => {
    if (val !== '' && !(name === 'grossProfit' ? RegGross : Reg.Price).test(val)) return
    if (Number(val) > 100000000) return
    const saleUnits = JSON.parse(JSON.stringify(core.getValue('saleUnits')))
    saleUnits[index][name] = val
    core.setValue('saleUnits', saleUnits)
  }
  
  return [{
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: 80,
    render: (text) => {
      return ['停售', '可售'][text]
    }
  }, {
    title: 'sku组合',
    dataIndex: 'propertyPairList',
    align: 'center',
    width: 180,
    render: (val) => {
      const list = val.map(p => p.pvName)
      return <span>{list.join('-') || '默认'}</span>
    }
  }, {
    title: 'sku编码（发货编码）',
    dataIndex: 'deliverCode',
    align: 'center',
    width: 150,
  }, 
  ...inputItems.map(item => {
    return {
      title: item.title,
      dataIndex: item.dataIndex,
      width: item.width || 180,
      align: 'center',
      render: (text, row, index) => {
        return preview ? text : (
          <Input 
            value={text} 
            disabled={item.disabled}
            className={Sty.inputCenter}  
            onChange={e => onInputChange(e.target.value, index, item.dataIndex)} 
          />
        )
      }
    }
  }),
  {
    title: '限购数量',
    dataIndex: 'restriction',
    align: 'center',
    width: 120,
  }, {
    title: '库存',
    dataIndex: 'spreadStock',
    align: 'center',
    width: 100,
  }, {
    title: '会员价佣金',
    dataIndex: 'memeberCommission',
    align: 'center',
    width: 120,
  }, {
    title: '非会员价佣金',
    dataIndex: 'noMemeberCommission',
    align: 'center',
    width: 150,
  }]
}

// preview为true则仅展示数据
export default function (preview) {
  return (leForm) => {

    const onBatchChange = (val, dataIndex) => {
      if (val !== '' && !(dataIndex === 'grossProfit' ? RegGross : Reg.Price).test(val)) return
      if (Number(val) > 100000000) return
      const saleUnits = leForm.getValue('saleUnits').map(p => {
        return {
          ...p,
          [dataIndex]: val
        }
      })
      leForm.setValues({
        [`batch${dataIndex}`]: val,
        saleUnits
      })
    }
    const batchItem = preview ? [] : inputItems.map((item) => {
      return {
        label: item.title,
        name: `batch${item.dataIndex}`,
        inline: true,
        component: 'Input',
        status: item.disabled ? 'disabled' : 'edit',
        className: Sty.batchSetLabel,
        props: {
          onChange (e) {
            onBatchChange(e.target.value, item.dataIndex)
          },
        },
      }
    })
   
    return [{
      label: '销售属性',
      className: 'box-header',
    }, 
    {
      label: '批量设置',
      follow: true,
    },
    ...batchItem,
    {
      name: 'saleUnits',
      component: 'Item',
      render (values, core) {
        return (
          <Table 
            rowKey='skuId' 
            scroll={{x: 1400}}
            columns={tabelColumns(core, preview)} 
            pagination={false}
            dataSource={values.saleUnits} 
          />
        )
      }
    }, ]
  }
}