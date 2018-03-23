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
    // import Texture = laya.resource.Texture;
    // import Sprite = laya.display.Sprite;
    var GameObjectEx2 = /** @class */ (function (_super) {
        __extends(GameObjectEx2, _super);
        // private _curTexture:Texture;
        // private _registerOprID:number = -1;
        function GameObjectEx2() {
            return _super.call(this) || this;
        }
        return GameObjectEx2;
    }(gameObject.GameObject));
    gameObject.GameObjectEx2 = GameObjectEx2;
})(gameObject || (gameObject = {}));
//# sourceMappingURL=test.js.map