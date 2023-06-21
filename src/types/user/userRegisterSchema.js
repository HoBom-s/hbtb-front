import BaseSymbol from "../base/baseSymbol";

import errorUtil from "@/utils/errorUtil";

import namespace from "@/static/name";

/**
 * UserSchema Class 정의
 *
 * 모든 Class는 BaseSymbol을 상속받아야 한다.
 *
 * 해당 Class에서 UserChema에 필요한 것들을 정의 하도록 한다.
 */
class UserRegisterSchema extends BaseSymbol {
  constructor(name) {
    super(name);

    BaseSymbol.freezeSuperClass(this, UserRegisterSchema);
  }

  /**
   * UserRegisterSchema의 Instance를 생성한 후 반환하는 함수 정의
   *
   * PUBLIC PROPERTY
   *
   * @param {string} nickname
   * @param {string} password
   * @param {string} checkPassword
   * @param {string} profileImg
   * @param {string} role
   * @param {string} introduction
   * @returns {UserRegisterSchema}
   */
  createInstance(
    nickname,
    password,
    checkPassword,
    profileImg,
    role,
    introduction
  ) {
    const resultOfObject = new _UserRegisterSchema(
      nickname,
      password,
      checkPassword,
      profileImg,
      role,
      introduction
    );
    return resultOfObject;
  }
}

/**
 * 실질적인 UserRegisterSchema의 Instance를 생성한다면 _UserRegisterSchema Class의
 * Instance가 생성된다.
 */
class _UserRegisterSchema extends UserRegisterSchema {
  constructor(
    nickname,
    password,
    checkPassword,
    profileImg,
    role,
    introduction
  ) {
    // UserRegisterSchema의 고유 BaseSymbol Name
    super(namespace.userRegisterSchema);

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
    errorUtil.assert(
      password === checkPassword,
      "User Password must be same Check Password"
    );
    // PUBLIC PROPERTY
    this.password = password;

    // PUBLIC PROPERTY
    // TODO: 기본 Image 설정
    this.profileImg = profileImg;

    errorUtil.invalidParameter(
      typeof role === "string",
      "The role must be string"
    );
    // PUBLIC PROPERTY
    this.role = role;

    errorUtil.invalidParameter(
      typeof introduction === "string",
      "The introduction must be string"
    );
    // PUBLIC PROPERTY
    this.introduction = introduction;

    BaseSymbol.freezeSuperClass(this, _UserRegisterSchema);
  }
}

export default UserRegisterSchema;
