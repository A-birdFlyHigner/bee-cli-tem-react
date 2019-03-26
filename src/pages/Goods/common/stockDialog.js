import React from 'react';
import Reg from '@/utils/reg';
import { Input, Table, message } from 'antd';
import * as Sty from './index.less';

const tabelColumns = (core, status) => {
  const onInputChange = (val, index, name) => {
    let num = val
    const Integer = /^-?\d*$/
    if (num !== '' && !Integer.test(num)) return;
    const items = JSON.parse(JSON.stringify(core.getValue('dataSource')));
    const stockLast = items[index].availStock + Number(num === '-' ? '' : num)
    if (stockLast < 0) {
      num = -(items[index].availStock)
    }
    if (stockLast > 10000) {
      num = 10000 - items[index].availStock
    }
    items[index][name] = String(num);
    core.setValue('dataSource', items);
  };

  const onInputBlur = (val, index, name) => {
    let num = val === '-' ? '' : val
    if (num.length > 1) {
      num = num.replace(/^0+/g, '');
    }
    const items = JSON.parse(JSON.stringify(core.getValue('dataSource')));
    items[index][name] = num;
    core.setValue('dataSource', items);
  }

  return [
    {
      title: 'skuId',
      dataIndex: 'skuId',
      align: 'center',
    },
    {
      title: 'sku码(发货编码)',
      dataIndex: 'deliverCode',
      align: 'center',
    },
    {
      title: 'sku规格',
      dataIndex: 'propertyPairList',
      width: 120,
      align: 'center',
      render: (text, row) => {
        const info = text.map(p => p.pvName)
        const isStop = <span className='globalRed'>（停售）</span>
        return (
          <div>
            {row.status === 0 ? isStop : null}
            <span>{info.join('&') || '默认'}</span>
          </div>
        )
      }
    },
    {
      title: '总库存',
      dataIndex: 'spreadStock',
      align: 'center',
      render(text, row) {
        return text + Number(row.editStock === '-' ? '' : row.editStock)
      }
    },
    {
      title: '待发货占用',
      dataIndex: 'notDeliverLockStock',
      align: 'center',
    },
    {
      title: '待付款占用',
      dataIndex: 'notPayLockStock',
      align: 'center',
    },
    {
      title: '可售库存',
      dataIndex: 'availStock',
      align: 'center',
      render(text, row) {
        return text + Number(row.editStock === '-' ? '' : row.editStock)
      }
    },
    {
      title: status === 'preview' ? '' : '调整可售库存',
      dataIndex: 'editStock',
      width: status === 'preview' ? 0 : 100,
      render: (text, row, index) => {
        return (
          status === 'preview' ? null :
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

export default (tableData, status) => {
  const dataList = tableData.map(item => {
    return {
      ...item,
      editStock: '0'
    }
  })
  const whenFun = () => {
    return !(status === 'preview')
  }
  return {
    settings: {
      values: { dataSource: dataList },
    },
    items: [
      {
        label: status === 'preview' ? '' : '批量调整可售库存',
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
        when: whenFun,
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
              const stockLast = p.availStock + num
              if (stockLast < 0) {
                num = -Number(p.availStock)
              }
              if (stockLast > 10000) {
                num = 10000 - p.availStock
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
        when: whenFun,
      },
      {
        label: '',
        name: 'dataSource',
        render: (values, core) => {
          const { dataSource } = values;
          return (
            <div style={{height: '500px', overflow: 'auto'}}>
              <Table
                rowKey="skuId"
                scroll={{x: 800}}
                columns={tabelColumns(core, status)}
                pagination={false}
                dataSource={dataSource}
              />
            </div>
          );
        },
      },
    ],
  };
};