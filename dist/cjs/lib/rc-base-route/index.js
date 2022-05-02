"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RCBaseRoute = void 0;
var path_to_regexp_1 = require("path-to-regexp");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var route_view_1 = require("../../components/route-view");
var RCBaseRoute = (function () {
    function RCBaseRoute(path, name, controller, id, children, root, parent, title, icon, extras, hideMenu, description, permissions, locales) {
        if (locales === void 0) { locales = {}; }
        this.controller = controller;
        this.id = id;
        this.root = root;
        this.parent = parent;
        this.title = title;
        this.icon = icon;
        this.extras = extras;
        this.hideMenu = hideMenu;
        this.description = description;
        this.permissions = permissions;
        this.locales = locales;
        this.language = 'zh_CN';
        this.routeStateMap = new Map();
        this.permissionRoutes = [];
        this.setPath(path);
        this.setName(name);
        if (!this.root) {
            this.root = this;
        }
    }
    RCBaseRoute.prototype.getParentsByName = function (name) {
        if (this.parent) {
            if (name && this.parent.name === name) {
                return [this.parent];
            }
            else {
                return this.parent.getParentsByName(name).concat([this.parent]);
            }
        }
        return [];
    };
    RCBaseRoute.prototype.getParentsByPath = function (path) {
        if (this.parent) {
            if (path && (0, path_to_regexp_1.pathToRegexp)(this.parent.getFullPath()).test(path)) {
                return [this.parent];
            }
            else {
                return this.parent.getParentsByName(path).concat([this.parent]);
            }
        }
        return [];
    };
    RCBaseRoute.prototype.getAllChildren = function () {
        var _a;
        if (this.children) {
            return (_a = this.children).concat.apply(_a, this.children.map(function (o) { return o.getAllChildren(); }));
        }
        return [];
    };
    RCBaseRoute.prototype.getAllParents = function () {
        var parent = this.parent;
        if (parent) {
            return __spreadArray([parent], parent.getAllParents(), true);
        }
        return [];
    };
    RCBaseRoute.prototype.getRouteByName = function (name) {
        return this.getAllChildren().find(function (o) { return o.name === name; });
    };
    RCBaseRoute.prototype.getRouteByPath = function (path) {
        return this.getAllChildren().find(function (o) {
            return (0, path_to_regexp_1.pathToRegexp)(o.getFullPath()).test(path);
        });
    };
    RCBaseRoute.prototype.setName = function (name) {
        if (/^[A-z][A-z0-9_]+/.test(name)) {
            this.name = name;
        }
        else {
            console.error('Route name must match "/^[A-z][A-z0-9_]+/".');
            console.error("   at route name: \"".concat(name, "\""));
            console.error("   at route path: \"".concat(this.path, "\""));
        }
    };
    RCBaseRoute.prototype.getName = function () {
        return this.name;
    };
    RCBaseRoute.prototype.setPath = function (path) {
        if (!/^\//.test(path) && !/\/$/.test(path)) {
            this.path = path;
        }
        else {
            console.error('Route path cannot start and end with "/".');
            console.error("   at route path: \"".concat(path, "\""));
            console.error("   at route name: \"".concat(this.name, "\""));
        }
    };
    RCBaseRoute.prototype.getPath = function () {
        return this.path;
    };
    RCBaseRoute.prototype.getFullPath = function () {
        if (this.parent) {
            return [this.parent.getFullPath(), this.getPath()]
                .join('/')
                .replace(/\/{2}/g, '/');
        }
        return ['', this.getPath()].join('/').replace(/\/{2}/g, '/');
    };
    RCBaseRoute.prototype.toPath = function (data) {
        return (0, path_to_regexp_1.compile)(this.getFullPath(), { encode: encodeURIComponent })(data);
    };
    RCBaseRoute.prototype.getHasPermissionFirstRoute = function () {
        if (this.permissionRoutes.length) {
            return this.permissionRoutes[0];
        }
        return false;
    };
    RCBaseRoute.prototype.createNode = function () {
        if (!RCBaseRoute.Context) {
            RCBaseRoute.Context = (0, react_1.createContext)(this);
        }
        if (this.controller) {
            return (0, react_1.createElement)(RCBaseRoute.Context.Provider, {
                value: this,
                children: (0, react_1.createElement)(route_view_1.RouteView, {
                    $route: this,
                    children: this.controller,
                }),
            });
        }
    };
    RCBaseRoute.prototype.toElement = function (language, permissions) {
        if (language === void 0) { language = 'zh_CN'; }
        if (permissions === void 0) { permissions = []; }
        this.permissionRoutes = (this.children || []).filter(function (o) {
            if (Array.isArray(o.permissions)) {
                return o.permissions.some(function (x) { return permissions.includes(x); });
            }
            else if (typeof o.permissions === 'string') {
                return permissions.includes(o.permissions);
            }
            return true;
        });
        this.language = language;
        return (0, react_1.createElement)(react_router_dom_1.Route, {
            path: this.path,
            element: this.createNode(),
            children: this.permissionRoutes.map(function (o) {
                return o.toElement(language, permissions);
            }),
        });
    };
    return RCBaseRoute;
}());
exports.RCBaseRoute = RCBaseRoute;
