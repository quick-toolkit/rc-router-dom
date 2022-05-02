"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RCModule = void 0;
var rc_base_route_1 = require("../rc-base-route");
var rc_route_1 = require("../rc-route");
var RCModule = (function (_super) {
    __extends(RCModule, _super);
    function RCModule(option) {
        var _this = _super.call(this, option.path, option.name, option.controller, option.id, undefined, option.root, option.parent, option.title, option.icon, option.extras, option.hideMenu, option.description, option.permissions, option.locales) || this;
        _this.children = undefined;
        if (option.children) {
            _this.children = option.children.map(function (o) {
                if (o instanceof rc_base_route_1.RCBaseRoute) {
                    o.root = _this.root;
                    o.parent = _this;
                    return o;
                }
                else {
                    return rc_route_1.RCRoute.create(__assign(__assign({}, o), { root: _this.root, parent: _this }));
                }
            });
        }
        return _this;
    }
    RCModule.create = function (option) {
        return new RCModule(option);
    };
    return RCModule;
}(rc_base_route_1.RCBaseRoute));
exports.RCModule = RCModule;
