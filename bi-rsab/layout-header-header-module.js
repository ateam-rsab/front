(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layout-header-header-module"],{

/***/ "./src/app/+layout/header/header-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/+layout/header/header-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: HeaderRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderRoutingModule", function() { return HeaderRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header.component */ "./src/app/+layout/header/header.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [{
        path: '',
        component: _header_component__WEBPACK_IMPORTED_MODULE_2__["HeaderComponent"]
    }];
var HeaderRoutingModule = /** @class */ (function () {
    function HeaderRoutingModule() {
    }
    HeaderRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], HeaderRoutingModule);
    return HeaderRoutingModule;
}());



/***/ }),

/***/ "./src/app/+layout/header/header.component.html":
/*!******************************************************!*\
  !*** ./src/app/+layout/header/header.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mk-box header=\"About header component\" [isCollapsable]=\"false\" [isRemovable]=\"false\">\r\n  <p>The header component is used for displaying logos and sidebars toggle buttons. <br/>You can disable sidebars if you choose to use custom configuration.<br/> You can also add any custom HTML after logo components.</p>\r\n</mk-box>\r\n\r\n<mk-box header=\"Example\" [isCollapsable]=\"false\" [isRemovable]=\"false\">\r\n  <pre><code class=\"language-html\">&lt;mk-layout-header [isSidebarLeftToggle]=&quot;true&quot; [isSidebarRightToggle]=&quot;true&quot;&gt;\r\n  &lt;mk-layout-header-logo&gt;&lt;b&gt;Admin&lt;/b&gt;LTE&lt;/mk-layout-header-logo&gt;\r\n  &lt;mk-layout-header-logo-mini&gt;&lt;b&gt;A&lt;/b&gt;LT&lt;/mk-layout-header-logo-mini&gt;\r\n  //Custom HTML\r\n&lt;/mk-layout-header&gt;\r\n</code></pre>\r\n</mk-box>\r\n\r\n<mk-box header=\"Properties\" [isCollapsable]=\"true\" [isRemovable]=\"false\" contentStyleClasses=\"table-responsive\">\r\n  <table class=\"table table-bordered table-hover\">\r\n    <tbody>\r\n      <tr>\r\n        <th>Name</th>\r\n        <th>Type</th>\r\n        <th>Default</th>\r\n        <th>Description</th>\r\n      </tr>\r\n      <tr>\r\n        <td>isSidebarLeftToggle</td>\r\n        <td>boolean</td>\r\n        <td>true</td>\r\n        <td>Defines if the sidebar left toggle button is activated.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>isSidebarLeftToggle</td>\r\n        <td>boolean</td>\r\n        <td>true</td>\r\n        <td>Defines if the sidebar left toggle button is activated.</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</mk-box>\r\n"

/***/ }),

/***/ "./src/app/+layout/header/header.component.ts":
/*!****************************************************!*\
  !*** ./src/app/+layout/header/header.component.ts ***!
  \****************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    /**
     * @method ngAfterViewInit
     */
    HeaderComponent.prototype.ngAfterViewInit = function () {
        prismjs__WEBPACK_IMPORTED_MODULE_1__["highlightAll"]();
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/+layout/header/header.component.html")
        })
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/+layout/header/header.module.ts":
/*!*************************************************!*\
  !*** ./src/app/+layout/header/header.module.ts ***!
  \*************************************************/
/*! exports provided: HeaderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderModule", function() { return HeaderModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _header_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header-routing.module */ "./src/app/+layout/header/header-routing.module.ts");
/* harmony import */ var _header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header.component */ "./src/app/+layout/header/header.component.ts");
/* harmony import */ var angular_admin_lte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-admin-lte */ "./library/angular-admin-lte/src/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var HeaderModule = /** @class */ (function () {
    function HeaderModule() {
    }
    HeaderModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _header_routing_module__WEBPACK_IMPORTED_MODULE_2__["HeaderRoutingModule"],
                angular_admin_lte__WEBPACK_IMPORTED_MODULE_4__["BoxModule"]
            ],
            declarations: [_header_component__WEBPACK_IMPORTED_MODULE_3__["HeaderComponent"]]
        })
    ], HeaderModule);
    return HeaderModule;
}());



/***/ })

}]);
//# sourceMappingURL=layout-header-header-module.js.map