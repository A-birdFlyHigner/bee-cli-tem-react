import Mock from 'mockjs'
import moment from 'moment'

export default (queryParams) => {
    const { pageSize, currentPage } = queryParams
    const index = pageSize * (currentPage - 1)

    // 使用 Mock
    const data = Mock.mock({
        'dataList|20': [{
            "applyPromotionTime": moment().subtract(10, 'days').calendar(),
            "brandName": "服装/衣服",
            "categoryId+1": index,
            "categoryName": "string",
            "cityCode": "string",
            "deliverCode": "string",
            "desc": "@ctitle(10,20)",
            "detailImages": [
              {
                "height": 0,
                "order": 0,
                "type": 0,
                "url": "string",
                "width": 0
              }
            ],
            "dispatchDate": 0,
            "logisticsMethod": 0,
            "logisticsType": 0,
            "mainImages": [
              {
                "height": 0,
                "order": 0,
                "type": 0,
                "url": "string",
                "width": 0
              }
            ],
            "name": "@ctitle(5,10)",
            "pathName": "string",
            "properties": [
              {
                "propertyName": "string",
                "propertyNameId": 0,
                "propertyType": 0,
                "propertyValue": [
                  "string"
                ]
              }
            ],
            "saleGoodsId": 0,
            "salePrice": "string",
            "saleStatus": 0,
            "saleStock": 0,
            "saleUnits": [
              {
                "availStock": 0,
                "costPrice": 0,
                "deliverCode": "string",
                "grossProfit": 0,
                "imageUrl": "string",
                "limitNum": 0,
                "marketPrice": 0,
                "memberPrice": 0,
                "nonmemberPrice": 0,
                "notDeliverLockStock": 0,
                "notPayLockStock": 0,
                "propertyPairIds": [
                  0
                ],
                "propertyPairList": [
                  "string"
                ],
                "skuId": 0,
                "spreadStock": 0,
                "xqlSalesCount": 0
              }
            ],
            "sellerMainId": 0,
            "status": 0,
            "totalStock": 0,
            "warehouseProperties": [
              {
                "propertyName": "string",
                "propertyNameId": 0,
                "propertyType": 0,
                "propertyValue": [
                  "string"
                ]
              }
            ]
        }]
    });

    return {
        dataList: data.dataList,
        total: 400,
        totalPage: 400 / pageSize,
        pageSize,
        currentPage
    }
}