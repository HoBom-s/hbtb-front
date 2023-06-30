import BaseSymbol from "../base/baseSymbol";

import errorUtil from "@/utils/errorUtil";

import namespace from "@/static/name";

/**
 * UserLoginSchema Class 정의
 *
 * 모든 Class는 BaseSymbol을 상속받아야 한다.
 *
 * 해당 Class에서 UserLoginSchema에 필요한 것들을 정의 하도록 한다.
 */
class UserLoginSchema extends BaseSymbol {
  constructor(name) {
    super(name);

    BaseSymbol.freezeSuperClass(this, UserLoginSchema);
  }

  /**
   * UserLoginSchema의 Instance를 생성한 후 반환하는 함수 정의
   *
   * PUBLIC PROPERTY
   *
   * @param {string} nickname
   * @param {string} password
   * @returns {UserLoginSchema}
   */
  createInstance(nickname, password) {
    const resultOfObject = new _UserLoginSchema(nickname, password);
    return resultOfObject;
  }
}

class _UserLoginSchema extends UserLoginSchema {
  constructor(nickname, password) {
    super(namespace.userLoginSchema);

    errorUtil.invalidParameter(
      typeof nickname === "string",
      "User nickname must be string"
    );
    // PUBLIC PROPERTY
    this.nickname = nickname;

    errorUtil.invalidParameter(
      typeof password === "string",
      "User password must be string"
    );
    // PUBLIC PROPERTY
    this.password = password;

    BaseSymbol.freezeSuperClass(this, _UserLoginSchema);
  }
}

export default UserLoginSchema;
