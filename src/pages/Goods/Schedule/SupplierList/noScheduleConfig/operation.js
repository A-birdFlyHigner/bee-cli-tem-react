import { message } from 'antd';
import { LeDialog } from '@lib/lepage';
import router from 'umi/router';
import {productSpreadRevoke} from '@/services/goods'

const batchCancelSpread = (err, values, formCore, listCore) => {
  const productIds = listCore.getSelectedRowKeys()
  if (!productIds.length) return message.warning('请至少勾选一项！')
  LeDialog.show({
    title: '批量撤销推广',
    width: '400px',
    content: () => {
      return `已选择${productIds.length}个商品，确认批量撤销推广？`
    },
    onOk: async (val, suc) => {
      const res = await productSpreadRevoke(productIds)
      if (!res) return
      listCore.refresh()
      suc()
    }
  })
  return false
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
        children: '批量撤销推广',
        onClick: batchCancelSpread,
      },
    },
    {
      component: 'Button',
      props: {
        type: 'primary',
        children: '新增商品',
        onClick: () => {
          router.push('/goods/create')
        },
      },
    },
  ],
};
