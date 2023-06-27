import BaseSymbol from "../base/baseSymbol";

import errorUtil from "@/utils/errorUtil";

import namespace from "@/static/name";

/**
 * ArticleSchema Class 정의
 *
 * 모든 Class는 BaseSymbol을 상속받아야만 한다.
 *
 * 해당 Class에서 ArticleSchema에 필요한 Class를 정의 하도록 한다.
 */
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
   * @param {string} thumbnail
   * @param {string} title
   * @param {string} subtitle
   * @param {string} contents
   * @param {Array} tags
   * @param {Array} writers
   * @param {string} path
   * @param {string} createdAt
   * @param {string} updatedAt
   * @returns {ArticleSchema}
   */
  createInstance(
    _id,
    thumbnail,
    title,
    subtitle,
    contents,
    tags,
    writers,
    path,
    createdAt,
    updatedAt
  ) {
    const resultOfObject = new _ArticleSchema(
      _id,
      thumbnail,
      title,
      subtitle,
      contents,
      tags,
      writers,
      path,
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
  constructor(
    _id,
    thumbnail,
    title,
    subtitle,
    contents,
    tags,
    writers,
    path,
    createdAt,
    updatedAt
  ) {
    super(namespace.articleSchema);

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof _id === "string",
      "Article _id must be string"
    );
    this._id = _id;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof thumbnail === "string",
      "Article thumbnail must be string"
    );
    this.thumbnail = thumbnail;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof title === "string",
      "Article title must be string"
    );
    this.title = title;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof subtitle === "string",
      "Article subtitle must be string"
    );
    this.subtitle = subtitle;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof contents === "string",
      "Article contents must be string"
    );
    this.contents = contents;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      Array.isArray(tags),
      "Article tags must be array"
    );
    this.tags = tags;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      Array.isArray(writers),
      "Article writers must be array"
    );
    this.writers = writers;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof path === "string",
      "Article title must be string"
    );
    this.path = path;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof createdAt === "string",
      "Article title must be string"
    );
    this.createdAt = createdAt;

    // PUBLIC PROPERTY
    errorUtil.invalidParameter(
      typeof updatedAt === "string",
      "Article updatedAt must be string"
    );
    this.updatedAt = updatedAt;

    BaseSymbol.freezeSuperClass(this, _ArticleSchema);
  }
}

export default ArticleSchema;
