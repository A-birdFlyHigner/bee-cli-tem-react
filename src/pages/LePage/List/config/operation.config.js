import { LeDialog } from '@lib/lepage';
import sleep from '../../utils/sleep';

const onClickAdd = (err, values, formCore, listCore) => {
  LeDialog.show(
    {
      form: {
        layout: {
          label: 'w120',
        },
      },
      items: [
        {
          label: '采购时间',
          name: 'purchasing',
          rules: {
            type: 'string',
            required: true,
            message: '请填写内容',
          },
        },
        {
          label: '仓库名称',
          name: 'warehouse',
        },
        {
          label: '供应商名称',
          name: 'supplier',
        },
        {
          label: '采购订单状态',
          name: 'status',
        },
        {
          label: '采购订单来源',
          name: 'origin',
        },
        {
          label: '供应商确认状态',
          name: 'confirm',
        },
      ],
    },
    {
      title: '新建采购单',
      width: '500px',
      onOk: (values, hide) => {
        return new Promise(async (resolve, reject) => {
          await sleep(1500);
          resolve();
          hide();
          listCore.refresh();
        });
      },
    }
  );
};

export default {
  form: {
    inline: true,
  },
  items: [
    {
      component: 'Button',
      props: {
        type: 'primary',
        children: '新增采购单',
        onClick: onClickAdd,
      },
    },
  ],
  buttons: [
    {
      inline: true,
      props: {
        type: 'danger',
        children: '新增出库单',
        onClick(err, values, formCore, listCore) {},
      },
    },
  ],
};
