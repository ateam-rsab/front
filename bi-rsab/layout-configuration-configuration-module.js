(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layout-configuration-configuration-module"],{

/***/ "./src/app/+layout/configuration/configuration-routing.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/+layout/configuration/configuration-routing.module.ts ***!
  \***********************************************************************/
/*! exports provided: ConfigurationRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigurationRoutingModule", function() { return ConfigurationRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _configuration_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./configuration.component */ "./src/app/+layout/configuration/configuration.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [{
        path: '',
        component: _configuration_component__WEBPACK_IMPORTED_MODULE_2__["ConfigurationComponent"]
    }];
var ConfigurationRoutingModule = /** @class */ (function () {
    function ConfigurationRoutingModule() {
    }
    ConfigurationRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ConfigurationRoutingModule);
    return ConfigurationRoutingModule;
}());



/***/ }),

/***/ "./src/app/+layout/configuration/configuration.component.html":
/*!********************************************************************!*\
  !*** ./src/app/+layout/configuration/configuration.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mk-box header=\"Configuring Layout\" [isCollapsable]=\"false\" [isRemovable]=\"false\">\r\n  <p>If can use the layout components or just use the presentation components of angular-admin-lte.</p>\r\n  <p> If you chose to use the layout you will need to:</p>\r\n  <ol>\r\n    <li>Create a layout configuration file.</li>\r\n    <li>Import the layout module and provide the layout configuration in your main app module.</li>\r\n    <li>Update the main app view.</li>\r\n  </ol>\r\n</mk-box>\r\n\r\n\r\n<mk-box header=\"Configuration File\" [isCollapsable]=\"false\" [isRemovable]=\"false\">\r\n  <pre><code class=\"language-typescript\" ngNonBindable>export var adminLteConf = &#123;\r\n  skin: 'blue',\r\n  ...\r\n  sidebarLeftMenu: [\r\n    &#123;label: 'Start', route: '/', iconClasses: 'fa fa-th'&#125;,\r\n    ...\r\n  ]\r\n&#125;;\r\n</code></pre>\r\n</mk-box>\r\n\r\n<mk-box header=\"Import Conf And Module\" [isCollapsable]=\"false\" [isRemovable]=\"false\">\r\n  <pre><code class=\"language-typescript\">import &#123; adminLteConf &#125; from './admin-lte.conf';   //Import the layout configuration.\r\nimport &#123; LayoutModule &#125; from 'angular-admin-lte';   //Import the layout module.\r\n\r\n@NgModule(&#123;\r\n  imports: [\r\n    ...\r\n    LayoutModule.forRoot(adminLteConf),   //Provide the configuration to the layout module.\r\n  ],\r\n  ...\r\n&#125;)\r\nexport class AppModule &#123;&#125;\r\n</code></pre>\r\n</mk-box>\r\n\r\n<mk-box header=\"App view HTML\" [isCollapsable]=\"false\" [isRemovable]=\"false\">\r\n  <pre><code class=\"language-html\">&lt;mk-layout-wrapper&gt;\r\n  &lt;mk-layout-sidebar-right&gt;\r\n    Sidebar right HTML\r\n  &lt;/mk-layout-sidebar-right&gt;\r\n  &lt;mk-layout-header&gt;\r\n    &lt;mk-layout-header-logo&gt;Logo HTML&lt;/mk-layout-header-logo&gt;\r\n    &lt;mk-layout-header-logo-mini&gt;Logo Mini HTML&lt;/mk-layout-header-logo-mini&gt;\r\n    Header HTML\r\n  &lt;/mk-layout-header&gt;\r\n  &lt;mk-layout-sidebar-left&gt;\r\n    Sidebar left HTML (just above menu)\r\n  &lt;/mk-layout-sidebar-left&gt;\r\n  &lt;mk-layout-content&gt;\r\n    &lt;router-outlet&gt;&lt;/router-outlet&gt;\r\n  &lt;/mk-layout-content&gt;\r\n  &lt;mk-layout-footer&gt;\r\n    &lt;mk-layout-footer-left&gt;\r\n      Footer left HTML\r\n    &lt;/mk-layout-footer-left&gt;\r\n    &lt;mk-layout-footer-right&gt;\r\n      Footer right HTML\r\n    &lt;/mk-layout-footer-right&gt;\r\n  &lt;/mk-layout-footer&gt;\r\n&lt;/mk-layout-wrapper&gt;\r\n</code></pre>\r\n</mk-box>\r\n\r\n<mk-box header=\"Configuration properties\" [isCollapsable]=\"true\" [isRemovable]=\"false\" contentStyleClasses=\"table-responsive\">\r\n  <table class=\"table table-bordered table-hover\">\r\n    <tbody>\r\n      <tr>\r\n        <th>Name</th>\r\n        <th>Type</th>\r\n        <th>Default</th>\r\n        <th>Description</th>\r\n      </tr>\r\n      <tr>\r\n        <td>skin</td>\r\n        <td>string ('blue' | 'black' | 'purple' | 'green' | 'red' | 'yellow' | 'blue-light' | 'black-light' | 'purple-light' | 'green-light' | 'red-light' | 'yellow-light')</td>\r\n        <td>'blue'</td>\r\n        <td>Set the theme skin.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>isSidebarLeftCollapsed</td>\r\n        <td>boolean</td>\r\n        <td>false</td>\r\n        <td>Defines if the sidebar left is collapsed.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>isSidebarLeftExpandOnOver</td>\r\n        <td>boolean</td>\r\n        <td>false</td>\r\n        <td>Define if sidebar left expand on mouse over.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>isSidebarLeftMini</td>\r\n        <td>boolean</td>\r\n        <td>false</td>\r\n        <td>Define if sidebar left minified is visible.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>sidebarRightSkin</td>\r\n        <td>string ('dark' | 'light')</td>\r\n        <td>'dark'</td>\r\n        <td>Set the sidebar right skin.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>isSidebarRightCollapsed</td>\r\n        <td>boolean</td>\r\n        <td>true</td>\r\n        <td>Defines if the sidebar right is collapsed.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>isSidebarRightOverContent</td>\r\n        <td>boolean</td>\r\n        <td>true</td>\r\n        <td>Defines if sidebar right slide over content.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>layout</td>\r\n        <td>string ('normal' | 'boxed' | 'fixed')</td>\r\n        <td>'normal'</td>\r\n        <td>Define the layout style.</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</mk-box>\r\n\r\n<mk-box header=\"Layout setters\" [isCollapsable]=\"false\" [isRemovable]=\"false\">\r\n  <table class=\"table table-bordered table-hover\">\r\n    <tbody>\r\n      <tr>\r\n        <th>Name</th>\r\n        <th>Parameters</th>\r\n        <th>Description</th>\r\n      </tr>\r\n      <tr>\r\n        <td>sidebarLeftCollapsed()</td>\r\n        <td>boolean</td>\r\n        <td>Programmatically set if sidebar left is collapsed.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>sidebarLeftExpandOnOver()</td>\r\n        <td>boolean</td>\r\n        <td>Programmatically set if sidebar left expand on over.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>sidebarLeftExpandOnOver()</td>\r\n        <td>boolean</td>\r\n        <td>Programmatically set if sidebar left expand on over.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>setSidebarRightSkin()</td>\r\n        <td>'dark' | 'light'</td>\r\n        <td>Programmatically defines sidebar right skin.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>sidebarLeftMini()</td>\r\n        <td>boolean</td>\r\n        <td>Programmatically set if sidebar left collapsed is visible.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>sidebarRightCollapsed()</td>\r\n        <td>boolean</td>\r\n        <td>Programmatically set if sidebar right is collapsed.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>sidebarRightOverContent()</td>\r\n        <td>boolean</td>\r\n        <td>Programmatically set if sidebar right slide over content.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>setSidebarLeftMenu()</td>\r\n        <td>Array</td>\r\n        <td>Update sidebar right menu.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>setLayout()</td>\r\n        <td>string</td>\r\n        <td>Update layout style.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>setSkin()</td>\r\n        <td>string</td>\r\n        <td>Update theme skin.</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</mk-box>\r\n\r\n<mk-box header=\"Layout subscriptions\" [isCollapsable]=\"false\" [isRemovable]=\"false\">\r\n  <table class=\"table table-bordered table-hover\">\r\n    <tbody>\r\n      <tr>\r\n        <th>Name</th>\r\n        <th>Parameters</th>\r\n        <th>Description</th>\r\n      </tr>\r\n      <tr>\r\n        <td>isSidebarLeftCollapsed</td>\r\n        <td>Observable&lt;boolean&gt;</td>\r\n        <td>Subscribe to sidebar left collapse status.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>isSidebarLeftExpandOnOver</td>\r\n        <td>Observable&lt;boolean&gt;</td>\r\n        <td>Subscribe to sidebar left expand on over status.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>isSidebarLeftMini</td>\r\n        <td>Observable&lt;boolean&gt;</td>\r\n        <td>Subscribe to sidebar left mini status.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>sidebarRightSkin</td>\r\n        <td>Observable&lt;string&gt;</td>\r\n        <td>Subscribe to sidebar right skin.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>isSidebarRightCollapsed</td>\r\n        <td>Observable&lt;boolean&gt;</td>\r\n        <td>Subscribe to sidebar right collapsed status.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>isSidebarRightOverContent</td>\r\n        <td>Observable&lt;Array&gt;</td>\r\n        <td>Subscribe to sidebar right over content status.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>layout</td>\r\n        <td>Observable&lt;string&gt;</td>\r\n        <td>Subscribe to layout style changes.</td>\r\n      </tr>\r\n      <tr>\r\n        <td>skin</td>\r\n        <td>Observable&lt;string&gt;</td>\r\n        <td>Subscribe to theme skin changes.</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</mk-box>\r\n"

/***/ }),

/***/ "./src/app/+layout/configuration/configuration.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/+layout/configuration/configuration.component.ts ***!
  \******************************************************************/
/*! exports provided: ConfigurationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigurationComponent", function() { return ConfigurationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ConfigurationComponent = /** @class */ (function () {
    function ConfigurationComponent() {
    }
    /**
     * @method ngAfterViewInit
     */
    ConfigurationComponent.prototype.ngAfterViewInit = function () {
        prismjs__WEBPACK_IMPORTED_MODULE_1__["highlightAll"]();
    };
    ConfigurationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-configuration',
            template: __webpack_require__(/*! ./configuration.component.html */ "./src/app/+layout/configuration/configuration.component.html")
        })
    ], ConfigurationComponent);
    return ConfigurationComponent;
}());



/***/ }),

/***/ "./src/app/+layout/configuration/configuration.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/+layout/configuration/configuration.module.ts ***!
  \***************************************************************/
/*! exports provided: ConfigurationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigurationModule", function() { return ConfigurationModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _configuration_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./configuration-routing.module */ "./src/app/+layout/configuration/configuration-routing.module.ts");
/* harmony import */ var _configuration_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./configuration.component */ "./src/app/+layout/configuration/configuration.component.ts");
/* harmony import */ var angular_admin_lte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-admin-lte */ "./library/angular-admin-lte/src/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ConfigurationModule = /** @class */ (function () {
    function ConfigurationModule() {
    }
    ConfigurationModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _configuration_routing_module__WEBPACK_IMPORTED_MODULE_2__["ConfigurationRoutingModule"],
                angular_admin_lte__WEBPACK_IMPORTED_MODULE_4__["BoxModule"]
            ],
            declarations: [_configuration_component__WEBPACK_IMPORTED_MODULE_3__["ConfigurationComponent"]]
        })
    ], ConfigurationModule);
    return ConfigurationModule;
}());



/***/ })

}]);
//# sourceMappingURL=layout-configuration-configuration-module.js.map