import router from 'umi/router';

const emptyFormatFn = (arg) => arg

const trim = (value = '') => {
  if (typeof value !== 'string') {
    return value
  }
  return value.trim()
}

const pick = (object, ...paths) => {
  const result = {}
  paths.forEach(path => {
    result[path] = object[path]
  })
  return result
}

const formatOptions = [
  {
    name: 'categoryId',
    handle: emptyFormatFn,
  },
  {
    name: 'name',
    handle: trim,
  },
  {
    name: 'desc',
    handle: trim,
  },
  {
    name: 'brandName',
    handle: trim,
  },
  {
    name: 'has69',
    handle: emptyFormatFn,
  },
  {
    name: 'salePropertyList', // from skus field
    proxyName: 'skus',
    handle: (list) => {

    },
  },
  {
    name: 'skuMainImageList',
    handle: (list) => {
      if (!list || list.length === 0) return null

      return list.map((item, index) => {
        return {
          ...pick(item, ['url', 'width', 'height']),
          sortOrder: index,
          type: 1, // 1 图片、 2 视频
          // TODO:
          propertyPairId: '', // 属性对Id
          id: 0, // 图片表Id
        }
      })
    },
  },
  {
    name: 'goodsPropertyList',
    handle: (list) => {

    },
  },
  {
    name: 'warehousePropertyList',
    handle: (list) => {

    },
  },
  {
    name: 'goodsMainImageList',
    handle: (list) => {
      if (!list || list.length === 0) return null

      return list.map((item, index) => {
        return {
          ...pick(item, ['url', 'width', 'height']),
          order: index,
          type: 2, // 2 商品主图
        }
      })
    },
  },
  {
    name: 'goodsDetailImageList',
    handle: (list) => {
      if (!list || list.length === 0) return null

      return list.map((item, index) => {
        return {
          ...pick(item, ['url', 'width', 'height']),
          order: index,
          type: 1, // 1 商品详情图
        }
      })
    },
  }
]

const getFormatValues = (values, leForm) => {
  const formatValues = {}

  formatOptions
  .map((option) => {
    const { name, proxyName = name, handle = emptyFormatFn } = option
    const value = values[proxyName]
    return {
      name,
      value: handle(value, leForm)
    }
  })
  .forEach(({ name, value }) => {
    if (value === null || value === undefined) {
      return
    }
    formatValues[name] = value
  })

  return formatValues
}
// 获取底部按钮表单配置
const getButtonsConfig = () => {
  return [{
      props: {
        type: 'primary',
        children: '保存',
        onClick(err, values, leForm) {
          if (err) return

          const formatValues = getFormatValues(values, leForm)

          window.console.log('formatValues: ', formatValues)
        }
      },
      options: {
        type: 'submit',
      },
    },
    {
      props: {
        children: '取消',
        onClick() {
          router.goBack()
        }
      },
    }
  ]
}

export default getButtonsConfig
