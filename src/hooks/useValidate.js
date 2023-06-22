import funcUtil from "@/utils/funcUtil";
import errorUtil from "@/utils/errorUtil";

/**
 * Validate Hook
 *    단순히 Function의 Array를 Parameter로 받고,
 *    해당 함수들의 실행 결과가 유효한지 판단한다.
 *
 * @param {Array} funcs
 * @returns {boolean}
 */
const useValidate = (funcs) => {
  /**
   * 아래의 funcUtil의 invokeAllAndGetResult 함수에서도
   * 동일하게 funcs에 대한 타입 검사를 수행하지만,
   * 함수의 시작 부분에서도 검사를 수행하도록 한다.
   */
  errorUtil.invalidParameter(funcs, "The funcs must be array");

  const invokedResult = funcUtil.invokeAllAndGetResult(funcs);

  const isValid = invokedResult.every((element) => element);

  return [isValid];
};

export default useValidate;
