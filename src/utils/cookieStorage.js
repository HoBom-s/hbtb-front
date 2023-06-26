import Cookie from "js-cookie";
import errorUtil from "./errorUtil";

/**
 * CookieStorage Class 정의
 *    Session, LocalStorage와 같이 setItem, getItem으로 통일
 */
class CookieStorage {
  // No constructor
  constructor() {}

  /**
   * Cookie에 Item 저장
   *
   * @param {string} key
   * @param {string} value
   */
  static setItem(key, value) {
    if (!key) {
      errorUtil.invalidParameter(
        typeof key === "string",
        "The key msut be string"
      );
    }
    Cookie.set(key, value, {
      sameSite: "strict",
    });
  }

  /**
   * Cookie의 Item 가져오기
   *
   * @param {string} key
   * @returns {string}
   */
  static getItem(key) {
    if (!key) {
      errorUtil.invalidParameter(
        typeof key === "string",
        "The key must be string"
      );
    }

    const value = Cookie.get(key);
    return value;
  }

  /**
   * Cookie에 저장된 아이템 제거
   *
   * @param {string} key
   */
  static removeItem(key) {
    if (!key) {
      errorUtil.invalidParameter(
        typeof key === "string",
        "The key must be string"
      );
    }

    Cookie.remove(key);
  }
}

Object.freeze(CookieStorage);
export default CookieStorage;
