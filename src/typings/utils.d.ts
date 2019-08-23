declare module '@bee/utils' {
  /**
   * response的数据结构.
   */
  export interface DataResponse<DataType, RawType> {
    /**
     * 返回值的成功标志， 1表示成功
     */
    code: number

    /**
     * 接口调用的业务情况描述.
     */
    message: string

    /**
     * 业务数据，具体而定.
     */
    data: DataType

    /**
     * 是否成功.
     */
    success: boolean

    /**
     * 原始响应数据。
     */
    raw: RawType
  }

  enum BUILD_ENV_ENUM {
    DEVELOPMENT = 'development',
    TEST = 'test',
    PRVIEW = 'prview',
    production = 'production'
  }

  enum GW {
    NG = '',
    GGJ = 'ggj'
  }

  export type RequestFun = <T, R>(
    url: string,
    options: {
      data?: any
      method: 'POST' | 'GET' | 'DELETE' | 'PUSH'
      option?: {
        gw?: GW
        noToast?: boolean
      }
    }
  ) => DataResponse<T, R>
  RequestFun.GW = GW
  export function createRequest<RawType>(options: {
    useMock: Boolean
    env: BUILD_ENV
    host?: GW
    successChecker?: <T>(raw: RawType) => boolean
  }): RequestFun<RawType<T>>
}
