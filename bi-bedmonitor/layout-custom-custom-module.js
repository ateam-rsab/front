(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layout-custom-custom-module"],{

/***/ "./src/app/+layout/custom/custom-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/+layout/custom/custom-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: CustomRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomRoutingModule", function() { return CustomRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _custom_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom.component */ "./src/app/+layout/custom/custom.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [{
        path: '',
        component: _custom_component__WEBPACK_IMPORTED_MODULE_2__["CustomComponent"]
    }];
var CustomRoutingModule = /** @class */ (function () {
    function CustomRoutingModule() {
    }
    CustomRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], CustomRoutingModule);
    return CustomRoutingModule;
}());



/***/ }),

/***/ "./src/app/+layout/custom/custom.component.css":
/*!*****************************************************!*\
  !*** ./src/app/+layout/custom/custom.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/+layout/custom/custom.component.html":
/*!******************************************************!*\
  !*** ./src/app/+layout/custom/custom.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mk-box header=\"About custom layout\" [isCollapsable]=\"false\" [isRemovable]=\"false\">\r\n  <p>You can completely disable layout components to create custom page layout like <a routerLink=\"/login\">Login</a> and <a routerLink=\"/register\">Register</a> pages.</p>\r\n</mk-box>\r\n\r\n<mk-box header=\"Configuration\" [isCollapsable]=\"false\" [isRemovable]=\"false\">\r\n  <p>First you will need to import LayoutService and subscribe to isCustomLayout in the main app component:</p>\r\n  <pre><code class=\"language-typescript\">import &#123; Component, OnInit } from '@angular/core';\r\nimport &#123; LayoutService } from '../../../src';\r\n\r\n@Component(&#123;\r\n  selector: 'app-root',\r\n  templateUrl: './app.component.html'\r\n&#125;)\r\nexport class AppComponent implements OnInit &#123;\r\n  public isCustomLayout: boolean;\r\n\r\n  constructor(\r\n    private layoutService: LayoutService\r\n  ) &#123;&#125;\r\n\r\n  ngOnInit() &#123;\r\n    this.layoutService.isCustomLayout.subscribe((value: boolean) => &#123;\r\n      this.isCustomLayout = value;\r\n    &#125;);\r\n  }\r\n}</code></pre>\r\n\r\n  <br/>\r\n  <p>Wrap the main component html like so:</p>\r\n  <pre><code class=\"language-html\">&lt;ng-container *ngIf=\"isCustomLayout else noCustomLayout\"&gt;\r\n  &lt;router-outlet&gt;&lt;/router-outlet&gt;\r\n&lt;/ng-container&gt;\r\n&lt;ng-template #layoutEnabled&gt;\r\n  &lt;mk-layout-wrapper&gt;\r\n    ...\r\n  &lt;/mk-layout-wrapper&gt;\r\n&lt;ng-template&gt;</code></pre>\r\n\r\n<br/>\r\n<p>Configure the router:</p>\r\n<pre><code class=\"language-typescript\">\r\n  ...\r\n  , &#123;\r\n    path: 'login',\r\n    loadChildren: 'app/login/login.module#LoginModule',\r\n    data: &#123;\r\n      customLayout: true\r\n    &#125;\r\n  &#125;,\r\n  ...\r\n</code></pre>\r\n</mk-box>\r\n"

/***/ }),

/***/ "./src/app/+layout/custom/custom.component.ts":
/*!****************************************************!*\
  !*** ./src/app/+layout/custom/custom.component.ts ***!
  \****************************************************/
/*! exports provided: CustomComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomComponent", function() { return CustomComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var CustomComponent = /** @class */ (function () {
    function CustomComponent() {
    }
    /**
     * @method ngAfterViewInit
     */
    CustomComponent.prototype.ngAfterViewInit = function () {
        prismjs__WEBPACK_IMPORTED_MODULE_1__["highlightAll"]();
    };
    CustomComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./custom.component.html */ "./src/app/+layout/custom/custom.component.html"),
            styles: [__webpack_require__(/*! ./custom.component.css */ "./src/app/+layout/custom/custom.component.css")]
        })
    ], CustomComponent);
    return CustomComponent;
}());



/***/ }),

/***/ "./src/app/+layout/custom/custom.module.ts":
/*!*************************************************!*\
  !*** ./src/app/+layout/custom/custom.module.ts ***!
  \*************************************************/
/*! exports provided: CustomModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomModule", function() { return CustomModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _custom_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./custom-routing.module */ "./src/app/+layout/custom/custom-routing.module.ts");
/* harmony import */ var _custom_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./custom.component */ "./src/app/+layout/custom/custom.component.ts");
/* harmony import */ var angular_admin_lte__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-admin-lte */ "./library/angular-admin-lte/src/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var CustomModule = /** @class */ (function () {
    function CustomModule() {
    }
    CustomModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"],
                _custom_routing_module__WEBPACK_IMPORTED_MODULE_3__["CustomRoutingModule"],
                angular_admin_lte__WEBPACK_IMPORTED_MODULE_5__["BoxModule"]
            ],
            declarations: [_custom_component__WEBPACK_IMPORTED_MODULE_4__["CustomComponent"]]
        })
    ], CustomModule);
    return CustomModule;
}());



/***/ })

}]);
//# sourceMappingURL=layout-custom-custom-module.js.map