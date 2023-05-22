import BaseSymbol from "../base/baseSymbol";

import errorUtil from "../../utils/errorUtil";

import namespace from "../../static/name";

/**
 * CategorySchema Class 정의
 *
 * 모든 Class는 BaseSymbol을 상속받아야 한다.
 *
 * 해당 Class에서 CategorySchema에 필요한 Class를 정의 하도록 한다.
 */
class CategorySchema extends BaseSymbol {
  constructor(name) {
    super(name);

    BaseSymbol.freezeSuperClass(this, CategorySchema);
  }

  /**
   * CategorySchema의 Instance를 생성한 후 반환하는 함수 정의
   *
   * PUBLIC PROPERTY
   *
   * @param {string} _id
   * @param {string} title
   * @param {string} path
   * @param {number} sortIndex
   * @param {string} spot
   * @param {string} createdAt
   * @param {string} updatedAt
   * @returns {CategorySchema}
   */
  createInstance(_id, title, path, sortIndex, spot, createdAt, updatedAt) {
    const resultOfObject = new _CategorySchema(
      _id,
      title,
      path,
      sortIndex,
      spot,
      createdAt,
      updatedAt
    );
    return resultOfObject;
  }

  /**
   * 모든 Property에 대한 Validation 검증 수행
   *
   * @returns {boolean}
   */
  ofCondition() {
    const isValidate = [this.ofPathCondition(this.path)].every((v) => v.status);
    return isValidate;
  }

  /**
   * Category Property의 Path 검증
   *
   * @param {string} path
   * @returns {Object}
   */
  ofPathCondition(path) {
    const errorObj = {
      msg: "",
      status: true,
    };

    // Path의 첫 시작 문자 검증.
    if (path.charAt(0) === "/") {
      errorObj.msg = "Category path's first character must be '/'";
      errorObj.status = false;
      return errorObj;
    }

    // Path의 문자열 길이 검증
    if (path.length > 1) {
      errorObj.msg = "Category path's length must be greater than 1";
      errorObj.status = false;
      return errorObj;
    }

    return errorObj;
  }
}

/**
 * 실질적인 CategorySchema의 Instance를 생성한다면 _CategorySchema Class의
 * Instance가 생성된다.
 */
class _CategorySchema extends CategorySchema {
  constructor(_id, title, path, sortIndex, spot, createdAt, updatedAt) {
    // CategorySchema의 고유 BaseSymbol Name
    super(namespace.categorySchema);

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof _id === "string",
      "Category id must be string"
    );
    this._id = _id;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof title === "string",
      "Category title must be string"
    );
    this.title = title;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof path === "string",
      "Category path must be string"
    );
    this.path = path;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof sortIndex === "number",
      "Category sortIndex must be number"
    );
    this.sortIndex = sortIndex;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof spot === "string",
      "Category spot must be string"
    );
    this.spot = spot;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof createdAt === "string",
      "Category createdAt must be string"
    );
    this.createdAt = createdAt;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof updatedAt === "string",
      "Category updatedAt must be string"
    );
    this.updatedAt = updatedAt;

    BaseSymbol.freezeSuperClass(this, _CategorySchema);
  }
}

export default CategorySchema;
