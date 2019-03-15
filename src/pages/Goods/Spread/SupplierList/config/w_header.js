import React from 'react'
import { LeDialog, LeForm } from '@lib/lepage';
import router from 'umi/router';
import { message } from 'antd';
import dialogFormConfig from '../../common/spreadDialog';
import {queryProductSpreadChannelList} from '@/services/goods'

const setBranchList = async (err, val, leForm, leList) => {
  const productIds = leList.getSelectedRowKeys()
  if (!productIds.length) return message.warning('请至少勾选一项！')
  leForm.setProps('batchBtn', {
    loading: true,
  })
  const channelList = await queryProductSpreadChannelList()
  leForm.setProps('batchBtn', {
    loading: false,
  })
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

export default {
  form: {
    inline: true,
  },
  buttons: [
    {
      name: 'batchBtn',
      inline: true,
      props: {
        type: 'primary',
        children: '批量设置推广',
        onClick: setBranchList,
      },
    },
    {
      component: 'Button',
      props: {
        type: 'primary',
        children: '新增商品',
        onClick: () => {
          router.push('/goods/publish')
        },
      },
    },
  ],
};
