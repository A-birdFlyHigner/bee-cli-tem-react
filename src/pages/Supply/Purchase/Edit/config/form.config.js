import React from 'react';
import moment from 'moment';

export default {
  core: {
    values: {
      // gsId: '',
    },
    autoValidate: true,
    onChange: (changeKeys, values, core) => {},
  },

  options: {
    scrollToError: true,
  },

  form: {
    // Form props
    defaultMinWidth: true, // 表单内有默认最小宽度200
    // colon: true, // label后面是否跟随 :
    // inline: true, // 表单布局是否为行内样式
    // // full: false, // 表单布局是否为占满宽度样式
    // // inset: false, // 表单布局是否为inset样式
    // layout: {
    //   // 表单布局 左侧和右侧比例
    //   label: 4,
    //   control: 20,
    // },
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
    },
    {
      label: '供应商名称',
      name: 'supplierName',
      component: 'Input',
    },
    {
      label: '期望入库时间',
      name: 'expectInputTime',
      component: 'DatePicker',
      value: moment('2019-01-30 12:00:00'),
      props: {
        placeholder: '请选择期望入库时间',
      },
    },
    {
      label: '失效时间',
      name: 'invalidTime',
      component: 'DatePicker',
      value: moment('2019-01-30 12:00:00'),
      props: {
        placeholder: '请选择失效时间',
      },
    },
  ],
};
