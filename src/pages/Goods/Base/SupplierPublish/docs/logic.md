# 逻辑

## 新增逻辑

- 选择叶子类目，通过类目ID 获取 类目树，展示在当前选择的类目信息上
- 通过叶子类目ID，获取类目属性项，包括销售属性、商品属性、仓库属性、SKU主图逻辑
- 3种类目属性项，有7种类目属性值，包括1单选不可自定义、2单选可自定义、3多选不可自定义、4多选可自定义、5文本框、6日期、7时间
- 类目属性里的SKU主图逻辑，用于判断是否展示哪个销售属性的SKU主图
- 

### 字段

- **类目属性**
  - saleProperties 销售属性
  - goodsProperties 商品属性
  - warehouseProperties 仓库属性
  - 属性项
    - inputType 有7种类目属性值
    - isRequired 是否必填
    - propertyName 属性名称
    - propertyNameId 属性名称id
    - propertyPairs
      - id 属性键值对id
      - pvName 属性值
    - propertyType 2销售属性、3商品属性、4仓库属性
  - skuImagePropertyName SKU主图属性名称
  - skuImagePropertyId SKU主图属性名称id
  - isRequiredSKUImage 是否需要SKU主图
- 

## 编辑逻辑

### 字段

- itemImages 商品图片
- itemProperties 里包括了销售属性、商品属性、仓库属性
- skus 里包含了 skuProperties 组合信息、 skuImage 主图
