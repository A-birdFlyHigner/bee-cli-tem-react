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
    const memeberCommission = ((memberPrice*10000 - memberPrice*techServiceRate*100 - costPrice*10000 - (grossProfit==='-'? '0' : grossProfit)*10000)/10000).toFixed(2)
    const noMemeberCommission = ((nonmemberPrice*10000 - nonmemberPrice*techServiceRate*100 - costPrice*10000 - (grossProfit==='-'? '0' : grossProfit)*10000)/10000).toFixed(2)
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