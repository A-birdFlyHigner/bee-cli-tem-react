import React, { Component } from 'react';
import { Table } from 'antd';
// import PropTypes from 'prop-types';

export default class SkuDetail extends Component {
 
  constructor(props) {
    super(props);
    const {saleUnits = []} = this.props
    this.state = {
      columns: [
        {
          title: 'SKU id',
          dataIndex: 'skuId',
          key: 'skuId',
          align: 'center',
        },
        {
          title: 'sku码(发货编码)',
          dataIndex: 'deliverCode',
          key: 'deliverCode',
          align: 'center',
        },
        {
          title: 'SKU规格',
          dataIndex: 'propertyPairList',
          key: 'propertyPairList',
          align: 'center',
          render: (text, record) => {
            const info = text.map(p => p.pvName)
            const { status } = record
            const StopSale = <span className='globalRed'>（停售）</span>
            return (
              <div>
                { status !== 0 ? null : StopSale}
                <span>{info.join('&') || '默认'}</span>
              </div>
            )
          }
        },
        {
          title: '成本价',
          dataIndex: 'costPrice',
          key: 'costPrice',
          align: 'center',
        },
      ],
      saleUnits,
    };
  }

  render() {
    const { saleUnits, columns } = this.state;
    return (
      <div style={{ margin: '20px 0', height: '500px', overflow: 'auto' }}>
        <Table rowKey='skuId' dataSource={saleUnits} columns={columns} pagination={false} />
      </div>
    );
  }
}
