import BaseSymbol from "./base/baseSymbol";
import TagSchema from "./tag/tagSchema";
import CategorySchema from "./category/categorySchema";

import namespace from "../static/name";

/**
 * 각각의 Type에 대한 Instance 생성 등 필요한 모든 행위를 Type Agent를 통해서 가능하도록 한다.
 *  - 즉 Agent Object를 통해서 Type에 대한 모든 행위가 가능해야 한다.
 */
const agent = {};

/**
 * TypeAgent Class 정의
 *
 * TypeAgent Object 에서 필요한 행위들을 해당 class에 추가하도록 한다.
 */
class TypeAgent extends BaseSymbol {
  constructor(namespace) {
    super(namespace);

    BaseSymbol.freezeSuperClass(this, TypeAgent);
  }

  /**
   * Schema의 모든 Property에 대한 Validation 검증 수행
   *
   * @param {string} namespace
   * @returns {boolean}
   */
  ofCondition(namespace) {
    const validateResult = agent[namespace].ofCondition();
    return validateResult;
  }
}

{
  // Agent에 대한 TypeAgent Class를 주입
  BaseSymbol.addSymbol(agent, new TypeAgent(namespace.types));
}

{
  // Agent에 TagSchema를 주입
  BaseSymbol.addSymbol(agent, new TagSchema(namespace.tagSchema));

  // Agent에 CategorySchema를 주입
  BaseSymbol.addSymbol(agent, new CategorySchema(namespace.categorySchema));
}

/**
 * Type Agent를 활용하여 원하는 Schema Instance를 즉시 얻을 수 있도록 한다.
 *
 * @param {TypeAgent} obj
 * @param {string} namespace
 * @returns {Object}
 */
agent.instanceOfName = BaseSymbol.instanceOfName(agent, namespace);

Object.freeze(agent);
export default agent;
