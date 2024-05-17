// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 增加配置 POST /rm/add */
export async function addRm(body: API.RobotModelDTO, options?: { [key: string]: any }) {
  return request<API.ResultVoid>('/rm/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 全部车型配置 GET /rm/all */
export async function allRm(options?: { [key: string]: any }) {
  return request<API.ResultListRobotModelDTO>('/rm/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除配置 DELETE /rm/delete */
export async function deleteRm(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRmParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid>('/rm/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 禁用配置 POST /rm/disable */
export async function disableRm(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.disableRmParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid>('/rm/disable', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 启用配置 POST /rm/enable */
export async function enableRm(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.enableRmParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid>('/rm/enable', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新配置 POST /rm/update */
export async function updateRm(body: API.RobotModelDTO, options?: { [key: string]: any }) {
  return request<API.ResultVoid>('/rm/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
