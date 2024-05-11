import http from '@/service/http';
import type { requestType, paramsType } from '@/service/http';
/**
 * buCode,storeId,language, will be injected into the params object in the entry file;
 */
export default {
  search: (params: paramsType) => {
    return http({
      method: 'get',
      url: `/osp/v.1.0.0/${params.buCode}/items/${params.storeId}`,
      params,
    } as requestType);
  },
  eventCountPlans: (params: paramsType) => {
    return http({
      method: 'get',
      url: `/osp/stockCount/eventCount/v.1.0.0/${params.buCode}/${params.storeId}/plan`,
      params,
    } as requestType);
  },
  eventCountAddPlans: (data: paramsType) => {
    const { countId, language, buCode, storeId, context, keyword } = data;
    return http({
      method: 'post',
      url: `/osp/stockCount/eventCount/v.1.0.0/${buCode}/${storeId}/${context}/${countId}/items/${keyword}?language=${language}`,
      data,
    } as requestType);
  },
  getKongToken: (data: paramsType) => {
    return http({
      method: 'post',
      url: `/osp/oauth2/token`,
      data,
      awaitToken: false,
    } as requestType);
  },
};
