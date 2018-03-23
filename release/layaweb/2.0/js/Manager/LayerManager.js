/**
* name
*/
var manager;
(function (manager) {
    var Sprite = laya.display.Sprite;
    var LayerManager = /** @class */ (function () {
        function LayerManager() {
            this._layerMap = null;
            this._layerMap = new Map();
            this._layerMap.addValue(0 /* MAIN */, new Sprite());
            this._layerMap.addValue(1 /* BATTLE */, new Sprite());
            this._layerMap.addValue(2 /* POP */, new Sprite());
            this.initLayer();
        }
        Object.defineProperty(LayerManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new LayerManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        LayerManager.prototype.initLayer = function () {
            for (var i = 0; i < this._layerMap.length; i++) {
                var sp = this._layerMap.getValueByIndex(i);
                sp.mouseEnabled = true;
                sp.mouseThrough = true;
                Laya.stage.addChild(sp);
            }
        };
        LayerManager.prototype.addToLayer = function (source, layerType) {
            if (this._layerMap == null) {
                return;
            }
            var layer = this._layerMap.getValueByKey(layerType);
            if (layer != null) {
                layer.addChild(source);
            }
        };
        LayerManager.prototype.removeFromLayer = function (source, layerType) {
            if (this._layerMap == null) {
                return;
            }
            var layer = this._layerMap.getValueByKey(layerType);
            if (layer != null) {
                layer.removeChild(source);
            }
        };
        return LayerManager;
    }());
    manager.LayerManager = LayerManager;
})(manager || (manager = {}));
//# sourceMappingURL=LayerManager.js.map