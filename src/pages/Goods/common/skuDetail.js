import React, { Component } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

export default class SkuDetail extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      columns: [
        {
          title: 'SKU id',
          dataIndex: 'key',
          key: 'key',
          align: 'center',
        },
        {
          title: 'sku码（发货编码）',
          dataIndex: 'age',
          key: 'age',
          align: 'center',
        },
        {
          title: 'SKU规格',
          dataIndex: 'address',
          key: 'address',
          align: 'center',
        },
        {
          title: '成本价',
          dataIndex: 'price',
          key: 'price',
          align: 'center',
        },
      ],
      dataSource: [],
    };
  }

  static propTypes = {
    productId: PropTypes.number,
  };
  componentWillMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
        dataSource: [
          {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
            price: 1,
          },
          {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
            price: 2,
          },
        ],
      });
    }, 1000);
  }
  componentWillUnmount() {
    this.setState = () => {
      return null;
    };
  }

  render() {
    const { loading, dataSource, columns } = this.state;
    return (
      <div style={{ margin: '20px 0' }}>
        <Table dataSource={dataSource} columns={columns} pagination={false} loading={loading} />
      </div>
    );
  }
}
