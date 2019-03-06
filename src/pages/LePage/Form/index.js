import React, { Component } from 'react';
import { LeForm } from '@lib/lepage';
import { formConfig } from './config';
import './index.less';

class FormDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formConfig,
    };
  }

  render() {
    const { state } = this;
    return <LeForm {...state.formConfig} />;
  }
}

export default FormDemo;

// const dialogFormConfig = {
//     items: [
//         {
//             label: "输入框1",
//             name: "input",
//             component: "Input",
//             value: '',
//             rules: {
//                 type: "string",
//                 required: true,
//                 message: '请填写内容'
//             },
//             props: {
//                 placeholder: '请输入内容'
//             },
//         },
//     ],
//     buttons: [{
//         props: {
//             type: 'primary',
//             children: '导出2',
//             onClick (error, values, leForm) {}
//         },
//         options: {
//             type: 'none',
//             validate: true
//         }
//     }]
// }

