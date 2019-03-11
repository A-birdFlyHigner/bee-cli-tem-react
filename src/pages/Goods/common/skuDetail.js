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
            const { saleStatus } = record
            const StopSale = <span className='globalRed'>（停售）</span>
            return (
              <div>
                { saleStatus !== 0 ? null : StopSale}
                <span>{text.join('&')}</span>
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
      <div style={{ margin: '20px 0' }}>
        <Table rowKey='skuId' dataSource={saleUnits} columns={columns} pagination={false} />
      </div>
    );
  }
}
