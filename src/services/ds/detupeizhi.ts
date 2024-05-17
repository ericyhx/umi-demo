// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新增地图 POST /map/add */
export async function addMap(body: API.MapConfigDTO, options?: { [key: string]: any }) {
  return request<API.ResultVoid>('/map/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 全部地图配置 GET /map/all/config */
export async function allMapConfig(options?: { [key: string]: any }) {
  return request<API.ResultListMapConfigDTO>('/map/all/config', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 全部地图 GET /map/all/map */
export async function allMap(options?: { [key: string]: any }) {
  return request<API.ResultListMapDataDTO>('/map/all/map', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除地图 DELETE /map/delete */
export async function deleteMap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMapParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid>('/map/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
