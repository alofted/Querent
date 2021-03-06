(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Querent = factory());
}(this, (function () { 'use strict';

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

// Define Object.entries which is part of the ES2017 spec
Object.entries = function (x) {
  return Object.keys(x).reduce(function (y, z) {
    return y.push([z, x[z]]) && y;
  }, []);
};

var query = function query(collection, _query) {
  return collection.filter(function (object) {
    return matches(object, _query);
  });
};

var matches = function matches(object, query) {
  return every(query, function (key, value) {
    return evaluate(object[key], value);
  });
};

var every = function every(object, iteratee) {
  return Object.entries(object).every(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return iteratee(key, value);
  });
};

var evaluate = function evaluate(prop, value) {
  if (Array.isArray(value)) return value.includes(prop);

  if (value instanceof Object) return every(value, function (key, value) {
    return predicate(prop, key, value);
  });

  return value === prop;
};

var predicate = function predicate(prop, key, value) {
  switch (key) {
    case '!':
      return !evaluate(prop, value);
    case '<':
      return prop < value;
    case '<=':
      return prop <= value;
    case '>':
      return prop > value;
    case '>=':
      return prop >= value;
    default:
      return evaluate(prop[key], value);
  }
};

var Querent = {
  query: query,
  matches: matches,
  every: every,
  evaluate: evaluate,
  predicate: predicate
};

return Querent;

})));
//# sourceMappingURL=Querent.js.map
