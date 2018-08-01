/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "static\\js\\" + ({"Alert":"Alert"}[chunkId]||chunkId) + "." + {"Alert":"760784f1"}[chunkId] + ".chunk.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/polyfills.js":
/*!**************************!*\
  !*** ./lib/polyfills.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(/*! babel-runtime/core-js/map */ "./node_modules/babel-runtime/core-js/map.js");

var _map2 = _interopRequireDefault(_map);

var _set = __webpack_require__(/*! babel-runtime/core-js/set */ "./node_modules/babel-runtime/core-js/set.js");

var _set2 = _interopRequireDefault(_set);

var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ "./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window.Set === 'undefined') {
  window.Set = _set2.default;
}

if (typeof window.Map === 'undefined') {
  window.Map = _map2.default;
}

if (typeof window.Promise === 'undefined') {
  window.Promise = _promise2.default;
}

/***/ }),

/***/ "./test/src/app/Footer.js":
/*!********************************!*\
  !*** ./test/src/app/Footer.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

__webpack_require__(/*! ./scss/Footer.scss */ "./test/src/app/scss/Footer.scss");

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function (_React$Component) {
	(0, _inherits3.default)(Footer, _React$Component);

	function Footer() {
		(0, _classCallCheck3.default)(this, Footer);
		return (0, _possibleConstructorReturn3.default)(this, (Footer.__proto__ || (0, _getPrototypeOf2.default)(Footer)).apply(this, arguments));
	}

	(0, _createClass3.default)(Footer, [{
		key: "render",
		value: function render() {
			var child = this.props.children;

			return child + "development" === 'production' ? '' : '(dev 0.0.1)';
		}
	}]);
	return Footer;
}(_react2.default.Component);

exports.default = Footer;

/***/ }),

/***/ "./test/src/app/Header.js":
/*!********************************!*\
  !*** ./test/src/app/Header.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__(/*! ./scss/Header.scss */ "./test/src/app/scss/Header.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function (_React$Component) {
	(0, _inherits3.default)(Header, _React$Component);

	function Header() {
		(0, _classCallCheck3.default)(this, Header);
		return (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).apply(this, arguments));
	}

	(0, _createClass3.default)(Header, [{
		key: "render",
		value: function render() {
			var child = this.props.children;

			return child;
		}
	}]);
	return Header;
}(_react2.default.Component);

exports.default = Header;

/***/ }),

/***/ "./test/src/app/Layout.js":
/*!********************************!*\
  !*** ./test/src/app/Layout.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = function (_React$Component) {
	(0, _inherits3.default)(Layout, _React$Component);

	function Layout() {
		(0, _classCallCheck3.default)(this, Layout);
		return (0, _possibleConstructorReturn3.default)(this, (Layout.__proto__ || (0, _getPrototypeOf2.default)(Layout)).apply(this, arguments));
	}

	(0, _createClass3.default)(Layout, [{
		key: "render",
		value: function render() {
			return this.props.children;
		}
	}]);
	return Layout;
}(_react2.default.Component);

exports.default = Layout;

/***/ }),

/***/ "./test/src/app/Main.js":
/*!******************************!*\
  !*** ./test/src/app/Main.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _c = __webpack_require__(/*! ./static/c.png */ "./test/src/app/static/c.png");

var _c2 = _interopRequireDefault(_c);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = function (_React$Component) {
	(0, _inherits3.default)(Main, _React$Component);

	function Main() {
		(0, _classCallCheck3.default)(this, Main);
		return (0, _possibleConstructorReturn3.default)(this, (Main.__proto__ || (0, _getPrototypeOf2.default)(Main)).apply(this, arguments));
	}

	(0, _createClass3.default)(Main, [{
		key: "render",
		value: function render() {
			var child = this.props.children;
			//npm install --save-dev babel-plugin-syntax-dynamic-import
			__webpack_require__.e(/*! import() | Alert */ "Alert").then(__webpack_require__.t.bind(null, /*! ./Alert */ "./test/src/app/Alert.js", 7)).then(function (Alert) {
				return alert(123);
			});

			return [_react2.default.createElement("img", { src: _c2.default }), 'test'];
		}
	}]);
	return Main;
}(_react2.default.Component);

exports.default = Main;

/***/ }),

/***/ "./test/src/app/index.js":
/*!*******************************!*\
  !*** ./test/src/app/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ "./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _set = __webpack_require__(/*! babel-runtime/core-js/set */ "./node_modules/babel-runtime/core-js/set.js");

var _set2 = _interopRequireDefault(_set);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Header = __webpack_require__(/*! ./Header */ "./test/src/app/Header.js");

var _Header2 = _interopRequireDefault(_Header);

var _Main = __webpack_require__(/*! ./Main */ "./test/src/app/Main.js");

var _Main2 = _interopRequireDefault(_Main);

var _Footer = __webpack_require__(/*! ./Footer */ "./test/src/app/Footer.js");

var _Footer2 = _interopRequireDefault(_Footer);

var _Layout = __webpack_require__(/*! ./Layout */ "./test/src/app/Layout.js");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "promise-polyfill";
// import "core-js/es6/set";
// import "core-js/es6/map";
// import "core-js/es6/promise";
function App() {

	var set = new _set2.default([1, 2, 3, 45]);

	var promise = new _promise2.default(function (resolve, rejects) {
		resolve(1);
	});

	return _react2.default.createElement(
		_Layout2.default,
		null,
		_react2.default.createElement(
			_Header2.default,
			null,
			"\u6807\u9898"
		),
		_react2.default.createElement(
			_Main2.default,
			null,
			"Hello Test"
		),
		_react2.default.createElement(
			_Footer2.default,
			null,
			"\u5C3E\u90E8"
		)
	);
}

_reactDom2.default.render(_react2.default.createElement(App, null), document.body);

/***/ }),

/***/ "./test/src/app/scss/Footer.scss":
/*!***************************************!*\
  !*** ./test/src/app/scss/Footer.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./test/src/app/scss/Header.scss":
/*!***************************************!*\
  !*** ./test/src/app/scss/Header.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./test/src/app/static/c.png":
/*!***********************************!*\
  !*** ./test/src/app/static/c.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAeCAIAAAAkQUA6AAAEF0lEQVRIDXWW25IbIQxEYWa8lVR+PT+bx10byGk1aFhXonJh0bq0EBe7/vr9p9Re+qi1Dkk9z5OvUso+2gq43MZxHHZITxTrmKzggN57JwqkjnIBoTtLoGYVX8r0jhiDbwgZdxx9L8XOdjj2SSn3FBwhzPKW7i0jU5zffEC80D3PVUZjeSSt9VQWfRq0Qz2QJ3l6V381cZ9DV5cU0IJMDUxxA10oUdnPUca9oPSeRR0Qzy6BRAWdNgWHxjNAosjo0UoiqewO1DU/Y7T4qPUkLhyhqN0UxLiO6IRJtcfHcbkx6IgbYD3pPWWVWK+0RasoliAqgFsnNnIpL96MBnfixDOPaYwbTBPKt77boKR0Wny6GI7PETJyIZhaa+BpynCsxm1KnJZpfZlUBu5iGecBEwdhkDZiAGdlOMtr7pl0T4176poSMTdkWOGjFhStRl+l4/34qNf18fpqnyxVBCIDR0dW1RRxbyQOCKZcnBH8UTyi3FVv0Liu4+ePx/WoHFK3jva9WmMkZWPVCqUVBE0BWHUQw+yW5TLXZ8q1T+Vq7fl86lZ9fnJktVwIrvM0MUm5CaSoEOJU53aAO6942P8QkLuKUw73+Vwe2urnV3s9yQ+makCYQIxuFMS6QXTEYJpQrIvVwnlZ6kSwcdO4gXo9tGZKnd1xWO6iCXZ6HCwKi4Kc1DXJVNb6JtuqUZujRsU+x2uuyW21u+o4T734lt0BJKfWOZ8Qz346gUcOhZqFxJcb4HpnpK0xen3yXQsy995nIxRPvn/wKTJeskjo0yRsb91mmkxOamLIeAqsu0TileK/fGX+5EaMKNlRx+ys6IDJhFt4CrAz03SgCFrl8u8aeV8QBWBiiPtuDufNREyzaYBOLcIlODgQACbd3eTDpgknnse6dp6aXl86mfz+AR1+ZWZZvXkvWHQDIioLWlzz24vDwT978Gv/XJ3LkT7mHxN0BBzR7Y7r93hcTQ8AlASq7epSXE2TyDmWawXd1VgRX4TI2X4atSqtOEXBcV5PPRMK8aOGAzqCQiCSU8dCliDKt/OZYQ7Wb/p3VvDXi3dUOZ3Onpkxp3uHsYITcvM5IFNYUdaVdznU59NMbJuykBefZVWcQ0Awuc/KEj5ckrlVzHHFCVHQ1qUw6R/qBDlDcXTxJMZHwen2WJw9xYQoYzjz72MSGOLPmc5j7L8NDnB2fNLf5xtrIpkXN+uOJZsVPOf6TMboej11DE4WplK4Mutfs/NmrunHAkKb/usQgIHc58Vzfu/0lLAOknmfQ+U46gmncPrJ3gz9R4XZnSDRPIfxE6xyD5UOLj268s6HDQHFnIp1pmecDhTY42bIzVZCEJkQ7Wm0IfIIWAll5f0MZ3lbCXD6OoXx3ptb7YJtclSEaDBoN9+HBFP5C4wpvKFm+MpJAAAAAElFTkSuQmCC"

/***/ }),

/***/ "./test/src/index.js":
/*!***************************!*\
  !*** ./test/src/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ "./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _objectWithoutProperties2 = __webpack_require__(/*! babel-runtime/helpers/objectWithoutProperties */ "./node_modules/babel-runtime/helpers/objectWithoutProperties.js");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = function (templateParams) {
    if (true) console.log(window, history);

    return function (data) {
        var __t = void 0;
        var __p = '';
        __p += '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="UTF-8">\n    <title>' + '</title>\n  </head>\n  <body>\n  </body>\n</html>';
        return __p;
    }();
};

var _app = __webpack_require__(/*! ./app */ "./test/src/app/index.js");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var A = function A() {
    (0, _classCallCheck3.default)(this, A);
};

A.a = 3;

var B = function (_A) {
    (0, _inherits3.default)(B, _A);

    function B() {
        (0, _classCallCheck3.default)(this, B);
        return (0, _possibleConstructorReturn3.default)(this, (B.__proto__ || (0, _getPrototypeOf2.default)(B)).apply(this, arguments));
    }

    return B;
}(A);

console.log(pkg, pkg5, html, md);

var _c$a$b = { c: 4, a: 3, b: 6 },
    c = _c$a$b.c,
    a = (0, _objectWithoutProperties3.default)(_c$a$b, ['c']);

// const jsx = <div t1="asdf" {...a}>asf</div>

_promise2.default.resolve('sdaf');

/***/ }),

/***/ 0:
/*!****************************************************!*\
  !*** multi ./lib/polyfills.js ./test/src/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\wamp\www\github-project\create-webpack-config\lib\polyfills.js */"./lib/polyfills.js");
module.exports = __webpack_require__(/*! D:\wamp\www\github-project\create-webpack-config\test\src\index.js */"./test/src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=app.bb734187.js.map