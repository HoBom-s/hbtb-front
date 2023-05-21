import BaseSymbol from "../base/baseSymbol";

import errorUtil from "../../utils/errorUtil";

const TAG_SCHEMA_SYMBOL_NAME = "TagSchema";
const TAG_SCHEMA_OBJECT_SYMBOL_NAME = "TagSchemaObject";

/**
 * TahSchema에 필요한 정보들을 정의한 TagSchema Object
 * 해당 Object로 TagSchema를 활용하여 할 수 있는 행위를 할 수 있어야 한다.
 */
const TagSchemaObject = {};

/**
 * TagSchemaObject에 대한 Class 정의
 */
class _TagSchemaObject extends BaseSymbol {
  constructor(name) {
    super(name);

    BaseSymbol.freezeSuperClass(this, _TagSchemaObject);
  }
}

/**
 * TagSchema Class 정의
 *
 * 모든 Class는 BaseSymbol을 상속받아야만 한다.
 */
class TagSchema extends BaseSymbol {
  constructor(_id, title, path, count, createdAt) {
    super(TAG_SCHEMA_SYMBOL_NAME);

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

    BaseSymbol.freezeSuperClass(this, TagSchema);
  }
}

// TagSchemaObject의 Symbol Name 정의
{
  BaseSymbol.addSymbol(
    TagSchemaObject,
    new _TagSchemaObject(TAG_SCHEMA_OBJECT_SYMBOL_NAME)
  );
}

/**
 * TagSchema instance를 생성한 후 반환하는 함수 정의
 *
 * @param {string} _id
 * @param {string} title
 * @param {string} path
 * @param {number} count
 * @param {string} createdAt
 * @returns {TagSchema}
 */
TagSchemaObject.createInstance = function (_id, title, path, count, createdAt) {
  const resultOfObject = new TagSchema(_id, title, path, count, createdAt);
  return resultOfObject;
};

// Object.freeze(TagSchemaObject);
export default TagSchemaObject;
