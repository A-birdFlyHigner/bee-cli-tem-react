import React from 'react';
import moment from 'moment';
import router from 'umi/router';
import { ImageTextCard } from '@/components/InfoCard';
import { LeDialog } from '@lib/lepage'
import SkuDetail from '../../../common/skuDetail';
import Sty from '../Index.less'

const editItemStock = record => {
  const { saleGoodsId, cityCode, cityName, companyName } = record
  router.push({
    pathname: '/goods/spread/setting',
    query: {
      productIds: saleGoodsId,
      cityIds: cityCode,
      spreadName: `${companyName}（${cityName}）`,
      status: 'edit'
    }
  })
};

const skuDetail = record => {
  const { saleUnits } = record
  LeDialog.show({
    title: '渠道商品规格详情',
    width: '800px',
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
      width: 350,
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
          </div>
        );
      },
    },
    {
      title: '推广城市',
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
      title: '提交推广时间',
      dataIndex: 'applyPromotionTime',
      width: 200,
      render: (val) => {
        return (
          <div>
            {moment(val).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        )
      }
    },
    {
      title: '审核时间',
      dataIndex: 'reviewTime',
      width: 200,
      render: (val) => {
        return (
          <div>
            {moment(val).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        )
      }
    },
    {
      title: '原因',
      dataIndex: 'promotionFailureReason',
      width: 400,
      render: (text) => {
        return (
          <div className={Sty.reasonDiv}>
            {text}
          </div>
        )
      }
    },
    {
      title: '操作',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (text, record) => {
        return (
          <div className="operateBtn-container-inline">
            <a onClick={() => editItemStock(record)}>编辑</a>
            <br />
          </div>
        );
      },
    },
  ],
};
