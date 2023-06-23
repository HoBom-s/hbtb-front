import errorUtil from "./errorUtil";

/**
 * 함수 사용에 용이한 Function들의 Util Object 정의
 */

const funcUtil = {};

{
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
}

{
  /**
   * 조건에 부합 한다면 matched의 context를 가지고 간다.
   *    결국 match와 matched 모두 마지막엔 otherwise에 걸리므로
   *    마지막 matched context의 값이 그대로 반환된다.
   */
  const matched = (value) => {
    return {
      on: function () {
        return matched(value);
      },
      otherwise: function () {
        return value;
      },
    };
  };
  /**
   * match 함수는 .on 으로 계속해서 체이닝이 이뤄진다.
   *    조건에 부합한다면 위의 matched의 context가 체이닝 되고,
   *    부합하지 않다면 match의 새로운 context로 계속해서 .on 체이닝이 이뤄진다.
   */
  const match = (value) => {
    return {
      on: function (pred, func) {
        return pred(value) ? matched(func(value)) : match(value);
      },
      otherwise: function (func) {
        return func(value);
      },
    };
  };

  /**
   * Match Context
   *    switch - case 대신 사용
   */
  funcUtil.match = match;
}

Object.freeze(funcUtil);
export default funcUtil;
