import React from 'react';
import moment from 'moment';
import { Tree } from 'antd';
import cascaderData from '../data/cascader-data';
import treeSelectData from '../data/tree-select-data';
import treeData from '../data/tree-data';
// import uploadRule from '../../rules/upload/index'

const { TreeNode } = Tree;

export default {
  core: {
    values: {
      gsId: '',
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
    // full: false, // 表单布局是否为占满宽度样式
    // inset: false, // 表单布局是否为inset样式
    layout: {
      // 表单布局 左侧和右侧比例
      label: 4,
      control: 20,
    },
  },

  items: [
    {
      label: '输入框',
      name: 'gsId',
      component: 'Input',
      value: '',
      follow: true,
      rules: {
        type: 'string',
        required: true,
        message: '请填写内容',
      },
      props: {
        placeholder: '请输入内容',
      },
    },
    {
      // label: '查询按钮',
      name: 'search',
      component: 'Button',
      inline: true,
      props(props, core) {
        return {
          type: 'primary',
          children: '搜索',
          icon: 'search',
          loading: !!core.getValue('gsId'),
          onClick(e, values, core) {},
        };
      },
    },
    {
      label: '优惠券发放',
      name: 'full',
      component: 'Input',
      follow: true,
      props: {
        prefix: '满',
        suffix: '元',
        style: {
          width: '80px',
        },
        help: 'help',
      },
      rules: {
        type: 'string',
        required: true,
        message: '请填写内容',
      },
    },
    {
      name: 'lose',
      component: 'Input',
      value: '',
      inline: true,
      props: {
        prefix: '减',
        suffix: '元',
        style: {
          width: '80px',
        },
        help: 'help',
      },
      rules: {
        type: 'string',
        required: true,
        message: '请填写内容',
      },
    },
    {
      name: 'number',
      component: 'Input',
      value: '',
      inline: true,
      props: {
        prefix: '发',
        suffix: '张',
        style: {
          width: '80px',
        },
        help: 'help',
      },
      rules: {
        type: 'string',
        required: true,
        message: '请填写内容',
      },
    },
    {
      label: '下拉列表',
      name: 'select',
      component: 'Select',
      value: 1,
      props: {
        placeholder: '请选择类型',
        options: [
          {
            label: '启用',
            value: 1,
          },
          {
            label: '停用',
            value: 0,
          },
        ],
      },
    },
    {
      label: '证件类型',
      name: 'certificateType',
      component: 'Select',
      value: 1,
      follow: true,
      props: {
        placeholder: '请选择证件类型',
        options: [
          {
            label: '身份证',
            value: 2,
          },
          {
            label: '驾驶证',
            value: 1,
          },
          {
            label: '居住证',
            value: 0,
          },
        ],
      },
    },
    {
      name: 'certificateText',
      inline: true,
      component: 'Input',
      value: '',
      props: {
        placeholder: '请输入证件号',
      },
    },
    {
      label: '复选框',
      name: 'checkbox',
      component: 'Checkbox',
      props: {
        placeholder: '请选择城市',
        children: '杭州',
      },
    },
    {
      label: '复选框组合',
      name: 'checkboxGroup',
      component: 'CheckboxGroup',
      value: [1],
      props: {
        placeholder: '请选择城市',
        options: [
          {
            label: '杭州',
            value: 1,
          },
          {
            label: '温州',
            value: 0,
          },
        ],
      },
    },
    {
      label: '单选',
      name: 'radio',
      component: 'Radio',
      value: false,
      props: {
        children: '不冻结',
      },
    },
    {
      label: '地址类型',
      name: 'urlType',
      component: 'RadioGroup',
      value: 1,
      props: {
        options: [
          {
            label: '小程序',
            value: 0,
          },
          {
            label: '乐高',
            value: 1,
          },
          {
            label: 'APP',
            value: 2,
          },
          {
            label: '外链',
            value: 3,
          },
        ],
        // onChange (e, core) {
        //     // window.core.setError('urlText', '')
        // }
      },
    },
    {
      label: '地址内容',
      name: 'urlText',
      component: 'Input',
      props: (props, core) => {
        let { options: urlTypeOptions } = core.getProps('urlType');
        let urlType = core.getValue('urlType');
        return {
          placeholder: '请输入地址' + urlTypeOptions[urlType].label,
        };
      },
      rules: (values, core) => {
        let { options: urlTypeOptions } = core.getProps('urlType');
        let urlType = core.getValue('urlType');

        return {
          required: true,
          message: `请填写${urlTypeOptions[urlType].label}地址`,
        };
      },
    },
    {
      label: '开关',
      name: 'switch',
      component: 'Switch',
      value: true,
      props: {
        checkedChildren: '开',
        unCheckedChildren: '关',
      },
    },
    {
      label: '滑动条',
      name: 'slider',
      component: 'Slider',
      value: 30,
      props: {
        max: 100,
        min: 0,
        style: {
          width: '200px',
        },
      },
    },
    {
      label: '日期选择框',
      name: 'datePicker',
      component: 'DatePicker',
      value: moment('2019-01-30 12:00:00'),
      props: {
        // format: "YYYY-MM-DD HH:mm",
        // showTime: true,
        placeholder: '请选择日期',
        top: 'top',
        prefix: 'prefix',
        help: 'help',
      },
    },
    {
      label: '时间选择框-范围',
      name: 'rangePicker',
      component: 'RangePicker',
      value: [moment('2019-01-10 12:00:00'), moment('2019-01-30 12:00:00')],
      props: {
        format: 'YYYY-MM-DD HH:mm',
        placeholder: ['请选择开始时间', '请选择结束时间'],
      },
    },
    {
      label: '评分',
      name: 'rate',
      component: 'Rate',
      value: 2.5,
    },
    {
      label: '级联选择',
      name: 'cascader',
      component: 'Cascader',
      value: ['zhejiang', 'hangzhou', 'xihu'],
      props: {
        placeholder: '请选择城市',
        options: cascaderData,
      },
    },
    {
      label: '树选择',
      name: 'treeSelect',
      component: 'TreeSelect',
      value: '0-0-2',
      props: {
        treeData: treeSelectData,
      },
    },
    // uploadRule({
    //     label: "微信二维码",
    //     name: "wechat-code",
    //     props: {
    //         listType: 'picture-card',
    //         className: 'avatar-uploader',
    //         beforeUpload: () => {},
    //         onChange: () => {},
    //         children: <span>111</span>
    //     },
    //     children () {
    //         return <span>222</span>
    //     }
    // }),
    // uploadRule({
    //     label: '身份证证件照',
    //     name: 'pic1',
    //     follow: true,
    //     props: {
    //         prefix: '正面:',
    //         listType: 'picture-card',
    //         className: 'avatar-uploader',
    //     }
    // }),
    // uploadRule({
    //     name: 'pic2',
    //     inline: true,
    //     props: {
    //         prefix: '反面:',
    //         listType: 'picture-card',
    //         className: 'avatar-uploader',
    //     }
    // }),
    {
      label: '数字输入框',
      name: 'inputNumber',
      component: 'InputNumber',
      value: 20,
    },
    {
      label: '自动完成',
      name: 'autoComplete',
      component: 'AutoComplete',
      props: {
        placeholder: '请输入',
        dataSource: ['11', '111', '1111'],
      },
    },
    {
      label: '树形控件',
      name: 'tree',
      component: 'Tree',
      className: 'le-form-item-tree',
      props: {
        checkable: true,
        defaultCheckedKeys: ['0-0-0'],
        className: 'le-tree',
        children: (() => {
          let renderTreeNodes = data =>
            data.map(item => {
              if (item.children) {
                return (
                  <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {renderTreeNodes(item.children)}
                  </TreeNode>
                );
              }
              return <TreeNode {...item} />;
            });

          return renderTreeNodes(treeData);
        })(),
      },
    },
    {
      label: '头像',
      name: 'avatar',
      component: 'Avatar',
      props: {
        size: 'default',
        style: {
          width: '32px',
          height: '32px',
          fontSize: '32px',
          backgroundColor: '#87d068',
        },
        icon: 'user',
      },
    },
    {
      // label: '',
      name: 'button1',
      component: 'Button',
      follow: true,
      props: {
        type: 'primary',
        children: '查询',
        onClick(error, values, core) {},
      },
      options: {
        type: 'submit',
        validate: true,
      },
    },
    {
      // label: '',
      name: 'button2',
      component: 'Button',
      inline: true,
      props: {
        children: '重置',
        onClick(error, values, core) {
          debugger;
        },
      },
      options: {
        type: 'reset',
      },
    },
    {
      // label: '',
      name: 'button3',
      component: 'Button',
      inline: true,
      props: {
        children: '导出',
        onClick(error, values, core) {},
      },
      options: {
        type: 'none',
      },
    },
  ],

  buttons: [
    {
      props: {
        children: '查询2',
        onClick(error, values, core) {},
      },
      options: {
        type: 'submit',
        validate: true, // default true
        validateWithoutRender: true,
      },
    },
    {
      props: {
        children: '重置2',
        onClick(error, values, core) {},
      },
      options: {
        type: 'reset',
      },
    },
    {
      props: {
        children: '导出2',
        onClick(error, values, core) {},
      },
      options: {
        type: 'none',
        validate: true,
      },
    },
  ],
};
