import React from 'react';
import Reg from '@/utils/reg';
import { Input, Table, message } from 'antd';
import * as Sty from './index.less';

const tabelColumns = core => {
  const onInputChange = (val, index, name) => {
    if (val !== '' && !Reg.Num.test(val)) return;
    const items = JSON.parse(JSON.stringify(core.getValue('dataSource')));
    items[index][name] = val;
    core.setValue('dataSource', items);
  };
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
    },
    {
      title: '调整可售库存',
      dataIndex: 'editStock',
      render: (text, row, index) => {
        return (
          <Input
            value={text}
            className={Sty.inputCenter}
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
          pattern: Reg.Num,
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
              return {
                ...p,
                editStock: val.batchSetStock,
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