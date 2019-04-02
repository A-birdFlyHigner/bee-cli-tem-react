import React from 'react';
import ImgPreview from '@/components/ImgPreview'
import styles from '../../../common/style.less';

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
      dataIndex: 'skuCode',
    },
    {
      title: '主图',
      dataIndex: 'skuImage',
      render(value) {
        return (<span className={styles.fix_img_preview}><ImgPreview url={value} /></span>)
      },
    },
    {
      title: '商品名称',
      dataIndex: 'itemName',
    },
    {
      title: 'SKU名称',
      dataIndex: 'skuName',
    },
    // {
    //   title: '供应商成本价',
    //   dataIndex: 'supplierPrice',
    //   render: (value)=>{
    //     return (Number(value).div(100)).toFixed(2)
    //   }
    // },
    {
      title: '配送数量',
      dataIndex: 'expectSkuCount',
    },
    {
      title: '出库数量',
      dataIndex: 'outboundSkuCount',
    },
    {
      title: '差异数量',
      dataIndex: 'differCount',
    },
  ],
};
