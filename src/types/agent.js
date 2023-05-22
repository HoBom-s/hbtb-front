import BaseSymbol from "./base/baseSymbol";
import TagSchema from "./tag/tagSchema";

import namespace from "../static/name";

/**
 * 각각의 Type에 대한 Instance 생성 등 필요한 모든 행위를 Type Agent를 통해서 가능하도록 한다.
 *    즉 Agent Object를 통해서 Type에 대한 모든 행위가 가능해야 한다.
 */
const agent = {};

{
  // agent에 TagSchema를 주입
  BaseSymbol.addSymbol(agent, new TagSchema(namespace.tagSchema));
}

Object.freeze(agent);
export default agent;
