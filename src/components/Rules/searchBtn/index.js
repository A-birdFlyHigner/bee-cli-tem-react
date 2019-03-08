// import { message } from 'antd';
// const DEFAULT_LABEL = {
//   submit: '查询',
//   reset: '重置',
//   export: '导出',
// };

// export default (options, self) => {
//   const { queryList, exportList } = options;
//   const btns = [];
//   options.btns.forEach(p => {
//     btns.push(makeItem(p));
//     // if (p === 'submit') {
//     //   btns.push({
//     //     props: {
//     //       children: '查询',
//     //       onClick (error, values, core,) {
//     //         if (error) {
//     //           for (let i in error.result) {
//     //             message.warning(error.result[i])
//     //           }
//     //           return
//     //         }
//     //         queryList({
//     //           page: 1,
//     //           ...values
//     //         })
//     //       }
//     //     },
//     //     options: {
//     //       type: 'submit',
//     //       validateWithoutRender: true
//     //     }
//     //   })
//     // } else if (p === 'reset') {
//     //   btns.push({
//     //     props: {
//     //       children: '重置',
//     //       onClick (error, values, core) {
//     //         let newVal = core.getValues()
//     //         queryList({
//     //           page: 1,
//     //           ...newVal
//     //         })
//     //       }
//     //     },
//     //     options: {
//     //       type: 'reset',
//     //     }
//     //   })
//     // }
//   });

//   // 处理error信息
//   function errorMessage(error = []) {
//     for (let i in error.result) {
//       message.warning(error.result[i]);
//     }
//   }

//   // 构造按钮参数
//   function makeItem(type) {
//     return {
//       props: {
//         children: DEFAULT_LABEL[type],
//         onClick(error, values, core) {
//           if (type === 'submit') {
//             if (error) {
//               errorMessage(error);
//               return;
//             }
//             queryList({ page: 1, ...values });
//           } else if (type === 'reset') {
//             let newVal = core.getValues();
//             queryList({ page: 1, ...newVal });
//           } else if (type === 'export') {
//             exportList(values);
//           }
//         },
//       },
//       options: {
//         type: type,
//         validateWithoutRender: true,
//       },
//     };
//   }
//   return btns;
// };
