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

- **发布商品**

``` json
{
  "brandName": "测试品牌",
  "categoryId": 20005,
  "desc": "商品短名称",
  "has69": true,
  "imageDetailList": [{
    "height": 200,
    "order": 1,
    "type": 1,
    "url": "https://img.gegejia.com/life-mini/share/product/d0a8ea1a-32c1-4f6d-8883-290266b97437.png",
    "width": 200
  }],
  "name": "商品长名称",
  "productPropertyList": [{
    "propertyId": 6802,
    "propertyValue": [{
      "id": 9562,
      "pvName": "中国"
    }]
  }],
  "salePropertyList": [{
    "costPrice": 100,
    "deliverCode": "D01",
    "limitNum": 20,
    "propertyPairIds": [75798, 75799, 75800],
    "status": 1,
    "stockCount": 100
  }],
  "shopId": 11187,
  "skuImageList": [{
    "height": 200,
    "propertyPairId": 75798,
    "pvName": "颜色杨珊妮颜",
    "sortOrder": 1,
    "type": 1,
    "url": "https://img.gegejia.com/life-mini/share/product/d0a8ea1a-32c1-4f6d-8883-290266b97437.png",
    "width": 200
  }],
  "warehousePropertyList": [{
    "propertyId": 6809,
    "propertyValue": [{
      "id": 14432,
      "pvName": "2020-01-01"
    }]
  }]
}
```
