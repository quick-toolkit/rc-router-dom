"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RCRouter = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var rc_base_route_1 = require("../rc-base-route");
var RCRouter = (function () {
    function RCRouter(route, basename, mode, window) {
        this.route = route;
        this.basename = basename;
        this.mode = mode;
        this.window = window;
    }
    RCRouter.create = function (option) {
        return new RCRouter(option.route, option.basename, option.mode || 'browser', option.window);
    };
    RCRouter.prototype.toElement = function (language, permissions) {
        if (permissions === void 0) { permissions = []; }
        var _a = this, mode = _a.mode, basename = _a.basename, route = _a.route;
        if (!rc_base_route_1.RCBaseRoute.Context) {
            rc_base_route_1.RCBaseRoute.Context = (0, react_1.createContext)(route);
        }
        route.language = language;
        return (0, react_1.createElement)(rc_base_route_1.RCBaseRoute.Context.Provider, {
            value: route,
            children: (0, react_1.createElement)(mode === 'hash' ? react_router_dom_1.HashRouter : react_router_dom_1.BrowserRouter, {
                basename: basename,
                window: window,
                children: (0, react_1.createElement)(react_router_dom_1.Routes, {
                    children: route.toElement(language, permissions),
                }),
            }),
        });
    };
    return RCRouter;
}());
exports.RCRouter = RCRouter;
