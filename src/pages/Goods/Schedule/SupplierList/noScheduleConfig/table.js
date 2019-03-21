import React from 'react';
import { message } from 'antd';
import { LeDialog, LeForm } from '@lib/lepage';
import { ImageTextCard } from '@/components/InfoCard';
import SkuDetail from '../../../common/skuDetail';
import stockConfig from '../../../common/stockDialog';
import {updateProductStock} from '@/services/goods'

const editItemStock = (record, status, leList) => {
  const {saleUnits} = record
  LeDialog.show({
    title: `商品名称：${record.name}`,
    width: '900px',
    maskClosable: status === 'preview',
    content: <LeForm {...stockConfig(saleUnits, status)} />,
    onOk(values, suc) {
      if (status === 'preview') return suc()
      const { dataSource } = values
      let stockList = dataSource.map(val => {
        return {
          saleUnitId: val.skuId,
          count: val.editStock
        }
      })
      stockList = stockList.filter(item => {
        return item.count && item.count !== '0'
      })
      if (!stockList.length) return message.warning('请重新输入')
      updateProductStock(stockList).then(res => {
        if (res) {
          message.success('更新成功')
          suc()
          leList.refresh()
        }
      })
      return false
    },
  });
};

const skuDetail = record => {
  const { saleUnits } = record
  LeDialog.show({
    title: '渠道商品规格详情',
    width: '1000px',
    maskClosable: true,
    footer() {
      return null;
    },
    content() {
      return <SkuDetail saleUnits={saleUnits} />;
    },
  });
};

export default {
  rowKey: 'saleGoodsId',
  scroll: { x: 1500 },
  // rowSelection: {
  //   selections: true,
  //   getCheckboxProps() {
  //     return {};
  //   },
  // },
  columns: [
    {
      title: '渠道商品Id',
      dataIndex: 'saleGoodsId',
      width: 140,
      align: 'center',
    },
    {
      title: '基础信息',
      dataIndex: 'name',
      render: (val, record) => {
        const { mainImages = [] } = record
        return (
          <ImageTextCard
            image={mainImages.length ? mainImages[0].url : ''}
            infoList={[
              {
                label: '商品名称',
                value: record.name,
              },
              {
                label: '品牌',
                value: record.brandName,
              },
              {
                label: '商品Id',
                value: record.baseSaleGoodsId,
              },
              {
                label: '发货方式',
                value: ['', '落地配', '入仓', '快递配送'][record.logisticsMethod],
              },
              {
                label: '发货时效',
                value: ['', '次日达', '预售'][record.logisticsType],
              },
              {
                label: '发货时间',
                value: record.logisticsType === 2 ? `${record.dispatchDate}天` : '',
              },
            ]}
          />
        );
      },
    },
    {
      title: '类目',
      dataIndex: 'pathName',
      width: 150,
      render(value) {
        const symbol = '>';
        return value.split(',').map((item, index) => {
          const key = `${item}-${index}`
          return (
            <span key={key}>
              {symbol} {item} <br />
            </span>
          )
        })
      },
    },
    {
      title: '规格',
      dataIndex: 'saleUnits',
      width: 100,
      align: 'center',
      render: (saleUnits, record) => {
        return (
          <span>
            {saleUnits.length}个
            <br />
            <a className="linkButton" onClick={() => skuDetail(record)}> 查看 </a>
          </span>
        );
      },
    },
    {
      title: '价格信息',
      dataIndex: 'salePrice',
      width: 200,
      align: 'center',
    },
    {
      title: '出售城市',
      dataIndex: 'cityName',
      width: 200,
      render: (text, record) => {
        const {cityName, companyName} = record
        return (
          <div>
            <p>{companyName}</p>
            <p>{cityName}</p>
          </div>
        );
      },
    },
    {
      title: '库存信息',
      dataIndex: 'totalStock',
      width: 300,
      render: (val, record) => {
        const { totalStock, saleStock } = record
        return (
          <div>
            <p>推广总库存：{totalStock}</p>
            <p>累计售出：{saleStock}</p>
            <p><a onClick={() => editItemStock(record, 'preview')}>查看</a></p>
          </div>
        );
      },
    },
    {
      title: '操作',
      width: 160,
      align: 'center',
      fixed: 'right',
      render: (text, record, index, {leList}) => {
        return (
          <div className="operateBtn-container-inline">
            <a onClick={() => editItemStock(record, null, leList)}>调整库存</a>
          </div>
        );
      },
    },
  ],
};
