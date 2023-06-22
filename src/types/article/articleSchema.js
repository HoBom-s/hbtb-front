import BaseSymbol from "../base/baseSymbol";

import errorUtil from "@/utils/errorUtil";

import namespace from "@/static/name";

class ArticleSchema extends BaseSymbol {
  constructor(name) {
    super(name);

    BaseSymbol.freezeSuperClass(this, ArticleSchema);
  }

  /**
   * ArticleSchema instance를 생성한 후 반환하는 함수 정의
   *
   * PUBLIC PROPERTY
   *
   * @param {string} _id
   * @param {string} title
   * @param {string} path
   * @param {string} sortIndex
   * @param {string} spot
   * @param {string} createdAt
   * @param {string} updatedAt
   * @returns {ArticleSchema}
   */
  createInstance(_id, title, path, sortIndex, spot, createdAt, updatedAt) {
    const resultOfObject = new _ArticleSchema(
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
}

/**
 * 실질적인 ArticleSchema의 Instance를 생성한다면 아래의 Class의 Instance가 반환된다.
 */
class _ArticleSchema extends ArticleSchema {
  constructor(_id, title, path, sortIndex, spot, createdAt, updatedAt) {
    super(namespace);

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof _id === "string",
      "Article _id must be string"
    );
    this._id = _id;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof title === "string",
      "Article title must be string"
    );
    this.title = title;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof path === "string",
      "Article title must be string"
    );
    this.path = path;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof sortIndex === "string",
      "Article title must be string"
    );
    this.sortIndex = sortIndex;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof spot === "string",
      "Article title must be string"
    );
    this.spot = spot;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof createdAt === "string",
      "Article title must be string"
    );
    this.createdAt = createdAt;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof updatedAt === "string",
      "Article title must be string"
    );
    this.updatedAt = updatedAt;

    BaseSymbol.freezeSuperClass(this, _ArticleSchema);
  }
}

export default ArticleSchema;
