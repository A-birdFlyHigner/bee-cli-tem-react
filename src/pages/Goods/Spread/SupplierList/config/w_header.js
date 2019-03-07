import { LeDialog, LeForm } from '@lib/lepage';
import router from 'umi/router';
import dialogFormConfig from '../../common/spreadDialog';

const setBranchList = (err, values, formCore, listCore, self) => {
  const productIds = listCore.getSelectedRowKeys()
  if (!productIds.length) return 
  const tags = ['全部', '华南地区', '华东地区'];
  const formConf = dialogFormConfig(tags)
  LeDialog.show({
    title: '可选推广渠道',
    width: '800px',
    content: <LeForm {...formConf}></LeForm>,
    onOk: (values, suc, core) => {
      const { checkedKeys, halfCheckedKeys, spreadTree } = values;
      const allSel = [...checkedKeys, ...halfCheckedKeys];
      const branchList = JSON.parse(JSON.stringify(spreadTree)).filter(p => {
        return allSel.indexOf(p.key) > -1;
      });
      branchList.forEach(p => {
        p.children = p.children.filter(q => {
          return allSel.indexOf(q.key) > -1;
        });
      });
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
          productIds: productIds,
          cityIds: cityIds,
          spreadName: spreadName
        }
      })
      suc();
    },
  });
};

export default {
  form: {
    inline: true,
  },
  buttons: [
    {
      inline: true,
      props: {
        type: 'primary',
        children: '批量设置推广',
        onClick: setBranchList,
      },
    },
  ],
};
