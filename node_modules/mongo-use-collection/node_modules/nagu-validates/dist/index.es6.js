import _Object$keys from 'babel-runtime/core-js/object/keys';
import _Number$isInteger from 'babel-runtime/core-js/number/is-integer';
import _Number$isNaN from 'babel-runtime/core-js/number/is-nan';

/*
定义用于返回的错误代码
 */

// 成功
var SUCCESS = 0;

// 无权限访问
var UNAUTHORIZED = 401;

// 服务器错误
var SERVER_FAILED = 500;

// 其他错误
var OTHER_ERROR = 999;

// 必须填写的字段
var REQUIRED = 1001;

// 无效的电子邮件地址
var INVALID_EMAIL_ADDRESS = 1002;

// 字符串太短
var TOO_SHORT_CHARACTERS = 1003;

// 字符串太长
var TOO_MANY_CHARACTERS = 1004;

// 不是数字型
var INVALID_NUMBER = 1005;

// 不是整型数
var INVALID_INTEGER = 1006;

// 数值太小
var TOO_SMALL_NUMBER = 1007;

// 数值太大
var TOO_LARGE_NUMBER = 1008;

// 对象没找到
var OBJECT_IS_NOT_FOUND = 1009;

// 对象未定义或为空
var OBJECT_IS_UNDEFINED_OR_NULL = 1010;

// 未知错误
var UNKNOWN_ERROR = -1;

var isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};
var join = function join(rules) {
  return function (value, data) {
    return rules.map(function (rule) {
      return rule(value, data);
    }).filter(function (error) {
      return !!error;
    })[0];
  };
};

function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

function required(value) {
  if (isEmpty(value)) {
    return REQUIRED;
  }
}

var number = function number(value) {
  if (_Number$isNaN(Number(value))) {
    return INVALID_NUMBER;
  }
};

function integer(value) {
  if (!_Number$isInteger(Number(value))) {
    return INVALID_INTEGER;
  }
}

var range = function range(value, min, max) {
  if (number(value)) return number(value);
  var num = Number(value);
  if (num < min) return TOO_SMALL_NUMBER;
  if (num > max) return TOO_LARGE_NUMBER;
};

function minLength(min) {
  return function (value) {
    if (!isEmpty(value) && value.length < min) {
      return 'Must be at least ' + min + ' characters';
    }
  };
}

function maxLength(max) {
  return function (value) {
    if (!isEmpty(value) && value.length > max) {
      return 'Must be no more than ' + max + ' characters';
    }
  };
}

function oneOf(enumeration) {
  return function (value) {
    if (!~enumeration.indexOf(value)) {
      return 'Must be one of: ' + enumeration.join(', ');
    }
  };
}

function match(field) {
  return function (value, data) {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

function createValidator(rules) {
  return function () {
    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var errors = {};
    _Object$keys(rules).forEach(function (key) {
      // concat enables both functions and arrays of functions
      var rule = join([].concat(rules[key]));
      var error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

export { SUCCESS, UNAUTHORIZED, SERVER_FAILED, OTHER_ERROR, REQUIRED, INVALID_EMAIL_ADDRESS, TOO_SHORT_CHARACTERS, TOO_MANY_CHARACTERS, INVALID_NUMBER, INVALID_INTEGER, TOO_SMALL_NUMBER, TOO_LARGE_NUMBER, OBJECT_IS_NOT_FOUND, OBJECT_IS_UNDEFINED_OR_NULL, UNKNOWN_ERROR, email, required, number, integer, range, minLength, maxLength, oneOf, match, createValidator };
//# sourceMappingURL=index.es6.js.map