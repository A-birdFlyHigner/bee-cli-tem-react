import baseInfo from './baseInfo'
import salseInfo from './salseInfo'
import salseEdit from './salseEdit'
import logistics from './logistics'
import wareHouse from './wareHouse'
import skuMainImg from './skuImg'
import productInfo from './productInfo'
import productImg from './productImg'
import examined from './examined'

const onChange = (changeKeys, values, core) => {
  const {techServiceRate} = values
  const skuList = values.saleUnits.map(sku => {
    const {memberPrice, nonmemberPrice, costPrice, grossProfit} = sku
    const grossNum = (grossProfit === '-' || grossProfit === '-.' || grossProfit === '.') ? '0' : grossProfit
    const memeberCommission = (Number(Number(memberPrice).mul(10000) - Number(memberPrice).mul(Number(techServiceRate).mul(100)) - Number(costPrice).mul(10000) - Number(grossNum).mul(10000)).div(10000)).toFixed(2)
    const noMemeberCommission = (Number(Number(nonmemberPrice).mul(10000) - Number(nonmemberPrice).mul(Number(techServiceRate).mul(100)) - Number(costPrice).mul(10000) - Number(grossNum).mul(10000)).div(10000)).toFixed(2)
    return {
      ...sku,
      memeberCommission,
      noMemeberCommission,
    }
  })
  core.setValue({
    saleUnits: skuList
  })
}

export {
  baseInfo,
  salseInfo,
  salseEdit,
  logistics,
  wareHouse,
  skuMainImg,
  productInfo,
  productImg,
  examined,
  onChange
}