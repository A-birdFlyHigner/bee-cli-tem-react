export interface SelectSearchItem {
  channel?: number

  channelName?: string

  code?: string

  creatorName?: string

  id?: number

  moduleType?: number

  name?: string

  operator?: number

  type?: number

  typeName?: string
}

export class SelectSearchData {
  viewList?: SelectSearchItem[]

  total?: number
}

export enum CHANNELS {}

//   <Option key={1} value={1}>
//   捕手/斑马
// </Option>,
// <Option key={4} value={4}>
//   美食买手
// </Option>,
// <Option key={5} value={5}>
//   斑马优选
// </Option>,
// <Option key={2} value={2}>
//   本地生活
// </Option>,
// <Option key={3} value={3}>
//   小区乐

export interface SelectSearchReq {
  page?: number
  pageSize?: number
  name?: string //选品名称(模糊查询)
  channel: CHANNELS // 渠道,
  checkCreator?: boolean
  code?: string //选品code,
  creators?: number[]
  ids?: number[]
  start?: number
  type?: number //类型,
  userId?: number //用户id,
  userName?: string //创建人名称(模糊查询)
}
