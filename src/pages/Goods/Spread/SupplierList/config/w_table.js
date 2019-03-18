import React from 'react';
import { ImageTextCard } from '@/components/InfoCard';
import { LeDialog, LeForm } from '@lib/lepage'
import router from 'umi/router';
import SkuDetail from '../../../common/skuDetail';
import { message } from 'antd';
import dialogFormConfig from '../../common/spreadDialog';
import {queryProductSpreadChannelList} from '@/services/goods'

let isLoading = false
const editItem = (record) => {
  const { saleGoodsId: id } = record
  router.push(`/goods/update/${id}`)
};

const handleStatus = async (record) => {
  if (isLoading) return message.warning('数据处理中，请稍后')
  const {saleGoodsId} = record
  const productIds = [saleGoodsId]
  isLoading = true
  const channelList = await queryProductSpreadChannelList()
  isLoading = false
  if (!channelList) message.warning('获取推广渠道出现异常')
  const formConf = dialogFormConfig(channelList)
  LeDialog.show({
    title: '可选推广渠道',
    width: '800px',
    content: <LeForm {...formConf} />,
    onOk: (values, suc) => {
      const { checkedKeys, halfCheckedKeys, spreadTree } = values;
      const allSel = [...checkedKeys, ...halfCheckedKeys];
      let branchList = JSON.parse(JSON.stringify(spreadTree)).filter(p => {
        return allSel.indexOf(p.key) > -1;
      });
      branchList = branchList.map(item => {
        const { children } = item
        return {
          ...item,
          children: children.filter(q => {
            return allSel.indexOf(q.key) > -1;
          })
        }
      })
      const cityIds = [];
      const spreadName = branchList
        .map(p => {
          const cityName = p.children
            .map(q => {
              cityIds.push(q.key);
              return q.title;
            })
            .join('、');
          return `${p.title}（${cityName}）`;
        })
        .join('；');
      router.push({
        pathname: `/goods/spread/setting`,
        query: {
          productIds,
          cityIds,
          spreadName
        }
      })
      suc();
    },
  });
  return false
};

const skuDetail = record => {
  const { saleUnits } = record
  LeDialog.show({
    title: '基础商品规格详情',
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
  scroll: { x: 1300 },
  rowSelection: {
    selectedRowKeys: [],
    selections: true,
    getCheckboxProps(record) {
      const { canSpreadCityNums, alreadySpreadCityNums } = record
      return {
        disabled: canSpreadCityNums <= alreadySpreadCityNums
      };
    },
  },
  columns: [
    {
      title: '基础信息',
      dataIndex: 'saleGoodsId',
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
                value: record.saleGoodsId,
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
      render: (text) => {
        return (
          <div>
            {text &&
              text.split(',').map((item) => (
                <span key={item}>
                  &gt;
                  {item}
                  <br />
                </span>
              ))}
          </div>
        );
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
      title: '基础价格信息',
      dataIndex: 'salePrice',
      width: 200,
    },
    {
      title: '可推广渠道（城市）',
      dataIndex: 'canSpreadCityNums',
      width: 200,
      align: 'center',
    },
    {
      title: '已推广渠道（城市）',
      dataIndex: 'alreadySpreadCityNums',
      width: 200,
      align: 'center',
    },
    {
      title: '操作',
      width: 140,
      align: 'center',
      fixed: 'right',
      render: (text, record) => {
        const { canSpreadCityNums, alreadySpreadCityNums } = record
        return (
          <div className="operateBtn-container-inline">
            <a onClick={() => editItem(record)}>编辑</a><br />
            {canSpreadCityNums <= alreadySpreadCityNums ? null :
            <a className="table-operate" onClick={() => handleStatus(record)}>
              设置推广
            </a>}
          </div>
        );
      },
    },
  ],
};
