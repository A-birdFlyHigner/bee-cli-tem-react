import React from 'react';
import Reg from '@/utils/reg';
import * as Sty from './index.less';
import { Input, Table, message } from 'antd';

export default dataSource => {
  return {
    core: {
      values: { dataSource },
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
            let dataSource = core.getValue('dataSource').map(p => {
              p.editStock = val.batchSetStock;
              return p;
            });
            core.setValues({ dataSource });
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

const tabelColumns = core => {
  const onInputChange = (val, index, name) => {
    if (val !== '' && !Reg.Num.test(val)) return;
    let dataSource = JSON.parse(JSON.stringify(core.getValue('dataSource')));
    dataSource[index][name] = val;
    core.setValue('dataSource', dataSource);
  };
  return [
    {
      title: 'skuId',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: 'sku发货编码',
      dataIndex: 'sku',
      align: 'center',
    },
    {
      title: 'sku规格',
      dataIndex: 'skutype',
      align: 'center',
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
