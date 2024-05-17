// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加AGV POST /sim/add */
export async function addAgv(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addAgvParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultVoid>('/sim/add', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
