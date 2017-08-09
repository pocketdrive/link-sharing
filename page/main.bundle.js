webpackJsonp([1],{

/***/ "../../../../../config/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return centralServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return centralServerWSPort; });
/**
 * Created by anuradhawick on 7/31/17.
 */
/**
 * Created by anuradhawick on 7/31/17.
 */ var centralServer = '192.248.8.242';
var centralServerWSPort = '8080';
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The whole content below can be removed with the new code.-->\n<style>\n\n    /*** CSS for Loader ***/\n    .circle-loader {\n        margin: 0 0 30px 10px;\n        border: 2px solid rgba(0, 0, 0, 0.2);\n        border-left-color: #0000FF;\n        animation-name: loader-spin;\n        animation-duration: 1s;\n        animation-iteration-count: infinite;\n        animation-timing-function: linear;\n        position: relative;\n        display: inline-block;\n        vertical-align: top;\n    }\n\n    .circle-loader,\n    .circle-loader:after {\n        border-radius: 50%;\n        width: 8em;\n        height: 8em;\n    }\n\n    .load-complete {\n        -webkit-animation: none;\n        animation: none;\n        border-color: #0000FF;\n        transition: border 500ms ease-out;\n    }\n\n    .checkmark.draw:after {\n        animation-duration: 800ms;\n        animation-timing-function: ease;\n        animation-name: checkmark;\n        transform: scaleX(-1) rotate(135deg);\n    }\n    .checkmark:after {\n        opacity: 1;\n        height: 4em;\n        width: 2em;\n        transform-origin: left top;\n        border-right: 2px solid #0000FF;\n        border-top: 2px solid #0000FF;\n        content: '';\n        left: 2em;\n        top: 4em;\n        position: absolute;\n    }\n\n    @keyframes loader-spin {\n        0% {\n            transform: rotate(0deg);\n        }\n        100% {\n            transform: rotate(360deg);\n        }\n    }\n    @keyframes checkmark {\n        0% {\n            height: 0;\n            width: 0;\n            opacity: 1;\n        }\n        20% {\n            height: 0;\n            width: 2em;\n            opacity: 1;\n        }\n        40% {\n            height: 4em;\n            width: 2em;\n            opacity: 1;\n        }\n        100% {\n            height: 4em;\n            width: 2em;\n            opacity: 1;\n        }\n    }\n\n    /*** CSS for animation ***/\n    .animate-bottom {\n        position: relative;\n        -webkit-animation-name: animatebottom;\n        -webkit-animation-duration: 1s;\n        animation-name: animatebottom;\n        animation-duration: 1s\n    }\n\n    @-webkit-keyframes animatebottom {\n        from {\n            bottom: -100px;\n            opacity: 0\n        }\n        to {\n            bottom: 0px;\n            opacity: 1\n        }\n    }\n\n    @keyframes animatebottom {\n        from {\n            bottom: -100px;\n            opacity: 0\n        }\n        to {\n            bottom: 0;\n            opacity: 1\n        }\n    }\n\n    /** Connecting to PD css**/\n    .loading:after {\n        overflow: hidden;\n        display: inline-block;\n        vertical-align: bottom;\n        -webkit-animation: ellipsis steps(4,end) 900ms infinite;\n        animation: ellipsis steps(4,end) 900ms infinite;\n        content: \"\\2026\"; /* ascii code for the ellipsis character */\n        width: 0px;\n    }\n\n    @keyframes ellipsis {\n        to {\n            width: 1.25em;\n        }\n    }\n\n    @-webkit-keyframes ellipsis {\n        to {\n            width: 1.25em;\n        }\n    }\n\n    /*** Basic CSS for page ***/\n\n    .pageCenter {\n        position: absolute;\n        height: 100%;\n        width: 100%;\n        display: table;\n    }\n\n    .middle {\n        display: table-cell;\n        vertical-align: middle;\n        text-align: center;\n        margin: 0 auto;\n    }\n\n    .inner {\n        margin-left: auto;\n        margin-right: auto;\n    }\n</style>\n\n<div class=\"pageCenter\">\n    <div class=\"middle\">\n        <!-- Display loader and checkmark when download completes -->\n        <div *ngIf=\"!error\" [ngClass]=\"downloadComplete==true && !error == true ? 'load-complete circle-loader':'circle-loader'\">\n            <div *ngIf=\"downloadComplete && !error\" class=\"checkmark draw\"></div>\n        </div>\n        <br><br>\n\n        <!--Display error message on error-->\n        <div *ngIf=\"error\" id=\"myDiv\" class=\"animate-bottom inner\">\n            <div class=\"alert alert-danger\" style=\"width:50%;display:table;margin:0 auto\">\n                <strong>{{message}}</strong>\n            </div>\n        </div>\n\n        <div  *ngIf=\"loading && !error\" style=\"font-size: large\"><strong>Connecting to PD <span style=\"width: 25px;display: inline-block;text-align: left\" class=\"loading\"></span></strong></div>\n        <div *ngIf=\"!loading && !downloadComplete && !error\" style=\"text-align: center;font-size: large\"><strong>Downloading <span id=\"percentage\">0</span> %</strong>\n        </div>\n        <div *ngIf=\"!error && downloadComplete\" id=\"myDiv\"   class=\"animate-bottom inner\">\n            <strong style=\"font-size: x-large;color:#0000FF\" >Download Completed !</strong>\n            <p>Thanks for using Pocket Drive service</p>\n        </div>\n    </div>\n\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_simple_peer__ = __webpack_require__("../../../../simple-peer/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_simple_peer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_simple_peer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__communicator_communicator__ = __webpack_require__("../../../../../src/communicator/communicator.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var AppComponent = (function () {
    function AppComponent(zone) {
        this.zone = zone;
        this.loading = true;
        this.percentage = 0;
        this.interval = null;
        this.downloadComplete = false;
        this.error = null;
        this.message = null;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.startSequence();
    };
    AppComponent.prototype.startSequence = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params, connectionStatus, pd, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!__WEBPACK_IMPORTED_MODULE_2_simple_peer__["WEBRTC_SUPPORT"]) {
                            this.error = 'WebRTC not supported by your browser';
                            this.message = 'Unfortunately, this browser does not support our link sharing download feature yet. Please switch to google Chrome or Opera';
                            console.error(this.error);
                            return [2 /*return*/];
                        }
                        if (!streamSaver.supported) {
                            this.error = 'Streaming not supported by your browser';
                            this.message = 'Unfortunately, this browser does not support our link sharing download feature yet. Please switch to google Chrome or Opera';
                            console.error(this.error);
                            return [2 /*return*/];
                        }
                        params = this.obtainPathParams();
                        this.communicator = new __WEBPACK_IMPORTED_MODULE_3__communicator_communicator__["a" /* Communicator */](params[0], params[1]);
                        this.communicator.on('error', this.handleWsError());
                        this.communicator.registerOnServer();
                        return [4 /*yield*/, this.waitForP2PConnection()];
                    case 1:
                        connectionStatus = _a.sent();
                        if (connectionStatus) {
                            this.loading = false;
                            pd = this.communicator.getPeerObject();
                            message = {
                                type: 'linkShare',
                                username: params[0],
                                fileId: params[2]
                            };
                            pd.sendBuffer(new Buffer(JSON.stringify(message)), 'json');
                            pd.on('progress', this.updateDownloadBar());
                            pd.on('message', this.handleMessage());
                            this.updateUI();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.obtainPathParams = function () {
        var origin = window.location.origin;
        var url = window.location.href;
        url = url.replace(origin, '').replace('/', '');
        url = url.trim();
        return url.split('/');
    };
    AppComponent.prototype.updateDownloadBar = function () {
        var localThis = this;
        return function (progress) {
            if (__WEBPACK_IMPORTED_MODULE_1_lodash__["isNumber"](progress)) {
                localThis.percentage = Math.round(progress);
            }
        };
    };
    AppComponent.prototype.handleMessage = function () {
        var _this = this;
        var localThis = this;
        return function (message, info) {
            if (info.type !== 'json')
                return;
            var msgObj = JSON.parse(message);
            switch (msgObj.type) {
                case 'error':
                    localThis.error = msgObj.error;
                    localThis.message = msgObj.message;
                    console.error(_this.error, _this.message);
                    break;
            }
        };
    };
    AppComponent.prototype.updateUI = function () {
        var _this = this;
        this.interval = setInterval(function () {
            document.getElementById('percentage').innerText = '' + (_this.percentage || 0);
            if (_this.percentage === 100) {
                _this.downloadComplete = true;
                clearInterval(_this.interval);
            }
        }, 1000);
    };
    AppComponent.prototype.handleWsError = function () {
        var _this = this;
        var localThis = this;
        return function (msgObj) {
            localThis.error = msgObj.error;
            localThis.message = msgObj.message;
            console.error(_this.error, _this.message);
        };
    };
    AppComponent.prototype.waitForP2PConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var attempts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        attempts = 0;
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var int = setInterval(function () {
                                    if (_this.communicator.isConnectedP2P()) {
                                        resolve(true);
                                        clearInterval(int);
                                    }
                                    else if (attempts === 10) {
                                        resolve(false);
                                        clearInterval(int);
                                    }
                                    attempts++;
                                }, 1000);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../../../../buffer/index.js").Buffer))

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var appRoutes = [
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */] },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* RouterModule */].forRoot(appRoutes)
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/communicator/communicator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_websocket_angular2_websocket__ = __webpack_require__("../../../../angular2-websocket/angular2-websocket.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_websocket_angular2_websocket___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular2_websocket_angular2_websocket__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uuid_v4__ = __webpack_require__("../../../../uuid/v4.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uuid_v4___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_uuid_v4__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__("../../../../../config/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pd_peer__ = __webpack_require__("../../../../../src/communicator/pd-peer.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ws_messages__ = __webpack_require__("../../../../../src/communicator/ws-messages.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Communicator; });
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Created by anuradhawick on 7/31/17.
 */





var Communicator = (function () {
    function Communicator(targetUsername, targetDeviceId) {
        var _this = this;
        this.targetUsername = targetUsername;
        this.targetDeviceId = targetDeviceId;
        this.registeredDevice = false;
        this.pdPeer = null;
        this.username = "user-" + __WEBPACK_IMPORTED_MODULE_1_uuid_v4___default()().toString();
        this.deviceId = "dev-id-" + __WEBPACK_IMPORTED_MODULE_1_uuid_v4___default()().toString();
        this.callbacks = {
            error: null,
        };
        this.ws = new __WEBPACK_IMPORTED_MODULE_0_angular2_websocket_angular2_websocket__["$WebSocket"]("ws://" + __WEBPACK_IMPORTED_MODULE_2__config__["a" /* centralServer */] + ":" + __WEBPACK_IMPORTED_MODULE_2__config__["b" /* centralServerWSPort */]);
        this.ws.onMessage(function (msg) {
            _this._onMessage(msg.data);
        }, { autoApply: false });
        this.ws.setSend4Mode(__WEBPACK_IMPORTED_MODULE_0_angular2_websocket_angular2_websocket__["WebSocketSendMode"].Direct);
    }
    Communicator.prototype._onMessage = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, _a, signal;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        obj = JSON.parse(msg);
                        _a = obj.type;
                        switch (_a) {
                            case __WEBPACK_IMPORTED_MODULE_4__ws_messages__["a" /* registerDevice */]: return [3 /*break*/, 1];
                            case __WEBPACK_IMPORTED_MODULE_4__ws_messages__["b" /* acceptOffer */]: return [3 /*break*/, 4];
                            case __WEBPACK_IMPORTED_MODULE_4__ws_messages__["c" /* connectionOffer */]: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 6];
                    case 1:
                        if (!obj.success) return [3 /*break*/, 3];
                        this.registeredDevice = true;
                        return [4 /*yield*/, this.initPeerAndGetSignal()];
                    case 2:
                        signal = _b.sent();
                        this._sendOfferToPeer(signal);
                        _b.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        this.signalSelfPeer(obj.answer);
                        return [3 /*break*/, 6];
                    case 5:
                        if (!obj.success) {
                            this.callbacks.error && this.callbacks.error(obj);
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Communicator.prototype.signalSelfPeer = function (signals) {
        var _this = this;
        signals.forEach(function (signal) {
            _this.pdPeer.setSignal(signal);
        });
    };
    Communicator.prototype.registerOnServer = function () {
        var msg = {
            type: __WEBPACK_IMPORTED_MODULE_4__ws_messages__["a" /* registerDevice */],
            data: { username: this.username, deviceId: this.deviceId }
        };
        this._sendMessageToServer(JSON.stringify(msg));
    };
    Communicator.prototype.initPeerAndGetSignal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pdPeer = new __WEBPACK_IMPORTED_MODULE_3__pd_peer__["a" /* default */]();
                        return [4 /*yield*/, this.pdPeer.getSignal()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Communicator.prototype._sendOfferToPeer = function (signal) {
        var msg = {
            type: __WEBPACK_IMPORTED_MODULE_4__ws_messages__["c" /* connectionOffer */],
            data: {
                username: this.targetUsername,
                deviceId: this.targetDeviceId,
                offer: signal,
                fromUsername: this.username,
                fromDeviceId: this.deviceId
            }
        };
        this._sendMessageToServer(JSON.stringify(msg));
    };
    Communicator.prototype.on = function (event, callback) {
        this.callbacks[event] = callback;
    };
    Communicator.prototype._sendMessageToServer = function (msg) {
        this.ws.send(msg);
    };
    Communicator.prototype.isConnectedP2P = function () {
        return this.pdPeer && this.pdPeer.isConnected();
    };
    Communicator.prototype.getPeerObject = function () {
        return this.pdPeer;
    };
    return Communicator;
}());

//# sourceMappingURL=communicator.js.map

/***/ }),

/***/ "../../../../../src/communicator/pd-peer.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_simple_peer__ = __webpack_require__("../../../../simple-peer/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_simple_peer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_simple_peer__);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Created by anuradhawick on 8/1/17.
 */

var options = {
    initiator: true,
    channelConfig: {},
    channelName: 'dvios-intercon',
    config: {
        iceServers: [
            { url: 'stun:stun.l.google.com:19302' },
            { url: 'turn:anuradha@192.248.8.242:3478', username: 'anuradha', credential: 'sanjeewa' }
        ]
    },
    constraints: {},
    offerConstraints: {},
    answerConstraints: {},
    reconnectTimer: false,
    sdpTransform: function (sdp) {
        return sdp;
    },
    stream: false,
    trickle: true,
    objectMode: false
};
var PDPeer = (function () {
    function PDPeer() {
        var _this = this;
        this.pingReceived = false;
        this.peerObj = null;
        this.connected = false;
        this.callBacks = {
            message: null,
            disconnect: null,
            signal: null,
            progress: null,
            connect: null
        };
        this.signalBuffer = [];
        this.dataBuffer = null;
        this.receiveInfo = null;
        this.currentReceiveProgress = 0;
        this.peerObj = new __WEBPACK_IMPORTED_MODULE_0_simple_peer__(options);
        // signal event
        this.peerObj.on('signal', function (data) {
            _this.signalBuffer.push(data);
        });
        // connected event
        this.peerObj.on('connect', function () {
            _this.connected = true;
        });
        this.peerObj.on('end', function () {
            console.log('ended');
        });
        // data reception event
        this.peerObj.on('data', function (data) {
            try {
                var obj = JSON.parse(data);
                if (obj.type === 'ping') {
                    _this.pingReceived = true;
                }
                // pass down the message
                _this._receiveDataToBuffer(data, false);
            }
            catch (e) {
                _this._receiveDataToBuffer(data, true);
            }
        });
    }
    PDPeer.prototype.on = function (event, callback) {
        this.callBacks[event] = callback;
    };
    PDPeer.prototype.sendBuffer = function (buffer, type, data) {
        if (type === void 0) { type = null; }
        if (data === void 0) { data = null; }
        return __awaiter(this, void 0, void 0, function () {
            var file, i, metaObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = buffer;
                        i = 0;
                        metaObj = {
                            sof: true,
                            eof: false,
                            info: {
                                size: file.byteLength
                            },
                            type: type,
                            data: data // To be used at the user level
                        };
                        this.peerObj.send(JSON.stringify(metaObj));
                        _a.label = 1;
                    case 1:
                        if (!(file.byteLength > 0)) return [3 /*break*/, 4];
                        this.peerObj.send(file.slice(0, 1024 * 64));
                        file = file.slice(1024 * 64);
                        i++;
                        if (!(i === 100)) return [3 /*break*/, 3];
                        this.peerObj.send(JSON.stringify({ type: 'ping' }));
                        return [4 /*yield*/, this._waitForPing()];
                    case 2:
                        _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4:
                        metaObj.eof = true;
                        metaObj.sof = false;
                        this.peerObj.send(JSON.stringify(metaObj));
                        return [2 /*return*/];
                }
            });
        });
    };
    PDPeer.prototype.getSignal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var attempts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        attempts = 0;
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var int = setInterval(function () {
                                    if (attempts === 10) {
                                        resolve(_this.signalBuffer);
                                        clearInterval(int);
                                    }
                                    attempts++;
                                }, 100);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PDPeer.prototype.setSignal = function (signal) {
        this.peerObj.signal(signal);
    };
    PDPeer.prototype.isConnected = function () {
        return this.connected;
    };
    PDPeer.prototype._waitForPing = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var attempts, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        attempts = 0;
                        return [4 /*yield*/, new Promise(function (resolve) {
                                var int = setInterval(function () {
                                    if (_this.pingReceived) {
                                        _this.pingReceived = false;
                                        resolve(true);
                                        clearInterval(int);
                                    }
                                    else if (attempts === 50) {
                                        resolve(false);
                                        _this.pingReceived = false;
                                        clearInterval(int);
                                    }
                                    attempts++;
                                }, 10);
                            })];
                    case 1:
                        status = _a.sent();
                        return [2 /*return*/, status];
                }
            });
        });
    };
    PDPeer.prototype._receiveDataToBuffer = function (data, isBuffer) {
        if (!isBuffer) {
            var obj = JSON.parse(data);
            if (obj.sof) {
                this.receiveInfo = { info: obj.info, type: obj.type, data: obj.data };
                this.receivedContent = 0;
                if (this.receiveInfo.type === 'file') {
                    this.fileStream = streamSaver.createWriteStream(this.receiveInfo.data.fileName, this.receiveInfo.info.size);
                    this.writer = this.fileStream.getWriter();
                }
                else {
                    this.dataBuffer = new Buffer(0);
                }
            }
            else if (obj.eof) {
                if (this.receiveInfo.type === 'file') {
                    this.writer.close();
                }
                else {
                    this.callBacks.message && this.callBacks.message(this.dataBuffer, this.receiveInfo);
                }
                this.currentReceiveProgress = 0;
            }
            else {
                this.receivedContent += data.byteLength;
                if (this.receiveInfo.type !== 'file') {
                    this.dataBuffer = Buffer.concat([this.dataBuffer, data]);
                }
                this.currentReceiveProgress = (this.receivedContent / this.receiveInfo.info.size) * 100;
                this.callBacks.progress && this.callBacks.progress(this.currentReceiveProgress);
            }
        }
        else {
            this.receivedContent += data.byteLength;
            if (this.receiveInfo.type === 'file') {
                this.writer.write(data);
            }
            else {
                this.dataBuffer = Buffer.concat([this.dataBuffer, data]);
            }
            this.currentReceiveProgress = (this.receivedContent / this.receiveInfo.info.size) * 100;
            this.callBacks.progress && this.callBacks.progress(this.currentReceiveProgress);
        }
    };
    return PDPeer;
}());
/* harmony default export */ __webpack_exports__["a"] = (PDPeer);
//# sourceMappingURL=pd-peer.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../../../../buffer/index.js").Buffer))

/***/ }),

/***/ "../../../../../src/communicator/ws-messages.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createAccount */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return registerDevice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return connectionOffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return acceptOffer; });
/* unused harmony export isOnline */
/* unused harmony export getActiveDevices */
/**
 * Created by anuradhawick on 7/31/17.
 */
/**
 * Created by anuradhawick on 7/31/17.
 */ var createAccount = 'createAccount';
var registerDevice = 'registerDevice';
var connectionOffer = 'connectionOffer';
var acceptOffer = 'acceptOffer';
var isOnline = 'isOnline';
var getActiveDevices = 'getActiveDevices';
//# sourceMappingURL=ws-messages.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map