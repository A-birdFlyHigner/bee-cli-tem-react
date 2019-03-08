import { Input, Radio } from 'antd'
import React from 'react'
import Sty from '../Index.less'

const RadioGroup = Radio.Group;

const changeSelect = (e) => {
  console.log('radio checked', e.target.value);
}

export default [
  {
    label: '审核结果',
    className: 'box-header',
  }, {
    render: () => {
      return (
        <RadioGroup onChange={changeSelect}>
          <Radio className={Sty.radioRejuct} value={1}>
            拒绝 <Input placeholder="请输入拒绝原因，不超过20个字" maxLength='20' />
          </Radio>
          <Radio className={Sty.radioPass} value={2}>
            通过 <span className={Sty.passMessage}>请设置会员佣金</span>
          </Radio>
        </RadioGroup>
      )
    }

  }, 
]