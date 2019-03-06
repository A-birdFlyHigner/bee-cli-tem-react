import { Input, Button, Table } from 'antd'
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

export default function () {
  return function (self) {

    const onBatchChange = (val, dataIndex) => {
      if (val !== '' && !Reg.Price.test(val)) return
      const salseData = self.core.getValue('salseData').map(p => {
        p[dataIndex] = val
        return p
      })
      self.core.setValues({
        [`batch${dataIndex}`]: val,
        salseData
      })
    }
    
    return [{
      label: '销售属性',
      className: 'box-header',
    }, 
    ...inputItems.map((item, index) => {
      return {
        label: index === 0 ? '批量设置' : '',
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
    }),
    {
      name: 'salseData',
      className: 'form-long-table',
      render (values, core) {
        return (
          <Table 
            rowKey='sku' 
            scroll={{x: 1200}}
            className={Sty.salseTable}
            columns={tabelColumns(core)} 
            pagination={false}
            dataSource={values.salseData}></Table>
        )
      }
    }, ]
  }
}

const tabelColumns = (core) => {

  const onInputChange = (val, index, name) => {
    if (val !== '' && !Reg.Price.test(val)) return
    let salseData = JSON.parse(JSON.stringify(core.getValue('salseData')))
    salseData[index][name] = val
    core.setValue('salseData', salseData)
  }
  
  return [{
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: 100,
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
    width: 240,
  }, 
  ...inputItems.map(item => {
    return {
      title: item.title,
      dataIndex: item.dataIndex,
      width: item.width || 280,
      render: (text, row, index) => {
        return (
          <Input 
            value={text} disabled={item.disabled}
            className={Sty.inputCenter}  
            onChange={e => onInputChange(e.target.value, index, item.dataIndex)} />
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