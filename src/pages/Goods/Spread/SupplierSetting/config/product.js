import React from 'react'
import { Input, Button, Table } from 'antd'
import * as Sty from '../Index.less'
import Reg from '@/utils/reg'

const tabelColumns = (core, p) => {
  const inputItems = [{
    title: '成本价',
    dataIndex: 'costPrice',
  }, {
    title: '推广库存',
    dataIndex: 'stockCount',
  }]
  const onInputChange = (val, index, name) => {
    let num = val
    if (num !== '' && !Reg[name === 'costPrice' ? 'Price' : 'Num' ].test(num)) return
    if (name === 'stockCount' && num > 10000) num = 10000
    if (num > 100000000) return 
    const dataSource = JSON.parse(JSON.stringify(core.getValue(`dataSource${p}`)))
    dataSource[index][name] = num
    core.setValue(`dataSource${p}`, dataSource)
  }
  return [{
    title: '商品名称',
    dataIndex: 'productName',
    align: 'center',
    width: '200px',
    // render: (value, row, index) => {
    //   return {
    //     children: value,
    //     props: {
    //       rowSpan: index === 0 ? data.length : 0
    //     }
    //   }
    // }
  }, {
    title: 'sku组合',
    dataIndex: 'propertyNameList',
    align: 'center',
    width: '200px',
    render: (text) => {
      return <span>{text.join('&') || '默认'}</span>
    }
  }, 
  ...inputItems.map(item => {
    return {
      title: item.title,
      dataIndex: item.dataIndex,
      render: (text, row, index) => {
        return (
          <Input 
            value={text}
            className={Sty.inputCenter}  
            onChange={e => onInputChange(e.target.value, index, item.dataIndex)} 
          />
        )
      }
    }
  })]
}

const makeProductItem = (productIds, leForm) => {
  const brtchItems = [{
    label: '批量设置',
    name: 'costPrice',
  }, {
    name: 'stockCount',
  },]

  return productIds.map(p => {
    const onBatchChange = (val, name) => {
      let num = val
      if (num !== '' && !Reg[name === 'costPrice' ? 'Price' : 'Num' ].test(num)) return
      if (name === 'stockCount' && num > 10000) num = 10000
      if (num > 100000000) return 
      const dataSource = leForm.getValue(`dataSource${p}`).map(item => {
        return {
          ...item,
          [name]: num
        }
      })
      leForm.setValues({
        [`${name}${p}`]: num,
        [`dataSource${p}`]: dataSource,
      })
    }
    
    const whenFun = (values) => {
      return values.productIds.indexOf(p) > -1
    }

    return [{
      label: '',
      name: `proDelete${p}`,
      follow: true,
      render: (values, core) => {
        return productIds.length === 1 ? <Button size="small" style={{opacity: 0}}>删除</Button> : (
          <Button 
            type="primary" 
            size="small" 
            onClick={() => {
              const ids = core.getValue('productIds').filter(item => {
                return item !== p
              })
              core.setValue('productIds', ids)
            }}
          >删除
          </Button>
        )
      },
      when: whenFun
    }, 
    ...brtchItems.map(item => {
      return {
        label: item.label,
        name: `${item.name}${p}`,
        inline: true,
        component: 'Input',
        className: Sty.batchSetLabel,
        props: {
          onChange (e) {
            onBatchChange(e.target.value, item.name)
          },
        },
        when: whenFun
      }
    }), {
      label: '',
      name: `dataSource${p}`,
      value: [],
      props: () => {
        return {}
      },
      listenKeys: [ `deliverCode${p}`,  `costPrice${p}`,  `stockCount${p}`],
      render: (values, core) => {
        return (
          <Table 
            rowKey='saleUnitId' 
            columns={tabelColumns(core, p, values[`dataSource${p}`])} 
            pagination={false}
            dataSource={values[`dataSource${p}`]} 
          />
        )
      },
      when: whenFun
    }]
  })
}

export default function (productIds) {
  return (leForm) => {
    const itemList = []
    makeProductItem(productIds, leForm).forEach(p => {
      itemList.push(...p)
    })
    return itemList
  }
}



