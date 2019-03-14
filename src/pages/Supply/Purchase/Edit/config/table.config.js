import React from 'react';
import {Input} from 'antd'

// const deleteRow = values => {
//   console.log('values', this, values);
// };

export default {
  columns: [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: 'SKU编码',
      dataIndex: 'baseSaleGoodsId',
    },
    {
      title: '主图',
      dataIndex: 'mainImages',
      render(value, values, index) {
        return (
          <span>
            <img src={value && value[0]} alt="主图"/>
          </span>
        );
      },
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: 'SKU名称(字段待定)',
      dataIndex: 'SKU_Name',
    },
    {
      title: '供应商成本价',
      dataIndex: 'salePrice',
    },
    {
      title: '采购数量',
      dataIndex: 'PurchaseQuantity',
      render: (value, record, index) => {
        return <Input ref={input => this.input[record.baseSaleGoodsId] = input}/>
      }
    },
    // {
    //   title: '操作',
    //   width: '80px',
    //   render(value, values, index) {
    //     return (
    //       <div>
    //         <a href="javascript:;" onClick={() => {deleteRow(values)}} >删除</a>
    //       </div>
    //     );
    //   },
    // },
  ],
};
