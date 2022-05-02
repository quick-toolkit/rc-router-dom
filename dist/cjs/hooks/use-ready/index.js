"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReady = void 0;
var react_1 = require("react");
function useReady(callback) {
    var isReady = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(function () {
        if (!isReady.current) {
            isReady.current = true;
            return callback();
        }
    }, [callback]);
}
exports.useReady = useReady;
