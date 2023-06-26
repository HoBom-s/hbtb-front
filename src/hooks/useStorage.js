import { ref } from "vue";

import funcUtil from "@/utils/funcUtil";
import errorUtil from "@/utils/errorUtil";

/**
 * Storgae Hook
 *    공통으로 사용할 Storage에 대한 함수들의 집합
 *    해당 Hook을 사용하기 위해 반드시 key값을 전달하도록 한다.
 *
 * @param {string} key
 * @param {string} type default => session
 */
const useStorage = (key, type = "session") => {
  errorUtil.invalidParameter(
    typeof key === "string",
    "The storage's key must be string"
  );

  const storage = funcUtil
    .match(type)
    .on(
      () => type === "session",
      () => sessionStorage
    )
    .on(
      () => type === "local",
      () => localStorage
    )
    .otherwise(() => errorUtil.notImplemented());

  /**
   * getStorageItem을 순수 함수로 유지하기 위해
   *    storage를 parameter로 전달
   *
   * @param {storage} storage
   * @returns {string}
   */
  const getStorageItem = (storage) => () => {
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  /**
   * Storage에 저장된 Data 값
   *    State의 집합이 아니므로
   *    단순하게 ref를 사용하도록 한다.
   */
  const value = ref(getStorageItem(storage)());

  /**
   * setStorageItem을 순수함수로 유지하기 위해 storage 값을 Hook 에서
   *    반활할 때 현재 Hook의 storage를 parameter로 전달하고
   *    setStorageItem을 사용할 수 있도록 한다.
   *
   * @param {storage} storage
   * @returns {void}
   */
  const setStorageItem = (storage) => (newValue) => {
    value.value = newValue;
    storage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStorageItem(storage)];
};

export default useStorage;
