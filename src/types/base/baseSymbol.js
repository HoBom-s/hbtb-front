import errorUtil from "../../utils/errorUtil";

/**
 * Type Class 들에 대한 최상위 부모 Class 인 BaseSymbol 정의
 *
 * 모든 Type [Class] 는 자신만의 고유한 name property를 가지고 있다.
 * 모든 Type Class는 BaseSymbol을 활용하여 name을 생성할 수 있어야 한다.
 *
 * 모든 Type [Object] 는 자신만의 고유한 name property를 가지고 있다.
 * 모든 Type [Object] 는 BaseSymbol을 활용하여 name을 생성할 수 있어야 한다.
 */
class BaseSymbol {
  constructor(name) {
    errorUtil.invalidParameter(typeof name === "string");

    // PUBLIC Property
    this.name = name;
  }

  displaySymbolName() {
    return this.name;
  }
}

/**
 * 모든 Type에 대한 Object or Class 는 name이라는 Property를 가지고 있어야만 한다.
 * addSymbol 함수를 통해 자신만의 고유한 name property를 가질 수 있도록 한다.
 *
 * @param {Object} namespace
 * @param {BaseSymbol | string} target1
 * @param {any} target2
 */
BaseSymbol.addSymbol = function (namespace, target1, target2) {
  const { name, targetObject } = (() => {
    if (target1 instanceof BaseSymbol) {
      // target1 이 Class 인 경우
      // 모든 Type Class 는 BaseSymbol 의 name property 를 가지고 있으므로..
      return {
        name: target1.name,
        targetObject: target1,
      };
    } else {
      // BaseSymbol이 단순 Object 인 경우
      return {
        name: target1,
        targetObject: target2,
      };
    }
  })();
  // Name을 지정해 주기 이전에 이미 Name을 가지고 있다면 중복된 Name이 있는 것이므로
  // Assertion을 통해 이름이 없음을 확언 하도록 한다.
  errorUtil.assert(!namespace[name]);
  namespace[name] = targetObject;
};

/**
 * 반복적인 Object.freeze 함수의 활용을 줄이기 위한 함수 정의
 *
 * @param {Object} target
 * @param {Object} claz
 * @return {void}
 */
BaseSymbol.freezeSuperClass = function (target, claz) {
  if (target.constructor === claz) {
    Object.freeze(target);
  }
};

/**
 * Namespace를 활용하여 원하는 Schema Class Instance를 얻도록 하는 함수 정의
 *
 * @param {Object} obj
 * @param {string} namespace
 * @returns {null | Object}
 */
BaseSymbol.instanceOfName = function (obj) {
  return function (namespace) {
    // 이름 공간이 string이 아닐 경우는 [개발자의 실수] 로 판단
    errorUtil.invalidParameter(
      typeof namespace === "string",
      "Namespace must be string"
    );
    if (!obj[namespace]) {
      return null;
    }
    // 모든 Class는 BaseSymbol을 상속 받아야만 하므로...
    errorUtil.assert(
      obj[namespace] instanceof BaseSymbol,
      "Target object must be BaseSymbol Class"
    );
    return obj[namespace];
  };
};

Object.freeze(BaseSymbol);
export default BaseSymbol;
