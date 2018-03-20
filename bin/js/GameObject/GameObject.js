var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var gameObject;
(function (gameObject) {
    var Sprite = laya.display.Sprite;
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        function GameObject() {
            var _this = _super.call(this) || this;
            _this._uID = 0;
            _this._layerType = 1 /* BATTLE */;
            /*引用计数*/
            _this.refCount = 0;
            _this.autoSize = true;
            return _this;
        }
        GameObject.prototype.setData = function (typeID, kindID, statusID, teamID, uID, varsData) {
            if (varsData === void 0) { varsData = null; }
            this._typeID = typeID;
            this._kindID = kindID;
            this._statusID = statusID;
            this._teamID = teamID;
            this._uID = uID;
            this._varsData = varsData;
        };
        GameObject.prototype.initialize = function () {
            console.assert(false, "initialize必须被重写");
        };
        GameObject.prototype.uninitialize = function () {
            console.assert(false, "uninitialize必须被重写");
        };
        GameObject.prototype.dispose = function () {
            this._typeID = -1;
            this._kindID = -1;
            this._statusID = -1;
            this._teamID = -1;
            this._uID = -1;
            this._varsData = null;
            this.destroy();
        };
        Object.defineProperty(GameObject.prototype, "uID", {
            get: function () {
                return this._uID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "kindID", {
            get: function () {
                return this._kindID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "typeID", {
            get: function () {
                return this._typeID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "statusID", {
            get: function () {
                return this._statusID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "varsData", {
            get: function () {
                return this._varsData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "layerType", {
            get: function () {
                return this._layerType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "teamID", {
            get: function () {
                return this._teamID;
            },
            enumerable: true,
            configurable: true
        });
        GameObject.ATLAS_FLAG = "gameObject";
        return GameObject;
    }(Sprite));
    gameObject.GameObject = GameObject;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=GameObject.js.map