import { createRequest } from '@bee/utils'

const request = createRequest({
  nameSpace: '/goodsAdmin',
  mockPath: '/mock/goodsAdmin',
  useMock: process.env.NODE_ENV !== 'production'
})

export default request
