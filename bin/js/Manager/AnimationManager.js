/**
* name
*/
var manager;
(function (manager) {
    var Animation = Laya.Animation;
    var AnimationManager = /** @class */ (function () {
        function AnimationManager() {
            this.animation = new Animation();
            this.AnimationDic = new Dictionary();
            this.AnimationDic.set(ANIMATION_TYPE.BURST, { aniName: "burst", aniLength: 5 });
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
        AnimationManager.prototype.play = function (ANIMATION_TYPE, posX, posY) {
            var aniName = this.AnimationDic.get(ANIMATION_TYPE).aniName;
            var aniLength = this.AnimationDic.get(ANIMATION_TYPE).aniLength;
            manager.AtlasLoadManager.instance.tryGetAnimation(aniName, aniLength, posX, posY, new laya.utils.Handler(this, this.playAni));
        };
        AnimationManager.prototype.playAni = function (data) {
            var ani = new Animation();
            ani.autoSize = true;
            ani.play(0, false, data["name"], true);
            ani.pivot(ani.width / 2, ani.height / 2);
            ani.pos(data["x"], data["y"]);
            ani.on(Laya.Event.COMPLETE, this, this.playOver, [ani]);
            manager.LayerManager.instance.addToLayer(ani, 1 /* BATTLE */);
        };
        AnimationManager.prototype.playOver = function (data) {
            data.destroy();
            manager.LayerManager.instance.removeFromLayer(data, 1 /* BATTLE */);
        };
        return AnimationManager;
    }());
    manager.AnimationManager = AnimationManager;
})(manager || (manager = {}));
//# sourceMappingURL=AnimationManager.js.map