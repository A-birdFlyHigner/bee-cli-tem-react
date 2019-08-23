import request, { RawType } from 'api/request'
import { SelectSearchData, SelectSearchReq } from './types/select-search'

export async function selectSearchListAll(data: SelectSearchReq): Promise<SelectSearchData> {
  const response = await request<SelectSearchData, RawType<SelectSearchData>>(
    '/ruban-admin/api/tarzan/search/listAll',
    { method: 'POST', data }
  )
  return response.data
}

export async function selectSearchListMy(data: SelectSearchReq): Promise<SelectSearchData> {
  const response = await request<SelectSearchData, RawType<SelectSearchData>>(
    '/ruban-admin/api/tarzan/search/mySelections',
    { method: 'POST', data }
  )
  return response.data
}
