"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteView = void 0;
var hooks_1 = require("../../hooks");
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
function RouteView(props) {
    var route = (0, hooks_1.useRoute)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    (0, hooks_1.useReady)(function () {
        var allParents = route.getAllParents().reverse().concat([route]);
        document.title = allParents.map(function (o) { return o.title; }).join('-');
    });
    var isMatch = (0, react_router_dom_1.useMatch)(route.getFullPath());
    (0, react_1.useEffect)(function () {
        if (isMatch && route.children && route.children.length) {
            navigate(route.children[0].getFullPath());
        }
    }, [isMatch, navigate, route.children]);
    return react_1.default.createElement(react_1.default.Fragment, {
        children: (0, react_1.createElement)(props.children),
    });
}
exports.RouteView = RouteView;
