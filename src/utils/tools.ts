/**
 * 获取URL参数
 * @param {*} name 参数名称
 */
export function QueryString(name: String, search?: any) {
  const url = (search || location.search).replace('?', '');
  const b = url.split('&');
  for (let i = 0; i < b.length; i++) {
    const c = b[i].split('=');
    if (c[0] == name) {
      return c[1];
      break;
    }
  }
}

/**
 *标记菜单是否有子节点
 *Mark whether this menu has child nodes
 * @param {*} data 传入数组
 */
export function formatMenu(data: Array<any>): Array<any> {
  const newData = [...data];
  const map: any = {};
  newData.forEach((item: any) => {
    // item.hasChildren = false;
    map[item.id] = item;
  });
  newData.forEach((item: any) => {
    if (map[item.parent_id]) {
      map[item.parent_id]['hasChildren'] = true;
    }
  });
  return Object.keys(map).map((key: string) => map[key]);
}
