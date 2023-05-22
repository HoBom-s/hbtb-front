import BaseSymbol from "../base/baseSymbol";

import errorUtil from "../../utils/errorUtil";

import namespace from "../../static/name";

/**
 * TagSchema Class 정의
 *
 * 모든 Class는 BaseSymbol을 상속받아야만 한다.
 *
 * 해당 Class에서 TagSchema에 필요한 Class를 정의 하도록 한다.
 */
class TagSchema extends BaseSymbol {
  constructor(name) {
    super(name);

    BaseSymbol.freezeSuperClass(this, TagSchema);
  }

  /**
   * TagSchema instance를 생성한 후 반환하는 함수 정의
   *
   * PUBLIC PROPERTY
   *
   * @param {string} _id
   * @param {string} title
   * @param {string} path
   * @param {number} count
   * @param {string} createdAt
   * @returns {TagSchema}
   */
  createInstance(_id, title, path, count, createdAt) {
    const resultOfObject = new _TagSchema(_id, title, path, count, createdAt);
    return resultOfObject;
  }
}

/**
 * 실질적인 TagSchema의 Instance 를 생성한다면 아래의 Class의 Instance가 반환된다.
 */
class _TagSchema extends TagSchema {
  constructor(_id, title, path, count, createdAt) {
    // TagSchema의 고유 BaseSymbol Name
    super(namespace.tagSchema);

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof _id === "string",
      "Tag id must be string"
    );
    this._id = _id;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof title === "string",
      "Tag title must be string"
    );
    this.title = title;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof path === "string",
      "Tag path must be string"
    );
    this.path = path;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof count === "number",
      "Tag count must be number"
    );
    this.count = count;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof createdAt === "string",
      "Tag createdAt must be string"
    );
    this.createdAt = createdAt;

    BaseSymbol.freezeSuperClass(this, _TagSchema);
  }
}

export default TagSchema;
