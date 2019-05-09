(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layout-content-content-module"],{

/***/ "./src/app/+layout/content/content-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/+layout/content/content-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: ContentRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentRoutingModule", function() { return ContentRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _content_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./content.component */ "./src/app/+layout/content/content.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [{
        path: '',
        component: _content_component__WEBPACK_IMPORTED_MODULE_2__["ContentComponent"]
    }];
var ContentRoutingModule = /** @class */ (function () {
    function ContentRoutingModule() {
    }
    ContentRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ContentRoutingModule);
    return ContentRoutingModule;
}());



/***/ }),

/***/ "./src/app/+layout/content/content.component.css":
/*!*******************************************************!*\
  !*** ./src/app/+layout/content/content.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/+layout/content/content.component.html":
/*!********************************************************!*\
  !*** ./src/app/+layout/content/content.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mk-box header=\"About content component\" [isCollapsable]=\"false\" [isRemovable]=\"false\">\r\n  <p>The content component is used for displaying router outlet, page title, page description and breadcrumbs.<br/>\r\n  Page title, page description and breadcrumbs can be configured in app routing module via the data property of routes.<br/>\r\n  Page title use title property, page description use description property and breadcrumbs use breadcrumbs property or title property if breadcrumbs is not defined.</p>\r\n</mk-box>\r\n\r\n<mk-box header=\"Routing module example\" [isCollapsable]=\"false\" [isRemovable]=\"false\">\r\n  <pre><code class=\"language-typescript\">const routes: Routes = [&#123;\r\n  path: '',\r\n  data: &#123;\r\n    title: 'Home'\r\n  &#125;, children: [&#123;\r\n    path: '',\r\n    component: HomeComponent\r\n  &#125;, &#123;\r\n    path: 'page',\r\n    loadChildren: 'app/+page/page.module#PageModule',\r\n    data: &#123;\r\n      title: 'Accordion',\r\n    &#125;\r\n  &#125;, &#123;\r\n    path: 'posts',\r\n    data: &#123;\r\n      title: 'Posts',\r\n      description: 'All the posts',\r\n      breadcrumbs: 'Posts'\r\n    &#125;,\r\n    children: [&#123;\r\n      path: '',\r\n      loadChildren: 'app/posts/posts.module#PostsModule',\r\n    &#125;, &#123;\r\n      path: ':id',\r\n      loadChildren: 'app/post/post.module#PostModule',\r\n      data: &#123;\r\n        title: 'Post :id',\r\n        description: 'Post N°:id description',\r\n        breadcrumbs: 'Post :id'\r\n      &#125;\r\n    &#125;]\r\n  &#125;\r\n&#125;]\r\n</code></pre>\r\n</mk-box>\r\n"

/***/ }),

/***/ "./src/app/+layout/content/content.component.ts":
/*!******************************************************!*\
  !*** ./src/app/+layout/content/content.component.ts ***!
  \******************************************************/
/*! exports provided: ContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentComponent", function() { return ContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ContentComponent = /** @class */ (function () {
    function ContentComponent() {
    }
    /**
     * @method AfterViewInit
     */
    ContentComponent.prototype.ngAfterViewInit = function () {
        prismjs__WEBPACK_IMPORTED_MODULE_1__["highlightAll"]();
    };
    ContentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-content',
            template: __webpack_require__(/*! ./content.component.html */ "./src/app/+layout/content/content.component.html"),
            styles: [__webpack_require__(/*! ./content.component.css */ "./src/app/+layout/content/content.component.css")]
        })
    ], ContentComponent);
    return ContentComponent;
}());



/***/ }),

/***/ "./src/app/+layout/content/content.module.ts":
/*!***************************************************!*\
  !*** ./src/app/+layout/content/content.module.ts ***!
  \***************************************************/
/*! exports provided: ContentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentModule", function() { return ContentModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _content_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./content-routing.module */ "./src/app/+layout/content/content-routing.module.ts");
/* harmony import */ var _content_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./content.component */ "./src/app/+layout/content/content.component.ts");
/* harmony import */ var angular_admin_lte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-admin-lte */ "./library/angular-admin-lte/src/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ContentModule = /** @class */ (function () {
    function ContentModule() {
    }
    ContentModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _content_routing_module__WEBPACK_IMPORTED_MODULE_2__["ContentRoutingModule"],
                angular_admin_lte__WEBPACK_IMPORTED_MODULE_4__["BoxModule"]
            ],
            declarations: [_content_component__WEBPACK_IMPORTED_MODULE_3__["ContentComponent"]]
        })
    ], ContentModule);
    return ContentModule;
}());



/***/ })

}]);
//# sourceMappingURL=layout-content-content-module.js.map