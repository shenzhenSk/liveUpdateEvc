// 参考https://www.npmjs.com/package/js-cookie
// typescript需要安装@types/js-cookie声明
import Cookies from 'js-cookie';

// 获取cookie
export function getCookie(name: string) {
  return Cookies.get(name);
}

// 设置cookie
export function setCookie(name: string, value: any, params = {}) {
  return Cookies.set(name, value, params);
}

// 移除cookie
export function removeCookie(name: string) {
  Cookies.remove(name);
}
