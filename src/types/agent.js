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
class TypeAgent {
  constructor(namespace) {
    this.namespace = namespace;

    BaseSymbol.freezeSuperClass(this, TypeAgent);
  }
}

{
  // Agent에 대한 TypeAgent Class를 주입
  BaseSymbol.addSymbol(agent, namespace.types, new TypeAgent(namespace.types));
}

{
  // Agent에 TagSchema를 주입
  BaseSymbol.addSymbol(agent, new TagSchema(namespace.tagSchema));

  // Agent에 CategorySchema를 주입
  BaseSymbol.addSymbol(agent, new CategorySchema(namespace.categorySchema));
}

Object.freeze(agent);
export default agent;
