import { createRequest, RequestFun, BUILD_ENV_ENUM } from '@bee/utils'

/**
 * 接口的原始参数类型.
 */
export interface RawType<DataType> {
  /**
   * 接口数据
   */
  code: number

  /**
   * 提示信息.
   */
  message: string

  /**
   * 业务数据.
   */
  data?: DataType
}
console.log('BUILD_ENV', BUILD_ENV)
const request: RequestFun = createRequest({
  useMock: process.env.NODE_ENV !== 'production',
  env: <BUILD_ENV_ENUM>BUILD_ENV, // development test  prview production
  successChecker: ({ code }: RawType<any>) => 0 === code
})

export default request
