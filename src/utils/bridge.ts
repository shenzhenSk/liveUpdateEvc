//mock rbac info in dev mode
export const getInfo = () => {
  return {
    bu: {
      default_tenant_code: 'WTCHK',
      tenants: [
        {
          code: 'WTCHK',
          name: 'Super-App-KONG-WTCHK',
          store_detail_list: [
            { buCode: 'WTCHK', code: '3228', name: 'Lei Tung Estate' },
            { buCode: 'WTCHK', code: '3462', name: 'Austin Road' },
          ],
          stores: ['3228', '3462'],
          timezone: 'Asia/Hong_Kong',
        },
      ],
      errorCode: 0,
      errorMessage: '',
      requseCodeTag: 6,
      success: false,
    },
    menus: [
      {
        code: 'osp-superapp-inventory',
        id: '6078897355562082305',
        name: 'Inventory',
        parent_id: '0',
        hasChildren: true,
      },
      {
        code: 'osp-superapp-event-count',
        id: '6078900413578797057',
        name: 'Event Count',
        parent_id: '6078897355562082305',
      },
      {
        code: 'osp-superapp-shelf-fulfillment',
        id: '6078901787968331777',
        name: 'Shelf Fulfillment',
        parent_id: '6078897355562082305',
      },
      { code: 'osp-superapp-reports', id: '6078902406443622401', name: 'Reports', parent_id: '0' },
      {
        code: 'osp-superapp-user-management',
        id: '6078903127998128129',
        name: 'User Management',
        parent_id: '0',
      },
      {
        code: 'osp-superapp-online-orders',
        id: '6307355668289036289',
        name: 'Online Orders',
        parent_id: '0',
        hasChildren: true,
      },
      {
        code: 'osp-superapp-pick-pack-orders',
        id: '6307359413500518401',
        name: 'Pick & Pack Orders',
        parent_id: '6307355668289036289',
      },
      {
        code: 'osp-superapp-collect-orders',
        id: '6307360100695285761',
        name: 'Collect Orders',
        parent_id: '6307355668289036289',
      },
      {
        code: 'osp-superapp-collect-orders@unpack_orders/home',
        id: '6318545947880865793',
        name: 'Unpack Orders',
        parent_id: '6307355668289036289',
      },
      {
        code: 'osp-superapp-collect-orders@orders_collect/search',
        id: '6318546703795109889',
        name: 'Search Orders',
        parent_id: '6307355668289036289',
      },
    ],
    serverInfo: { serverArea: 'asia', serverEnv: 'dev' },
    token: {
      access_token: '6ec06807-a237-4eea-975d-3c88a17e8693',
      expires_in: 85931,
      refresh_token: '96dd5f40-ff51-4f66-b0e3-dda415b6d7f7',
      scope: 'read write',
      token_type: 'bearer',
    },
    user: {
      avatar_url: '/images/avatar/avatar_3.png',
      create_time: '2020-08-19 18:34:58',
      email: 'TECHLab@aswatson.com',
      gender: 'MALE',
      id: '0',
      introduction: '',
      language: 'en',
      last_modify_time: '2023-10-19 08:51:24',
      nick_name: 'admin',
      password_strength_name: 'WEAK',
      password_validity_period: 'PERMANENT',
      password_validity_period_time: '2853-06-17 16:38:33',
      real_name: 'Admin',
      real_name_en: 'admin',
      special: 'false',
      status: 'NORMAL',
      tenant_id: '0',
      time_zone: 'Asia/Hong_Kong',
      type: 'ADMIN',
      user_name: 'admin',
      errorCode: 0,
      errorMessage: '',
      requseCodeTag: 4,
      success: false,
    },
  };
};
// export const getInfo = () => {
//   return {
//     serverInfo: { serverArea: 'eu', serverEnv: 'dev' },
//     user: {
//       password_validity_period_time: '2856-12-22 11:09:43',
//       authorization: null,
//       nick_name: null,
//       status: 'NORMAL',
//       time_zone: 'Europe/Amsterdam',
//       last_modify_time: '2023-08-24 10:48:07',
//       password_validity_period: 'PERMANENT',
//       avatar_url: null,
//       gender: '',
//       id: '6113895669668061184',
//       tenant_id: '0',
//       password_strength_name: 'MIDDLE',
//       real_name: 'ospsuperapp3',
//       language: 'en',
//       type: 'STAFF',
//       address: null,
//       create_time: '2023-08-22 11:09:43',
//       real_name_en: null,
//       introduction: '',
//       special: false,
//       email: 'ospsuperapp3@163.com',
//       phone: '',
//       user_name: 'ospsuperapp3',
//       organization_id: null,
//     },
//     token: {
//       expires_in: 86399,
//       token_type: 'bearer',
//       scope: 'read write',
//       refresh_token: '167fbea1-cf0d-4e98-8cbe-4c3e16936064',
//       access_token: 'e17d92bd-df14-4e8a-9859-05e9d03b1627',
//     },
//     bu: {
//       tenants: [
//         {
//           stores: ['9998'],
//           name: 'KVN',
//           code: 'KVN',
//           timezone: 'Europe/Amsterdam',
//           store_detail_list: [{ name: 'KVNL 9998', code: '9998' }],
//         },
//       ],
//       default_tenant_code: 'KVN',
//     },
//     menus: [
//       {
//         parent_id: '6113847737833037825',
//         name: 'Event Count',
//         id: '6113867563402076161',
//         code: 'osp-superapp-event-count',
//       },
//       {
//         parent_id: '0',
//         name: 'Inventory',
//         id: '6113847737833037825',
//         code: 'osp-superapp-inventory',
//         hasChildren: true,
//       },
//     ],
//   };
// };
