"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRouteLocale = void 0;
var use_route_1 = require("../use-route");
function useRouteLocale() {
    var route = (0, use_route_1.useRoute)();
    return route.locales[route.language];
}
exports.useRouteLocale = useRouteLocale;
