// 发布商品表单配置

import React from 'react';
import { Table, Button, Input } from 'antd';
import { LeForm } from '@lib/lepage';
import uploadConfig from './upload.config';

const getHeadConfig = title => {
  return {
    render() {
      return (
        <div>
          <b>{title}</b>
        </div>
      );
    },
  };
};

const getTipConfig = msg => {
  return {
    render() {
      return <div>{msg}</div>;
    },
  };
};

const getSkusDataList = chosenSkus => {
  return chosenSkus.reduce((preOptions, curVal, index, arr) => {
    if (!preOptions || preOptions.length === 0) return curVal.options;

    const result = preOptions.map(preOption => {
      return curVal.options.map(curOption => {
        const label = `${preOption.label}-${curOption.label}`;
        const value = `${preOption.value}-${curOption.value}`;
        return {
          key: value,
          label,
          value,
          status: true,
          sku: label,
          skuId: value,
          price: '',
          number: '',
        };
      });
    });

    return [].concat(...result);
  }, null);
};

// 选择类目
const categoryConfig = [
  {
    label: '当前选择类目',
    name: 'category',
    status: 'preview',
    follow: true,
    value: '汽车/配件/用品',
  },
  {
    component: 'Button',
    inline: true,
    when() {
      // 二次编辑商品，则不能修改类目，没有【修改类目】按钮
      return true;
    },
    props: {
      children: '修改类目',
      onClick() {},
    },
  },
];

// 基础信息
const baseInfoConfig = [
  getHeadConfig('基础信息'),
  {
    name: 'longName',
    label: '商品长名称',
    component: 'Input',
    props: {
      required: true,
      placeholder: '请输入长名称',
      suffix: '简洁描述这是什么商品，展示在小程序端，限40字',
    },
    rules: {
      type: 'string',
      required: true,
      message: '长名称不能为空，40个汉字以内',
      max: 40,
    },
  },
  {
    name: 'shortName',
    label: '商品短名称',
    props: {
      required: true,
      placeholder: '请输入短名称',
      suffix: '提炼文案，展示在小程序端的描述，限20字',
    },
    rules: {
      type: 'string',
      required: true,
      message: '短名称不能为空，20个汉字以内',
      max: 20,
    },
  },
];

// 销售属性
const getSalesPropertyConfig = initSkus => {
  // 更新sku组合
  const updateSkuCombs = leForm => {
    const { core: formCore } = leForm;
    const skuCombs = formCore.getValue('skuCombs');

    formCore.setValue('skuCombs', skuCombs.concat(skuCombs));
  };

  // 触发单个更新操作
  const onChangeUpdateSingle = (leForm, colKey, inputVal, itemIndex) => {
    const { core: formCore } = leForm;
    const skuCombs = formCore.getValue('skuCombs');
    const result = skuCombs.map((item, index) => {
      if (itemIndex !== index) {
        return item;
      }
      return {
        ...item,
        [colKey]: inputVal,
      };
    });
    formCore.setValues({
      skuCombs: result,
    });
  };

  // 触发批量更新操作
  const onChangeUpdateBatch = (leForm, colKey, batchVal, batchKey) => {
    const { core: formCore } = leForm;
    const skuCombs = formCore.getValue('skuCombs');
    const result = skuCombs.map(item => {
      return {
        ...item,
        [colKey]: batchVal,
      };
    });
    formCore.setValues({
      [batchKey]: batchVal,
      skuCombs: result,
    });
  };

  // 触发选择规格操作
  const onChangeSkuChoose = (leForm, name, value) => {
    const { core: formCore } = leForm;
    formCore.setValue(name, value);

    // 更新sku组合
    updateSkuCombs(leForm);
  };

  // 触发添加规格操作
  const onPressEnterAddSku = (leForm, name, event) => {
    const { core: formCore } = leForm;
    const { target = {} } = event;
    const { value: label = '' } = target;
    if (!label) return;

    const value = [].concat(formCore.getValue(name) || []);
    const props = formCore.getProps(name);
    const options = [].concat(props.options || []);
    const addValue = options.length + 1;

    // add
    options.push({ label, value: addValue });
    value.push(addValue);

    // update
    formCore.setProps(name, { options });
    formCore.setValue(name, value);

    // clear
    target.value = '';

    // 更新sku组合
    updateSkuCombs(leForm);
  };

  // 获取sku列配置
  const getColumnsConfig = leForm => {
    return [
      {
        title: '状态',
        dataIndex: 'status',
        render() {
          return <Button>停售/可售</Button>;
        },
      },
      {
        title: 'sku组合',
        dataIndex: 'sku',
      },
      {
        title: 'sku编码(发货编码)',
        dataIndex: 'skuId',
        component: 'Input',
        render(value, arr, index) {
          return (
            <Input
              value={value}
              onChange={e => onChangeUpdateSingle(leForm, 'skuId', e.target.value, index)}
            />
          );
        },
      },
      {
        title: '成本价',
        dataIndex: 'price',
        render(value, arr, index) {
          return (
            <Input
              value={value}
              onChange={e => onChangeUpdateSingle(leForm, 'price', e.target.value, index)}
            />
          );
        },
      },
      {
        title: '限购数量',
        dataIndex: 'number',
        render(value, arr, index) {
          return (
            <Input
              value={value}
              onChange={e => onChangeUpdateSingle(leForm, 'number', e.target.value, index)}
            />
          );
        },
      },
    ];
  };

  // 获取sku选择器配置
  const getSkuChoosesConfig = leForm => {
    const result = initSkus.map(sku => {
      return [
        {
          label: sku.label,
          name: sku.name,
          component: 'CheckboxGroup',
          follow: true,
          props: {
            options: sku.options,
            onChange: value => onChangeSkuChoose(leForm, sku.name, value),
          },
          rules: {
            required: true,
            message: `请选择${sku.label}`,
          },
        },
        {
          inline: true,
          props: {
            placeholder: '自定义',
            onPressEnter: event => onPressEnterAddSku(leForm, sku.name, event),
          },
        },
      ];
    });

    return [].concat(...result);
  };

  // 获取批量设置配置
  const getBatchConfig = leForm => {
    return [
      {
        label: '批量设置',
        name: 'batch-skuId',
        follow: true,
        props: {
          placeholder: '请输入sku编码',
          onChange: e => onChangeUpdateBatch(leForm, 'skuId', e.target.value, 'batch-skuId'),
        },
      },
      {
        name: 'batch-price',
        inline: true,
        props: {
          placeholder: '请输入成本价',
          onChange: e => onChangeUpdateBatch(leForm, 'price', e.target.value, 'batch-price'),
        },
      },
      {
        name: 'batch-number',
        inline: true,
        component: 'InputNumber',
        props: {
          placeholder: '请输入限购数量',
          onChange: value => onChangeUpdateBatch(leForm, 'number', value, 'batch-number'),
        },
      },
    ];
  };

  // 获取sku组合配置
  const getSkuCombConfig = leForm => {
    return {
      name: 'skuCombs',
      render({ skuCombs }) {
        const columns = getColumnsConfig(leForm);
        return <Table columns={columns} dataSource={skuCombs} pagination={false} />;
      },
    };
  };

  return leForm => {
    return [
      getHeadConfig('销售属性'),
      getTipConfig('注：商品规格根据类目规定显示，支持0-2级，没有规格时可不填'),
      ...getSkuChoosesConfig(leForm, initSkus),
      ...getBatchConfig(leForm),
      getSkuCombConfig(leForm),
    ];
  };
};

// 仓库属性
const warehouseAttributesConfig = () => {
  // 仓库相关的属性是根据类目来的
  const items = [
    {
      label: '毛重',
      name: 'weight',
    },
    {
      label: '质量',
      name: 'quality',
    },
  ];
  return [
    getHeadConfig('仓库属性'),
    getTipConfig('注：仓库属性根据商品类目展示，仅仓库传输时使用，不展示在前端'),
    ...items,
  ];
};

// sku主图
const skuMainImageConfig = () => {
  const getFormConfig = skuCombs => {
    return {
      form: {
        inline: true,
      },
      items: [
        ...skuCombs.map((item, index) => {
          return uploadConfig({
            label: '黑色',
            props: {
              listType: 'picture-card',
              className: 'avatar-uploader',
            },
          });
        }),
      ],
    };
  };

  return () => {
    return [
      getHeadConfig('sku主图'),
      getTipConfig('sku主图：必填，分辨率（常方式），文件小于400KB!'),
      {
        listenKeys: ['skuCombs'],
        render(values) {
          const formConfig = getFormConfig(values.skuCombs);
          return <LeForm {...formConfig} />;
        },
      },
    ];
  };
};

// 商品属性
const goodsAttributesConfig = [
  getHeadConfig('商品属性'),
  {
    label: '保质期',
    name: 'shelf-life',
    props: {
      required: true,
    },
  },
  getTipConfig('注：根据商品类目不同，展示商品属性字段不同。'),
];

// 商品主图
const goodsMainImageConfig = [
  getHeadConfig('商品主图'),
  uploadConfig({
    label: '商品主图',
    name: 'goodsMainImage',
    props: {
      suffix: '必填，1-5张商品主图，分辨率xx,文件小于400KB)',
      required: true,
      listType: 'picture-card',
      className: 'avatar-uploader',
    },
  }),
  uploadConfig({
    label: '商品详情',
    name: 'goodsDetailImage',
    props: {
      top: '必填，图片宽度最小限制尺寸620！',
      listType: 'picture-card',
      className: 'avatar-uploader',
    },
  }),
];

// 底部按钮
const buttonsConfig = [
  {
    props: {
      type: 'primary',
      children: '保存',
      onClick(err, values, formCore) {},
    },
    options: {
      type: 'submit',
    },
  },
  {
    props: {
      children: '取消',
      onClick(err, values, formCore) {},
    },
  },
];

const initSkus = [
  {
    label: '颜色',
    name: 'sku-color',
    options: [
      {
        label: '黑色',
        value: 1,
      },
      {
        label: '白色',
        value: 2,
      },
    ],
  },
  {
    label: '尺码',
    name: 'sku-size',
    options: [
      {
        label: 'S码',
        value: 3,
      },
      {
        label: 'L码',
        value: 4,
      },
    ],
  },
];

export default {
  core: {
    values: {
      skuCombs: getSkusDataList(initSkus),
    },
  },
  items: [
    categoryConfig,
    baseInfoConfig,
    getSalesPropertyConfig(initSkus),
    warehouseAttributesConfig(),
    skuMainImageConfig(),
    goodsAttributesConfig,
    goodsMainImageConfig,
  ],
  buttons: buttonsConfig,
};
