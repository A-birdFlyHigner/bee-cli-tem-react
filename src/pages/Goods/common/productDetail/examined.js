import { Input, Radio } from 'antd'
import React from 'react'
import Sty from '../index.less'

const RadioGroup = Radio.Group;

const changeSelect = (e, leFormCore) => {
  const status = e.target.value
  if (status === 1) {
    leFormCore.setValue('examineData', {
      ...leFormCore.getValue('examineData'),
      chooseType: e.target.value,
      rejuctReason: ''
    })
  } else {
    leFormCore.setValue('examineData', {
      ...leFormCore.getValue('examineData'),
      chooseType: e.target.value,
    })
  }
}

const changeReason = (e, leFormCore) => {
  leFormCore.setValue('examineData', {
    ...leFormCore.getValue('examineData'),
    rejuctReason: e.target.value
  })
}

export default function () {
  return () => {
    return [
      {
        label: '审核结果',
        className: 'box-header',
      }, 
      {
        name: 'examineData',
        component: 'Item',
        // 初始化数据 相当于了此Item的状态值
        value: {
          rejuctReason: '',  // 拒绝原因
          chooseType: 1,     // 1 通过 2 拒绝
        },
        render(value, leFormCore) {
          const { examineData } = value
          return (
            <div className={Sty.examineRadio}>
              <RadioGroup onChange={e => changeSelect(e,leFormCore)} value={examineData.chooseType}>
                <Radio key={2} className={Sty.radioRejuct} value={2}>
                  拒绝 {examineData.chooseType === 2 ? <Input onChange={e => changeReason(e,leFormCore)} placeholder="必填，请输入拒绝原因，不超过20个字" maxLength={20} />:null}
                </Radio>
                <Radio key={1} className={Sty.radioPass} value={1}>
                  通过
                </Radio>
              </RadioGroup>
            </div>        
          )
        }
    
      }, 
    ]

    
  }
}
