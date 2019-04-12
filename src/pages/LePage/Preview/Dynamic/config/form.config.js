import React from 'react'

export default {
  settings: {
    value: {name: '', city: ''},
    globalStatus: 'preview',
  },

  form: {
    layout: {
      label: 'w120',
    },
  },

  items: [
    {
      label: '姓名',
      name: 'name',
    },
    {
      label: '手机号',
      name: 'phone',
    },
    {
      label: '证件类型',
      name: 'type',
    },
    {
      label: '证件号码',
      name: 'typeNumber',
    },
    {
      label: '城市',
      name: 'city',
    },
    {
      label: '详细信息',
      name: 'detail',
      component: 'Item',
      props: {
        style: {
          margin: '20px 0 0 0'
        }
      },
      render(values) {
        const { name, city } = values
        const div = <div style={{margin: '10px 0 0 40px'}}>{`姓名:${name} - 城市:${city}`}</div>
        return name === null ? null : div
      },
    },
  ],
};
