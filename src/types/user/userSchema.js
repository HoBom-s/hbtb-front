import BaseSymbol from "../base/baseSymbol";

import errorUtil from "@/utils/errorUtil";

import namespace from "@/static/name";

/**
 * UserSchema에 대한 Class 정의
 *
 * 모든 Class는 BaseSymbol을 상속받아야 한다.
 *
 * 해당 Class에서 UserSchema에 필요한 것들을 정의 하도록 한다.
 */
class UserSchema extends BaseSymbol {
  constructor(name) {
    super(name);

    BaseSymbol.freezeSuperClass(this, UserSchema);
  }

  /**
   * UserSchema의 Instance를 생성한 후 반환하는 함수 정의
   *
   * PUBLIC PROPERTY
   *
   * @param {string} _id
   * @param {string} nickname
   * @param {string} introduction
   * @param {string} role
   * @param {string} profileImg
   * @returns {UserSchema}
   */
  createInstance(_id, nickname, introduction, role, profileImg) {
    const resultOfObject = new _UserSchema(
      _id,
      nickname,
      introduction,
      role,
      profileImg
    );
    return resultOfObject;
  }
}

class _UserSchema extends UserSchema {
  constructor(_id, nickname, introduction, role, profileImg) {
    super(namespace.userSchema);

    errorUtil.invalidParameter(
      typeof _id === "string",
      "User _id must be string"
    );
    // PUBLIC PROPERTY
    this._id = _id;

    errorUtil.invalidParameter(
      typeof nickname === "string",
      "User nickname must be string"
    );
    // PUBLIC PROPERTY
    this.nickname = nickname;

    errorUtil.invalidParameter(
      typeof introduction === "string",
      "User introduction must be string"
    );
    // PUBLIC PROPERTY
    this.introduction = introduction;

    errorUtil.invalidParameter(
      typeof role === "string",
      "User role must be string"
    );
    // PUBLIC PROPERTY
    this.role = role;

    errorUtil.invalidParameter(
      typeof profileImg === "string",
      "User profileImg must be string"
    );
    // PUBLIC PROPERTY
    this.profileImg = profileImg;

    BaseSymbol.freezeSuperClass(this, _UserSchema);
  }
}

export default UserSchema;
