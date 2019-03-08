import React from 'react'
import { Input, Table } from 'antd'
import Sty from '../Index.less'
import Reg from '@/utils/reg'

const inputItems = [{
  title: '市场价（划掉价）',
  dataIndex: 'price',
}, {
  title: '非会员价',
  dataIndex: 'price1'
}, {
  title: '会员价',
  dataIndex: 'price2'
}, {
  title: '成本价',
  dataIndex: 'price3',
  disabled: true,
}, {
  title: '毛利',
  dataIndex: 'price4'
}]

const tabelColumns = (core, preview) => {

  const onInputChange = (val, index, name) => {
    if (val !== '' && !Reg.Price.test(val)) return
    const salseData = JSON.parse(JSON.stringify(core.getValue('salseData')))
    salseData[index][name] = val
    core.setValue('salseData', salseData)
  }
  
  return [{
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: 80,
    render: (value, row, index) => {
      return '可用'
    }
  }, {
    title: 'sku组合',
    dataIndex: 'sku',
    align: 'center',
    width: 180,
  }, {
    title: 'sku编码（发货编码）',
    dataIndex: 'skuCode',
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
    dataIndex: 'stock',
    align: 'center',
    width: 120,
  }, {
    title: '库存',
    dataIndex: 'stock1',
    align: 'center',
    width: 100,
  }, {
    title: '会员价佣金',
    dataIndex: 'stock2',
    align: 'center',
    width: 120,
  }, {
    title: '非会员价佣金',
    dataIndex: 'stock3',
    align: 'center',
    width: 150,
  },]
}

// preview为true则仅展示数据
export default function (preview) {
  return (leForm) => {

    const onBatchChange = (val, dataIndex) => {
      if (val !== '' && !Reg.Price.test(val)) return
      const salseData = leForm.getValue('salseData').map(p => {
        return {
          ...p,
          [dataIndex]: val
        }
      })
      leForm.setValues({
        [`batch${dataIndex}`]: val,
        salseData
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
      name: 'salseData',
      component: 'Item',
      render (values, core) {
        return (
          <Table 
            rowKey='sku' 
            scroll={{x: 1400}}
            columns={tabelColumns(core, preview)} 
            pagination={false}
            dataSource={values.salseData} 
          />
        )
      }
    }, ]
  }
}