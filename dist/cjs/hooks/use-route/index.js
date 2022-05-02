"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRoute = void 0;
var react_1 = require("react");
var lib_1 = require("../../lib");
function useRoute() {
    return (0, react_1.useContext)(lib_1.RCBaseRoute.Context);
}
exports.useRoute = useRoute;
