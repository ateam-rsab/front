(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["boxs-box-info-box-info-module"],{

/***/ "./src/app/+boxs/box-info/box-info-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/+boxs/box-info/box-info-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: BoxInfoRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoxInfoRoutingModule", function() { return BoxInfoRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _box_info_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./box-info.component */ "./src/app/+boxs/box-info/box-info.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [{
        path: '',
        component: _box_info_component__WEBPACK_IMPORTED_MODULE_2__["BoxInfoComponent"]
    }];
var BoxInfoRoutingModule = /** @class */ (function () {
    function BoxInfoRoutingModule() {
    }
    BoxInfoRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], BoxInfoRoutingModule);
    return BoxInfoRoutingModule;
}());



/***/ }),

/***/ "./src/app/+boxs/box-info/box-info.component.css":
/*!*******************************************************!*\
  !*** ./src/app/+boxs/box-info/box-info.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/+boxs/box-info/box-info.component.html":
/*!********************************************************!*\
  !*** ./src/app/+boxs/box-info/box-info.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box-info header=\"Messages\" iconBackgroundColor=\"aqua\" iconStyleClass=\"fa fa-envelope-o\">\r\n      1,410\r\n    </mk-box-info>\r\n  </div>\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box-info header=\"Bookmarks\" iconBackgroundColor=\"green\" iconStyleClass=\"fa fa-flag-o\">\r\n      410\r\n    </mk-box-info>\r\n  </div>\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box-info header=\"Uploads\" iconBackgroundColor=\"yellow\" iconStyleClass=\"fa fa-flag-o\">\r\n      13,648\r\n    </mk-box-info>\r\n  </div>\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box-info header=\"Uploads\" iconBackgroundColor=\"red\" iconStyleClass=\"fa fa-star-o\">\r\n      93,139\r\n    </mk-box-info>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box-info header=\"Bookmarks\" footer=\"70% Increase in 30 Days\" progressWidth=\"70\" backgroundColor=\"aqua\" iconStyleClass=\"fa fa-bookmark-o\">\r\n      41,410\r\n    </mk-box-info>\r\n  </div>\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box-info header=\"Likes\" footer=\"70% Increase in 30 Days\" progressWidth=\"70\" backgroundColor=\"green\" iconStyleClass=\"fa fa-thumbs-o-up\">\r\n      41,410\r\n    </mk-box-info>\r\n  </div>\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box-info header=\"Events\" footer=\"70% Increase in 30 Days\" progressWidth=\"70\" backgroundColor=\"yellow\" iconStyleClass=\"fa fa-calendar\">\r\n      41,410\r\n    </mk-box-info>\r\n  </div>\r\n  <div class=\"col-md-3 col-xs-12\">\r\n    <mk-box-info header=\"Comments\" footer=\"70% Increase in 30 Days\" progressWidth=\"70\" backgroundColor=\"yellow\" iconStyleClass=\"fa fa-comments-o\">\r\n      41,410\r\n    </mk-box-info>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col-md-6 col-xs-12\">\r\n    <mk-box header=\"Info Box with text header & footer\" [isRemovable]=\"false\">\r\n      <pre><code class=\"language-html\">&lt;mk-box-info header=\"Header text\" footer=\"Footer text\" progressWidth=\"70\" backgroundColor=\"yellow\" iconStyleClass=\"fa fa-comments-o\"&gt;\r\n  Content text\r\n&lt;/mk-box-info&gt;</code></pre>\r\n    </mk-box>\r\n  </div>\r\n  <div class=\"col-md-6 col-xs-12\">\r\n    <mk-box header=\"Info Box with HTML header & footer\" [isRemovable]=\"false\">\r\n      <pre><code class=\"language-html\">&lt;mk-box-info progressWidth=\"70\" backgroundColor=\"yellow\" iconStyleClass=\"fa fa-comments-o\"&gt;\r\n  &lt;mk-box-info-header&gt;Header HTML&lt;/mk-box-info-header&gt;\r\n  &lt;mk-box-info-content&gt;Content HTML&lt;/mk-box-info-content&gt;\r\n  &lt;mk-box-info-footer&gt;Footer HTML&lt;/mk-box-info-footer&gt;\r\n&lt;/mk-box-info&gt;</code></pre>\r\n    </mk-box>\r\n  </div>\r\n</div>\r\n\r\n<mk-box header=\"Properties\" [isRemovable]=\"false\" contentClasses=\"table-responsive\">\r\n  <table class=\"table table-bordered table-hover\">\r\n    <tbody>\r\n      <tr>\r\n        <th>Name</th>\r\n        <th>Type</th>\r\n        <th>Default</th>\r\n        <th>Description</th>\r\n      </tr>\r\n      <tr>\r\n        <td>backgroundColor</td>\r\n        <td>string (aqua | green | red | yellow)</td>\r\n        <td>null</td>\r\n        <td>The box background color.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>contentStyleClass</td>\r\n        <td>string</td>\r\n        <td>info-box-number</td>\r\n        <td>The box content style classes.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>contentColor</td>\r\n        <td>string (green | aqua | light-blue | red | yellow | mutted | rgb | rgba | hex)</td>\r\n        <td>null</td>\r\n        <td>The box content font color.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>footer</td>\r\n        <td>string</td>\r\n        <td>null</td>\r\n        <td>\r\n          Footer text of the panel.<br/>\r\n          <em>Note: You can use &lt;mk-box-info-footer&gt; for HTML footer.</em>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td>footerColor</td>\r\n        <td>string (green | aqua | light-blue | red | yellow | mutted | rgb | rgba | hex)</td>\r\n        <td>null</td>\r\n        <td>The box footer font color.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>footerStyleClass</td>\r\n        <td>string</td>\r\n        <td>progress-description</td>\r\n        <td>The box footer style classes.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>header</td>\r\n        <td>string</td>\r\n        <td>null</td>\r\n        <td>\r\n          Header text of the box.<br/>\r\n          <em>Note: You can use &lt;mk-box-info-header&gt; for HTML header.</em>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td>headerColor</td>\r\n        <td>string (green | aqua | light-blue | red | yellow | mutted | rgb | rgba | hex)</td>\r\n        <td>null</td>\r\n        <td>The box header font color.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>headerStyleClass</td>\r\n        <td>string</td>\r\n        <td>info-box-text</td>\r\n        <td>The box header style classes.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>iconBackgroundColor</td>\r\n        <td>string (aqua | green | red | yellow)</td>\r\n        <td>null</td>\r\n        <td>The box icon background color.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>iconColor</td>\r\n        <td>string (green | aqua | light-blue | red | yellow | mutted | rgb | rgba | hex)</td>\r\n        <td>null</td>\r\n        <td>The box icon font color.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>iconStyleClass</td>\r\n        <td>string</td>\r\n        <td>ion ion-bag</td>\r\n        <td>The box icon style classes.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>progressWidth</td>\r\n        <td>number</td>\r\n        <td>null</td>\r\n        <td>The progress bar width of the box in percentage.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>styleClass</td>\r\n        <td>string</td>\r\n        <td>info-box</td>\r\n        <td>The box style classes.</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</mk-box>\r\n"

/***/ }),

/***/ "./src/app/+boxs/box-info/box-info.component.ts":
/*!******************************************************!*\
  !*** ./src/app/+boxs/box-info/box-info.component.ts ***!
  \******************************************************/
/*! exports provided: BoxInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoxInfoComponent", function() { return BoxInfoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var BoxInfoComponent = /** @class */ (function () {
    function BoxInfoComponent() {
    }
    /**
     * @method ngAfterViewInit
     */
    BoxInfoComponent.prototype.ngAfterViewInit = function () {
        prismjs__WEBPACK_IMPORTED_MODULE_1__["highlightAll"]();
    };
    BoxInfoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-box-info',
            template: __webpack_require__(/*! ./box-info.component.html */ "./src/app/+boxs/box-info/box-info.component.html"),
            styles: [__webpack_require__(/*! ./box-info.component.css */ "./src/app/+boxs/box-info/box-info.component.css")]
        })
    ], BoxInfoComponent);
    return BoxInfoComponent;
}());



/***/ }),

/***/ "./src/app/+boxs/box-info/box-info.module.ts":
/*!***************************************************!*\
  !*** ./src/app/+boxs/box-info/box-info.module.ts ***!
  \***************************************************/
/*! exports provided: BoxInfoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoxInfoModule", function() { return BoxInfoModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _box_info_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./box-info-routing.module */ "./src/app/+boxs/box-info/box-info-routing.module.ts");
/* harmony import */ var _box_info_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./box-info.component */ "./src/app/+boxs/box-info/box-info.component.ts");
/* harmony import */ var angular_admin_lte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-admin-lte */ "./library/angular-admin-lte/src/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var BoxInfoModule = /** @class */ (function () {
    function BoxInfoModule() {
    }
    BoxInfoModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _box_info_routing_module__WEBPACK_IMPORTED_MODULE_2__["BoxInfoRoutingModule"],
                angular_admin_lte__WEBPACK_IMPORTED_MODULE_4__["BoxModule"],
                angular_admin_lte__WEBPACK_IMPORTED_MODULE_4__["BoxInfoModule"]
            ],
            declarations: [_box_info_component__WEBPACK_IMPORTED_MODULE_3__["BoxInfoComponent"]]
        })
    ], BoxInfoModule);
    return BoxInfoModule;
}());



/***/ })

}]);
//# sourceMappingURL=boxs-box-info-box-info-module.js.map