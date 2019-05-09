(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layout-sidebar-right-sidebar-right-module"],{

/***/ "./src/app/+layout/sidebar-right/sidebar-right-routing.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/+layout/sidebar-right/sidebar-right-routing.module.ts ***!
  \***********************************************************************/
/*! exports provided: SidebarRightRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarRightRoutingModule", function() { return SidebarRightRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _sidebar_right_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sidebar-right.component */ "./src/app/+layout/sidebar-right/sidebar-right.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [{
        path: '',
        component: _sidebar_right_component__WEBPACK_IMPORTED_MODULE_2__["SidebarRightComponent"]
    }];
var SidebarRightRoutingModule = /** @class */ (function () {
    function SidebarRightRoutingModule() {
    }
    SidebarRightRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], SidebarRightRoutingModule);
    return SidebarRightRoutingModule;
}());



/***/ }),

/***/ "./src/app/+layout/sidebar-right/sidebar-right.component.html":
/*!********************************************************************!*\
  !*** ./src/app/+layout/sidebar-right/sidebar-right.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mk-box header=\"About sidebar right component\" [isCollapsable]=\"false\" [isRemovable]=\"false\">\r\n  <p>The sidebar right component is optional and you can add any custom HTML.<br/>It can be toggled with sidebar right button of the header or programmatically with layout.sidebarRightCollapsed().<br/>You can also subscribe to sidebar right toggle status with layout.isSidebarRightCollapsed.</p>\r\n</mk-box>\r\n\r\n<mk-box header=\"HTML\" [isCollapsable]=\"false\" [isRemovable]=\"false\">\r\n  <pre><code class=\"language-html\">&lt;mk-layout-sidebar-right&gt;\r\n  //Custom HTML\r\n&lt;/mk-layout-sidebar-right&gt;\r\n</code></pre>\r\n</mk-box>\r\n"

/***/ }),

/***/ "./src/app/+layout/sidebar-right/sidebar-right.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/+layout/sidebar-right/sidebar-right.component.ts ***!
  \******************************************************************/
/*! exports provided: SidebarRightComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarRightComponent", function() { return SidebarRightComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var SidebarRightComponent = /** @class */ (function () {
    function SidebarRightComponent() {
    }
    /**
     * @method ngAfterViewInit
     */
    SidebarRightComponent.prototype.ngAfterViewInit = function () {
        prismjs__WEBPACK_IMPORTED_MODULE_1__["highlightAll"]();
    };
    SidebarRightComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar-right',
            template: __webpack_require__(/*! ./sidebar-right.component.html */ "./src/app/+layout/sidebar-right/sidebar-right.component.html")
        })
    ], SidebarRightComponent);
    return SidebarRightComponent;
}());



/***/ }),

/***/ "./src/app/+layout/sidebar-right/sidebar-right.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/+layout/sidebar-right/sidebar-right.module.ts ***!
  \***************************************************************/
/*! exports provided: SidebarRightModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarRightModule", function() { return SidebarRightModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _sidebar_right_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sidebar-right-routing.module */ "./src/app/+layout/sidebar-right/sidebar-right-routing.module.ts");
/* harmony import */ var _sidebar_right_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sidebar-right.component */ "./src/app/+layout/sidebar-right/sidebar-right.component.ts");
/* harmony import */ var angular_admin_lte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-admin-lte */ "./library/angular-admin-lte/src/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SidebarRightModule = /** @class */ (function () {
    function SidebarRightModule() {
    }
    SidebarRightModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _sidebar_right_routing_module__WEBPACK_IMPORTED_MODULE_2__["SidebarRightRoutingModule"],
                angular_admin_lte__WEBPACK_IMPORTED_MODULE_4__["BoxModule"]
            ],
            declarations: [_sidebar_right_component__WEBPACK_IMPORTED_MODULE_3__["SidebarRightComponent"]]
        })
    ], SidebarRightModule);
    return SidebarRightModule;
}());



/***/ })

}]);
//# sourceMappingURL=layout-sidebar-right-sidebar-right-module.js.map