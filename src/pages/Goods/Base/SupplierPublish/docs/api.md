# 数据接口结构

- **通过叶子节点获取类目信息**

``` json
{
  booleanIsLeaf: true
  createTime: 1544699635000
  id: 3041
  level: 3
  name: "话费"
  parentId: 3012
  path: "/2997/3012/3041/"
  pathName: "生活服务,虚拟充值,话费"
  sortOrder: 9021
  updateTime: 1544699635000
}
```

- **获取类目属性**

``` json
{
  "status": 1,
  "errorCode": 0,
  "data": {
    "keyProperties": [],
    "goodsProperties": [{
        "propertyNameId": 6810,
        "propertyName": "适用人群",
        "isRequired": false,
        "inputType": 5,
        "sortOrder": 9,
        "modifyType": 1,
        "isUsedInSKU": null,
        "propertyType": 3,
        "propertyPairs": null
      },
      {
        "propertyNameId": 6807,
        "propertyName": "储藏方法",
        "isRequired": false,
        "inputType": 5,
        "sortOrder": 6,
        "modifyType": 1,
        "isUsedInSKU": null,
        "propertyType": 3,
        "propertyPairs": null
      },
      {
        "propertyNameId": 6806,
        "propertyName": "保质期",
        "isRequired": false,
        "inputType": 5,
        "sortOrder": 5,
        "modifyType": 1,
        "isUsedInSKU": null,
        "propertyType": 3,
        "propertyPairs": null
      },
      {
        "propertyNameId": 6805,
        "propertyName": "净含量",
        "isRequired": false,
        "inputType": 5,
        "sortOrder": 4,
        "modifyType": 1,
        "isUsedInSKU": null,
        "propertyType": 3,
        "propertyPairs": null
      },
      {
        "propertyNameId": 6803,
        "propertyName": "生产日期展示",
        "isRequired": false,
        "inputType": 2,
        "sortOrder": 3,
        "modifyType": 1,
        "isUsedInSKU": null,
        "propertyTy pe": 3,
        "propertyPairs": [{
            "id": 9415,
            "propertyNameId": 6803,
            "pnName": "生产日期展示",
            "pvName": "见实物外包装",
            "propertyValueId": 8432,
            "order": null
          },
          {
            "id": 9428,
            "propertyNameId": 6803,
            "pnName": "生产日期展示",
            "pvName": "不展示生产日期",
            "propertyValueId": 8444,
            "order": null
          }
        ]
      },
      {
        "propertyNameId": 6802,
        "propertyName": "国家",
        "isRequired": false,
        "inputType": 2,
        "sortOrder": 2,
        "modifyType": 1,
        "isUsedInSKU": null,
        "propertyType": 3,
        "propertyPairs": [{
            "id": 9414,
            "propertyNameId": 6802,
            "pnName": "国家",
            "pvName": "日本",
            "propertyValueId": 8431,
            "order": null
          },
          {
            "id": 20759,
            "propertyNameId": 6802,
            "pnName": "国家",
            "pvName": "希腊",
            "propertyValueId": 19332,
            "order": null
          }
        ]
      },
      {
        "propertyNameId": 6811,
        "propertyName": "使用方法",
        "isRequired": false,
        "inputType": 5,
        "sortOrder": 1,
        "modifyType": 1,
        "isUsedInSKU": null,
        "propertyType": 3,
        "propertyPairs": null
      }
    ],
    "saleProperties": [{
        "propertyNameId": 6830,
        "propertyName": "颜色杨珊妮颜",
        "isRequired": false,
        "inputType": 4,
        "sortOrder": 2,
        "modifyType": 1,
        "isUsedInSKU": true,
        "propertyType": 2,
        "propertyPairs": [{
            "id": 75798,
            "propertyNameId": 6830,
            "pnName": "颜色杨珊妮颜",
            "pvName": "313",
            "propertyValueId": 72124,
            "order": null
          },
          {
            "id": 75807,
            "propertyNameId": 6830,
            "pnName": "颜色杨珊妮颜",
            "pvName": "2345345",
            "propertyValueId": 72133,
            "order": null
          }
        ]
      },
      {
        "propertyNameId": 6801,
        "propertyName": "产地",
        "isRequired": false,
        "inputType": 4,
        "sortOrder": 1,
        "modifyType": 1,
        "isUsedInSKU": true,
        "propertyType": 2,
        "propertyPairs": [{
            "id": 9426,
            "propertyNameId": 6801,
            "pnName": "产地",
            "pvName": "韩国",
            "propertyValueId": 8443,
            "order": null
          },
          {
            "id": 9955,
            "propertyNameId": 6801,
            "pnName": "产地",
            "pvName": "中国",
            "propertyValueId": 8575,
            "order": null
          }
        ]
      }
    ],
    "warehouseProperties": [{
      "propertyNameId": 6809,
      "propertyName": "过期时间",
      "isRequired": false,
      "inputType": 6,
      "sortOrder": 8,
      "modifyType": 1,
      "isUsedInSKU": null,
      "propertyType": 4,
      "propertyPairs": [{
          "id": 9508,
          "propertyNameId": 6809,
          "pnName": "过期时间",
          "pvName": "2019-07-01",
          "propertyValueId": 8523,
          "order": null
        }
      ]
    }],
    "isRequiredSKUImage": true,
    "skuImagePropertyId": 6830,
    "skuImagePropertyName": "颜色杨珊妮颜"
  },
  "errorMessage": null,
  "code": 0,
  "message": null
}
```

- **发布商品**

``` json
{
  "brandName": "测试品牌",
  "categoryId": 20005, // 类目ID，新增才有
  "desc": "商品短名称",
  "has69": true,
  "goodsDetailImageList": [{ // 商品详情图
    "height": 200,
    "order": 1,
    "type": 1, // 1 表示商品详情图
    "url": "https://img.gegejia.com/life-mini/share/product/d0a8ea1a-32c1-4f6d-8883-290266b97437.png",
    "width": 200
  }],
  "goodsMainImageList": [{ // 商品主图
    "height": 200,
    "order": 1,
    "type": 2, // 2 表示商品主图
    "url": "https://img.gegejia.com/life-mini/share/product/d0a8ea1a-32c1-4f6d-8883-290266b97437.png",
    "width": 200
  }],
  "name": "商品长名称",
  "goodsPropertyList": [{ // 商品属性
    "propertyId": 6802,
    "propertyValue": [{
      "id": 9562,
      "pvName": "中国"
    }]
  }],
  "salePropertyList": [{ // 销售属性
    "costPrice": 100, // 成本价, 单位分
    "deliverCode": "D01",// 发货编码
    "restriction": 20, // sku限购数量
    "propertyPairIds": [75798, 75799, 75800],
    "status": 1, // 1可用，0停用
  }],
  "skuMainImageList": [{ // SKU 主图
    "height": 200,
    "propertyPairId": 75798,
    "pvName": "颜色杨珊妮颜",
    "sortOrder": 1,
    "type": 1, // 1 图片、 2 视频
    "url": "https://img.gegejia.com/life-mini/share/product/d0a8ea1a-32c1-4f6d-8883-290266b97437.png",
    "width": 200
  }],
  "warehousePropertyList": [{ // 销售属性
    "propertyId": 6809,
    "propertyValue": [{/*  */
      "id": 14432,
      "pvName": "2020-01-01"
    }]
  }]
}
```

- **商品查询**

```json
{
  "status": 1,
  "errorCode": 0,
  "data": {
    "saleGoodsId": 117491, // 商品ID，编辑才有
    "name": "商品长名称",
    "desc": "商品短名称",
    "brandName": "测试品牌",
    "saleStatus": 0,
    "status": 1,
    "sellerMainId": 11210,
    "categoryId": 20005,
    "categoryName": "身体护理",
    "pathName": "洗护清洁剂/卫生巾/纸/香薰,身体护理",
    "mainImages": [{
      "url": "https://img.gegejia.com/life-mini/share/product/d0a8ea1a-32c1-4f6d-8883-290266b97437.png",
      "width": 200,
      "height": 200
    }],
    "detailImages": [{
      "url": "https://img.gegejia.com/life-mini/share/product/d0a8ea1a-32c1-4f6d-8883-290266b97437.png",
      "width": 420,
      "height": 336
    }],
    "saleUnits": [{
      "propertyPairIds": [75798, 9955],
      "propertyPairList": ["颜色杨珊妮颜", "产地"],
      "skuId": 134540,
      "xqlSalesCount": 0,
      "imageUrl": "https://img.gegejia.com/2a805d7ee5be4f289134234a6d72dc69.png",
      "restriction": 20,
      "costPrice": 1.00,
      "marketPrice": 0.00,
      "nonmemberPrice": 0.00,
      "memberPrice": 0.00,
      "grossProfit": 0.00,
      "deliverCode": "D071552036558155",
      "spreadStock": 100,
      "notDeliverLockStock": 0,
      "notPayLockStock": 0,
      "availStock": 100
    }, {
      "propertyPairIds": [75798, 9426],
      "propertyPairList": ["颜色杨珊妮颜", "产地"],
      "skuId": 134541,
      "xqlSalesCount": 0,
      "imageUrl": "https://img.gegejia.com/2a805d7ee5be4f289134234a6d72dc69.png",
      "restriction": 20,
      "costPrice": 1.00,
      "marketPrice": 0.00,
      "nonmemberPrice": 0.00,
      "memberPrice": 0.00,
      "grossProfit": 0.00,
      "deliverCode": "D081552036558155",
      "spreadStock": 100,
      "notDeliverLockStock": 0,
      "notPayLockStock": 0,
      "availStock": 100
    }],
    "saleUnitImages": [{
      "id": 3669,
      "saleGoodsId": 117491,
      "propertyPairId": 75798,
      "url": "https://img.gegejia.com/2a805d7ee5be4f289134234a6d72dc69.png",
      "width": 0,
      "height": 0,
      "sortOrder": 1
    }],
    "properties": [{
      "propertyName": "国家",
      "propertyValue": ["中国"],
      "propertyNameId": 6802,
      "propertyType": 3
    }],
    "warehouseProperties": [{
      "propertyName": "过期时间",
      "propertyValue": ["2020-01-01"],
      "propertyNameId": 6809,
      "propertyType": 4
    }],
    "deliverCode": null,
    "logisticsMethod": 1,
    "logisticsType": 1,
    "dispatchDate": 0,
    "salePrice": "1.00~1.00",
    "cityCode": null,
    "applyPromotionTime": null,
    "totalStock": null,
    "saleStock": null
  },
  "errorMessage": null,
  "code": 0,
  "message": null
}
```

- **商品列表**

```json
{
  "status": 1,
  "errorCode": 0,
  "data": {
    "list": [{
      "saleGoodsId": 117491,
      "name": "商品长名称",
      "desc": "商品短名称",
      "brandName": "测试品牌",
      "saleStatus": 0,
      "status": 1,
      "sellerMainId": 11210,
      "categoryId": 20005,
      "categoryName": "身体护理",
      "pathName": "洗护清洁剂/卫生巾/纸/香薰,身体护理",
      "mainImages": [{
        "url": "https://img.gegejia.com/life-mini/share/product/d0a8ea1a-32c1-4f6d-8883-290266b97437.png",
        "width": 200,
        "height": 200
      }],
      "detailImages": [{
        "url": "https://img.gegejia.com/life-mini/share/product/d0a8ea1a-32c1-4f6d-8883-290266b97437.png",
        "width": 420,
        "height": 336
      }],
      "saleUnits": [{
        "propertyPairIds": [75798, 9955],
        "propertyPairList": ["颜色杨珊妮颜", "产地"],
        "skuId": 134540,
        "xqlSalesCount": 0,
        "imageUrl": "https://img.gegejia.com/2a805d7ee5be4f289134234a6d72dc69.png",
        "restriction": 20,
        "costPrice": 1.00,
        "marketPrice": 0.00,
        "nonmemberPrice": 0.00,
        "memberPrice": 0.00,
        "grossProfit": 0.00,
        "deliverCode": "D071552036558155",
        "spreadStock": 100,
        "notDeliverLockStock": 0,
        "notPayLockStock": 0,
        "availStock": 100
      }, {
        "propertyPairIds": [75798, 9426],
        "propertyPairList": ["颜色杨珊妮颜", "产地"],
        "skuId": 134541,
        "xqlSalesCount": 0,
        "imageUrl": "https://img.gegejia.com/2a805d7ee5be4f289134234a6d72dc69.png",
        "restriction": 20,
        "costPrice": 1.00,
        "marketPrice": 0.00,
        "nonmemberPrice": 0.00,
        "memberPrice": 0.00,
        "grossProfit": 0.00,
        "deliverCode": "D081552036558155",
        "spreadStock": 100,
        "notDeliverLockStock": 0,
        "notPayLockStock": 0,
        "availStock": 100
      }],
      "saleUnitImages": [{
        "id": 3669,
        "saleGoodsId": 117491,
        "propertyPairId": 75798,
        "url": "https://img.gegejia.com/2a805d7ee5be4f289134234a6d72dc69.png",
        "width": 0,
        "height": 0,
        "sortOrder": 1
      }],
      "properties": [{
        "propertyName": "国家",
        "propertyValue": ["中国"],
        "propertyNameId": 6802,
        "propertyType": 3
      }],
      "warehouseProperties": [{
        "propertyName": "过期时间",
        "propertyValue": ["2020-01-01"],
        "propertyNameId": 6809,
        "propertyType": 4
      }],
      "logisticsMethod": 1,
      "logisticsType": 1,
      "dispatchDate": 0,
      "salePrice": "1.00",
      "cityCode": null,
      "applyPromotionTime": null,
      "totalStock": null,
      "saleStock": null
    }],
    "total": 1
  },
  "errorMessage": null,
  "code": 0,
  "message": null
}
```
