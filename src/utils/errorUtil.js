/**
 * Error message 출력
 *
 * Invalid Parameter 검사
 *
 * Assert
 *
 * etc ...
 *
 * 기초적인 Error를 Handling하는 Util Object 작성
 *
 * Debugger가 동작해야 하므로 해당 파일에서는
 * ESLint의 Debugger options을 사용하지 않는다.
 */

/* eslint-disable no-debugger */

const errorUtil = {};

/**
 * Error Message를 반환하는 Util 함수
 *
 * @param {string} msg1
 * @param {string} msg2
 * @returns {string}
 */
errorUtil.errorMessage = function (msg1, msg2) {
  return `${msg1}${msg2 ? msg2 : ""}`;
};

/**
 * 아직 구현되지 않은 기능에 대한 임시 함수
 *
 * @param {string} msg
 * @returns {void}
 */
errorUtil.notImplemented = function (msg) {
  debugger;
  throw new Error(errorUtil.errorMessage("NOT IMPLEMENTED", msg));
};

/**
 * Condition이 유요하지 않다면 Debugger 동작하도록 설정하는 Util 함수
 *
 * @param {boolean} condition
 * @param {string} msg
 * @returns {void}
 */
errorUtil.invalidParameter = function (condition, msg) {
  /**
   * 조건이 [FALSE] 인 경우에만 Debugging이 걸리도록 한다.
   */
  if (!condition) {
    debugger;
    throw new Error(errorUtil.errorMessage("INVALID PARAMETER", msg));
  }
};

/**
 * 특정한 조건에 대한 Assertion 함수 정의
 * InvalidParameter 함수와 기능은 같지만 때에 따라서
 * 적절하게 함수를 구분하여 사용하기 위해 정의하도록 한다.
 *
 * @param {boolean} condition
 * @param {string} msg
 * @return {void}
 */
errorUtil.assert = function (condition, msg) {
  /**
   * 조건이 [FALSE] 인 경우에만 Debugging이 걸리도록 한다.
   */
  if (!condition) {
    debugger;
    throw new Error(errorUtil.errorMessage("ASSERTION FAILED", msg));
  }
};

Object.freeze(errorUtil);
export default errorUtil;
