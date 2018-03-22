/**
* name
*/
var manager;
(function (manager) {
    var Animation = Laya.Animation;
    var AnimationManager = /** @class */ (function () {
        function AnimationManager() {
            this.animation = new Animation();
            this.animationTempletDic = new Dictionary();
            this.animationTempletDic.set(GameObjectEnum.BURST, { typeStr: "burst", kindID: 0, statusID: 0, teamID: -1, varsData: { aniLength: 5 } });
        }
        Object.defineProperty(AnimationManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new AnimationManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        AnimationManager.prototype.aniPlayOnce = function (animationTempletName, posX, posY) {
            var flagName = GameObjectEnum.ANIMATION_FLAG;
            var typeStr = this.animationTempletDic.get(animationTempletName).typeStr;
            var kindID = this.animationTempletDic.get(animationTempletName).kindID;
            var statusID = this.animationTempletDic.get(animationTempletName).statusID;
            var teamID = this.animationTempletDic.get(animationTempletName).teamID;
            var varsData = this.animationTempletDic.get(animationTempletName).varsData;
            var gameObj = gameObject.GameObjectFactory.instance.creatGameObject(flagName, typeStr, kindID, statusID, teamID, varsData);
            gameObj.x = posX;
            gameObj.y = posY;
        };
        return AnimationManager;
    }());
    manager.AnimationManager = AnimationManager;
})(manager || (manager = {}));
//# sourceMappingURL=AnimationManager.js.map