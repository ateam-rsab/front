(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["boxs-box-default-box-default-module"],{

/***/ "./src/app/+boxs/box-default/box-default-routing.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/+boxs/box-default/box-default-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: BoxDefaultRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoxDefaultRoutingModule", function() { return BoxDefaultRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _box_default_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./box-default.component */ "./src/app/+boxs/box-default/box-default.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [{
        path: '',
        component: _box_default_component__WEBPACK_IMPORTED_MODULE_2__["BoxDefaultComponent"]
    }];
var BoxDefaultRoutingModule = /** @class */ (function () {
    function BoxDefaultRoutingModule() {
    }
    BoxDefaultRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], BoxDefaultRoutingModule);
    return BoxDefaultRoutingModule;
}());



/***/ }),

/***/ "./src/app/+boxs/box-default/box-default.component.css":
/*!*************************************************************!*\
  !*** ./src/app/+boxs/box-default/box-default.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/+boxs/box-default/box-default.component.html":
/*!**************************************************************!*\
  !*** ./src/app/+boxs/box-default/box-default.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box header=\"Expandable Box Default\" [isRemovable]=\"false\" [isCollapsed]=\"true\">\r\n      The body of the box\r\n    </mk-box>\r\n  </div>\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box header=\"Collapsable Box Success\" boxColor=\"green\" [isRemovable]=\"false\">\r\n      The body of the box\r\n    </mk-box>\r\n  </div>\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box header=\"isRemovable Box Warning\" boxColor=\"warning\" [isCollapsable]=\"false\">\r\n      The body of the box\r\n    </mk-box>\r\n  </div>\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box header=\"isLoading Box Danger\" boxColor=\"danger\" [isCollapsable]=\"false\" [isLoading]=\"true\" [isRemovable]=\"false\">\r\n      The body of the box\r\n    </mk-box>\r\n  </div>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box header=\"Expandable Solid Box Primary\" [isRemovable]=\"false\" [isCollapsed]=\"true\" [isSolid]=\"true\">\r\n      The body of the box\r\n    </mk-box>\r\n  </div>\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box header=\"Collapsable Solid Box Success\" boxColor=\"success\" [isRemovable]=\"false\" [isSolid]=\"true\">\r\n      The body of the box\r\n    </mk-box>\r\n  </div>\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box header=\"isRemovable Solid Box Warning\" boxColor=\"purple\" [isCollapsable]=\"false\" [isSolid]=\"true\">\r\n      The body of the box\r\n    </mk-box>\r\n  </div>\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box header=\"isLoading Solid Box Danger\" boxColor=\"danger\" [isCollapsable]=\"false\" [isRemovable]=\"false\" [isLoading]=\"true\" loadingColor=\"red\" [isSolid]=\"true\">\r\n      The body of the box\r\n    </mk-box>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-md-6 col-xs-12\">\r\n    <mk-box header=\"Box with Text header & footer\" [isCollapsable]=\"false\" [isRemovable]=\"false\">\r\n      <pre><code class=\"language-html\">&lt;mk-box header=\"Box header\" footer=\"Box footer\"&gt;\r\n  Box content\r\n&lt;/mk-box&gt;</code></pre>\r\n    </mk-box>\r\n  </div>\r\n  <div class=\"col-md-6 col-xs-12\">\r\n    <mk-box header=\"Box with HTML header & footer\" [isCollapsable]=\"false\" [isRemovable]=\"false\">\r\n      <pre><code class=\"language-html\">&lt;mk-box&gt;\r\n  &lt;mk-box-header&gt;HTML Box header&lt;/mk-box-header&gt;\r\n  &lt;mk-box-tools&gt;&lt;button&gt;Additionnal Box Buttons&lt;/button&gt;&lt;/mk-box-tools&gt;\r\n  &lt;mk-box-content&gt;HTML Box content&lt;/mk-box-content&gt;\r\n  &lt;mk-box-footer&gt;HTML Box footer&lt;/mk-box-footer&gt;\r\n&lt;/mk-box&gt;</code></pre>\r\n    </mk-box>\r\n  </div>\r\n</div>\r\n\r\n<mk-box header=\"Properties\" [isCollapsable]=\"true\" [isRemovable]=\"false\" contentStyleClass=\"table-responsive\">\r\n  <table class=\"table table-bordered table-hover\">\r\n    <tbody>\r\n      <tr>\r\n        <th>Name</th>\r\n        <th>Type</th>\r\n        <th>Default</th>\r\n        <th>Description</th>\r\n      </tr>\r\n      <tr>\r\n        <td>boxColor</td>\r\n        <td>string (default | primary | success | info | warning | danger | rgb | rgba | hex)</td>\r\n        <td>box-default</td>\r\n        <td>The box color.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>buttonsStyleClass</td>\r\n        <td>string</td>\r\n        <td>null</td>\r\n        <td>The box collapse & remove buttons style classes.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>contentStyleClass</td>\r\n        <td>string</td>\r\n        <td>box-content-wrapper</td>\r\n        <td>The box content style classes.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>footer</td>\r\n        <td>string</td>\r\n        <td>null</td>\r\n        <td>\r\n          Footer text of the box.<br/>\r\n          <em>Note: You can use &lt;mk-box-footer&gt; for HTML footer.</em>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td>footerStyleClass</td>\r\n        <td>string</td>\r\n        <td>box-footer</td>\r\n        <td>The box footer style classes.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>header</td>\r\n        <td>string</td>\r\n        <td>null</td>\r\n        <td>\r\n          Header text of the box.<br/>\r\n          <em>Note: You can use &lt;mk-box-content&gt; for HTML header.</em>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td>headerBorder</td>\r\n        <td>boolean</td>\r\n        <td>true</td>\r\n        <td>Defines if header and content is separated with a border.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>headerStyleClass</td>\r\n        <td>string</td>\r\n        <td>box-header</td>\r\n        <td>The box header style classes.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>isCollapsable</td>\r\n        <td>boolean</td>\r\n        <td>true</td>\r\n        <td>Defines if box content can be expanded and collapsed.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>isCollapsed</td>\r\n        <td>boolean</td>\r\n        <td>false</td>\r\n        <td>Defines if box content is collapsed.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>isLoading</td>\r\n        <td>boolean</td>\r\n        <td>false</td>\r\n        <td>Show a loading animation.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>isRemovable</td>\r\n        <td>boolean</td>\r\n        <td>true</td>\r\n        <td>Defines if box can be removed.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>isSolid</td>\r\n        <td>boolean</td>\r\n        <td>false</td>\r\n        <td>If false the box have border top color, if true the box have filled header and borders.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>loadingColor</td>\r\n        <td>string</td>\r\n        <td>null</td>\r\n        <td>The box loading icon font color.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>loadingStyleClass</td>\r\n        <td>string</td>\r\n        <td>fa fa-refresh fa-spin</td>\r\n        <td>The box loading icon style classes.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>styleClass</td>\r\n        <td>string</td>\r\n        <td>box</td>\r\n        <td>The box style classes.</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</mk-box>\r\n\r\n<mk-box header=\"Events\" [isCollapsable]=\"true\" [isRemovable]=\"false\" contentStyleClass=\"table-responsive\">\r\n  <table class=\"table table-bordered table-hover\">\r\n    <tbody>\r\n      <tr>\r\n        <th>Name</th>\r\n        <th>Parameters</th>\r\n        <th>Description</th>\r\n      </tr>\r\n      <tr>\r\n        <td>onCollapseStart</td>\r\n        <td>event: browser event</td>\r\n        <td>Callback to invoke before content toggle</td>\r\n      </tr>\r\n      <tr>\r\n        <td>onCollapseDone</td>\r\n        <td>event: browser event</td>\r\n        <td>Callback to invoke after content toggle</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</mk-box>\r\n"

/***/ }),

/***/ "./src/app/+boxs/box-default/box-default.component.ts":
/*!************************************************************!*\
  !*** ./src/app/+boxs/box-default/box-default.component.ts ***!
  \************************************************************/
/*! exports provided: BoxDefaultComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoxDefaultComponent", function() { return BoxDefaultComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var BoxDefaultComponent = /** @class */ (function () {
    function BoxDefaultComponent() {
    }
    /**
     * @method ngAfterViewInit
     */
    BoxDefaultComponent.prototype.ngAfterViewInit = function () {
        prismjs__WEBPACK_IMPORTED_MODULE_1__["highlightAll"]();
    };
    BoxDefaultComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./box-default.component.html */ "./src/app/+boxs/box-default/box-default.component.html"),
            styles: [__webpack_require__(/*! ./box-default.component.css */ "./src/app/+boxs/box-default/box-default.component.css")]
        })
    ], BoxDefaultComponent);
    return BoxDefaultComponent;
}());



/***/ }),

/***/ "./src/app/+boxs/box-default/box-default.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/+boxs/box-default/box-default.module.ts ***!
  \*********************************************************/
/*! exports provided: BoxDefaultModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoxDefaultModule", function() { return BoxDefaultModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _box_default_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./box-default-routing.module */ "./src/app/+boxs/box-default/box-default-routing.module.ts");
/* harmony import */ var _box_default_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./box-default.component */ "./src/app/+boxs/box-default/box-default.component.ts");
/* harmony import */ var angular_admin_lte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-admin-lte */ "./library/angular-admin-lte/src/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var BoxDefaultModule = /** @class */ (function () {
    function BoxDefaultModule() {
    }
    BoxDefaultModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _box_default_routing_module__WEBPACK_IMPORTED_MODULE_2__["BoxDefaultRoutingModule"],
                angular_admin_lte__WEBPACK_IMPORTED_MODULE_4__["BoxModule"]
            ],
            declarations: [_box_default_component__WEBPACK_IMPORTED_MODULE_3__["BoxDefaultComponent"]]
        })
    ], BoxDefaultModule);
    return BoxDefaultModule;
}());



/***/ })

}]);
//# sourceMappingURL=boxs-box-default-box-default-module.js.map