import React from 'react';
import Reg from '@/utils/reg';
import { Input, Table, message } from 'antd';
import * as Sty from './index.less';

const tabelColumns = core => {
  const onInputChange = (val, index, name) => {
    let num = val
    const Integer = /^-?\d*$/
    if (num !== '' && !Integer.test(num)) return;
    const items = JSON.parse(JSON.stringify(core.getValue('dataSource')));
    const stockLast = items[index].stock3 + Number(num === '-' ? '' : num)
    if (stockLast < 0) {
      num = -(items[index].stock3)
    }
    if (stockLast > 10000) {
      num = 10000 - items[index].stock3
    }
    items[index][name] = String(num);
    core.setValue('dataSource', items);
  };

  const onInputBlur = (val, index, name) => {
    let num = val
    num = num === '-' ? '' : num;
    if (num.length > 1) {
      num = num.replace(/^0/g, '');
    }
    const items = JSON.parse(JSON.stringify(core.getValue('dataSource')));
    items[index][name] = num;
    core.setValue('dataSource', items);
  }

  return [
    {
      title: 'skuId',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: 'sku码(发货编码)',
      dataIndex: 'sku',
      align: 'center',
    },
    {
      title: 'sku规格',
      dataIndex: 'skutype',
      align: 'center',
      render: (text) => {
        return (
          <div>
            <span className='globalRed'>（停售）</span>
            <span>{text}</span>
          </div>
        )
      }
    },
    {
      title: '总库存',
      dataIndex: 'stock',
      align: 'center',
      render(text, row) {
        return text + Number(row.editStock === '-' ? '' : row.editStock)
      }
    },
    {
      title: '待发货占用',
      dataIndex: 'stock1',
      align: 'center',
    },
    {
      title: '待付款占用',
      dataIndex: 'stock2',
      align: 'center',
    },
    {
      title: '可售库存',
      dataIndex: 'stock3',
      align: 'center',
      render(text, row) {
        return text + Number(row.editStock === '-' ? '' : row.editStock)
      }
    },
    {
      title: '调整可售库存',
      dataIndex: 'editStock',
      render: (text, row, index) => {
        return (
          <Input
            value={text}
            className={Sty.inputCenter}
            onBlur={e => onInputBlur(e.target.value, index, 'editStock')}
            onChange={e => onInputChange(e.target.value, index, 'editStock')}
          />
        );
      },
    },
  ];
};


export default tableData => {
  return {
    settings: {
      values: { dataSource: tableData },
    },
    items: [
      {
        label: '批量调整可售库存',
        name: 'batchSetStock',
        component: 'Input',
        follow: true,
        props: {
          placeholder: '请输入整数',
        },
        rules: {
          required: true,
          pattern: Reg.Integer,
          message: '请输入整数',
        },
      },
      {
        name: 'handleBtn',
        component: 'Button',
        inline: true,
        props: {
          type: 'primary',
          children: '应用',
          onClick: (err, val, core) => {
            if (err) return message.warning('请输入整数');
            const items = core.getValue('dataSource').map(p => {
              let num = Number(val.batchSetStock)
              const stockLast = p.stock3 + num
              if (stockLast < 0) {
                num = -Number(p.stock3)
              }
              if (stockLast > 10000) {
                num = 10000 - p.stock3
              }
              return {
                ...p,
                editStock: String(num),
              };
            });
            return core.setValues({ dataSource: items });
          },
        },
        options: {
          validate: true,
          validateWithoutRender: true,
        },
      },
      {
        label: '',
        name: 'dataSource',
        render: (values, core) => {
          const { dataSource } = values;
          return (
            <Table
              rowKey="id"
              columns={tabelColumns(core)}
              pagination={false}
              dataSource={dataSource}
            />
          );
        },
      },
    ],
  };
};