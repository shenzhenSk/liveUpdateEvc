export interface asiaEvnType {
  [key: string]: {
    grant_type: string;
    provision_key: string;
    client_id: string;
    client_secret: string;
  };
}
export default {
  dev: {
    grant_type: 'client_credentials',
    provision_key: 'OSP',
    client_id: 'osp_sit',
    client_secret: 'osp_sit',
  },
  sit: {
    grant_type: 'client_credentials',
    provision_key: 'OSP',
    client_id: 'osp_sit',
    client_secret: 'osp_sit',
  },
  uat: {
    grant_type: 'client_credentials',
    provision_key: 'OSP',
    client_id: 'osp_sit',
    client_secret: 'osp_sit',
  },
  prod: {
    grant_type: 'client_credentials',
    provision_key: 'OSP',
    client_id: 'osp_sit',
    client_secret: 'osp_sit',
  },
} as asiaEvnType;
