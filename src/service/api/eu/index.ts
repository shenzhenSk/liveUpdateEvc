import http from '@/service/http';
import type { requestType, paramsType } from '@/service/http';
/**
 * buCode,storeId,language, will be injected into the params object in the entry file;
 */
export default {
  //查询列表
  search: (params: paramsType) => {
    return http({
      method: 'get',
      url: '/asw/europe/osp/items',
      params,
    } as requestType);
  },
  eventCountPlans: (params: paramsType) => {
    return http({
      method: 'get',
      url: `/asw/europe/osp/stockCount/eventCount/v1.0.0/${params.buCode}/${params.storeId}/plan`,
      params,
    } as requestType);
  },
  eventCountAddPlans: (data: paramsType) => {
    const { storeId, countId, buCode, language, context, keyword } = data;
    return http({
      method: 'post',
      url: `/asw/europe/osp/stockCount/eventCount/v1.0.0/${buCode}/${storeId}/${context}/${countId}/items/${keyword}?language=${language}`,
      data,
    } as requestType);
  },
};
