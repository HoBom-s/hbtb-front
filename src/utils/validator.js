import BaseSymbol from "@/types/base/baseSymbol";
import errorUtil from "./errorUtil";

/**
 * 각종 유효성 검사를 모아 놓는 Object
 *
 * Auth
 *    Nickname, Password, etc...
 *
 * Article
 *    Title, Content, etc...
 *
 * 유효성 검사에 실패하는 경우 통일성을 부여하기 위해 통일된 Error를 반환하도록 작성
 */

class ValidateError extends BaseSymbol {
  constructor(name) {
    super(name);

    // PUBLIC PROPERTY
    // Error가 있다면 [true], 없다면 [false]
    // 초기값은 false
    this.hasError = false;

    // PUBLIC PROPERTY
    // Error가 있다면 에러에 대한 message 정의
    // 초기값은 ""
    this.msg = "";
  }

  /**
   * PUBLIC
   * hasError에 대한 Setter
   *
   * @param {boolean}
   */
  setHasError(value) {
    errorUtil.invalidParameter(
      typeof value === "boolean",
      "The value must be boolean"
    );
    this.hasError = value;
  }

  /**
   * PUBLIC
   * msg에 대한 Setter
   *
   * @param {string} value
   */
  setMsg(value) {
    errorUtil.invalidParameter(
      typeof value === "string",
      "The value must be string"
    );
    this.msg = value;
  }

  /**
   * PUBLIC
   * Property를 Object로 반환
   *
   * @returns {object}
   */
  asObject() {
    const errorObj = {};
    errorObj.hasError = this.hasError;
    errorObj.msg = this.msg;
    return errorObj;
  }
}

const validator = {};

{
  /**
   * User register 시 Nickname 검증
   *
   * @param {string} value
   * @returns {Object}
   */
  validator.validateNickname = function (value) {
    const trimedNickname = value.trim();

    const validateError = new ValidateError("ValidateError");
    validateError.setHasError(false);
    validateError.setMsg("");

    // 2자리 미만이면 Error
    if (trimedNickname < 2) {
      validateError.setHasError(true);
      validateError.setMsg("Nickname must be 2 or longer !");
      return validateError.asObject();
    }

    return validateError.asObject();
  };
}

{
  // Password 영문자 특수문자 8자 Check 정규식
  // Google 참고
  const regx =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  /**
   * User register 시 Password 검증
   *
   * @param {string} value
   * @returns {Object}
   */
  validator.validatePassword = function (value) {
    const trimedPassword = value.trim();

    const validateError = new ValidateError("ValidateError");
    validateError.setHasError(false);
    validateError.setMsg("");

    // 8자리 미만이면 Error
    if (trimedPassword.length < 8) {
      validateError.setHasError(true);
      validateError.setMsg("8 digits or more including symbol and number !");
      return validateError.asObject();
    }

    // Space 표함 시 Error
    if (trimedPassword.includes(" ")) {
      validateError.setHasError(true);
      validateError.setMsg("Please check your password !");
      return validateError.asObject();
    }

    if (!regx.test(trimedPassword)) {
      validateError.setHasError(true);
      validateError.setMsg("Please check your password !");
      return validateError.asObject();
    }

    return validateError.asObject();
  };
}

{
  /**
   * User register password 검사
   *
   * @param {string} value1
   * @param {string} value2
   * @returns {Object}
   */
  validator.validatePasswordCheck = function (value1, value2) {
    const validateError = new ValidateError("ValidateError");
    validateError.setHasError(false);
    validateError.setMsg("");

    if (value1 === value2) {
      return validateError.asObject();
    } else {
      validateError.setHasError(true);
      validateError.setMsg("Please check your password");
      return validateError.asObject();
    }
  };
}

{
  /**
   * User introduction 검사
   *
   * @param {string} value
   * @returns {Object}
   */
  validator.validateIntroduction = function (value) {
    const trimedIntroduction = value.trim();

    const validateError = new ValidateError("ValidateError");
    validateError.setHasError(false);
    validateError.setMsg("");

    if (trimedIntroduction.length < 1) {
      validateError.setHasError(true);
      validateError.setMsg("Introduction length must be 1 charactor or longer");
      return validateError.asObject();
    }

    return validateError.asObject();
  };
}

{
  /**
   * Category title 검사
   *
   * @param {string} value
   * @returns {Object}
   */
  validator.validateCategoryTitle = function (value) {
    const trimedCategoryTitle = value.trim();

    const validateError = new ValidateError("ValidateError");
    validateError.setHasError(false);
    validateError.setMsg("");

    if (trimedCategoryTitle.length < 1) {
      validateError.setHasError(true);
      validateError.setMsg(
        "Category title length must be 1 charactor or longer"
      );
      return validateError.asObject();
    }

    return validateError.asObject();
  };
}

{
  /**
   * Category Path 검사
   *
   * @param {string} value
   * @returns {Object}
   */
  validator.validateCategoryPath = function (value) {
    const trimedCategoryPath = value.trim();

    const validateError = new ValidateError("ValidateError");
    validateError.setHasError(false);
    validateError.setMsg("");

    if (trimedCategoryPath.charAt(0) !== "/") {
      validateError.setHasError(true);
      validateError.setMsg("Category path's first charactor must be '/'");
      return validateError.asObject();
    }

    if (trimedCategoryPath.length < 1) {
      validateError.setHasError(true);
      validateError.setMsg(
        "Category path length must be 1 charactor or longer"
      );
      return validateError.asObject();
    }

    return validateError.asObject();
  };
}

{
  /**
   * Category sort index 검사
   *
   * @param {number} value
   * @returns {Object}
   */
  validator.validateCategorySortIndex = function (value) {
    const validateError = new ValidateError("ValidateError");
    validateError.setHasError(false);
    validateError.setMsg("");

    if (value < 1) {
      validateError.setHasError(true);
      validateError.setMsg("Category sort index must be bigger than 1");
      return validateError.asObject();
    }

    return validateError.asObject();
  };
}

{
  /**
   * Tag Title 검사
   *
   * @param {string} value
   * @returns {Object}
   */
  validator.validateTagTitle = function (value) {
    const trimedTagTitle = value.trim();

    const validateError = new ValidateError("ValidateError");
    validateError.setHasError(false);
    validateError.setMsg("");

    if (trimedTagTitle.length < 1) {
      validateError.setHasError(true);
      validateError.setMsg("Tag title length must be 1 charactor or longer");
      return validateError.asObject();
    }

    return validateError.asObject();
  };
}

{
  /**
   * Tag Path 검사
   *
   * @param {*} value
   * @returns {Object}
   */
  validator.validateTagPath = function (value) {
    const trimedTagPath = value.trim();

    const validateError = new ValidateError("ValidateError");
    validateError.setHasError(false);
    validateError.setMsg("");

    if (trimedTagPath.charAt(0) !== "/") {
      validateError.setHasError(true);
      validateError.setMsg("Tag path's first charactor must be '/'");
      return validateError.asObject();
    }

    if (trimedTagPath.length < 1) {
      validateError.setHasError(true);
      validateError.setMsg("Tag path length must be 1 charactor or longer");
      return validateError.asObject();
    }

    return validateError.asObject();
  };
}

BaseSymbol.freezeSuperClass(ValidateError, ValidateError);

Object.freeze(validator);
export default validator;
