(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.main = undefined;

	var _regenerator = __webpack_require__(1);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(2);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _libs = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var main = exports.main = function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(e, ctx, cb) {
	    var params, res;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            params = {
	              TableName: 'notes',
	              Key: {
	                userId: e.requestContext.authorizer.claims.sub,
	                noteId: e.pathParameters.id
	              }
	            };
	            _context.prev = 1;
	            _context.next = 4;
	            return (0, _libs.call)('get', params);

	          case 4:
	            res = _context.sent;

	            if (!res.Item) {
	              _context.next = 7;
	              break;
	            }

	            return _context.abrupt('return', cb(null, (0, _libs.success)(res.Item)));

	          case 7:
	            return _context.abrupt('return', cb(null, (0, _libs.failure)({ status: false, error: 'Item not found.' })));

	          case 10:
	            _context.prev = 10;
	            _context.t0 = _context['catch'](1);
	            return _context.abrupt('return', cb(null, (0, _libs.failure)({ status: false })));

	          case 13:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, undefined, [[1, 10]]);
	  }));

	  return function main(_x, _x2, _x3) {
	    return _ref.apply(this, arguments);
	  };
	}();

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/regenerator");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dynamoDbLib = __webpack_require__(5);

	Object.defineProperty(exports, 'call', {
	  enumerable: true,
	  get: function get() {
	    return _dynamoDbLib.call;
	  }
	});

	var _responseLib = __webpack_require__(8);

	Object.defineProperty(exports, 'success', {
	  enumerable: true,
	  get: function get() {
	    return _responseLib.success;
	  }
	});
	Object.defineProperty(exports, 'failure', {
	  enumerable: true,
	  get: function get() {
	    return _responseLib.failure;
	  }
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.call = undefined;

	var _promise = __webpack_require__(6);

	var _promise2 = _interopRequireDefault(_promise);

	var _awsSdk = __webpack_require__(7);

	var _awsSdk2 = _interopRequireDefault(_awsSdk);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_awsSdk2.default.config.update({ region: 'us-east-1' });

	var call = exports.call = function call(action, params) {
	  var dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();

	  return new _promise2.default(function (resolve, reject) {
	    dynamoDb[action](params, function (err, res) {
	      if (err) {
	        return reject(err);
	      }

	      return resolve(res);
	    });
	  });
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("aws-sdk");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.buildResponse = exports.failure = exports.success = undefined;

	var _stringify = __webpack_require__(9);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var success = exports.success = function success(body) {
	  return buildResponse(200, body);
	};

	var failure = exports.failure = function failure(body) {
	  return buildResponse(500, body);
	};

	var buildResponse = exports.buildResponse = function buildResponse(statusCode, body) {
	  return {
	    statusCode: statusCode,
	    headers: {
	      'Access-Control-Allow-Origin': '*',
	      'Access-Control-Allow-Credentials': true
	    },
	    body: (0, _stringify2.default)(body)
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }
/******/ ])));