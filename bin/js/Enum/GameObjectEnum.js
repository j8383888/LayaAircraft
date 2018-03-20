var GameObjectEnum = /** @class */ (function () {
    function GameObjectEnum() {
        this.enumDic = new Dictionary();
        this.BULLET = "bullet";
        this.PANEL = "panel";
        this.STONE = "stone";
        this.enumDic.set(0 /* BULLET */, this.BULLET);
        this.enumDic.set(1 /* PANEL */, this.PANEL);
        this.enumDic.set(2 /* STONE */, this.STONE);
    }
    Object.defineProperty(GameObjectEnum, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new GameObjectEnum();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return GameObjectEnum;
}());
//# sourceMappingURL=GameObjectEnum.js.map