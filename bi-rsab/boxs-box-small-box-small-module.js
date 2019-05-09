(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["boxs-box-small-box-small-module"],{

/***/ "./src/app/+boxs/box-small/box-small-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/+boxs/box-small/box-small-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: BoxSmallRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoxSmallRoutingModule", function() { return BoxSmallRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _box_small_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./box-small.component */ "./src/app/+boxs/box-small/box-small.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [{
        path: '',
        component: _box_small_component__WEBPACK_IMPORTED_MODULE_2__["BoxSmallComponent"]
    }];
var BoxSmallRoutingModule = /** @class */ (function () {
    function BoxSmallRoutingModule() {
    }
    BoxSmallRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], BoxSmallRoutingModule);
    return BoxSmallRoutingModule;
}());



/***/ }),

/***/ "./src/app/+boxs/box-small/box-small.component.css":
/*!*********************************************************!*\
  !*** ./src/app/+boxs/box-small/box-small.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/+boxs/box-small/box-small.component.html":
/*!**********************************************************!*\
  !*** ./src/app/+boxs/box-small/box-small.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box-small header=\"150\" backgroundColor=\"aqua\" iconStyleClass=\"fa fa-shopping-cart\">\r\n      <mk-box-small-content>41,410</mk-box-small-content>\r\n      <mk-box-small-footer>\r\n        <a routerLink=\"/\">More info <i class=\"fa fa-arrow-circle-right\"></i></a>\r\n      </mk-box-small-footer>\r\n    </mk-box-small>\r\n  </div>\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box-small header=\"53%\" backgroundColor=\"green\" iconStyleClass=\"ion ion-stats-bars\">\r\n      <mk-box-small-content>Bounce Rate</mk-box-small-content>\r\n      <mk-box-small-footer>\r\n        <a routerLink=\"/\">More info <i class=\"fa fa-arrow-circle-right\"></i></a>\r\n      </mk-box-small-footer>\r\n    </mk-box-small>\r\n  </div>\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box-small header=\"44\" backgroundColor=\"yellow\" iconStyleClass=\"ion ion-person-add\">\r\n      <mk-box-small-content>User Registrations</mk-box-small-content>\r\n      <mk-box-small-footer>\r\n        <a routerLink=\"/\">More info <i class=\"fa fa-arrow-circle-right\"></i></a>\r\n      </mk-box-small-footer>\r\n    </mk-box-small>\r\n  </div>\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box-small header=\"65\" backgroundColor=\"red\" iconStyleClass=\"ion ion-pie-graph\">\r\n      <mk-box-small-content>Unique Visitors</mk-box-small-content>\r\n      <mk-box-small-footer>\r\n        <a routerLink=\"/\">More info <i class=\"fa fa-arrow-circle-right\"></i></a>\r\n      </mk-box-small-footer>\r\n    </mk-box-small>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-md-6 col-xs-12\">\r\n    <mk-box header=\"Small Box with text header & footer\" [isRemovable]=\"false\">\r\n      <pre><code class=\"language-html\">&lt;mk-box-small header=\"Header text\" footer=\"Footer text\" backgroundColor=\"yellow\" iconStyleClass=\"ion ion-pie-graph\"&gt;\r\n  Content text\r\n&lt;/mk-box-small&gt;</code></pre>\r\n    </mk-box>\r\n  </div>\r\n  <div class=\"col-md-6 col-xs-12\">\r\n    <mk-box header=\"Small Box with HTML header & footer\" [isRemovable]=\"false\">\r\n      <pre><code class=\"language-html\">&lt;mk-box-small backgroundColor=\"yellow\" iconStyleClass=\"ion ion-pie-graph\"&gt;\r\n  &lt;mk-box-small-header&gt;Header HTML&lt;/mk-box-small-header&gt;\r\n  &lt;mk-box-small-content&gt;Content HTML&lt;/mk-box-small-content&gt;\r\n  &lt;mk-box-small-footer&gt;Footer HTML&lt;/mk-box-small-footer&gt;\r\n&lt;/mk-box-small&gt;</code></pre>\r\n    </mk-box>\r\n  </div>\r\n</div>\r\n\r\n<mk-box header=\"Properties\" [isRemovable]=\"false\" contentClasses=\"table-responsive\">\r\n  <table class=\"table table-bordered table-hover\">\r\n    <tbody>\r\n      <tr>\r\n        <th>Name</th>\r\n        <th>Type</th>\r\n        <th>Default</th>\r\n        <th>Description</th>\r\n      </tr>\r\n      <tr>\r\n        <td>backgroundColor</td>\r\n        <td>string (green | aqua | light-blue | red | yellow | mutted | rgb | rgba | hex)</td>\r\n        <td>null</td>\r\n        <td>The box background color.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>contentColor</td>\r\n        <td>string (green | aqua | light-blue | red | yellow | mutted | rgb | rgba | hex)</td>\r\n        <td>#fff</td>\r\n        <td>The  box content font color.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>contentStyleClass</td>\r\n        <td>string</td>\r\n        <td>small-box-content</td>\r\n        <td>The box footer css classes.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>footer</td>\r\n        <td>string</td>\r\n        <td>null</td>\r\n        <td>\r\n          Footer text of the panel.<br/>\r\n          <em>Note: You can use &lt;mk-box-small-footer&gt; for HTML footer.</em>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td>footerColor</td>\r\n        <td>string (green | aqua | light-blue | red | yellow | mutted | rgb | rgba | hex)</td>\r\n        <td>#fff</td>\r\n        <td>The box footer font color.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>footerStyleClass</td>\r\n        <td>string</td>\r\n        <td>small-box-footer</td>\r\n        <td>The box footer css classes.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>header</td>\r\n        <td>string</td>\r\n        <td>null</td>\r\n        <td>\r\n          Header text of the panel.<br/>\r\n          <em>Note: You can use &lt;mk-box-small-header&gt; for HTML header.</em>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td>headerColor</td>\r\n        <td>string (green | aqua | light-blue | red | yellow | mutted | rgb | rgba | hex)</td>\r\n        <td>#fff</td>\r\n        <td>The box header font color.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>headerStyleClass</td>\r\n        <td>string</td>\r\n        <td>small-box-header</td>\r\n        <td>The box header css classes.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>iconStyleClass</td>\r\n        <td>string</td>\r\n        <td>ion ion-bag</td>\r\n        <td>The box icon classes.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>iconColor</td>\r\n        <td>string (green | aqua | light-blue | red | yellow | mutted | rgb | rgba | hex)</td>\r\n        <td>null</td>\r\n        <td>The box icon font color.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>styleClass</td>\r\n        <td>string</td>\r\n        <td>small-box</td>\r\n        <td>Defines the box css classes.</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</mk-box>\r\n"

/***/ }),

/***/ "./src/app/+boxs/box-small/box-small.component.ts":
/*!********************************************************!*\
  !*** ./src/app/+boxs/box-small/box-small.component.ts ***!
  \********************************************************/
/*! exports provided: BoxSmallComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoxSmallComponent", function() { return BoxSmallComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var BoxSmallComponent = /** @class */ (function () {
    function BoxSmallComponent() {
    }
    /**
     * @method ngAfterViewInit
     */
    BoxSmallComponent.prototype.ngAfterViewInit = function () {
        prismjs__WEBPACK_IMPORTED_MODULE_1__["highlightAll"]();
    };
    BoxSmallComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-box-small',
            template: __webpack_require__(/*! ./box-small.component.html */ "./src/app/+boxs/box-small/box-small.component.html"),
            styles: [__webpack_require__(/*! ./box-small.component.css */ "./src/app/+boxs/box-small/box-small.component.css")]
        })
    ], BoxSmallComponent);
    return BoxSmallComponent;
}());



/***/ }),

/***/ "./src/app/+boxs/box-small/box-small.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/+boxs/box-small/box-small.module.ts ***!
  \*****************************************************/
/*! exports provided: BoxSmallModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoxSmallModule", function() { return BoxSmallModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _box_small_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./box-small-routing.module */ "./src/app/+boxs/box-small/box-small-routing.module.ts");
/* harmony import */ var _box_small_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./box-small.component */ "./src/app/+boxs/box-small/box-small.component.ts");
/* harmony import */ var angular_admin_lte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-admin-lte */ "./library/angular-admin-lte/src/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var BoxSmallModule = /** @class */ (function () {
    function BoxSmallModule() {
    }
    BoxSmallModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _box_small_routing_module__WEBPACK_IMPORTED_MODULE_2__["BoxSmallRoutingModule"],
                angular_admin_lte__WEBPACK_IMPORTED_MODULE_4__["BoxModule"],
                angular_admin_lte__WEBPACK_IMPORTED_MODULE_4__["BoxSmallModule"]
            ],
            declarations: [_box_small_component__WEBPACK_IMPORTED_MODULE_3__["BoxSmallComponent"]]
        })
    ], BoxSmallModule);
    return BoxSmallModule;
}());



/***/ })

}]);
//# sourceMappingURL=boxs-box-small-box-small-module.js.map