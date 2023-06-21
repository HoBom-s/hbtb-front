import errorUtil from "./errorUtil";

/**
 * 함수 사용에 용이한 Function들의 Util Object 정의
 */

const funcUtil = {};

/**
 * Array of function을 전부 호출하면서 모든 결과를
 * 전달 받은 funcs의 길이와 순서를 동일하게 results에 담아서 반환
 *
 * @param {Array} funcs
 * @returns {any}
 */
funcUtil.invokeAllAndGetResult = function (funcs) {
  // funcs는 무조건 Array 이어야만 한다.
  errorUtil.invalidParameter(Array.isArray(funcs), "The funcs must be Array");

  // funcs의 모든 요소(func)는 무조건 Function 이어야만 한다.
  const isFunction = funcs.every((func) => typeof func === "function");
  errorUtil.assert(isFunction, "Every funcs's element must be function");

  const results = funcs.map((func) => {
    const result = func();
    return result;
  });

  return results;
};

Object.freeze(funcUtil);
export default funcUtil;
