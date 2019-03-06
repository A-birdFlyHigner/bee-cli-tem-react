import { LeDialog } from '@lib/lepage';
import sleep from '../../common/utils/sleep';

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
  core: {
    initValues: {},
  },
  form: {
    inline: false,
    layout: {
      label: 'w120',
      columns: 3,
    },
  },
  items: [
    {
      label: '仓库名称',
      name: 'warehouseName',
      component: 'Input',
      props: {
        placeholder: '请输入仓库名称',
      },
    },
    {
      label: '供应商名称',
      name: 'supplierName',
      component: 'Input',
      props: {
        placeholder: '请输入供应商名称',
      },
    },
    {
      label: '期望入库时间',
      name: 'inputExpectTime',
      component: 'DatePicker',
      props: {
        placeholder: '请选择期望入库时间',
      },
    },
    {
      label: '失效时间',
      name: 'invalidTime',
      component: 'DatePicker',
      value: 0,
      props: {
        placeholder: '请选择失效时间',
      },
    },
  ],
  buttons: [
    // {
    //   props: {
    //     type: 'primary',
    //     children: '查询',
    //     onClick(err, values, formCore, listCore) {},
    //   },
    //   options: {
    //     type: 'submit',
    //     validate: true, // default true
    //   },
    // },
    // {
    //   props: {
    //     children: '重置',
    //     onClick(err, values, formCore, listCore) {},
    //   },
    //   options: {
    //     type: 'reset',
    //   },
    // },
    {
      props: {
        type: 'primary',
        children: '添加商品',
        onClick: (err, values, formCore, listCore) => {
          console.log('err', err);
          if (!err) {
            console.log('values', values);
          }
        },
      },
      options: {
        type: 'none',
        validate: true,
      },
    },
  ],
};
