import React from 'react'
import { Input, Table } from 'antd'
import Sty from './index.less'
import Reg from '@/utils/reg'

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
    if (val !== '' && !Reg.Price.test(val)) return
    const saleUnits = JSON.parse(JSON.stringify(core.getValue('saleUnits')))
    saleUnits[index][name] = val
    core.setValue('saleUnits', saleUnits)
  }
  
  return [{
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: 80,
    render: () => {
      return '可用'
    }
  }, {
    title: 'sku组合',
    dataIndex: 'propertyPairList',
    align: 'center',
    width: 180,
    render: (val) => {
      return <span>{val.join('-') || '默认'}</span>
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
    dataIndex: 'memberYongJin',
    align: 'center',
    width: 120,
    render: (values, rows) => {
      const {
        memberPrice,
        costPrice,
        grossProfit
      } = rows
      return <span>{(memberPrice*100 - costPrice*100 - grossProfit*100)/100}</span>
    }
  }, {
    title: '非会员价佣金',
    dataIndex: 'nonmemberYongJin',
    align: 'center',
    width: 150,
    render: (values, rows) => {
      const {
        nonmemberPrice,
        costPrice,
        grossProfit} = rows
      return <span>{(nonmemberPrice*100 - costPrice*100 - grossProfit*100)/100}</span>
    }
  }]
}

// preview为true则仅展示数据
export default function (preview) {
  return (leForm) => {

    const onBatchChange = (val, dataIndex) => {
      if (val !== '' && !Reg.Price.test(val)) return
      if (Number(val) > 1000000) return
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
    const batchItem = preview ? [] : inputItems.map((item, index) => {
      return {
        label: (index === 0) ? `批量设置${'      '}${item.title}` : item.title,
        name: `batch${item.dataIndex}`,
        follow: index === 0,
        inline: index !== 0,
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